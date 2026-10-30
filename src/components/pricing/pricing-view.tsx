import { PageHeader } from "@/components/page-header";
import { PriceBuilder, type PriceBuilderCopy } from "@/components/pricing/price-builder";
import { formatDollars } from "@/lib/price-quote";
import { toQuoteCatalog } from "@/lib/pricing-catalog";
import { isPlaceholder } from "../../../content/placeholders";
import { isConfirmedPrice, pricing } from "../../../content/pricing";
import {
  lateCancelLine,
  membershipDetail,
  militaryFigure,
  paymentMethodsLine,
  pricingLeadSentence,
  pricingPage,
  sessionLengthLabel,
  travelFeeLine,
} from "../../../content/pricing-page";
import { getPage } from "../../../content/seo";

type PriceCard = {
  id: string;
  title: string;
  figure: string;
  detail: string | null;
  highlighted: boolean;
};

function priceCards(): PriceCard[] {
  const cards: PriceCard[] = [];

  for (const session of pricing.sessions) {
    if (!isConfirmedPrice(session.price)) {
      continue;
    }
    cards.push({
      id: `session-${session.minutes}`,
      title: sessionLengthLabel(session.minutes),
      figure: formatDollars(session.price),
      detail: null,
      highlighted: session.minutes === 30,
    });
  }

  if (isConfirmedPrice(pricing.secondDogPrice)) {
    cards.push({
      id: "second-dog",
      title: pricingPage.secondDogTitle,
      figure: formatDollars(pricing.secondDogPrice),
      detail: pricingPage.secondDogDetail,
      highlighted: false,
    });
  }

  if (pricing.membership.enabled && isConfirmedPrice(pricing.membership.price)) {
    cards.push({
      id: "membership",
      title: pricingPage.membershipTitle,
      figure: formatDollars(pricing.membership.price),
      detail: membershipDetail(pricing.membership.sessionsPerMonth),
      highlighted: false,
    });
  }

  const military = pricing.militaryDiscountPercent;
  if (military.enabled && typeof military.value === "number") {
    cards.push({
      id: "military",
      title: pricingPage.militaryTitle,
      figure: militaryFigure(military.value),
      detail: pricingPage.militaryAudience,
      highlighted: false,
    });
  }

  return cards;
}

function policyLines(): { id: string; text: string }[] {
  const lines: { id: string; text: string }[] = [];

  for (const fee of pricing.travelFees) {
    if (typeof fee.fee !== "number" || isPlaceholder(fee.town)) {
      continue;
    }
    lines.push({
      id: fee.slug,
      text: travelFeeLine(fee.town, formatDollars(fee.fee)),
    });
  }

  if (typeof pricing.lateCancelFee === "number") {
    lines.push({
      id: "late-cancel",
      text: lateCancelLine(formatDollars(pricing.lateCancelFee)),
    });
  }

  const payment = paymentMethodsLine();
  if (payment) {
    lines.push({ id: "payment", text: payment });
  }

  return lines;
}

function builderCopy(monthlyDetail: string | null, secondDogMonthlyNote: string | null): PriceBuilderCopy {
  return {
    lengthLegend: pricingPage.lengthLegend,
    dogsLegend: pricingPage.dogsLegend,
    frequencyLegend: pricingPage.frequencyLegend,
    oneTime: pricingPage.oneTime,
    monthly: pricingPage.monthly,
    monthlyDetail,
    minutes: pricingPage.minutes,
    dog: pricingPage.dog,
    dogs: pricingPage.dogs,
    militaryToggle: pricingPage.militaryToggle,
    militaryApplied: pricingPage.militaryApplied,
    secondDogMonthlyNote,
    totalLabel: pricingPage.totalLabel,
    freeFirstSession: pricing.firstSessionFree ? pricingPage.freeFirstSession : null,
    bookThis: pricingPage.bookThis,
  };
}

export function PricingView() {
  const page = getPage("/pricing/");
  const lead = pricingLeadSentence();
  const catalog = toQuoteCatalog(pricing);
  const cards = priceCards();
  const lines = policyLines();
  const initialMinutes =
    catalog.sessions.find((session) => session.minutes === 30)?.minutes ??
    catalog.sessions[0]?.minutes;
  const monthlyDetail = catalog.membership
    ? membershipDetail(catalog.membership.sessionsPerMonth)
    : null;
  const secondDogMonthlyNote =
    catalog.membership && catalog.secondDogPrice != null ? pricingPage.secondDogMonthlyNote : null;

  return (
    <>
      <PageHeader title={page.h1} lede={lead} />
      <article className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section aria-labelledby="prices-heading">
          <h2 id="prices-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
            {pricingPage.pricesHeading}
          </h2>
          <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {cards.map((card) => (
              <li
                key={card.id}
                data-highlighted={card.highlighted ? "true" : "false"}
                className={`panel card p-6 ${card.highlighted ? "border-2 border-accent" : ""}`}
              >
                <h3 className="m-0 font-display text-2xl leading-tight">{card.title}</h3>
                <p className="m-0 mt-3 font-display text-6xl italic leading-none text-brand">{card.figure}</p>
                {card.detail ? <p className="m-0 mt-3 text-slate-700">{card.detail}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        {initialMinutes != null ? (
          <section className="mt-8 max-w-xl" aria-labelledby="builder-heading">
            <h2 id="builder-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
              {pricingPage.builderHeading}
            </h2>
            <div className="mt-4">
              <PriceBuilder
                catalog={catalog}
                initialMinutes={initialMinutes}
                copy={builderCopy(monthlyDetail, secondDogMonthlyNote)}
              />
            </div>
          </section>
        ) : null}

        {lines.length > 0 ? (
          <section className="mt-12" aria-labelledby="policies-heading">
            <h2 id="policies-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
              {pricingPage.policiesHeading}
            </h2>
            <ul className="m-0 mt-6 grid list-none gap-3 p-0">
              {lines.map((line) => (
                <li key={line.id} className="rounded-card border border-slate-200 px-4 py-3">
                  {line.text}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
