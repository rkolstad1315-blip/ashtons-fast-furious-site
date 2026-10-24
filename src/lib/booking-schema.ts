// zod/mini keeps the booking form's lazy chunk small: it is tree shakeable,
// so only the checks used here ship to the browser. The API route shares it.
import * as z from "zod/mini";
import {
  booking,
  bookingDays,
  bookingDogCounts,
  bookingDogSizes,
  bookingTimes,
  bookingTowns,
  type BookingDogCount,
  type BookingTown,
} from "../../content/booking";
import { pricing } from "../../content/pricing";

const sessionLengths = pricing.sessions.map((session) => session.minutes);

const MIN_TIME_ON_PAGE_MS = 1000;
const MAX_TIME_ON_PAGE_MS = 24 * 60 * 60 * 1000;

const townField = z.enum(bookingTowns, booking.errors.town);
const dogCountField = z.enum(bookingDogCounts, booking.errors.dogs);
const dogSizeField = z.enum(bookingDogSizes, booking.errors.dogSize);
const dayField = z.enum(bookingDays, booking.errors.day);
const timeField = z.enum(bookingTimes, booking.errors.time);

const otherTownField = z
  .string()
  .check(z.trim(), z.maxLength(80, booking.errors.otherTownLength));

const requireOtherTown = z.superRefine<{ town: string; otherTown: string }>((value, ctx) => {
  if (value.town === "Other" && value.otherTown.trim().length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["otherTown"],
      message: booking.errors.otherTown,
      input: value.otherTown,
    });
  }
});

const nameField = z
  .string()
  .check(
    z.trim(),
    z.minLength(1, booking.errors.name),
    z.maxLength(80, booking.errors.nameLength),
  );
const phoneField = z.string().check(z.regex(/^\d{10}$/, booking.errors.phone));
const emailField = z.pipe(z.string().check(z.trim()), z.email(booking.errors.email));
const breedField = z.string().check(z.trim(), z.maxLength(80, booking.errors.breedLength));
const notesField = z.string().check(z.trim(), z.maxLength(1000, booking.errors.notesLength));
const smsField = z.boolean(booking.errors.sms);
const daysField = z.array(dayField).check(z.minLength(1, booking.errors.days));

export const step1Schema = z
  .object({
    town: townField,
    otherTown: otherTownField,
  })
  .check(requireOtherTown);

export const step2Schema = z.object({
  dogs: dogCountField,
  dogSize: dogSizeField,
});

export const step3Schema = z.object({
  days: daysField,
  time: timeField,
});

export const step4Schema = z.object({
  name: nameField,
  phone: phoneField,
  email: emailField,
  breed: breedField,
  notes: notesField,
  smsConsent: smsField,
});

export const bookingSchema = z
  .object({
    town: townField,
    otherTown: otherTownField,
    dogs: dogCountField,
    dogSize: dogSizeField,
    days: daysField,
    time: timeField,
    name: nameField,
    phone: phoneField,
    email: emailField,
    breed: breedField,
    notes: notesField,
    smsConsent: smsField,
    sessionLength: z
      .nullable(z.int())
      .check(
        z.refine(
          (value) => value === null || sessionLengths.includes(value),
          booking.errors.sessionLength,
        ),
      ),
    company: z._default(z.optional(z.string().check(z.maxLength(200))), ""),
    startedAt: z.int(),
  })
  .check(requireOtherTown);

export type BookingPayload = z.output<typeof bookingSchema>;

export function fieldErrorsFrom(error: z.core.$ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : "form";
    if (!fields[key]) {
      fields[key] = issue.message;
    }
  }
  return fields;
}

export function timeOnPageError(startedAt: number, now = Date.now()): string | null {
  const elapsed = now - startedAt;
  if (elapsed < MIN_TIME_ON_PAGE_MS || elapsed > MAX_TIME_ON_PAGE_MS) {
    return booking.errors.timing;
  }
  return null;
}

export function parseDogCount(value: string | null | undefined): BookingDogCount | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().toLowerCase();
  if (normalized === "1") {
    return "1";
  }
  if (normalized === "2") {
    return "2";
  }
  if (normalized === "3" || normalized === "3+" || normalized === "3 or more") {
    return "3 or more";
  }
  const asNumber = Number(normalized);
  if (asNumber === 1) {
    return "1";
  }
  if (asNumber === 2) {
    return "2";
  }
  if (Number.isInteger(asNumber) && asNumber >= 3) {
    return "3 or more";
  }
  return null;
}

export function parseSessionLength(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const minutes = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(minutes)) {
    return null;
  }
  return sessionLengths.includes(minutes) ? minutes : null;
}

export function parseTown(value: string | null | undefined): BookingTown | null {
  if (!value) {
    return null;
  }
  // Town pages link with their slug, for example richlands-nc.
  const name = value.trim().toLowerCase().replace(/-nc$/, "");
  return bookingTowns.find((town) => town.toLowerCase() === name) ?? null;
}
