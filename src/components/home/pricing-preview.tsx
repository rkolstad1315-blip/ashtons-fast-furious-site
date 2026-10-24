import { Link } from "@/components/link";
import { home } from "../../../content/home";
import { isConfirmedPrice, pricing, type Session } from "../../../content/pricing";

type PriceCard = {
  id: string;
  title: string;
  priceLabel: string;
  detail: string | null;
  highlighted: boolean;
};

function dollarLabel(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

function sessionCard(session: Session, highlighted: boolean): PriceCard | null {
  if (!isConfirmedPrice(session.price)) {
    return null;
  }

  return {
    id: String(session.minutes),
    title: `${session.minutes} ${home.pricingPreview.minuteSession}`,
    priceLabel: dollarLabel(session.price),
    detail: null,
    highlighted,
  };
}

function pricePreviewCards(): PriceCard[] {
  const copy = home.pricingPreview;
  const cards: PriceCard[] = [];

  if (pricing.firstSessionFree) {
    cards.push({
      id: "first",
      title: copy.freeTitle,
      priceLabel: copy.freePrice,
      detail: null,
      highlighted: false,
    });
  }

  const thirty = pricing.sessions.find((session) => session.minutes === 30);
  if (thirty) {
    const card = sessionCard(thirty, true);
    if (card) {
      cards.push(card);
    }
  }

  const membershipPrice = pricing.membership.price;
  if (pricing.membership.enabled && isConfirmedPrice(membershipPrice)) {
    cards.push({
      id: "membership",
      title: copy.membershipTitle,
      priceLabel: dollarLabel(membershipPrice),
      detail: `${pricing.membership.sessionsPerMonth} ${copy.sessionsAMonth}`,
      highlighted: false,
    });
    return cards;
  }

  const alternate = [15, 60]
    .map((minutes) => pricing.sessions.find((session) => session.minutes === minutes))
    .find((session): session is Session => session !== undefined && isConfirmedPrice(session.price));

  if (alternate) {
    const card = sessionCard(alternate, false);
    if (card) {
      cards.push(card);
    }
  }

  return cards;
}

export function PricingPreview() {
  const copy = home.pricingPreview;
  const cards = pricePreviewCards();
  const gridClass =
    cards.length >= 3
      ? "m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3"
      : "m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2";
  const titleSpace = cards.some((card) => card.highlighted) ? "pt-10" : "";

  return (
    <section className="border-t border-slate-200 bg-slate-100" aria-labelledby="pricing-preview-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="pricing-preview-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {copy.heading}
        </h2>
        <ul className={gridClass}>
          {cards.map((card) => (
            <li key={card.id} className="min-w-0">
              <article
                className={`card relative h-full rounded-card bg-white p-5 ${titleSpace} ${
                  card.highlighted ? "border-2 border-accent" : "border border-slate-200"
                }`}
              >
                {card.highlighted ? (
                  <p className="absolute left-5 top-3 m-0 inline-flex rounded-pill bg-navy px-2.5 py-1 text-xs font-bold text-white">
                    {copy.mostPopular}
                  </p>
                ) : null}
                <h3 className="m-0 font-display text-2xl leading-tight">{card.title}</h3>
                <p className="m-0 mt-3 font-display text-5xl leading-none">{card.priceLabel}</p>
                {card.detail ? <p className="m-0 mt-2 text-slate-700">{card.detail}</p> : null}
              </article>
            </li>
          ))}
        </ul>
        <Link
          href={copy.linkHref}
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4"
        >
          {copy.linkLabel}
        </Link>
      </div>
    </section>
  );
}
