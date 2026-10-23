import { booking } from "../../../../content/booking";
import {
  customerEmailContent,
  ownerEmailContent,
  resolveFromAddress,
  resolveOwnerEmail,
} from "@/lib/booking-email";
import { createMailClient } from "@/lib/booking-mailer";
import { bookingSchema, fieldErrorsFrom, timeOnPageError } from "@/lib/booking-schema";

type BookResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

function json(body: BookResponse, status: number) {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: booking.errors.read }, 400);
  }

  const company =
    payload && typeof payload === "object" && "company" in payload ? payload.company : "";
  if (typeof company === "string" && company.trim().length > 0) {
    return json({ ok: false, message: booking.errors.spam }, 400);
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = fieldErrorsFrom(parsed.error);
    return json(
      {
        ok: false,
        message: Object.values(fieldErrors)[0] ?? booking.errors.check,
        fieldErrors,
      },
      400,
    );
  }

  const timing = timeOnPageError(parsed.data.startedAt);
  if (timing) {
    return json({ ok: false, message: timing }, 400);
  }

  const from = resolveFromAddress();
  const owner = ownerEmailContent(parsed.data);
  const customer = customerEmailContent(parsed.data);
  const mail = createMailClient();

  try {
    await Promise.all([
      mail.send({
        from,
        to: resolveOwnerEmail(),
        subject: owner.subject,
        html: owner.html,
        text: owner.text,
        replyTo: parsed.data.email,
      }),
      mail.send({
        from,
        to: parsed.data.email,
        subject: customer.subject,
        html: customer.html,
        text: customer.text,
        replyTo: resolveOwnerEmail(),
      }),
    ]);
  } catch {
    return json({ ok: false, message: booking.errors.send }, 502);
  }

  return json({ ok: true }, 200);
}
