import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { privacy } from "../../../content/legal";
import { siteUrl } from "../../../content/seo";

export const metadata: Metadata = {
  title: { absolute: privacy.seoTitle },
  description: privacy.description,
  robots: { index: false, follow: true },
  alternates: { canonical: new URL(privacy.path, siteUrl).href },
};

export default function Page() {
  return <LegalPage document={privacy} />;
}
