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
    phoneLabel: `or call or text ${business.phoneDisplay}`,
    phoneHref: `tel:${business.phoneE164}`,
    image: {
      src: "/images/hero-dog-treadmill.avif",
      alt: "Placeholder illustration of a dog on a treadmill in the mobile unit",
      width: 1600,
      height: 1000,
    } satisfies HomeImage,
  },
  howItWorks: {
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
    heading: "Who it's for",
    tiles: [
      {
        id: "energy",
        size: "large",
        heading: "High energy and working breeds",
        body: "A harder workout than a walk for Malinois, German Shepherd, and Husky dogs.",
        image: {
          src: "/images/who-working-breeds.avif",
          alt: "Placeholder illustration of a high energy dog on a treadmill",
          width: 1200,
          height: 900,
        } satisfies HomeImage,
      },
      {
        id: "reactive",
        size: "small",
        heading: "Reactive or anxious dogs",
        body: "A driveway workout instead of a crowded park or daycare.",
        image: {
          src: "/images/who-reactive-dogs.avif",
          alt: "Placeholder illustration of one dog working out in a driveway unit",
          width: 800,
          height: 600,
        } satisfies HomeImage,
      },
      {
        id: "heat",
        size: "small",
        heading: "Dogs stuck inside in summer heat",
        body: "The unit stays climate controlled when summer heat keeps a dog indoors.",
        image: {
          src: "/images/who-summer-heat.avif",
          alt: "Placeholder illustration of a dog inside the climate controlled unit",
          width: 800,
          height: 600,
        } satisfies HomeImage,
      },
      {
        id: "weight",
        size: "small",
        heading: "Weight management",
        body: "Extra treadmill time between walks for dogs that need more exercise.",
        image: {
          src: "/images/who-weight.avif",
          alt: "Placeholder illustration of a dog on a treadmill between walks",
          width: 800,
          height: 600,
        } satisfies HomeImage,
      },
      {
        id: "military",
        size: "small",
        heading: "Busy and military households",
        body: "A driveway session for busy homes, including families near Camp Lejeune.",
        image: {
          src: "/images/who-busy-households.avif",
          alt: "Placeholder illustration of a mobile dog treadmill unit at a home",
          width: 800,
          height: 600,
        } satisfies HomeImage,
      },
      {
        id: "senior",
        size: "large",
        heading: "Senior dogs with vet clearance",
        body: "Senior dogs run only after a vet has cleared the workout.",
        image: {
          src: "/images/who-senior-dogs.avif",
          alt: "Placeholder illustration of a senior dog on a treadmill with a handler",
          width: 1400,
          height: 700,
        } satisfies HomeImage,
      },
    ] as const satisfies ReadonlyArray<{
      id: WhoTileId;
      size: "large" | "small";
      heading: string;
      body: string;
      image: HomeImage;
    }>,
  },
  pricingPreview: {
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
    heading: "Common questions",
    linkLabel: "See all questions",
    linkHref: "/faq/",
    questionIds: ["safe", "how-long", "will-my-dog-like-it", "what-it-costs"] as const,
  },
  serviceArea: {
    heading: "Service area",
    mapLabel: serviceAreaMapLabel,
    alsoServing: "Also serving on request",
  },
  bookingTeaser: {
    heading: "Book your dog's free first session",
    body: "We bring the climate controlled unit to your driveway.",
    buttonLabel: "Book a free first session",
    buttonHref: book.href,
  },
};

if (dash.test(JSON.stringify(home))) {
  throw new Error("Em dash or en dash in homepage copy.");
}
