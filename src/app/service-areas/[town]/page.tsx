import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TownPage } from "@/components/service-areas/town-page";
import { pageMetadata } from "@/lib/metadata";
import { towns } from "../../../../content/towns";
import { assessTown, getTown, townPath, warnThinTownPages } from "@/lib/town-pages";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  warnThinTownPages();
  return towns.map((town) => ({ town: town.slug }));
}

type TownRouteProps = {
  params: Promise<{ town: string }>;
};

export async function generateMetadata({ params }: TownRouteProps): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTown(slug);
  if (!town) {
    return {};
  }

  const metadata = pageMetadata(townPath(town.slug));
  if (assessTown(town).indexable) {
    return metadata;
  }

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ServiceAreaTownPage({ params }: TownRouteProps) {
  const { town: slug } = await params;
  const town = getTown(slug);
  if (!town) {
    notFound();
  }

  warnThinTownPages();
  return <TownPage town={town} />;
}
