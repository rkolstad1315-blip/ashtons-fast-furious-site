import type { MetadataRoute } from "next";
import { contentUpdated, livePages, siteUrl } from "../../content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${contentUpdated}T00:00:00.000Z`);

  return livePages().map((page) => ({
    url: new URL(page.path, siteUrl).href,
    lastModified,
  }));
}
