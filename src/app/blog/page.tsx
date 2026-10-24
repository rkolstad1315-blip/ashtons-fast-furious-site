import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-pages";
import { JsonLdScripts } from "@/components/json-ld";
import { visiblePosts } from "@/lib/blog";
import { blogIndexMetadata } from "@/lib/metadata";
import { blogIndexJsonLd } from "@/lib/structured-data";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  if (visiblePosts().length === 0) {
    return { title: { absolute: "Page not found | Ashtons" }, robots: { index: false, follow: false } };
  }
  return blogIndexMetadata();
}

export default function BlogIndexPage() {
  const posts = visiblePosts();
  if (posts.length === 0) {
    // No publishable post yet: the blog does not exist to visitors or crawlers.
    notFound();
  }
  return (
    <>
      <JsonLdScripts blocks={blogIndexJsonLd()} />
      <BlogIndex posts={posts} />
    </>
  );
}
