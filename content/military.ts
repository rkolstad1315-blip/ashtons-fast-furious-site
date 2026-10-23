import { assertNoDash } from "./copy-rules";
import { book } from "./shell";

export type MilitaryPageContent = {
  schedulingHeading: string;
  schedulingBody: string;
  discountHeading: string;
  baseHeading: string;
  baseBody: string;
  ctaLabel: string;
  ctaHref: string;
};

export const militaryPage: MilitaryPageContent = {
  schedulingHeading: "Deployment and PCS scheduling",
  schedulingBody: "Sessions can be scheduled around deployment and PCS dates.",
  discountHeading: "Military discount",
  baseHeading: "Base housing access",
  baseBody: "[CONFIRM]",
  ctaLabel: "Book a free first session",
  ctaHref: book.href,
};

export function militaryDiscountBody(percent: number): string {
  return `The military discount takes ${percent} percent off a session.`;
}

assertNoDash(militaryPage, "military page copy");
