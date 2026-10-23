import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ServicePage } from "@/components/service/service-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/mobile-dog-treadmill/");

export default function MobileDogTreadmillPage() {
  return (
    <>
      <JsonLd path="/mobile-dog-treadmill/" />
      <ServicePage />
    </>
  );
}
