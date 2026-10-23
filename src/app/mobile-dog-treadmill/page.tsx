import type { Metadata } from "next";
import { ServicePage } from "@/components/service/service-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/mobile-dog-treadmill/");

export default function MobileDogTreadmillPage() {
  return <ServicePage />;
}
