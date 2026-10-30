import { PageHeader } from "@/components/page-header";
import { Link } from "@/components/link";
import { CountyMap } from "@/components/county-map";
import { JsonLd } from "@/components/json-ld";
import { home } from "../../../content/home";
import { getPage } from "../../../content/seo";
import { isPlaceholder } from "../../../content/placeholders";
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
    <>
      <PageHeader id="service-areas-heading" title={page.h1} lede={hubCountyBlurb(towns)} />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <JsonLd path="/service-areas/" />
        <CountyMap label={home.serviceArea.mapLabel} />
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {towns.map((town) => (
            <li key={town.slug}>
              <article className="card flex h-full flex-col rounded-card border border-slate-200 bg-slate-100 p-4">
                <h2 className="m-0 font-display text-3xl leading-none">
                  <Link
                    href={townPath(town.slug)}
                    className="text-navy no-underline hover:text-brand"
                  >
                    {town.displayName}
                  </Link>
                </h2>
                <p className="m-0 mt-3 text-slate-700">{town.county} County</p>
                {isPlaceholder(town.routeDays) ? null : (
                  <p className="m-0 mt-2">{cardRouteLine(town)}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
        <p className="m-0 mt-8 text-slate-700">{hubAlsoServingLine}</p>
        <Link
          href="/book/"
          className="btn-accent mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
        >
          {bookLabel}
        </Link>
      </div>
    </>
  );
}
