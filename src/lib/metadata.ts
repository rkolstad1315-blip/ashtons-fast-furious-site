import type { Metadata } from "next";
import { business } from "../../content/business";
import { blogPage } from "../../content/blog-page";
import { postPath, type BlogPost } from "./blog";
import {
  getPage,
  militaryFamiliesEnabled,
  ogImagePath,
  ogImageSize,
  siteUrl,
  type PagePath,
} from "../../content/seo";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

function baseMetadata({ title, description, path }: MetadataInput): Metadata {
  const canonical = new URL(path, siteUrl).href;
  const image = new URL(ogImagePath, siteUrl).href;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: business.name,
      type: "website",
      images: [{ url: image, ...ogImageSize, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export function blogIndexMetadata(): Metadata {
  return baseMetadata(blogPage);
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const base = baseMetadata({
    title: post.title,
    description: post.description,
    path: postPath(post.slug),
  });
  const image = post.images[0];
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${post.updatedAt}T00:00:00.000Z`,
      authors: [post.author],
      ...(image
        ? { images: [{ url: new URL(image.src, siteUrl).href, width: image.width, height: image.height, alt: image.alt }] }
        : {}),
    },
    ...(image ? { twitter: { ...base.twitter, images: [new URL(image.src, siteUrl).href] } } : {}),
  };
}

export function pageMetadata(path: PagePath): Metadata {
  const page = getPage(path);
  const canonical = new URL(page.path, siteUrl).href;
  const image = new URL(ogImagePath, siteUrl).href;
  const noIndex = page.path === "/military-families/" && !militaryFamiliesEnabled;

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: business.name,
      type: "website",
      images: [
        {
          url: image,
          ...ogImageSize,
          alt: business.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
