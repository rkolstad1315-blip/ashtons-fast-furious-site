import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PricingView } from "@/components/pricing/pricing-view";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return pageMetadata("/pricing/");
}

export default function PricingRoute() {
  return (
    <>
      <JsonLd path="/pricing/" />
      <PricingView />
    </>
  );
}
