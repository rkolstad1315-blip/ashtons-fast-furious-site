import { assertVisitorCopy } from "./copy-guards";
import { isConfirmedPrice, pricing } from "./pricing";
import { book } from "./shell";

function ctaBody(): string {
  const thirty = pricing.sessions.find((session) => session.minutes === 30);
  const price = thirty && isConfirmedPrice(thirty.price) ? `$${thirty.price}` : null;

  if (pricing.firstSessionFree && price) {
    return `Your first session is free. A 30 minute session is ${price} after that.`;
  }
  if (price) {
    return `A 30 minute session is ${price}.`;
  }
  return "Book a session in Jacksonville, Richlands, or Beulaville.";
}

export const pageCta = {
  heading: pricing.firstSessionFree ? "Book your free first session" : "Book a session",
  body: ctaBody(),
  label: pricing.firstSessionFree ? "Book a free first session" : "Book a session",
  href: book.href,
};

assertVisitorCopy(pageCta, "page CTA");
