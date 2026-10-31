import { CountyMap } from "@/components/county-map";
import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { SectionHeading } from "@/components/section-heading";
import { home } from "../../../content/home";
import { footerTowns } from "../../../content/shell";
import { hubOnlyTowns } from "../../../content/towns";

function plainList(names: readonly string[]): string {
  if (names.length <= 1) {
    return names.join("");
  }
  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }
  const last = names[names.length - 1] ?? "";
  return `${names.slice(0, -1).join(", ")}, and ${last}`;
}

export function ServiceAreaMap() {
  const copy = home.serviceArea;

  return (
    <section className="bg-white" data-reveal aria-labelledby="service-area-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <SectionHeading id="service-area-heading" eyebrow={copy.eyebrow} title={copy.heading} />
          <ul className="m-0 mt-8 flex list-none flex-col gap-3 p-0">
            {footerTowns.map((town) => (
              <li key={town.href}>
                <Link
                  href={town.href}
                  className="panel flex min-h-14 items-center gap-3 px-5 font-bold text-navy no-underline transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon name="pin" className="h-5 w-5 text-brand" />
                  <span className="flex-1">{town.label}</span>
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-6 font-semibold">{copy.alsoServing}</p>
          <p className="m-0 mt-1 text-slate-700">{plainList(hubOnlyTowns.map((town) => town.name))}</p>
        </div>
        <div className="panel bg-brand-50 p-4 md:p-6">
          <CountyMap label={copy.mapLabel} />
        </div>
      </div>
    </section>
  );
}
