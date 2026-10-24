"use client";

import { Link } from "@/components/link";
import { useState } from "react";
import { bookHref, formatDollars, quoteTotal, type QuoteCatalog } from "@/lib/price-quote";

export type PriceBuilderCopy = {
  lengthLegend: string;
  dogsLegend: string;
  frequencyLegend: string;
  oneTime: string;
  monthly: string;
  monthlyDetail: string | null;
  minutes: string;
  dog: string;
  dogs: string;
  militaryToggle: string;
  militaryApplied: string;
  secondDogMonthlyNote: string | null;
  totalLabel: string;
  freeFirstSession: string | null;
  bookThis: string;
};

function optionClass(selected: boolean): string {
  return `flex min-h-11 scroll-mb-20 cursor-pointer items-center gap-3 rounded-card border-2 px-4 py-2 font-semibold ${
    selected ? "border-accent bg-slate-100" : "border-slate-200 bg-white"
  }`;
}

const inputClass =
  "h-5 w-5 shrink-0 accent-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function PriceBuilder({
  catalog,
  initialMinutes,
  copy,
}: {
  catalog: QuoteCatalog;
  initialMinutes: number;
  copy: PriceBuilderCopy;
}) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [dogs, setDogs] = useState<1 | 2>(1);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [military, setMilitary] = useState(false);

  const dogChoices: readonly (1 | 2)[] = catalog.secondDogPrice == null ? [1] : [1, 2];
  const showMonthly = catalog.membership != null;
  const showMilitary = catalog.militaryPercent != null;
  const activeFrequency = showMonthly ? frequency : "once";
  const activeDogs = dogChoices.includes(dogs) ? dogs : 1;
  const activeMilitary = showMilitary && military;
  const total = quoteTotal(catalog, {
    minutes,
    dogs: activeDogs,
    frequency: activeFrequency,
    military: activeMilitary,
  });

  return (
    <div className="grid gap-6">
      <div role="group" aria-labelledby="session-length-label" className="grid gap-3">
        <p id="session-length-label" className="m-0 font-semibold">
          {copy.lengthLegend}
        </p>
        {catalog.sessions.map((session) => {
          const id = `length-${session.minutes}`;
          const selected = minutes === session.minutes;
          return (
            <label key={session.minutes} htmlFor={id} className={optionClass(selected)}>
              <input
                id={id}
                className={inputClass}
                type="radio"
                name="length"
                value={session.minutes}
                checked={selected}
                onChange={() => setMinutes(session.minutes)}
              />
              {session.minutes} {copy.minutes}
            </label>
          );
        })}
      </div>

      <div role="group" aria-labelledby="dog-count-label" className="grid gap-3">
        <p id="dog-count-label" className="m-0 font-semibold">
          {copy.dogsLegend}
        </p>
        {dogChoices.map((count) => {
          const id = `dogs-${count}`;
          const selected = activeDogs === count;
          return (
            <label key={count} htmlFor={id} className={optionClass(selected)}>
              <input
                id={id}
                className={inputClass}
                type="radio"
                name="dogs"
                value={count}
                checked={selected}
                onChange={() => setDogs(count)}
              />
              {count === 1 ? `1 ${copy.dog}` : `${count} ${copy.dogs}`}
            </label>
          );
        })}
      </div>

      <div role="group" aria-labelledby="frequency-label" className="grid gap-3">
        <p id="frequency-label" className="m-0 font-semibold">
          {copy.frequencyLegend}
        </p>
        <label htmlFor="frequency-once" className={optionClass(activeFrequency === "once")}>
          <input
            id="frequency-once"
            className={inputClass}
            type="radio"
            name="frequency"
            value="once"
            checked={activeFrequency === "once"}
            onChange={() => setFrequency("once")}
          />
          {copy.oneTime}
        </label>
        {showMonthly && catalog.membership ? (
          <label htmlFor="frequency-monthly" className={optionClass(activeFrequency === "monthly")}>
            <input
              id="frequency-monthly"
              className={inputClass}
              type="radio"
              name="frequency"
              value="monthly"
              checked={activeFrequency === "monthly"}
              onChange={() => setFrequency("monthly")}
            />
            <span>
              <span className="block">{copy.monthly}</span>
              {copy.monthlyDetail ? (
                <span className="mt-0.5 block text-sm font-normal text-slate-700">
                  {copy.monthlyDetail}
                </span>
              ) : null}
            </span>
          </label>
        ) : null}
      </div>

      {showMilitary ? (
        <label htmlFor="military-discount" className={optionClass(activeMilitary)}>
          <input
            id="military-discount"
            className={inputClass}
            type="checkbox"
            checked={activeMilitary}
            onChange={(event) => setMilitary(event.target.checked)}
          />
          {copy.militaryToggle}
        </label>
      ) : null}

      <div aria-live="polite">
        <p className="m-0 text-sm font-semibold text-slate-700">{copy.totalLabel}</p>
        {total != null ? (
          <p className="m-0 mt-1 font-display text-5xl leading-none" data-price-total={total}>
            {formatDollars(total)}
          </p>
        ) : null}
        {activeMilitary ? <p className="m-0 mt-2 text-slate-700">{copy.militaryApplied}</p> : null}
        {activeFrequency === "monthly" && activeDogs === 2 && copy.secondDogMonthlyNote ? (
          <p className="m-0 mt-2 text-slate-700">{copy.secondDogMonthlyNote}</p>
        ) : null}
        {copy.freeFirstSession ? <p className="m-0 mt-2">{copy.freeFirstSession}</p> : null}
      </div>

      {total != null ? (
        <Link
          href={bookHref(minutes, activeDogs)}
          className="btn-accent inline-flex min-h-11 w-full scroll-mb-20 items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline"
        >
          {copy.bookThis}
        </Link>
      ) : null}
    </div>
  );
}
