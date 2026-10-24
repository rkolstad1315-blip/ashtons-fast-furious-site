import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/blog/blog-pages";
import { JsonLdScripts } from "@/components/json-ld";
import { getVisiblePost, visiblePosts } from "@/lib/blog";
import { blogPostMetadata } from "@/lib/metadata";
import { blogPostJsonLd } from "@/lib/structured-data";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return visiblePosts().map((post) => ({ slug: post.slug }));
}

type PostRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getVisiblePost(slug);
  if (!post) {
    return {};
  }
  return blogPostMetadata(post);
}

export default async function PostRoute({ params }: PostRouteProps) {
  const { slug } = await params;
  const post = getVisiblePost(slug);
  if (!post) {
    notFound();
  }
  return (
    <>
      <JsonLdScripts blocks={blogPostJsonLd(post)} />
      <BlogPostPage post={post} />
    </>
  );
}
