// Blog posts are Markdown files in /content/blog, parsed on the server at
// build time. Nothing here runs in the browser.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { Lexer, type Token, type Tokens } from "marked";
import { z } from "zod";
import { blogPage } from "../../content/blog-page";
import { faqs } from "../../content/faqs";
import { collectPlaceholders } from "../../content/placeholders";
import { livePages } from "../../content/seo";

export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  primaryKeyword: string;
  relatedFaqIds: readonly string[];
  draft: boolean;
  tokens: Token[];
  images: BlogImage[];
  /** Why a production build leaves the post out, or null when it is publishable. */
  excluded: string | null;
};

const blogDir = join(process.cwd(), "content", "blog");
const publicDir = join(process.cwd(), "public");
const dash = /[–—]/;
const paceClaim = /sets the pace|set the pace|no motor|without a motor|non-?motorized|unmotorized|slatmill/i;
const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Dates are YYYY-MM-DD.")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)), "Not a real date.");

const frontmatterSchema = z.object({
  title: z.string().trim().min(1).max(59, "Title must be under 60 characters."),
  description: z.string().trim().min(1).max(154, "Description must be under 155 characters."),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug is lowercase words joined by hyphens."),
  publishedAt: dateString,
  updatedAt: dateString,
  author: z.string().trim().min(1),
  primaryKeyword: z.string().trim().min(1),
  relatedFaqIds: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

function fail(file: string, message: string): never {
  throw new Error(`[blog] ${file}: ${message}`);
}

function parseValue(raw: string): unknown {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    return inner.length === 0 ? [] : inner.split(",").map((item) => parseValue(item));
  }
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function splitFrontmatter(file: string, source: string): { data: Record<string, unknown>; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    fail(file, "Missing frontmatter block.");
  }
  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (line.trim().length === 0 || line.trim().startsWith("#")) {
      continue;
    }
    const colon = line.indexOf(":");
    if (colon === -1) {
      fail(file, `Frontmatter line is not key: value: ${line}`);
    }
    data[line.slice(0, colon).trim()] = parseValue(line.slice(colon + 1));
  }
  return { data, body: match[2] };
}

function walk(tokens: Token[], visit: (token: Token) => void): void {
  for (const token of tokens) {
    visit(token);
    const children = (token as { tokens?: Token[] }).tokens;
    if (children) {
      walk(children, visit);
    }
    if (token.type === "list") {
      walk((token as Tokens.List).items, visit);
    }
  }
}

// Visible words only: link text and headings count, link targets, image
// sizes, and code spans do not, so Markdown link syntax is never mistaken
// for a [PLACEHOLDER].
function plainText(tokens: Token[]): string {
  let text = "";
  walk(tokens, (token) => {
    if (token.type === "codespan") {
      return;
    }
    if ("text" in token && typeof token.text === "string" && !("tokens" in token && token.tokens)) {
      text += `${token.text} `;
    }
  });
  return text;
}

const allowedBlockTypes = new Set(["paragraph", "heading", "list", "list_item", "blockquote", "hr", "space", "text"]);
const allowedInlineTypes = new Set(["text", "strong", "em", "codespan", "link", "image", "br", "escape"]);

