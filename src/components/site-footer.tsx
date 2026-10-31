import Image from "next/image";
import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { priceRange } from "../../content/seo";
import { business, footerHeadings, footerTowns, legalLinks, navItems } from "../../content/shell";
import { blogPage } from "../../content/blog-page";
import { publishablePosts } from "@/lib/blog";

const footerHeading = "m-0 text-xs font-bold uppercase tracking-[0.14em] text-slate-400";
const footerLink = "text-slate-200 no-underline hover:text-white";

export function SiteFooter() {
  const showBlog = publishablePosts().length > 0;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-brand bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-4">
          {/* 64 px reuses the header logo file, so the footer adds no request. */}
          <Image src={business.logoPath} alt="" width={64} height={64} loading="lazy" className="h-16 w-16" />
          <p className="m-0 font-display text-2xl font-extrabold italic">{business.name}</p>
          <p className="m-0 text-slate-200">
            {business.hours}
            <br />
            {priceRange}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className={footerHeading}>{footerHeadings.contact}</p>
          <a className={`${footerLink} inline-flex items-center gap-2`} href={`tel:${business.phoneTel}`}>
            <Icon name="phone" className="h-4 w-4 text-brand" />
            {business.phoneDisplay}
          </a>
          <a className={`${footerLink} inline-flex items-center gap-2 [overflow-wrap:anywhere]`} href={`mailto:${business.email}`}>
            <Icon name="mail" className="h-4 w-4 flex-none text-brand" />
            {business.email}
          </a>
        </div>
        <nav aria-label="Service areas" className="flex flex-col gap-3">
          <p className={footerHeading}>{footerHeadings.serviceAreas}</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {footerTowns.map((town) => (
              <li key={town.href}>
                <Link className={footerLink} href={town.href}>
                  {town.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Site" className="flex flex-col gap-3">
          <p className={footerHeading}>{footerHeadings.explore}</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className={footerLink} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            {showBlog ? (
              <li>
                <Link className={footerLink} href={blogPage.path}>
                  {blogPage.footerLabel}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <nav
          aria-label="Legal"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-slate-400"
        >
          <p className="m-0">
            &copy; {year} {business.name}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="text-slate-400 no-underline hover:text-white" href={item.href}>
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
