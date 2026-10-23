import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeBottom } from "@/components/home/home-bottom";
import { HomeTop } from "@/components/home/home-top";
import { JsonLd } from "@/components/json-ld";
import { SeoPage } from "@/components/seo-page";
import { pageMetadata } from "@/lib/metadata";
import { isPagePath, pages, pathFromSlug } from "../../../content/seo";

export const dynamicParams = false;

// Ticket 11 owns these URLs in their own route files.
const dedicatedPaths = new Set<string>([
  "/about/",
  "/reviews/",
  "/book/",
  "/military-families/",
]);

export function generateStaticParams() {
  return pages
    .filter((page) => !dedicatedPaths.has(page.path))
    .map((page) => ({
      slug: page.path.split("/").filter(Boolean),
    }));
}

type PageParams = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  if (!isPagePath(path)) {
    return {};
  }
  return pageMetadata(path);
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  if (!isPagePath(path)) {
    notFound();
  }
  return (
    <>
      <JsonLd path={path} />
      {path === "/" ? (
        <>
          <HomeTop />
          <HomeBottom />
        </>
      ) : (
        <SeoPage path={path} />
      )}
    </>
  );
}
