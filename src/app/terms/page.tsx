import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { terms } from "../../../content/legal";
import { siteUrl } from "../../../content/seo";

export const metadata: Metadata = {
  title: { absolute: terms.seoTitle },
  description: terms.description,
  robots: { index: false, follow: true },
  alternates: { canonical: new URL(terms.path, siteUrl).href },
};

export default function Page() {
  return <LegalPage document={terms} />;
}
