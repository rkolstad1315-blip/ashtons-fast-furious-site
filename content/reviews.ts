export type Review = {
  name: string;
  town: string;
  text: string;
  date: string;
  source: "google";
};

export const reviews: Review[] = [];
