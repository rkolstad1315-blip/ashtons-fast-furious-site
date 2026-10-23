import { business } from "./business";
import { assertVisitorCopy } from "./copy-guards";
import { isConfirmedPrice, pricing } from "./pricing";

export const comparisonColumnIds = ["ashtons", "daycare", "walker"] as const;

export type ComparisonColumnId = (typeof comparisonColumnIds)[number];

export type ComparisonCells = Record<ComparisonColumnId, string>;

export type ComparisonColumn = {
  id: ComparisonColumnId;
  label: string;
};

export type ComparisonRow = {
  id: string;
  label: string;
  cells: ComparisonCells;
};

function townList(towns: readonly string[]): string {
  if (towns.length < 2) {
    return towns.join("");
  }
  const last = towns[towns.length - 1];
  return `${towns.slice(0, -1).join(", ")}, and ${last}`;
}

function ashtonsPrice(): string {
  const sentences: string[] = [];
  for (const session of pricing.sessions) {
    if (isConfirmedPrice(session.price)) {
      sentences.push(`${session.minutes} minutes is $${session.price}.`);
    }
  }
  if (pricing.firstSessionFree) {
    sentences.push("First session is free.");
  }
  if (sentences.length === 0) {
    throw new Error("The daycare comparison needs a confirmed Ashtons price.");
  }
  return sentences.join(" ");
}

const otherPrice = "varies";

export const daycarePage = {
  opening: `There is no drop off, no crowd, and no kennel stress. Your dog gets focused exercise in 30 minutes in your own driveway. The unit parks at homes in ${townList(business.serviceTowns)}, NC.`,
  reactive: {
    heading: "Reactive and anxious dogs",
    body: "A reactive or anxious dog works in your driveway instead of a crowded park. There is no drop off and no group of unfamiliar dogs.",
  },
  compareHeading: "How it compares",
  columns: [
    { id: "ashtons", label: "Ashtons" },
    { id: "daycare", label: "Doggy daycare" },
    { id: "walker", label: "Dog walker" },
  ] as const satisfies readonly ComparisonColumn[],
  rows: [
    {
      id: "where",
      label: "Where it happens",
      cells: {
        ashtons: "In your driveway, inside the climate controlled unit.",
        daycare: "At a daycare facility.",
        walker: "On a walk, away from your driveway.",
      },
    },
    {
      id: "time",
      label: "Time for you",
      cells: {
        ashtons: "You stay home for a 15 to 60 minute session.",
        daycare: "You drop your dog off for a longer visit.",
        walker: "You hand your dog off for a walk.",
      },
    },
    {
      id: "dogs",
      label: "Other dogs around",
      cells: {
        ashtons: "No crowd. Your own dogs can use the two treadmills.",
        daycare: "A group of other dogs.",
        walker: "Often other dogs on the walk.",
      },
    },
    {
      id: "weather",
      label: "Weather",
      cells: {
        ashtons: "Inside the climate controlled unit.",
        daycare: "Indoors at a facility.",
        walker: "Outside in the weather.",
      },
    },
    {
      id: "intensity",
      label: "Exercise intensity",
      cells: {
        ashtons: "Focused treadmill exercise.",
        daycare: "Group play with the dogs in that visit.",
        walker: "A walk.",
      },
    },
    {
      id: "best",
      label: "Best for",
      cells: {
        ashtons: "Dogs that need a focused workout, including reactive or anxious dogs.",
        daycare: "Dogs that do well around other dogs.",
        walker: "Dogs that need a walk away from the driveway.",
      },
    },
    {
      id: "price",
      label: "Price",
      cells: {
        ashtons: ashtonsPrice(),
        daycare: otherPrice,
        walker: otherPrice,
      },
    },
  ] as const satisfies readonly ComparisonRow[],
};

const callsUsDaycare =
  /ashtons is a daycare|ashtons daycare|our daycare|ashtons,\s+a daycare/i;

if (callsUsDaycare.test(JSON.stringify(daycarePage))) {
  throw new Error("Daycare page calls Ashtons a daycare.");
}

const priceRow = daycarePage.rows.find((row) => row.id === "price");
if (!priceRow || priceRow.cells.daycare !== "varies" || priceRow.cells.walker !== "varies") {
  throw new Error("Other comparison prices must use the word varies.");
}

const thirty = pricing.sessions.find((session) => session.minutes === 30);
if (!thirty || !isConfirmedPrice(thirty.price) || !priceRow.cells.ashtons.includes(`$${thirty.price}`)) {
  throw new Error("Ashtons comparison price is missing the confirmed 30 minute price.");
}

assertVisitorCopy(daycarePage, "daycare page");
