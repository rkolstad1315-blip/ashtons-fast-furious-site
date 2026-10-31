import { PageHeader } from "@/components/page-header";
import { Icon } from "@/components/icons";
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
        {/* Map and town list sit side by side on desktop, so neither leaves half the row empty. */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          <div className="panel bg-brand-50 p-4 md:p-6">
            <CountyMap label={home.serviceArea.mapLabel} />
          </div>
          <div>
            <ul className="m-0 grid list-none gap-4 p-0">
              {towns.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={townPath(town.slug)}
                    className="panel card flex h-full items-center gap-4 p-5 text-navy no-underline transition-colors hover:border-brand"
                  >
                    <span className="icon-chip">
                      <Icon name="pin" className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <h2 className="m-0 font-display text-2xl leading-none md:text-3xl">{town.displayName}</h2>
                      <span className="mt-1 block text-slate-700">{town.county} County</span>
                      {isPlaceholder(town.routeDays) ? null : (
                        <span className="mt-1 block">{cardRouteLine(town)}</span>
                      )}
                    </span>
                    <Icon name="arrow" className="h-5 w-5 flex-none text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="m-0 mt-6 text-slate-700">{hubAlsoServingLine}</p>
            <Link
              href="/book/"
              className="btn-accent mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 text-lg font-bold text-navy no-underline sm:w-auto"
            >
              {bookLabel}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
