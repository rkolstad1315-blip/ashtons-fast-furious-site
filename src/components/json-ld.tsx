import { jsonLdFor, type JsonLdBlock } from "@/lib/structured-data";
import type { PagePath } from "../../content/seo";

export function JsonLdScripts({ blocks }: { blocks: readonly JsonLdBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={`${String(block["@type"])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

export function JsonLd({ path }: { path: PagePath }) {
  return <JsonLdScripts blocks={jsonLdFor(path)} />;
}
