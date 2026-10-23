import { militaryDiscountBody, militaryPage } from "../../../content/military";
import { pricing } from "../../../content/pricing";
import { getPage } from "../../../content/seo";
import { confirmedCopy } from "@/lib/confirmed-copy";
import { BookCta, PageFrame, PageH1, TextSection } from "./page-frame";

function discountBody(): string | null {
  const discount = pricing.militaryDiscountPercent;
  if (!discount.enabled || typeof discount.value !== "number") {
    return null;
  }
  return militaryDiscountBody(discount.value);
}

export function MilitaryPage() {
  const page = getPage("/military-families/");

  return (
    <PageFrame>
      <PageH1 id="military-heading">{page.h1}</PageH1>
      <TextSection
        id="military-discount"
        heading={militaryPage.discountHeading}
        body={discountBody()}
      />
      <TextSection
        id="military-scheduling"
        heading={militaryPage.schedulingHeading}
        body={confirmedCopy(militaryPage.schedulingBody)}
      />
      <TextSection
        id="military-base"
        heading={militaryPage.baseHeading}
        body={confirmedCopy(militaryPage.baseBody)}
      />
      <BookCta href={militaryPage.ctaHref} label={militaryPage.ctaLabel} />
    </PageFrame>
  );
}
