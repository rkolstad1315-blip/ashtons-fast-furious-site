import type { Metadata } from "next";
import { ReviewsPage } from "@/components/pages/reviews-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/reviews/");

export default function Page() {
  return <ReviewsPage />;
}
