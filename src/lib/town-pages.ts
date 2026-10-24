import { home } from "../../content/home";
import { isPlaceholder } from "../../content/placeholders";
import type { Review } from "../../content/reviews";
import type { PagePath } from "../../content/seo";
import { hubOnlyTowns, towns, type Town } from "../../content/towns";

const factKeys = [
  "neighborhoods",
  "routeDays",
  "localNote",
  "photo",
  "reviews",
  "faqs",
] as const;

export type TownFact = (typeof factKeys)[number];

export type TownFactReport = {
  confirmed: TownFact[];
  missing: TownFact[];
  indexable: boolean;
};

const minimumConfirmedFacts = 4;
const dash = /[\u2013\u2014]/;

function confirmedText(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && !isPlaceholder(trimmed);
}

function reviewMatchesTown(review: Review, town: Town): boolean {
  return review.town.toLowerCase().includes(town.displayName.toLowerCase());
}

export function visibleReviews(town: Town): Review[] {
  return town.reviews
    .filter((review) => reviewMatchesTown(review, town))
    .filter((review) => confirmedText(review.name) && confirmedText(review.text))
    .slice(0, 2);
}

function factConfirmed(town: Town, fact: TownFact): boolean {
  switch (fact) {
    case "neighborhoods":
      return town.neighborhoods.length > 0 && town.neighborhoods.every(confirmedText);
    case "routeDays":
      return confirmedText(town.routeDays);
    case "localNote":
      return confirmedText(town.localNote);
    case "photo":
      return confirmedText(town.photoPath) && town.photoPath.startsWith("/");
    case "reviews":
      return visibleReviews(town).length > 0;
    case "faqs":
      return (
        town.faqs.length >= 3 &&
        town.faqs.every(
          (faq) => confirmedText(faq.question) && confirmedText(faq.answer),
        )
      );
  }
}

export function assessTown(town: Town): TownFactReport {
  const confirmed = factKeys.filter((fact) => factConfirmed(town, fact));
  const missing = factKeys.filter((fact) => !confirmed.includes(fact));
  return {
    confirmed,
    missing,
    indexable: confirmed.length >= minimumConfirmedFacts,
  };
}

export function getTown(slug: string): Town | undefined {
  return towns.find((town) => town.slug === slug);
}

export function townPath(slug: Town["slug"]): PagePath {
  switch (slug) {
    case "jacksonville-nc":
      return "/service-areas/jacksonville-nc/";
    case "richlands-nc":
      return "/service-areas/richlands-nc/";
    case "beulaville-nc":
      return "/service-areas/beulaville-nc/";
  }
}

export function townBookHref(slug: Town["slug"]): string {
  return `/book/?town=${slug}`;
}

export const bookLabel = home.hero.bookLabel;

const warnedTowns = new Set<string>();

export function warnThinTownPages(): readonly string[] {
  const noindex: string[] = [];

  for (const town of towns) {
    const report = assessTown(town);
    const path = townPath(town.slug);
    if (report.indexable) {
      continue;
    }
    noindex.push(path);
    if (warnedTowns.has(town.slug)) {
      continue;
    }
    warnedTowns.add(town.slug);
    const confirmed =
      report.confirmed.length > 0 ? report.confirmed.join(", ") : "none";
    console.warn(
      `[town-guard] noindex ${path}: ${report.confirmed.length} of ${factKeys.length} confirmed unique facts (${confirmed}). Unconfirmed: ${report.missing.join(", ")}.`,
    );
  }

  return noindex;
}

export const noindexTownPaths: readonly string[] = towns
  .filter((town) => !assessTown(town).indexable)
  .map((town) => townPath(town.slug));

