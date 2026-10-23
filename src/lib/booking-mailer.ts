import { Resend } from "resend";

export type OutboundEmail = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type MailClient = {
  send(email: OutboundEmail): Promise<{ id: string }>;
};

function logMailError(error: unknown) {
  const raw = error instanceof Error ? error.message : "Email send failed";
  const key = process.env.RESEND_API_KEY;
  const safe = key ? raw.replaceAll(key, "[redacted]") : raw;
  console.error(`[book] ${safe}`);
}

export function createMailClient(apiKey = process.env.RESEND_API_KEY?.trim()): MailClient {
  if (!apiKey) {
    return {
      async send(email) {
        console.info(
          `[mock-resend] RESEND_API_KEY is unset. to=${email.to} subject=${email.subject}\n${email.text}`,
        );
        return { id: `mock-${email.subject.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}` };
      },
    };
  }

  const resend = new Resend(apiKey);
  return {
    async send(email) {
      const result = await resend.emails.send({
        from: email.from,
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
        replyTo: email.replyTo,
      });
      if (result.error) {
        logMailError(new Error(result.error.message));
        throw new Error("Email send failed");
      }
      return { id: result.data?.id ?? "sent" };
    },
  };
}
