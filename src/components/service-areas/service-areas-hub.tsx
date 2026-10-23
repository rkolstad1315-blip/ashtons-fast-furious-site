import Link from "next/link";
import { CountyMap } from "@/components/county-map";
import { JsonLd } from "@/components/json-ld";
import { home } from "../../../content/home";
import { getPage } from "../../../content/seo";
import { towns } from "../../../content/towns";
import {
  bookLabel,
  cardRouteLine,
  hubAlsoServingLine,
  hubCountyBlurb,
  townPath,
} from "@/lib/town-pages";

export function ServiceAreasHub() {
  const page = getPage("/service-areas/");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <JsonLd path="/service-areas/" />
      <h1
        id="service-areas-heading"
        className="m-0 max-w-3xl text-balance font-display text-4xl leading-none md:text-6xl"
      >
        {page.h1}
      </h1>
      <p className="m-0 mt-4 max-w-2xl text-lg text-slate-700">{hubCountyBlurb(towns)}</p>
      <CountyMap label={home.serviceArea.mapLabel} className="mt-8" />
      <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
        {towns.map((town) => (
          <li key={town.slug}>
            <article className="flex h-full flex-col rounded-card border border-slate-200 bg-slate-100 p-4">
              <h2 className="m-0 font-display text-3xl leading-none">
                <Link
                  href={townPath(town.slug)}
                  className="text-navy no-underline hover:text-brand"
                >
                  {town.displayName}
                </Link>
              </h2>
              <p className="m-0 mt-3 text-slate-700">{town.county} County</p>
              <p className="m-0 mt-2">{cardRouteLine(town)}</p>
            </article>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-8 text-slate-700">{hubAlsoServingLine}</p>
      <Link
        href="/book/"
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
