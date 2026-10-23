import type { MetadataRoute } from "next";
import { noindexTownPaths } from "@/lib/town-pages";
import { contentUpdated, livePages, siteUrl } from "../../content/seo";

// Read MILITARY_PAGE_ENABLED on each request so the sitemap matches the page.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${contentUpdated}T00:00:00.000Z`);
  const hidden = new Set<string>(noindexTownPaths);

  return livePages()
    .filter((page) => !hidden.has(page.path))
    .map((page) => ({
      url: new URL(page.path, siteUrl).href,
      lastModified,
    }));
}
