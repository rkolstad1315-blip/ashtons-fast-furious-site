import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { pageCta } from "../../content/page-cta";

export function BookCta() {
  return (
    <section className="speed-bg" data-reveal aria-labelledby="book-cta-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16 md:py-20">
        <h2 id="book-cta-heading" className="m-0 font-display text-4xl italic uppercase leading-none md:text-6xl">
          {pageCta.heading}
        </h2>
        <p className="m-0 mt-3 max-w-xl text-lg text-slate-200">{pageCta.body}</p>
        <Link
          href={pageCta.href}
          className="btn-accent mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 text-lg font-bold text-navy no-underline sm:w-auto"
        >
          {pageCta.label}
          <Icon name="arrow" className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
