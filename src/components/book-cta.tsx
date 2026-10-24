import { Link } from "@/components/link";
import { pageCta } from "../../content/page-cta";

export function BookCta() {
  return (
    <section className="bg-navy text-white" data-reveal aria-labelledby="book-cta-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-12 md:py-16">
        <h2 id="book-cta-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {pageCta.heading}
        </h2>
        <p className="m-0 mt-3 max-w-xl text-lg text-slate-200">{pageCta.body}</p>
        <Link
          href={pageCta.href}
          className="btn-accent mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
        >
          {pageCta.label}
        </Link>
      </div>
    </section>
  );
}
