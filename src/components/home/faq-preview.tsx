import Link from "next/link";
import { faqs } from "../../../content/faqs";
import { home } from "../../../content/home";

export function FaqPreview() {
  const copy = home.faqPreview;
  const items = copy.questionIds.map((id) => {
    const faq = faqs.find((item) => item.id === id);
    if (!faq) {
      throw new Error(`Homepage FAQ preview is missing "${id}".`);
    }
    return faq;
  });

  return (
    <section className="faq-preview border-t border-slate-200 bg-white" aria-labelledby="faq-preview-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="faq-preview-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {copy.heading}
        </h2>
        <div className="mt-8 border-t border-slate-200">
          {items.map((faq) => (
            <details key={faq.id}>
              <summary>
                <span>{faq.question}</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <Link
          href={copy.linkHref}
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4"
        >
          {copy.linkLabel}
        </Link>
      </div>
    </section>
  );
}
