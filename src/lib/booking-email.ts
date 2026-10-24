import { business } from "../../content/business";
import {
  booking,
  bookingConfirmation,
  sessionLengthValue,
} from "../../content/booking";
import { isPlaceholder } from "../../content/placeholders";
import type { BookingPayload } from "./booking-schema";
import { formatPhone } from "./phone";

export type EmailRow = {
  label: string;
  value: string;
};

export function resolveOwnerEmail(): string {
  const fromEnv = process.env.OWNER_EMAIL?.trim();
  if (fromEnv && !isPlaceholder(fromEnv) && fromEnv.includes("@")) {
    return fromEnv;
  }
  if (!isPlaceholder(booking.ownerEmail) && booking.ownerEmail.includes("@")) {
    return booking.ownerEmail;
  }
  return business.email;
}

export function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured && !isPlaceholder(configured) && configured.includes("@")) {
    return configured;
  }
  return `"${business.name}" <${business.email}>`;
}

function answerRows(answers: BookingPayload): EmailRow[] {
  return [
    { label: booking.labels.town, value: answers.town },
    {
      label: booking.labels.otherTown,
      value: answers.otherTown.trim() || booking.notProvided,
    },
    { label: booking.labels.dogs, value: answers.dogs },
    { label: booking.labels.dogSize, value: answers.dogSize },
    { label: booking.labels.days, value: answers.days.join(", ") },
    { label: booking.labels.time, value: answers.time },
    { label: booking.labels.name, value: answers.name },
    { label: booking.labels.phone, value: formatPhone(answers.phone) },
    { label: booking.labels.email, value: answers.email },
    {
      label: booking.labels.breed,
      value: answers.breed.trim() || booking.notProvided,
    },
    {
      label: booking.labels.notes,
      value: answers.notes.trim() || booking.notProvided,
    },
    {
      label: booking.smsConsentLabel,
      value: answers.smsConsent ? booking.smsYes : booking.smsNo,
    },
    {
      label: booking.labels.sessionLength,
      value:
        answers.sessionLength === null
          ? booking.notSpecified
          : sessionLengthValue(answers.sessionLength),
    },
  ];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function answersText(rows: EmailRow[]): string {
  return rows.map((row) => `${row.label}: ${row.value}`).join("\n");
}

function answersTable(rows: EmailRow[]): string {
  const body = rows
    .map(
      (row) =>
        `<tr><th align="left" style="padding:8px 12px;border:1px solid #e2e8f0;vertical-align:top;">${escapeHtml(row.label)}</th><td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:16px;color:#0B1220;">${body}</table>`;
}

export function ownerEmailContent(answers: BookingPayload) {
  const rows = answerRows(answers);
  const intro = `New free session request from ${answers.name}.`;
  return {
    subject: `New free session request from ${answers.name}`,
    text: `${intro}\n\n${answersText(rows)}`,
    html: `<p style="font-family:sans-serif;font-size:16px;color:#0B1220;">${escapeHtml(intro)}</p>${answersTable(rows)}`,
  };
}

export function customerEmailContent(answers: BookingPayload) {
  const rows = answerRows(answers);
  const intro = bookingConfirmation();
  return {
    subject: "We got your free session request",
    text: `${intro}\n\n${answersText(rows)}`,
    html: `<p style="font-family:sans-serif;font-size:16px;color:#0B1220;">${escapeHtml(intro)}</p>${answersTable(rows)}`,
  };
}
