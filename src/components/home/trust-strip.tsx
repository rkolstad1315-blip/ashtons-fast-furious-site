import { SectionHeading } from "@/components/section-heading";
import { business } from "../../../content/business";
import { home } from "../../../content/home";
import { shouldShowStats, stats } from "../../../content/stats";
import { TrustIcon } from "./trust-icons";

async function loadStatCounter() {
  const { StatCounter } = await import("./stat-counter");
  return StatCounter;
}

export async function TrustStrip() {
  const items = home.trust.items.filter((item) => {
    if ("whenInsured" in item && item.whenInsured) {
      return business.insuredConfirmed;
    }
    return true;
  });
  const showStats =
    shouldShowStats(stats) && stats.sessionsRun !== null && stats.dogsServed !== null;
  const StatCounter = showStats ? await loadStatCounter() : null;

  return (
    <section className="speed-bg" data-reveal aria-labelledby="trust-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading id="trust-heading" eyebrow={home.trust.eyebrow} title={home.trust.heading} />
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex min-w-0 items-center gap-4 rounded-panel border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <TrustIcon id={item.id} />
              <span className="font-display text-xl leading-tight text-white">{item.label}</span>
            </li>
          ))}
        </ul>
        {StatCounter && stats.sessionsRun !== null && stats.dogsServed !== null ? (
          <StatCounter
            sessionsRun={stats.sessionsRun}
            dogsServed={stats.dogsServed}
            sessionsLabel={home.trust.stats.sessionsLabel}
            dogsLabel={home.trust.stats.dogsLabel}
          />
        ) : null}
      </div>
    </section>
  );
}
