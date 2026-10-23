import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DaycareAlternativePage } from "@/components/daycare-page";
import { FaqPage } from "@/components/faq-page";
import { HomeBottom } from "@/components/home/home-bottom";
import { HomeTop } from "@/components/home/home-top";
import { JsonLd } from "@/components/json-ld";
import { SafetyPage } from "@/components/safety-page";
import { SeoPage } from "@/components/seo-page";
import { pageMetadata } from "@/lib/metadata";
import { isPagePath, pages, pathFromSlug, type PagePath } from "../../../content/seo";

export const dynamicParams = false;

// These URLs are real routes, so they are left out of the catch-all page.
const dedicatedPaths = new Set<string>([
  "/about/",
  "/reviews/",
  "/book/",
  "/military-families/",
  "/pricing/",
  "/mobile-dog-treadmill/",
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
      <PageBody path={path} />
    </>
  );
}

function PageBody({ path }: { path: PagePath }) {
  if (path === "/") {
    return (
      <>
        <HomeTop />
        <HomeBottom />
      </>
    );
  }
  if (path === "/faq/") {
    return <FaqPage />;
  }
  if (path === "/safety/") {
    return <SafetyPage />;
  }
  if (path === "/dog-daycare-alternative/") {
    return <DaycareAlternativePage />;
  }
  return <SeoPage path={path} />;
}
