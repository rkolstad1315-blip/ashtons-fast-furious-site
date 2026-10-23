import { assertNoDash } from "./copy-rules";

export type Review = {
  name: string;
  town: string;
  text: string;
  date: string;
  source: "google";
};

export type ReviewsPageContent = {
  emptyInvite: string;
  googleReviewLabel: string;
  googleReviewUrl: string;
};

export const reviews: Review[] = [];

export const reviewsPage: ReviewsPageContent = {
  emptyInvite: "Be the first to leave a review.",
  googleReviewLabel: "Leave a review on Google",
  googleReviewUrl: "[GOOGLE REVIEW LINK]",
};

export function reviewsNewestFirst(list: readonly Review[]): Review[] {
  return [...list].sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    const aValue = Number.isNaN(aTime) ? 0 : aTime;
    const bValue = Number.isNaN(bTime) ? 0 : bTime;
    return bValue - aValue;
  });
}

assertNoDash(reviewsPage, "reviews page copy");
assertNoDash(reviews, "reviews");

// Profile link for "Read all reviews on Google". Hidden while this is still a placeholder.
export const googleProfileUrl: string = "[GOOGLE PROFILE URL]";
