import Image from "next/image";
import type { Token, Tokens } from "marked";
import { Link } from "@/components/link";
import type { BlogImage } from "@/lib/blog";

// Renders the marked token tree as React elements, so internal links use
// the Link component and images go through next/image with real dimensions.
// Supported Markdown: paragraphs, H2 and H3, lists, blockquotes, rules,
// bold, italics, inline code, links, images, and line breaks.

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function imageFrom(token: Tokens.Image): BlogImage {
  const dims = /^(\d+)x(\d+)$/.exec(token.title ?? "");
  return {
    src: token.href,
    alt: token.text,
    width: dims ? Number(dims[1]) : 1200,
    height: dims ? Number(dims[2]) : 800,
  };
}

type Context = {
  /** The one image allowed to load eagerly: the first image that appears before any heading. */
  eagerSrc: string | null;
};

// Images before the first heading sit above the fold on most screens, so the
// first of them loads eagerly; every other post image is lazy.
function findEagerImage(tokens: Token[]): string | null {
  for (const token of tokens) {
    if (token.type === "heading") {
      return null;
    }
    if (token.type === "paragraph") {
      const image = (token as Tokens.Paragraph).tokens.find((child) => child.type === "image");
      if (image) {
        return (image as Tokens.Image).href;
      }
    }
  }
  return null;
}

function Inline({ tokens, context }: { tokens: Token[]; context: Context }) {
  return (
    <>
      {tokens.map((token, index) => {
        const key = `${token.type}-${index}`;
        switch (token.type) {
          case "text": {
            const text = token as Tokens.Text;
            return text.tokens ? <Inline key={key} tokens={text.tokens} context={context} /> : <span key={key}>{text.text}</span>;
          }
          case "escape":
            return <span key={key}>{(token as Tokens.Escape).text}</span>;
          case "strong":
            return (
              <strong key={key}>
                <Inline tokens={(token as Tokens.Strong).tokens} context={context} />
              </strong>
            );
          case "em":
            return (
              <em key={key}>
                <Inline tokens={(token as Tokens.Em).tokens} context={context} />
              </em>
            );
          case "codespan":
            return <code key={key}>{(token as Tokens.Codespan).text}</code>;
          case "br":
            return <br key={key} />;
          case "link": {
            const link = token as Tokens.Link;
            const inner = <Inline tokens={link.tokens} context={context} />;
            if (link.href.startsWith("/")) {
              return (
                <Link key={key} href={link.href}>
                  {inner}
                </Link>
              );
            }
            return (
              <a key={key} href={link.href} rel="noopener noreferrer">
                {inner}
              </a>
            );
          }
          case "image":
            return <Figure key={key} image={imageFrom(token as Tokens.Image)} context={context} />;
          default:
            return null;
        }
      })}
    </>
  );
}

function Figure({ image, context }: { image: BlogImage; context: Context }) {
  const eager = context.eagerSrc === image.src;
  return (
    <figure className="post-figure">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 720px, 100vw"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="h-auto w-full rounded-card"
      />
    </figure>
  );
}

function Block({ token, context }: { token: Token; context: Context }) {
  switch (token.type) {
    case "space":
      return null;
    case "heading": {
      const heading = token as Tokens.Heading;
      const id = slugify(heading.text);
      if (heading.depth === 2) {
        return (
          <h2 id={id}>
            <Inline tokens={heading.tokens} context={context} />
          </h2>
        );
      }
      return (
        <h3 id={id}>
          <Inline tokens={heading.tokens} context={context} />
        </h3>
      );
    }
    case "paragraph": {
      const paragraph = token as Tokens.Paragraph;
      if (paragraph.tokens.length === 1 && paragraph.tokens[0].type === "image") {
        return <Figure image={imageFrom(paragraph.tokens[0] as Tokens.Image)} context={context} />;
      }
      return (
        <p>
          <Inline tokens={paragraph.tokens} context={context} />
        </p>
      );
    }
    case "list": {
      const list = token as Tokens.List;
      const items = list.items.map((item, index) => (
        <li key={index}>
          {item.tokens.map((child, childIndex) =>
            child.type === "text" ? (
              <Inline key={childIndex} tokens={(child as Tokens.Text).tokens ?? [child]} context={context} />
            ) : (
              <Block key={childIndex} token={child} context={context} />
            ),
          )}
        </li>
      ));
      return list.ordered ? <ol start={list.start || 1}>{items}</ol> : <ul>{items}</ul>;
    }
    case "blockquote":
      return (
        <blockquote>
          {(token as Tokens.Blockquote).tokens.map((child, index) => (
            <Block key={index} token={child} context={context} />
          ))}
        </blockquote>
      );
    case "hr":
      return <hr />;
    case "text":
      return (
        <p>
          <Inline tokens={(token as Tokens.Text).tokens ?? [token]} context={context} />
        </p>
      );
    default:
      return null;
  }
}

export function Markdown({ tokens }: { tokens: Token[] }) {
  const context: Context = { eagerSrc: findEagerImage(tokens) };
  return (
    <div className="post-body">
      {tokens.map((token, index) => (
        <Block key={index} token={token} context={context} />
      ))}
    </div>
  );
}
