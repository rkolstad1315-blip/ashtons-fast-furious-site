import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/about/");

export default function Page() {
  return <AboutPage />;
}
