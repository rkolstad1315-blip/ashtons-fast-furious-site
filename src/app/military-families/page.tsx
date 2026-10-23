import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MilitaryPage } from "@/components/pages/military-page";
import { pageMetadata } from "@/lib/metadata";
import { militaryFamiliesEnabled } from "../../../content/seo";

export function generateMetadata(): Metadata {
  if (!militaryFamiliesEnabled) {
    return {
      title: { absolute: "Page not found | Ashtons" },
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata("/military-families/");
}

export default function Page() {
  if (!militaryFamiliesEnabled) {
    notFound();
  }

  return <MilitaryPage />;
}
