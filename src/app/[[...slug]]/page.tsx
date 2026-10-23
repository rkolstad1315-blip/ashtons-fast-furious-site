import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeBottom } from "@/components/home/home-bottom";
import { HomeTop } from "@/components/home/home-top";
import { JsonLd } from "@/components/json-ld";
import { SeoPage } from "@/components/seo-page";
import { pageMetadata } from "@/lib/metadata";
import { isPagePath, pages, pathFromSlug } from "../../../content/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({
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
