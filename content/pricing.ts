export type Price = number | "[PRICE]";
export type Fee = number | "[FEE]";
export type Percent = number | "[PERCENT]";

export type Session = {
  minutes: number;
  price: Price;
};

export type Membership = {
  sessionsPerMonth: number;
  price: Price;
  enabled: boolean;
};

export type MilitaryDiscount = {
  value: Percent;
  enabled: boolean;
};

export type TravelFee = {
  town: string;
  slug: string;
  fee: Fee;
};

export type Pricing = {
  sessions: readonly Session[];
  firstSessionFree: boolean;
  secondDogPrice: Price;
  membership: Membership;
  militaryDiscountPercent: MilitaryDiscount;
  travelFees: readonly TravelFee[];
  lateCancelFee: Fee;
};

export function isConfirmedPrice(price: Price): price is number {
  return typeof price === "number";
}

export const pricing: Pricing = {
  sessions: [
    { minutes: 15, price: "[PRICE]" },
    { minutes: 30, price: 60 },
    { minutes: 45, price: "[PRICE]" },
    { minutes: 60, price: "[PRICE]" },
  ],
  firstSessionFree: true,
  secondDogPrice: "[PRICE]",
  membership: {
    sessionsPerMonth: 4,
    price: "[PRICE]",
    enabled: false,
  },
  militaryDiscountPercent: {
    value: "[PERCENT]",
    enabled: false,
  },
  travelFees: [
    { town: "Jacksonville", slug: "jacksonville-nc", fee: "[FEE]" },
    { town: "Richlands", slug: "richlands-nc", fee: "[FEE]" },
    { town: "Beulaville", slug: "beulaville-nc", fee: "[FEE]" },
  ],
  lateCancelFee: "[FEE]",
};
