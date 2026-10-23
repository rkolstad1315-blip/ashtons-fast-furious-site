import { getPage, type PagePath } from "../../content/seo";

export function SeoPage({ path }: { path: PagePath }) {
  const page = getPage(path);

  return (
    <h1 className="m-0 max-w-3xl px-4 py-10 text-4xl leading-none">{page.h1}</h1>
  );
}
