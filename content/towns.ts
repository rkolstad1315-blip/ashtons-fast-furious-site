import { pricing } from "./pricing";
import type { Review } from "./reviews";

export type TownFaq = {
  question: string;
  answer: string;
};

export type Town = {
  id: "jacksonville" | "richlands" | "beulaville";
  slug: "jacksonville-nc" | "richlands-nc" | "beulaville-nc";
  displayName: string;
  county: "Onslow" | "Duplin";
  neighborhoods: readonly string[];
  routeDays: "[CONFIRM]";
  travelFee: (typeof pricing.travelFees)[number]["fee"];
  localNote: string;
  faqs: readonly TownFaq[];
  reviews: readonly Review[];
  photoPath: "[CONFIRM]";
};

export type HubOnlyTown = {
  name: "Hubert" | "Sneads Ferry" | "Swansboro";
  hubOnly: true;
};

function travelFeeFor(slug: Town["slug"]): Town["travelFee"] {
  const match = pricing.travelFees.find((fee) => fee.slug === slug);
  if (!match) {
    return "[FEE]";
  }
  return match.fee;
}

function townFaqs(townName: string, neighborhoods: string): readonly TownFaq[] {
  return [
    {
      question: `Which neighborhoods do you serve in ${townName}?`,
      answer: neighborhoods,
    },
    {
      question: `Which days do you come to ${townName}?`,
      answer: `Route days in ${townName} are [CONFIRM].`,
    },
    {
      question: `Is there a travel fee for ${townName}?`,
      answer: `The travel fee for ${townName} is [FEE].`,
    },
  ];
}

export const jacksonville: Town = {
  id: "jacksonville",
  slug: "jacksonville-nc",
  displayName: "Jacksonville",
  county: "Onslow",
  neighborhoods: ["Piney Green", "Half Moon", "Midway Park"],
  routeDays: "[CONFIRM]",
  travelFee: travelFeeFor("jacksonville-nc"),
  localNote: "Apartment dogs in Jacksonville.",
  faqs: townFaqs(
    "Jacksonville",
    "We serve Piney Green, Half Moon, and Midway Park.",
  ),
  reviews: [],
  photoPath: "[CONFIRM]",
};

export const richlands: Town = {
  id: "richlands",
  slug: "richlands-nc",
  displayName: "Richlands",
  county: "Onslow",
  neighborhoods: ["Pumpkin Center"],
  routeDays: "[CONFIRM]",
  travelFee: travelFeeFor("richlands-nc"),
  localNote: "[CONFIRM]",
  faqs: townFaqs("Richlands", "We serve Pumpkin Center."),
  reviews: [],
  photoPath: "[CONFIRM]",
};

export const beulaville: Town = {
  id: "beulaville",
  slug: "beulaville-nc",
  displayName: "Beulaville",
  county: "Duplin",
  neighborhoods: ["[CONFIRM]"],
  routeDays: "[CONFIRM]",
  travelFee: travelFeeFor("beulaville-nc"),
  localNote: "Rural roads with few sidewalks in Duplin County.",
  faqs: townFaqs("Beulaville", "Neighborhoods in Beulaville are [CONFIRM]."),
  reviews: [],
  photoPath: "[CONFIRM]",
};

export const towns: readonly Town[] = [jacksonville, richlands, beulaville];

export const hubOnlyTowns: readonly HubOnlyTown[] = [
  { name: "Hubert", hubOnly: true },
  { name: "Sneads Ferry", hubOnly: true },
  { name: "Swansboro", hubOnly: true },
];
