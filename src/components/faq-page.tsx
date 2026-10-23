import { faqPageCopy, faqPageSchema, visibleFaqGroups } from "../../content/faq-page";
import { getPage } from "../../content/seo";
import { BookCta } from "./book-cta";
import { PageHeader } from "./page-header";

export function FaqPage() {
  const page = getPage("/faq/");
  const groups = visibleFaqGroups();
  const schema = faqPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader title={page.h1} lede={faqPageCopy.lede} />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 md:py-16">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`faq-${group.id}`}>
            <h2
              id={`faq-${group.id}`}
              className="m-0 font-display text-3xl leading-none md:text-4xl"
            >
              {group.heading}
            </h2>
            <div className="mt-4 border-t border-slate-200">
              {group.items.map((item) => (
                <details key={item.id} className="group border-b border-slate-200">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </summary>
                  <p className="m-0 max-w-3xl pb-4 text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
      <BookCta />
    </>
  );
}
