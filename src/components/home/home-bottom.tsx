import { BookingTeaser } from "./booking-teaser";
import { FaqPreview } from "./faq-preview";
import { PricingPreview } from "./pricing-preview";
import { ReviewsPreview } from "./reviews-preview";
import { ServiceAreaMap } from "./service-area-map";

export function HomeBottom() {
  return (
    <>
      <PricingPreview />
      <ReviewsPreview />
      <FaqPreview />
      <ServiceAreaMap />
      <BookingTeaser />
    </>
  );
}
