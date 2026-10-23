"use client";

import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  booking,
  bookingConfirmation,
  bookingDays,
  bookingDogCounts,
  bookingDogSizes,
  bookingProgress,
  bookingTimes,
  bookingTowns,
  sessionLengthLine,
  type BookingDay,
  type BookingDogCount,
  type BookingDogSize,
  type BookingTime,
  type BookingTown,
} from "../../../content/booking";
import {
  fieldErrorsFrom,
  parseDogCount,
  parseSessionLength,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  timeOnPageError,
} from "@/lib/booking-schema";
import { formatPhone, phoneDigits } from "@/lib/phone";

export type BookingFormProps = {
  initialLength?: string | number | null;
  initialDogs?: string | null;
};

type Draft = {
  town: BookingTown | "";
  otherTown: string;
  dogs: BookingDogCount | "";
  dogSize: BookingDogSize | "";
  days: BookingDay[];
  time: BookingTime | "";
  name: string;
  phone: string;
  email: string;
  breed: string;
  notes: string;
  smsConsent: boolean;
  sessionLength: number | null;
  company: string;
};

const choiceClass =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-card border px-3 text-center text-base font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand";

function createDraft(
  initialLength?: string | number | null,
  initialDogs?: string | null,
): Draft {
  return {
    town: "",
    otherTown: "",
    dogs: parseDogCount(initialDogs) ?? "",
    dogSize: "",
    days: [],
    time: "",
    name: "",
    phone: "",
    email: "",
    breed: "",
    notes: "",
    smsConsent: false,
    sessionLength: parseSessionLength(initialLength),
    company: "",
  };
}

