import { isConfirmedPrice, type Pricing } from "../../content/pricing";
import type { QuoteCatalog } from "./price-quote";

export function toQuoteCatalog(source: Pricing): QuoteCatalog {
  const militaryPercent =
    source.militaryDiscountPercent.enabled &&
    typeof source.militaryDiscountPercent.value === "number" &&
    Number.isFinite(source.militaryDiscountPercent.value)
      ? source.militaryDiscountPercent.value
      : null;

  return {
    sessions: source.sessions.flatMap((session) =>
      isConfirmedPrice(session.price) && Number.isFinite(session.price)
        ? [{ minutes: session.minutes, price: session.price }]
        : [],
    ),
    secondDogPrice:
      isConfirmedPrice(source.secondDogPrice) && Number.isFinite(source.secondDogPrice)
        ? source.secondDogPrice
        : null,
    membership:
      source.membership.enabled &&
      isConfirmedPrice(source.membership.price) &&
      Number.isFinite(source.membership.price)
        ? {
            sessionsPerMonth: source.membership.sessionsPerMonth,
            price: source.membership.price,
          }
        : null,
    militaryPercent,
    firstSessionFree: source.firstSessionFree,
  };
}
