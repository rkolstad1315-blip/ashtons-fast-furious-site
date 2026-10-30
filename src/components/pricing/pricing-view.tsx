import { TrustIcon } from "@/components/home/trust-icons";
import { PageHeader } from "@/components/page-header";
import { PriceBuilder, type PriceBuilderCopy } from "@/components/pricing/price-builder";
import { formatDollars } from "@/lib/price-quote";
import { toQuoteCatalog } from "@/lib/pricing-catalog";
import { business } from "../../../content/business";
import { home } from "../../../content/home";
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

  if (pricing.firstSessionFree) {
    cards.push({
      id: "first-session",
      title: pricingPage.firstSessionTitle,
      figure: pricingPage.firstSessionFigure,
      detail: null,
      highlighted: false,
    });
  }

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

// The confirmed handling facts from the homepage trust strip, insured only once confirmed.
const included = home.trust.items.filter((item) =>
  "whenInsured" in item && item.whenInsured ? business.insuredConfirmed : true,
);

export function PricingView() {
  const page = getPage("/pricing/");
  const lead = pricingLeadSentence();
  const catalog = toQuoteCatalog(pricing);
  const cards = priceCards();
  const lines = policyLines();
  const initialMinutes =
    catalog.sessions.find((session) => session.minutes === 30)?.minutes ??
    catalog.sessions[0]?.minutes;
  // The builder only earns its place once there is something to choose. With one
  // confirmed length, one dog price and no membership it would be three single
  // option radio groups that always total the card above.
  const hasChoices =
    catalog.sessions.length > 1 ||
    catalog.secondDogPrice != null ||
    catalog.membership != null ||
    catalog.militaryPercent != null;
  const monthlyDetail = catalog.membership
    ? membershipDetail(catalog.membership.sessionsPerMonth)
    : null;
  const secondDogMonthlyNote =
    catalog.membership && catalog.secondDogPrice != null ? pricingPage.secondDogMonthlyNote : null;

  return (
    <>
      <PageHeader title={page.h1} lede={lead} />
      <article className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start lg:gap-12">
          <section aria-labelledby="prices-heading">
            <h2 id="prices-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
              {pricingPage.pricesHeading}
            </h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2">
              {cards.map((card) => (
                <li key={card.id} className="card min-w-0 rounded-panel">
                  <article
                    data-highlighted={card.highlighted ? "true" : "false"}
                    className={`flex h-full flex-col rounded-panel p-7 ${
                      card.highlighted ? "speed-bg border-2 border-accent text-white" : "panel"
                    }`}
                  >
                    <h3 className="m-0 font-display text-2xl leading-tight">{card.title}</h3>
                    <p
                      className={`m-0 mt-4 font-display text-6xl italic leading-none md:text-7xl ${
                        card.highlighted ? "text-white" : "text-brand"
                      }`}
                    >
                      {card.figure}
                    </p>
                    {card.detail ? (
                      <p className={`m-0 mt-3 ${card.highlighted ? "text-slate-200" : "text-slate-700"}`}>
                        {card.detail}
                      </p>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-6 md:p-7" aria-labelledby="included-heading">
            <h2 id="included-heading" className="m-0 font-display text-2xl leading-none md:text-3xl">
              {pricingPage.includedHeading}
            </h2>
            <ul className="m-0 mt-5 grid list-none gap-4 p-0">
              {included.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <TrustIcon id={item.id} />
                  <span className="font-semibold">{item.label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {hasChoices && initialMinutes != null ? (
          <section className="mt-12 max-w-xl" aria-labelledby="builder-heading">
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
                <li key={line.id} className="panel px-5 py-4">
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
