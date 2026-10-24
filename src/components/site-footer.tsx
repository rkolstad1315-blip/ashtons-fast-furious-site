import { Link } from "@/components/link";
import { priceRange } from "../../content/seo";
import { business, footerTowns, legalLinks } from "../../content/shell";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-8">
        <p className="m-0 font-display text-xl font-extrabold">{business.name}</p>
        <p className="m-0">
          <a className="text-white hover:text-brand" href={`tel:${business.phoneTel}`}>
            {business.phoneDisplay}
          </a>
        </p>
        <p className="m-0">
          <a className="text-white hover:text-brand" href={`mailto:${business.email}`}>
            {business.email}
          </a>
        </p>
        <p className="m-0">{business.hours}</p>
        <p className="m-0">{priceRange}</p>
        <nav aria-label="Service areas">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {footerTowns.map((town) => (
              <li key={town.href}>
                <Link className="text-white hover:text-brand" href={town.href}>
                  {town.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="text-white hover:text-brand" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
