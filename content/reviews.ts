export type Review = {
  name: string;
  town: string;
  text: string;
  date: string;
  source: "google";
};

export const reviews: Review[] = [];

// Profile link for "Read all reviews on Google". Hidden while this is still a placeholder.
export const googleProfileUrl: string = "[GOOGLE PROFILE URL]";
