import Image from "next/image";
import { Link } from "@/components/link";
import { Icon } from "@/components/icons";
import { book, business, menuLabel, navItems } from "../../content/shell";

function NavLinks() {
  return (
    <>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="inline-flex min-h-11 items-center font-semibold text-navy no-underline hover:text-brand md:text-white md:hover:text-brand"
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={book.href}
          className="btn-accent inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline"
        >
          {book.label}
        </Link>
      </li>
    </>
  );
}

// Static white bar on mobile. On desktop it is fixed, transparent over the
// homepage hero, and takes a glass state that shrinks with a transform on scroll.
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-bg" aria-hidden="true" />
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={business.name}
            width={120}
            height={32}
            className="h-8 w-[120px]"
          />
        </Link>
        <nav className="site-nav" aria-label="Main">
          {/* Closed <details> content cannot be forced visible in every browser, so desktop gets its own list. */}
          <details className="md:hidden">
            <summary className="menu-button">
              <Icon name="menu" className="h-5 w-5" />
              {menuLabel}
            </summary>
            <ul>
              <NavLinks />
            </ul>
          </details>
          <ul className="hidden items-center gap-6 md:flex">
            <NavLinks />
          </ul>
        </nav>
      </div>
    </header>
  );
}
