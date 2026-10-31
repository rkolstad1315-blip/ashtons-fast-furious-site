import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { SectionHeading } from "@/components/section-heading";
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
    <section className="faq-preview bg-slate-100" data-reveal aria-labelledby="faq-preview-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:py-24">
        <div>
          <SectionHeading id="faq-preview-heading" eyebrow={copy.eyebrow} title={copy.heading} />
          <Link
            href={copy.linkHref}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-navy no-underline hover:text-brand"
          >
            {copy.linkLabel}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="panel px-6 py-2">
          {items.map((faq) => (
            <details key={faq.id}>
              <summary>
                <span>{faq.question}</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
