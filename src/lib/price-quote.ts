import { formatDollars } from "../../content/money";

export { formatDollars };

export type QuoteSession = {
  minutes: number;
  price: number;
};

export type QuoteMembership = {
  sessionsPerMonth: number;
  price: number;
};

export type QuoteCatalog = {
  sessions: readonly QuoteSession[];
  secondDogPrice: number | null;
  membership: QuoteMembership | null;
  militaryPercent: number | null;
  firstSessionFree: boolean;
};

export type QuoteFrequency = "once" | "monthly";

export type QuoteInput = {
  minutes: number;
  dogs: number;
  frequency: QuoteFrequency;
  military: boolean;
};

function toCents(amount: number): number {
  return Math.round(amount * 100);
}

// One time: session price, plus the second dog price for each extra dog.
// Monthly: membership price, plus the second dog price for each extra dog
// on every session included in the month.
// A confirmed military percent comes off that total, rounded to the nearest cent.
// A military flag with no confirmed percent does not change the total.
export function quoteTotal(catalog: QuoteCatalog, input: QuoteInput): number | null {
  if (input.dogs !== 1 && input.dogs !== 2) {
    return null;
  }

  const session = catalog.sessions.find((item) => item.minutes === input.minutes);
  if (!session || !Number.isFinite(session.price)) {
    return null;
  }

  const extraDogs = input.dogs - 1;
  if (extraDogs > 0 && (catalog.secondDogPrice == null || !Number.isFinite(catalog.secondDogPrice))) {
    return null;
  }

  let cents: number;
  if (input.frequency === "once") {
    cents = toCents(session.price);
    if (extraDogs > 0 && catalog.secondDogPrice != null) {
      cents += toCents(catalog.secondDogPrice) * extraDogs;
    }
  } else if (input.frequency === "monthly") {
    if (!catalog.membership || !Number.isFinite(catalog.membership.price)) {
      return null;
    }
    cents = toCents(catalog.membership.price);
    if (extraDogs > 0 && catalog.secondDogPrice != null) {
      const sessions = catalog.membership.sessionsPerMonth;
      if (!Number.isInteger(sessions) || sessions < 1) {
        return null;
      }
      cents += toCents(catalog.secondDogPrice) * extraDogs * sessions;
    }
  } else {
    return null;
  }

  if (input.military && catalog.militaryPercent != null) {
    if (!Number.isFinite(catalog.militaryPercent)) {
      return null;
    }
    cents = Math.round((cents * (100 - catalog.militaryPercent)) / 100);
  }

  if (cents < 0) {
    cents = 0;
  }

  return cents / 100;
}

export function bookHref(minutes: number, dogs: number): string {
  const params = new URLSearchParams({
    length: String(minutes),
    dogs: String(dogs),
  });
  return `/book/?${params.toString()}`;
}
