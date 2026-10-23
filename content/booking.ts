import { business } from "./business";

export const bookingTowns = ["Jacksonville", "Richlands", "Beulaville", "Other"] as const;
export const bookingDogCounts = ["1", "2", "3 or more"] as const;
export const bookingDogSizes = [
  "Under 25 lb",
  "25 to 60 lb",
  "60 to 90 lb",
  "Over 90 lb",
] as const;
export const bookingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const bookingTimes = ["Morning", "Midday", "Evening"] as const;

export type BookingTown = (typeof bookingTowns)[number];
export type BookingDogCount = (typeof bookingDogCounts)[number];
export type BookingDogSize = (typeof bookingDogSizes)[number];
export type BookingDay = (typeof bookingDays)[number];
export type BookingTime = (typeof bookingTimes)[number];

if (bookingTowns.slice(0, business.serviceTowns.length).join("|") !== business.serviceTowns.join("|")) {
  throw new Error("Booking towns must match the service towns.");
}

export const booking = {
  ownerEmail: "[OWNER EMAIL]",
  responseTime: "[RESPONSE TIME]",
  stepCount: 4,
  smsConsentLabel:
    "Text me reminders about my sessions. Message and data rates may apply. Reply STOP to opt out.",
  submitLabel: "Book my free session",
  backLabel: "Back",
  continueLabel: "Continue",
  loadingLabel: "Loading the booking form",
  sendingLabel: "Sending your request",
  thankYouHeading: "We got your request",
  callLabel: `Call ${business.phoneDisplay}`,
  textLabel: `Text ${business.phoneDisplay}`,
  phoneTel: `tel:${business.phoneE164}`,
  phoneSms: `sms:${business.phoneE164}`,
  notProvided: "Not provided",
  notSpecified: "Not specified",
  smsYes: "Yes",
  smsNo: "No",
  labels: {
    town: "Town",
    otherTown: "Your town",
    dogs: "Number of dogs",
    dogSize: "Dog size",
    days: "Preferred days",
    time: "Time of day",
    name: "Name",
    phone: "Mobile phone",
    email: "Email",
    breed: "Dog breed (optional)",
    notes: "Notes (optional)",
    sessionLength: "Session length",
    company: "Company",
  },
  errors: {
    town: "Choose your town.",
    otherTown: "Enter your town.",
    otherTownLength: "Town name is too long.",
    dogs: "Choose how many dogs.",
    dogSize: "Choose a dog size.",
    days: "Choose at least one day.",
    day: "Choose a day.",
    time: "Choose a time of day.",
    name: "Enter your name.",
    nameLength: "Name is too long.",
    phone: "Enter a 10 digit mobile number.",
    email: "Enter a valid email.",
    breedLength: "Breed is too long.",
    notesLength: "Notes are too long.",
    sessionLength: "Choose a session length.",
    sms: "Choose yes or no for text reminders.",
    timing: "Please wait a moment and try again.",
    spam: "We could not send that request. Please call us.",
    check: "Please check the form and try again.",
    read: "We could not read that request. Please try again.",
    send: `We could not send your request. Please call ${business.phoneDisplay}.`,
  },
} as const;

export function bookingProgress(step: number): string {
  return `Step ${step} of ${booking.stepCount}`;
}

export function bookingConfirmation(responseTime: string = booking.responseTime): string {
  return `Thanks, we got your request. We'll text or call within ${responseTime} to set your free session.`;
}

export function sessionLengthLine(minutes: number): string {
  return `Session length: ${minutes} minutes`;
}

export function sessionLengthValue(minutes: number): string {
  return `${minutes} minutes`;
}

const dash = /[\u2013\u2014]/;

function assertNoDash(value: string, label: string) {
  if (dash.test(value)) {
    throw new Error(`Em dash or en dash in booking copy: ${label}`);
  }
}

function walkCopy(value: unknown, label: string) {
  if (typeof value === "string") {
    assertNoDash(value, label);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkCopy(item, `${label}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      walkCopy(item, `${label}.${key}`);
    }
  }
}

walkCopy(booking, "booking");
walkCopy(bookingTowns, "bookingTowns");
walkCopy(bookingDogCounts, "bookingDogCounts");
walkCopy(bookingDogSizes, "bookingDogSizes");
walkCopy(bookingDays, "bookingDays");
walkCopy(bookingTimes, "bookingTimes");
assertNoDash(bookingConfirmation(), "bookingConfirmation");
assertNoDash(bookingProgress(1), "bookingProgress");
assertNoDash(sessionLengthLine(30), "sessionLengthLine");
