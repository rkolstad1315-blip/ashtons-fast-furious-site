import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { SectionHeading } from "@/components/section-heading";
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
  // Two confirmed prices fill the row side by side instead of leaving a third slot empty.
  const gridClass =
    cards.length >= 3
      ? "m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3"
      : "m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2";

  return (
    <section className="bg-white" aria-labelledby="pricing-preview-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading id="pricing-preview-heading" eyebrow={copy.eyebrow} title={copy.heading} intro={copy.intro} />
        <ul className={gridClass}>
          {cards.map((card) => (
            <li key={card.id} className="card min-w-0 rounded-panel">
              <article
                className={`relative flex h-full flex-col rounded-panel p-7 md:p-8 ${
                  card.highlighted
                    ? "speed-bg border-2 border-accent text-white"
                    : "panel"
                }`}
              >
                {card.highlighted ? (
                  <p className="m-0 mb-4 inline-flex self-start rounded-pill bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                    {copy.mostPopular}
                  </p>
                ) : null}
                <h3 className="m-0 font-display text-2xl leading-tight">{card.title}</h3>
                <p
                  className={`m-0 mt-4 font-display text-6xl italic leading-none md:text-7xl ${
                    card.highlighted ? "text-white" : "text-brand"
                  }`}
                >
                  {card.priceLabel}
                </p>
                {card.detail ? (
                  <p className={`m-0 mt-2 ${card.highlighted ? "text-slate-200" : "text-slate-700"}`}>{card.detail}</p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
        <Link
          href={copy.linkHref}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-navy no-underline hover:text-brand"
        >
          {copy.linkLabel}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
