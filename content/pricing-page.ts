import { faqs } from "./faqs";
import { formatDollars } from "./money";
import { isPlaceholder } from "./placeholders";
import { isConfirmedPrice, pricing, type Pricing } from "./pricing";

const dash = /[\u2013\u2014]/;

function assertCopy(value: string, label: string): void {
  if (dash.test(value) || isPlaceholder(value)) {
    throw new Error(`Pricing page copy is not public: ${label}`);
  }
}

export const pricingPage = {
  pricesHeading: "Prices",
  builderHeading: "Build your price",
  policiesHeading: "Policies",
  lengthLegend: "Session length",
  dogsLegend: "Number of dogs",
  frequencyLegend: "Frequency",
  oneTime: "One time",
  monthly: "Monthly membership",
  minutes: "minutes",
  dog: "dog",
  dogs: "dogs",
  militaryToggle: "I'm active duty or a veteran",
  militaryApplied: "Military discount applied.",
  secondDogMonthlyNote: "The second dog price is added for each session in the month.",
  totalLabel: "Total",
  freeFirstSession: "Your first session is free.",
  bookThis: "Book this",
  secondDogTitle: "Second dog",
  secondDogDetail: "Added to the session price for a second dog in the same visit.",
  membershipTitle: "Monthly membership",
  militaryTitle: "Military discount",
  militaryAudience: "For active duty and veterans",
} as const;

for (const [label, value] of Object.entries(pricingPage)) {
  assertCopy(value, label);
}

export function pricingLeadSentence(source: Pricing = pricing): string {
  const thirty = source.sessions.find((session) => session.minutes === 30);
  if (!thirty || !isConfirmedPrice(thirty.price) || !Number.isFinite(thirty.price)) {
    throw new Error("The 30 minute session price is not confirmed.");
  }

  const price = formatDollars(thirty.price);
  const sentence = source.firstSessionFree
    ? `A ${thirty.minutes} minute mobile dog treadmill session in Jacksonville NC is ${price}, and your first session is free.`
    : `A ${thirty.minutes} minute mobile dog treadmill session in Jacksonville NC is ${price}.`;

  assertCopy(sentence, "lead");
  return sentence;
}

export function sessionLengthLabel(minutes: number): string {
  const label = `${minutes} minutes`;
  assertCopy(label, "session length");
  return label;
}

export function membershipDetail(sessionsPerMonth: number): string {
  const label = `${sessionsPerMonth} sessions a month`;
  assertCopy(label, "membership detail");
  return label;
}

export function militaryFigure(percent: number): string {
  if (!Number.isFinite(percent)) {
    throw new Error("Military discount is not a finite number.");
  }
  const label = `${percent}% off`;
  assertCopy(label, "military figure");
  return label;
}

export function travelFeeLine(town: string, amount: string): string {
  const line = `${town} travel fee: ${amount}`;
  assertCopy(line, "travel fee");
  return line;
}

export function lateCancelLine(amount: string): string {
  const line = `Late cancellation fee: ${amount}`;
  assertCopy(line, "late cancellation");
  return line;
}

export function paymentMethodsLine(): string | null {
  const payment = faqs.find((item) => item.id === "payment");
  if (!payment || isPlaceholder(payment.answer)) {
    return null;
  }
  assertCopy(payment.answer, "payment methods");
  return payment.answer;
}
