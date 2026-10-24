"use client";

import { useEffect, useRef, useState } from "react";
import { observeOnce } from "@/lib/viewport-observer";

type StatCounterProps = {
  sessionsRun: number | null;
  dogsServed: number | null;
  sessionsLabel: string;
  dogsLabel: string;
};

const DURATION_MS = 700;

function StatValue({ label, value, target }: { label: string; value: number; target: number }) {
  return (
    <div className="flex min-w-0 flex-col-reverse">
      <dt className="text-sm font-semibold text-slate-600">{label}</dt>
      <dd className="m-0 font-display text-5xl font-extrabold leading-none text-navy">
        <span className="sr-only">{target}</span>
        <span aria-hidden="true" className="inline-grid tabular-nums">
          <span className="col-start-1 row-start-1">{value}</span>
          <span className="invisible col-start-1 row-start-1">{target}</span>
        </span>
      </dd>
    </div>
  );
}

function StatCounterLive({
  sessionsRun,
  dogsServed,
  sessionsLabel,
  dogsLabel,
}: {
  sessionsRun: number;
  dogsServed: number;
  sessionsLabel: string;
  dogsLabel: string;
}) {
  const ref = useRef<HTMLDListElement>(null);
  const [sessions, setSessions] = useState(sessionsRun);
  const [dogs, setDogs] = useState(dogsServed);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let frame = 0;
    let started = false;

    const tick = (startTime: number, now: number) => {
      const progress = Math.min(1, (now - startTime) / DURATION_MS);
      const eased = 1 - (1 - progress) ** 3;
      setSessions(Math.round(sessionsRun * eased));
      setDogs(Math.round(dogsServed * eased));
      if (progress < 1) {
        frame = requestAnimationFrame((next) => tick(startTime, next));
      }
    };

    const start = () => {
      if (started) {
        return;
      }
      started = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const startTime = performance.now();
      setSessions(0);
      setDogs(0);
      frame = requestAnimationFrame((now) => tick(startTime, now));
    };

    // Shares the site wide IntersectionObserver instead of creating a second one.
    const stopObserving = observeOnce(node, start);

    return () => {
      cancelAnimationFrame(frame);
      stopObserving();
    };
  }, [dogsServed, sessionsRun]);

  return (
    <dl ref={ref} className="mt-8 grid grid-cols-2 gap-6">
      <StatValue label={sessionsLabel} value={sessions} target={sessionsRun} />
      <StatValue label={dogsLabel} value={dogs} target={dogsServed} />
    </dl>
  );
}

export function StatCounter(props: StatCounterProps) {
  if (props.sessionsRun === null || props.dogsServed === null) {
    return null;
  }

  return (
    <StatCounterLive
      sessionsRun={props.sessionsRun}
      dogsServed={props.dogsServed}
      sessionsLabel={props.sessionsLabel}
      dogsLabel={props.dogsLabel}
    />
  );
}
