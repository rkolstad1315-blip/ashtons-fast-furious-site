import { jsonLdFor, localBusiness } from "@/lib/structured-data";
import { requestPathname } from "@/lib/request-path";
import { isPagePath } from "../../content/seo";

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function JsonLd() {
  const path = normalizePath(requestPathname());
  const blocks = isPagePath(path) ? jsonLdFor(path) : [localBusiness()];

  return (
    <>
      {blocks.map((block) => (
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
