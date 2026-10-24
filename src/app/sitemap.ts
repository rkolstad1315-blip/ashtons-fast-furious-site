import type { MetadataRoute } from "next";
import { postPath, publishablePosts } from "@/lib/blog";
import { noindexTownPaths } from "@/lib/town-pages";
import { blogPage } from "../../content/blog-page";
import { contentUpdated, livePages, siteUrl } from "../../content/seo";

// MILITARY_PAGE_ENABLED is a build time flag, so the sitemap is prerendered
// with the pages and served from the edge cache.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${contentUpdated}T00:00:00.000Z`);
  const hidden = new Set<string>(noindexTownPaths);

  const pages = livePages()
    .filter((page) => !hidden.has(page.path))
    .map((page) => ({
      url: new URL(page.path, siteUrl).href,
      lastModified,
    }));

  // The blog joins the sitemap only once a post is publishable. lastmod is each post's updatedAt.
  const posts = publishablePosts();
  if (posts.length === 0) {
    return pages;
  }
  const postDate = (date: string) => new Date(`${date}T00:00:00.000Z`);
  const newest = posts.map((post) => postDate(post.updatedAt).getTime()).reduce((a, b) => Math.max(a, b));
  return [
    ...pages,
    { url: new URL(blogPage.path, siteUrl).href, lastModified: new Date(newest) },
    ...posts.map((post) => ({
      url: new URL(postPath(post.slug), siteUrl).href,
      lastModified: postDate(post.updatedAt),
    })),
  ];
}
