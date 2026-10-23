import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/about/");

export default function Page() {
  return (
    <>
      <JsonLd path="/about/" />
      <AboutPage />
    </>
  );
}