function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  value: T | "";
  options: readonly T[];
  onChange: (value: T) => void;
  error?: string;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <fieldset aria-invalid={error ? true : undefined} aria-describedby={errorId} className="m-0 border-0 p-0">
      <legend className="mb-2 p-0 font-semibold">{legend}</legend>
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className={`${choiceClass} ${
                selected ? "border-navy bg-navy text-white" : "border-slate-400 bg-white text-navy"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name={name}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className="mb-0 mt-2 text-sm font-semibold text-[#7f1d1d]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  multiline?: boolean;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const shared = {
    id,
    name: id,
    value,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": errorId,
    onChange: (event: { currentTarget: { value: string } }) => onChange(event.currentTarget.value),
    className:
      "mt-1 w-full rounded-card border border-slate-400 px-3 text-base text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
  };
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} className={`${shared.className} min-h-24 py-3`} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} className={`${shared.className} min-h-11`} />
      )}
      {error ? (
        <p id={errorId} className="mb-0 mt-2 text-sm font-semibold text-[#7f1d1d]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function BookingForm({
  initialLength = null,
  initialDogs = null,
}: BookingFormProps) {
  const params = useSearchParams();
  const [draft, setDraft] = useState(() =>
    createDraft(params.get("length") ?? initialLength, params.get("dogs") ?? initialDogs),
  );
  const [step, setStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const openedAt = useRef(0);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const focusTarget = useRef<"progress" | "thanks" | null>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (focusTarget.current === "progress") {
      progressRef.current?.focus();
    }
    if (focusTarget.current === "thanks") {
      thanksRef.current?.focus();
    }
    focusTarget.current = null;
  }, [step, done]);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function fail(fields: Record<string, string>, message?: string) {
    setFieldErrors(fields);
    setFormMessage(message ?? Object.values(fields).join(" "));
  }

  function goToStep(next: number) {
    focusTarget.current = "progress";
    setFieldErrors({});
    setFormMessage("");
    setStep(next);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) {
      return;
    }

    if (draft.company.trim()) {
      fail({}, booking.errors.spam);
      return;
    }

    if (step === 1) {
      const parsed = step1Schema.safeParse({ town: draft.town, otherTown: draft.otherTown });
      if (!parsed.success) {
        fail(fieldErrorsFrom(parsed.error));
        return;
      }
      track("book_step_1");
      goToStep(2);
      return;
    }

    if (step === 2) {
      const parsed = step2Schema.safeParse({ dogs: draft.dogs, dogSize: draft.dogSize });
      if (!parsed.success) {
        fail(fieldErrorsFrom(parsed.error));
        return;
      }
      track("book_step_2");
      goToStep(3);
      return;
    }

    if (step === 3) {
      const parsed = step3Schema.safeParse({ days: draft.days, time: draft.time });
      if (!parsed.success) {
        fail(fieldErrorsFrom(parsed.error));
        return;
      }
      track("book_step_3");
      goToStep(4);
      return;
    }

    const parsed = step4Schema.safeParse({
      name: draft.name,
      phone: draft.phone,
      email: draft.email,
      breed: draft.breed,
      notes: draft.notes,
      smsConsent: draft.smsConsent,
    });
    if (!parsed.success) {
      fail(fieldErrorsFrom(parsed.error));
      return;
    }

    const timing = timeOnPageError(openedAt.current);
    if (timing) {
      fail({}, timing);
      return;
    }

    track("book_step_4");
    setSending(true);
    setFieldErrors({});
    setFormMessage("");

    try {
      const response = await fetch("/api/book/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          town: draft.town,
          otherTown: draft.otherTown,
          dogs: draft.dogs,
          dogSize: draft.dogSize,
          days: bookingDays.filter((day) => draft.days.includes(day)),
          time: draft.time,
          sessionLength: draft.sessionLength,
          company: draft.company,
          startedAt: openedAt.current,
        }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };
      if (!response.ok || !body.ok) {
        fail(body.fieldErrors ?? {}, body.message ?? booking.errors.send);
        setSending(false);
        return;
      }
      track("book_submit");
      focusTarget.current = "thanks";
      setDone(true);
      setSending(false);
    } catch {
      fail({}, booking.errors.send);
      setSending(false);
    }
  }

  if (done) {
    return (
      <section aria-labelledby="booking-thanks-heading">
        <h2
          id="booking-thanks-heading"
          ref={thanksRef}
          tabIndex={-1}
          className="m-0 text-3xl leading-none focus:outline-none"
        >
          {booking.thankYouHeading}
        </h2>
        <p className="mt-4 text-base leading-snug">{bookingConfirmation()}</p>
        <div className="mt-6 grid gap-3">
          <a
            href={booking.phoneTel}
            className="inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline"
          >
            {booking.callLabel}
          </a>
          <a
            href={booking.phoneSms}
            className="inline-flex min-h-11 items-center justify-center rounded-pill border border-slate-400 bg-white px-5 font-bold text-navy no-underline"
          >
            {booking.textLabel}
          </a>
        </div>
      </section>
    );
  }

  return (
    <form className="relative grid gap-5" noValidate onSubmit={onSubmit} data-booking-step={step}>
      <div>
        <p
          ref={progressRef}
          tabIndex={-1}
          className="m-0 text-sm font-semibold text-slate-600 focus:outline-none"
        >
          {bookingProgress(step)}
        </p>
        <div aria-hidden="true" className="mt-2 flex gap-1">
          {[1, 2, 3, 4].map((part) => (
            <span
              key={part}
              className={`h-1 flex-1 rounded-pill ${part <= step ? "bg-brand" : "bg-slate-200"}`}
            />
          ))}
        </div>
      </div>

      {draft.sessionLength ? (
        <p id="booking-session-length" className="m-0 rounded-card bg-slate-100 px-3 py-3 font-semibold">
          {sessionLengthLine(draft.sessionLength)}
        </p>
      ) : null}

      <p role="alert" aria-live="assertive" className="m-0 min-h-6 text-sm font-semibold text-[#7f1d1d]">
        {formMessage}
      </p>

      {step === 1 ? (
        <>
          <ChoiceGroup
            legend={booking.labels.town}
            name="town"
            value={draft.town}
            options={bookingTowns}
            error={fieldErrors.town}
            onChange={(town) => update("town", town)}
          />
          {draft.town === "Other" ? (
            <TextField
              id="booking-other-town"
              label={booking.labels.otherTown}
              value={draft.otherTown}
              autoComplete="address-level2"
              error={fieldErrors.otherTown}
              onChange={(otherTown) => update("otherTown", otherTown)}
            />
          ) : null}
        </>
      ) : null}

      {step === 2 ? (
        <>
          <ChoiceGroup
            legend={booking.labels.dogs}
            name="dogs"
            value={draft.dogs}
            options={bookingDogCounts}
            error={fieldErrors.dogs}
            onChange={(dogs) => update("dogs", dogs)}
          />
          <ChoiceGroup
            legend={booking.labels.dogSize}
            name="dogSize"
            value={draft.dogSize}
            options={bookingDogSizes}
            error={fieldErrors.dogSize}
            onChange={(dogSize) => update("dogSize", dogSize)}
          />
        </>
      ) : null}

      {step === 3 ? (
        <>
          <fieldset
            aria-invalid={fieldErrors.days ? true : undefined}
            aria-describedby={fieldErrors.days ? "days-error" : undefined}
            className="m-0 border-0 p-0"
          >
            <legend className="mb-2 p-0 font-semibold">{booking.labels.days}</legend>
            <div className="grid grid-cols-2 gap-2">
              {bookingDays.map((day) => {
                const checked = draft.days.includes(day);
                return (
                  <label
                    key={day}
                    className={`${choiceClass} justify-start gap-3 px-3 ${
                      checked ? "border-navy bg-navy text-white" : "border-slate-400 bg-white text-navy"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={checked}
                      className="size-5 accent-brand"
                      onChange={() => {
                        update(
                          "days",
                          checked ? draft.days.filter((item) => item !== day) : [...draft.days, day],
                        );
                      }}
                    />
                    {day}
                  </label>
                );
              })}
            </div>
            {fieldErrors.days ? (
              <p id="days-error" className="mb-0 mt-2 text-sm font-semibold text-[#7f1d1d]">
                {fieldErrors.days}
              </p>
            ) : null}
          </fieldset>
          <ChoiceGroup
            legend={booking.labels.time}
            name="time"
            value={draft.time}
            options={bookingTimes}
            error={fieldErrors.time}
            onChange={(time) => update("time", time)}
          />
        </>
      ) : null}

      {step === 4 ? (
        <>
          <TextField
            id="booking-name"
            label={booking.labels.name}
            value={draft.name}
            autoComplete="name"
            error={fieldErrors.name}
            onChange={(name) => update("name", name)}
          />
          <TextField
            id="booking-phone"
            label={booking.labels.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={formatPhone(draft.phone)}
            error={fieldErrors.phone}
            onChange={(phone) => update("phone", phoneDigits(phone))}
          />
          <TextField
            id="booking-email"
            label={booking.labels.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={draft.email}
            error={fieldErrors.email}
            onChange={(email) => update("email", email)}
          />
          <TextField
            id="booking-breed"
            label={booking.labels.breed}
            value={draft.breed}
            autoComplete="off"
            error={fieldErrors.breed}
            onChange={(breed) => update("breed", breed)}
          />
          <TextField
            id="booking-notes"
            label={booking.labels.notes}
            value={draft.notes}
            multiline
            error={fieldErrors.notes}
            onChange={(notes) => update("notes", notes)}
          />
          <label className="flex min-h-11 items-start gap-3 rounded-card font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand">
            <input
              id="booking-sms"
              name="smsConsent"
              type="checkbox"
              className="mt-1 size-5 accent-brand"
              checked={draft.smsConsent}
              onChange={(event) => update("smsConsent", event.currentTarget.checked)}
            />
            <span>{booking.smsConsentLabel}</span>
          </label>
        </>
      ) : null}

      <div className="booking-honeypot" aria-hidden="true">
        <label htmlFor="booking-company">{booking.labels.company}</label>
        <input
          id="booking-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={draft.company}
          onChange={(event) => update("company", event.currentTarget.value)}
        />
      </div>

      <div className="flex gap-3">
        {step > 1 ? (
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-pill border border-slate-400 bg-white px-4 text-base font-bold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={() => goToStep(step - 1)}
          >
            {booking.backLabel}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-11 flex-[2] items-center justify-center rounded-pill bg-accent px-4 text-base font-bold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70"
        >
          {sending ? booking.sendingLabel : step === 4 ? booking.submitLabel : booking.continueLabel}
        </button>
      </div>
    </form>
  );
}
