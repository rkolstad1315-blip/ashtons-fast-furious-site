import { breadcrumbJsonLd } from "@/lib/structured-data";
import type { PagePath } from "../../../content/seo";

export function BreadcrumbJsonLd({ path }: { path: PagePath }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd(path)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
