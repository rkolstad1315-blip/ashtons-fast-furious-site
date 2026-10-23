import { assertMetaLength, assertNoDash } from "./copy-rules";
import { book } from "./shell";

export type LegalSection = {
  id: string;
  heading: string;
  body: string;
};

export type LegalDocument = {
  path: "/privacy-policy/" | "/terms/";
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: readonly LegalSection[];
  ctaLabel: string;
  ctaHref: string;
};

export const privacy: LegalDocument = {
  path: "/privacy-policy/",
  seoTitle: "Privacy Policy | Ashtons Fast & Fur-ious",
  description:
    "How Ashtons Fast & Fur-ious handles booking form data, email, SMS consent, and analytics.",
  h1: "Privacy Policy",
  intro:
    "This policy covers booking form data, email, SMS consent, and analytics for Ashtons Fast & Fur-ious.",
  sections: [
    {
      id: "form-data",
      heading: "Form data",
      body: "The booking form collects your town, how many dogs you have, dog size, preferred days, time of day, name, mobile phone, and email. Breed and notes are optional. We use those answers to schedule your session and reply to you.",
    },
    {
      id: "email",
      heading: "Email",
      body: "A booking request is emailed to info@ashtonsfastfurious.com. You also get a confirmation email at the address you entered.",
    },
    {
      id: "sms-consent",
      heading: "SMS consent",
      body: "SMS consent is optional and stays unchecked unless you choose it. If you opt in, reminders about your sessions may be texted to you. Message and data rates may apply, and you can reply STOP to opt out. We do not send those texts without SMS consent.",
    },
    {
      id: "analytics",
      heading: "Analytics",
      body: "Site analytics records which booking step you reach, when a request is submitted, and taps on phone, text, and the Google review link. We use analytics to see which pages lead to a booking.",
    },
  ],
  ctaLabel: "Book a free first session",
  ctaHref: book.href,
};

export const terms: LegalDocument = {
  path: "/terms/",
  seoTitle: "Terms | Ashtons Fast & Fur-ious",
  description:
    "Waiver summary, cancellation policy, and vaccination rules for Ashtons Fast & Fur-ious sessions.",
  h1: "Terms",
  intro:
    "The waiver summary, the cancellation policy, and the vaccination rules appear here once each one is confirmed.",
  sections: [
    {
      id: "waiver",
      heading: "Waiver summary",
      body: "[WAIVER TEXT, attorney reviewed]",
    },
    {
      id: "cancellation",
      heading: "Cancellation policy",
      body: "[CONFIRM]",
    },
    {
      id: "vaccinations",
      heading: "Vaccination rules",
      body: "[CONFIRM]",
    },
  ],
  ctaLabel: "Book a free first session",
  ctaHref: book.href,
};

assertNoDash({ privacy, terms }, "legal copy");
assertMetaLength(privacy.seoTitle, privacy.description, "Privacy");
assertMetaLength(terms.seoTitle, terms.description, "Terms");
