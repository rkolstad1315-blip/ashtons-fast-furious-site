import type { LegalDocument } from "../../../content/legal";
import { confirmedCopy } from "@/lib/confirmed-copy";
import { BookCta, PageFrame, PageH1, TextSection } from "./page-frame";

export function LegalPage({ document }: { document: LegalDocument }) {
  const intro = confirmedCopy(document.intro);
  const headingId = document.path === "/privacy-policy/" ? "privacy-heading" : "terms-heading";

  return (
    <PageFrame>
      <PageH1 id={headingId}>{document.h1}</PageH1>
      {intro ? <p className="m-0 mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{intro}</p> : null}
      {document.sections.map((section) => (
        <TextSection
          key={section.id}
          id={section.id}
          heading={section.heading}
          body={confirmedCopy(section.body)}
        />
      ))}
      <BookCta href={document.ctaHref} label={document.ctaLabel} />
    </PageFrame>
  );
}
