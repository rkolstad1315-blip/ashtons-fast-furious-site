import { business } from "./business";
import { getPage } from "./seo";
import { book } from "./shell";
import { towns } from "./towns";

export type HomeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type TrustItemId = "climate" | "supervised" | "harness" | "cleaned" | "insured";

export type WhoTileId =
  | "energy"
  | "reactive"
  | "heat"
  | "weight"
  | "military"
  | "senior";

const heroLines = [
  "Mobile Dog Treadmill Workouts",
  "in Jacksonville, NC",
] as const;

const heroH1 = heroLines.join(" ");

if (heroH1 !== getPage("/").h1) {
  throw new Error("Hero lines must match the home H1.");
}

const dash = /[\u2013\u2014]/;

const serviceAreaMapLabel =
  "Simplified map of Onslow and Duplin counties with Jacksonville, Richlands, and Beulaville.";

for (const town of towns) {
  if (!serviceAreaMapLabel.includes(town.displayName) || !serviceAreaMapLabel.includes(town.county)) {
    throw new Error(`Service area map label is missing ${town.displayName}, ${town.county}.`);
  }
}

export const home = {
  hero: {
    pill: `Now booking: ${business.serviceTowns.join(", ")}`,
    h1: heroH1,
    lines: heroLines,
    subhead:
      "Climate controlled, supervised workouts in your driveway. Your first session is free.",
    bookLabel: "Book a free first session",
    bookHref: book.href,
    phoneLabel: `Call or text ${business.phoneDisplay}`,
    phoneHref: `tel:${business.phoneE164}`,
    highlights: ["First session free", "Climate controlled unit", "Supervised every minute"],
    image: {
      src: "/brand/ashtons-logo-1080.webp",
      alt: "Ashtons Fast & Fur-ious Mobile Dog Gym logo with Ashton, a golden dog, and the mobile dog gym van",
      width: 1080,
      height: 1080,
    } satisfies HomeImage,
  },
  howItWorks: {
    eyebrow: "Three easy steps",
    heading: "How it works",
    steps: [
      {
        number: "01",
        title: "Book your free session",
        body: "The first session is free in Jacksonville, Richlands, and Beulaville.",
      },
      {
        number: "02",
        title: "We park in your driveway",
        body: "The climate controlled unit, with two dog treadmills, parks in your driveway.",
      },
      {
        number: "03",
        title: "Your dog runs 15 to 60 minutes while we supervise",
        body: "A person supervises every minute, and your dog is never tied by the neck.",
      },
    ],
  },
  trust: {
    eyebrow: "Safety first",
    heading: "How every session is handled",
    items: [
      { id: "climate", label: "Climate controlled" },
      { id: "supervised", label: "Supervised every minute" },
      { id: "harness", label: "Harnessed, never tied by the neck" },
      { id: "cleaned", label: "Cleaned between dogs" },
      { id: "insured", label: "Insured", whenInsured: true },
    ] as const satisfies ReadonlyArray<{
      id: TrustItemId;
      label: string;
      whenInsured?: boolean;
    }>,
    stats: {
      sessionsLabel: "Sessions run",
      dogsLabel: "Dogs served",
    },
  },
  who: {
    eyebrow: "A good fit for",
    heading: "Who it's for",
    tiles: [
      {
        id: "energy",
        heading: "High energy and working breeds",
        body: "A harder workout than a walk for Malinois, German Shepherd, and Husky dogs.",
      },
      {
        id: "reactive",
        heading: "Reactive or anxious dogs",
        body: "A driveway workout instead of a crowded park or daycare.",
      },
      {
        id: "heat",
        heading: "Dogs stuck inside in summer heat",
        body: "The unit stays climate controlled when summer heat keeps a dog indoors.",
      },
      {
        id: "weight",
        heading: "Weight management",
        body: "Extra treadmill time between walks for dogs that need more exercise.",
      },
      {
        id: "military",
        heading: "Busy and military households",
        body: "A driveway session for busy homes, including families near Camp Lejeune.",
      },
      {
        id: "senior",
        heading: "Senior dogs with vet clearance",
        body: "Senior dogs run only after a vet has cleared the workout.",
      },
    ] as const satisfies ReadonlyArray<{
      id: WhoTileId;
      heading: string;
      body: string;
    }>,
  },
  pricingPreview: {
    eyebrow: "Simple pricing",
    heading: "Pricing",
    linkLabel: "See all prices",
    linkHref: "/pricing/",
    mostPopular: "Most popular",
    freeTitle: "Free first session",
    freePrice: "Free",
    minuteSession: "minute session",
    membershipTitle: "Monthly membership",
    sessionsAMonth: "sessions a month",
  },
  reviewsPreview: {
    heading: "Reviews",
    googleLinkLabel: "Read all reviews on Google",
  },
  faqPreview: {
    eyebrow: "Good to know",
    heading: "Common questions",
    linkLabel: "See all questions",
    linkHref: "/faq/",
    questionIds: ["safe", "how-long", "will-my-dog-like-it", "what-it-costs"] as const,
  },
  serviceArea: {
    eyebrow: "Where we go",
    heading: "Service area",
    mapLabel: serviceAreaMapLabel,
    alsoServing: "Also serving on request",
  },
  bookingTeaser: {
    heading: "Book your dog's free first session",
    body: "We bring the climate controlled unit to your driveway.",
    buttonLabel: "Book a free first session",
    buttonHref: book.href,
    phoneLabel: `Call or text ${business.phoneDisplay}`,
    phoneHref: `tel:${business.phoneE164}`,
  },
};

if (dash.test(JSON.stringify(home))) {
  throw new Error("Em dash or en dash in homepage copy.");
}
