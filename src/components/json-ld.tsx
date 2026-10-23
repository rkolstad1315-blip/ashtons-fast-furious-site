import { jsonLdFor } from "@/lib/structured-data";
import type { PagePath } from "../../content/seo";

export function JsonLd({ path }: { path: PagePath }) {
  return (
    <>
      {jsonLdFor(path).map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
