import type { Metadata } from "next";
import { business } from "../../content/business";
import {
  getPage,
  militaryFamiliesEnabled,
  ogImagePath,
  siteUrl,
  type PagePath,
} from "../../content/seo";

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
          width: 240,
          height: 64,
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