function validateBody(file: string, tokens: Token[], knownPaths: Set<string>): BlogImage[] {
  const images: BlogImage[] = [];
  const links = new Set<string>();
  let previousDepth = 1;

  walk(tokens, (token) => {
    if (!allowedBlockTypes.has(token.type) && !allowedInlineTypes.has(token.type)) {
      fail(file, `Markdown feature not supported in posts: ${token.type}.`);
    }
    if (token.type === "heading") {
      const heading = token as Tokens.Heading;
      if (heading.depth === 1) {
        fail(file, "Posts must not contain an H1; the page renders it from the title.");
      }
      if (heading.depth > 3) {
        fail(file, `Headings go no deeper than H3: "${heading.text}".`);
      }
      if (heading.depth > previousDepth + 1) {
        fail(file, `Heading level skipped before "${heading.text}".`);
      }
      previousDepth = heading.depth;
    }
    if (token.type === "link") {
      const link = token as Tokens.Link;
      links.add(link.href);
      if (link.href.startsWith("/")) {
        const path = link.href.split(/[?#]/)[0];
        if (!knownPaths.has(path)) {
          fail(file, `Internal link does not exist: ${link.href}`);
        }
      } else if (!/^https:\/\//.test(link.href) && !/^(tel|sms|mailto):/.test(link.href)) {
        fail(file, `Links must be site paths or https URLs: ${link.href}`);
      }
    }
    if (token.type === "image") {
      const image = token as Tokens.Image;
      const dims = /^(\d+)x(\d+)$/.exec(image.title ?? "");
      if (!dims) {
        fail(file, `Image needs its size as the title, for example ![alt](${image.href} "1200x800").`);
      }
      if (!image.text.trim()) {
        fail(file, `Image is missing alt text: ${image.href}`);
      }
      if (!image.href.startsWith("/images/") || !existsSync(join(publicDir, image.href))) {
        fail(file, `Image must be a file under /public/images: ${image.href}`);
      }
      images.push({ src: image.href, alt: image.text, width: Number(dims[1]), height: Number(dims[2]) });
    }
  });

  if (!links.has("/book/")) {
    fail(file, "Every post must link to /book/.");
  }
  if (!blogPage.requiredLinkTargets.some((target) => links.has(target))) {
    fail(file, `Every post must link to one of: ${blogPage.requiredLinkTargets.join(", ")}.`);
  }
  return images;
}

function loadPost(file: string, knownPaths: Set<string>): BlogPost {
  const source = readFileSync(join(blogDir, file), "utf8");
  const { data, body } = splitFrontmatter(file, source);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    fail(file, parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; "));
  }
  const meta = parsed.data;
  if (meta.slug !== basename(file, ".md")) {
    fail(file, `Slug "${meta.slug}" must match the file name.`);
  }
  if (Date.parse(meta.updatedAt) < Date.parse(meta.publishedAt)) {
    fail(file, "updatedAt is before publishedAt.");
  }
  for (const id of meta.relatedFaqIds) {
    if (!faqs.some((faq) => faq.id === id)) {
      fail(file, `Unknown FAQ id in relatedFaqIds: ${id}`);
    }
  }
  if (dash.test(meta.title) || dash.test(meta.description) || dash.test(body)) {
    fail(file, "Em dash or en dash in the title, description, or body.");
  }
  if (paceClaim.test(`${meta.title} ${meta.description} ${body}`)) {
    fail(file, "Post claims the dog sets the pace or that the treadmill has no motor. That is unconfirmed.");
  }

  const tokens = Lexer.lex(body);
  const images = validateBody(file, tokens, knownPaths);

  const reasons: string[] = [];
  if (meta.draft) {
    reasons.push("draft: true");
  }
  const placeholders = collectPlaceholders({ ...meta, body: plainText(tokens) }, meta.slug);
  if (placeholders.length > 0) {
    const unique = [...new Set(placeholders.map((hit) => hit.value))];
    reasons.push(`placeholders ${unique.join(", ")}`);
  }

  return {
    ...meta,
    tokens,
    images,
    excluded: reasons.length > 0 ? reasons.join("; ") : null,
  };
}

let cache: BlogPost[] | null = null;
let logged = false;

export function allPosts(): BlogPost[] {
  if (cache) {
    return cache;
  }
  if (!existsSync(blogDir)) {
    cache = [];
    return cache;
  }
  const files = readdirSync(blogDir).filter((file) => file.endsWith(".md")).sort();
  const knownPaths = new Set<string>([
    ...livePages().map((page) => page.path),
    blogPage.path,
    ...files.map((file) => postPath(basename(file, ".md"))),
  ]);
  const posts = files.map((file) => loadPost(file, knownPaths));
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      fail(`${post.slug}.md`, "Duplicate slug.");
    }
    slugs.add(post.slug);
  }
  posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.slug.localeCompare(b.slug));

  if (!logged) {
    logged = true;
    for (const post of posts) {
      if (post.excluded) {
        console.info(`[blog] left out of production: ${post.slug} (${post.excluded})`);
      }
    }
  }
  cache = posts;
  return cache;
}

/** Posts a production build publishes: not drafts, no placeholders. Newest first. */
export function publishablePosts(): BlogPost[] {
  return allPosts().filter((post) => post.excluded === null);
}

/**
 * Posts that render at their URLs. Production shows only publishable posts.
 * Development, and a build with BLOG_PREVIEW=true, show every post so drafts
 * can be checked; the sitemap, footer, and FAQ links still use publishablePosts().
 */
export function visiblePosts(): BlogPost[] {
  if (process.env.NODE_ENV !== "production" || process.env.BLOG_PREVIEW === "true") {
    return allPosts();
  }
  return publishablePosts();
}

export function getVisiblePost(slug: string): BlogPost | undefined {
  return visiblePosts().find((post) => post.slug === slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}/`;
}

export function relatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const others = visiblePosts().filter((item) => item.slug !== post.slug);
  const score = (item: BlogPost) =>
    item.relatedFaqIds.filter((id) => post.relatedFaqIds.includes(id)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function readMorePostForFaq(faqId: string): BlogPost | undefined {
  return publishablePosts().find((post) => post.relatedFaqIds.includes(faqId));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function postPlainText(post: BlogPost): string {
  return plainText(post.tokens);
}
