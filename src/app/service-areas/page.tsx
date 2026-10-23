import type { Metadata } from "next";
import { ServiceAreasHub } from "@/components/service-areas/service-areas-hub";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return pageMetadata("/service-areas/");
}

export default function ServiceAreasPage() {
  return <ServiceAreasHub />;
}
