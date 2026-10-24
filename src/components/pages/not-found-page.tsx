import Link from "next/link";
import { notFoundPage } from "../../../content/not-found";
import { PageFrame, PageH1 } from "./page-frame";

export function NotFoundPage() {
  return (
    <PageFrame>
      <PageH1 id="not-found-heading">{notFoundPage.h1}</PageH1>
      <p className="m-0 mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{notFoundPage.body}</p>
      <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0 sm:flex-row sm:items-center">
        {notFoundPage.links.map((link) => (
          <li key={link.href}>
            {link.label === "Book" ? (
              <Link
                href={link.href}
                className="btn-accent inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center font-bold text-navy underline"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}
