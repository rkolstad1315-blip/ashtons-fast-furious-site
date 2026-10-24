import { safetyPageCopy, safetySections } from "../../content/safety-page";
import { getPage } from "../../content/seo";
import { BookCta } from "./book-cta";
import { PageHeader } from "./page-header";

export function SafetyPage() {
  const page = getPage("/safety/");

  return (
    <>
      <PageHeader title={page.h1} lede={safetyPageCopy.lede} />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:py-16">
        {safetySections().map((section) => (
          <section
            key={section.id}
            data-reveal
            className="card rounded-card border border-slate-200 bg-white px-5 py-5"
            aria-labelledby={`safety-${section.id}`}
          >
            <h2
              id={`safety-${section.id}`}
              className="m-0 font-display text-2xl leading-tight md:text-3xl"
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0 mt-2 max-w-3xl text-slate-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <BookCta />
    </>
  );
}
