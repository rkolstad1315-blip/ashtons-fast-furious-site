import { CountyMap } from "@/components/county-map";
import { home } from "../../../content/home";
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
    <section className="bg-slate-100" aria-labelledby="service-area-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="service-area-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {copy.heading}
        </h2>
        <CountyMap label={copy.mapLabel} className="mt-8" />
        <p className="m-0 mt-6 font-semibold">{copy.alsoServing}</p>
        <p className="m-0 mt-1 text-slate-700">{plainList(hubOnlyTowns.map((town) => town.name))}</p>
      </div>
    </section>
  );
}