function joinList(items: readonly string[]): string {
  if (items.length <= 1) {
    return items[0] ?? "";
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function feeAmount(town: Town): string {
  return typeof town.travelFee === "number" ? `$${town.travelFee}` : town.travelFee;
}

export type TownPageCopy = {
  intro: string;
  neighborhoodsHeading: string;
  routeHeading: string;
  routeBody: string;
  feeHeading: string;
  feeBody: string;
  noteHeading: string;
  noteBody: string;
  photoHeading: string;
  photoLabel: string;
  photoAlt: string;
  reviewsHeading: string;
  faqsHeading: string;
  backLabel: string;
};

export function townPageCopy(town: Town): TownPageCopy {
  const fee = feeAmount(town);
  const photoLabel = confirmedText(town.photoPath)
    ? `Photo taken in ${town.displayName}, ${town.county} County.`
    : `${town.displayName} photo: ${town.photoPath}`;
  const noteBody = confirmedText(town.localNote)
    ? town.localNote
    : `${town.displayName} local note: ${town.localNote}`;

  switch (town.id) {
    case "jacksonville":
      return {
        intro: `${town.displayName} is in ${town.county} County.`,
        neighborhoodsHeading: `Neighborhoods served in ${town.displayName}`,
        routeHeading: `Route days for ${town.displayName}`,
        routeBody: `${town.displayName} route days: ${town.routeDays}.`,
        feeHeading: `Travel fee in ${town.displayName}`,
        feeBody: `Travel fee for a ${town.displayName} driveway visit: ${fee}.`,
        noteHeading: `Local note for ${town.displayName}`,
        noteBody,
        photoHeading: `Town photo, ${town.displayName}`,
        photoLabel,
        photoAlt: `Mobile dog gym visit in ${town.displayName}, NC`,
        reviewsHeading: `Reviews from ${town.displayName} customers`,
        faqsHeading: `Questions about service in ${town.displayName}`,
        backLabel: `All towns, not only ${town.displayName}`,
      };
    case "richlands":
      return {
        intro: `${town.county} County is where the ${town.displayName} visits happen.`,
        neighborhoodsHeading: `Where ${town.displayName} coverage reaches`,
        routeHeading: `Which days include ${town.displayName}`,
        routeBody: `Days the unit is scheduled in ${town.displayName}: ${town.routeDays}.`,
        feeHeading: `What a ${town.displayName} trip adds`,
        feeBody: `${town.displayName} bookings carry a travel fee of ${fee}.`,
        noteHeading: `Open detail for ${town.displayName}`,
        noteBody,
        photoHeading: `${town.displayName} photo`,
        photoLabel,
        photoAlt: `Mobile dog gym visit in ${town.displayName}, NC`,
        reviewsHeading: `What ${town.displayName} owners wrote`,
        faqsHeading: `${town.displayName} questions`,
        backLabel: `Back to the town list from ${town.displayName}`,
      };
    case "beulaville":
      return {
        intro: `Visits in ${town.displayName} are the ${town.county} County part of the route.`,
        neighborhoodsHeading: `${town.displayName} areas on the list`,
        routeHeading: `${town.displayName} schedule`,
        routeBody: `${town.displayName} route days are ${town.routeDays}.`,
        feeHeading: `Cost to travel to ${town.displayName}`,
        feeBody: `The added travel fee to reach ${town.displayName} is ${fee}.`,
        noteHeading: `Setting for ${town.displayName}`,
        noteBody,
        photoHeading: `Picture from ${town.displayName}`,
        photoLabel,
        photoAlt: `Mobile dog gym visit in ${town.displayName}, NC`,
        reviewsHeading: `${town.displayName} customer notes`,
        faqsHeading: `Asked about ${town.displayName}`,
        backLabel: `Service areas outside ${town.displayName}`,
      };
  }
}

export function hubCountyBlurb(list: readonly Town[]): string {
  const order: string[] = [];
  const grouped = new Map<string, string[]>();

  for (const town of list) {
    const names = grouped.get(town.county);
    if (names) {
      names.push(town.displayName);
    } else {
      grouped.set(town.county, [town.displayName]);
      order.push(town.county);
    }
  }

  return order
    .map((county) => {
      const names = grouped.get(county) ?? [];
      const joined = joinList(names);
      return names.length === 1
        ? `${joined} is in ${county} County.`
        : `${joined} are in ${county} County.`;
    })
    .join(" ");
}

export function cardRouteLine(town: Town): string {
  return `${town.displayName} route days: ${town.routeDays}.`;
}

function alsoServingLine(places: readonly { name: string }[]): string {
  const names = places.map((place) => place.name);
  if (names.length === 0) {
    return "";
  }
  if (names.length === 1) {
    return `Also serving ${names[0]} on request.`;
  }
  const last = names[names.length - 1];
  return `Also serving ${names.slice(0, -1).join(", ")}, and ${last} on request.`;
}

export const hubAlsoServingLine = alsoServingLine(hubOnlyTowns);

function textBlocks(town: Town): string[] {
  const copy = townPageCopy(town);
  const reviews = visibleReviews(town);
  return [
    copy.intro,
    copy.neighborhoodsHeading,
    ...town.neighborhoods,
    copy.routeHeading,
    copy.routeBody,
    copy.feeHeading,
    copy.feeBody,
    copy.noteHeading,
    copy.noteBody,
    copy.photoHeading,
    copy.photoLabel,
    ...(reviews.length > 0
      ? [
          copy.reviewsHeading,
          ...reviews.flatMap((review) => [review.name, review.town, review.text, review.date]),
        ]
      : []),
    copy.faqsHeading,
    ...town.faqs.slice(0, 3).flatMap((faq) => [faq.question, faq.answer]),
    copy.backLabel,
  ];
}

function sentencesOf(blocks: readonly string[]): string[] {
  return blocks.flatMap((block) =>
    block
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0),
  );
}

function assertNoDashes(blocks: readonly string[], label: string): void {
  for (const block of blocks) {
    if (dash.test(block)) {
      throw new Error(`Em dash or en dash in ${label}: ${block}`);
    }
  }
}

function assertTownPagesDiffer(): void {
  const byTown = new Map<string, string[]>();
  for (const town of towns) {
    const blocks = textBlocks(town);
    assertNoDashes(blocks, town.slug);
    byTown.set(town.slug, sentencesOf(blocks));
  }

  const counts = new Map<string, number>();
  for (const sentences of byTown.values()) {
    for (const sentence of new Set(sentences)) {
      counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
    }
  }

  let shared = 0;
  let total = 0;
  for (const sentences of byTown.values()) {
    for (const sentence of sentences) {
      total += 1;
      if ((counts.get(sentence) ?? 0) > 1) {
        shared += 1;
      }
    }
  }

  if (total > 0 && shared / total > 0.4) {
    throw new Error(
      `Town pages share too much copy (${shared} of ${total} sentences match).`,
    );
  }
}

if (hubAlsoServingLine !== "Also serving Hubert, Sneads Ferry, and Swansboro on request.") {
  throw new Error(`Hub also-serving line drifted: ${hubAlsoServingLine}`);
}

assertNoDashes([hubCountyBlurb(towns), hubAlsoServingLine, bookLabel], "service area hub");
assertTownPagesDiffer();
