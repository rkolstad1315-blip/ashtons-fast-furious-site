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

// The round logo is too detailed to read at header size, so a two line wordmark
// sits next to it: the first word, then the rest in brand blue, like the artwork.
const [wordmarkFirst, ...wordmarkRest] = business.name.split(" ");

// Static white bar on mobile. On desktop it is fixed, transparent over the
// homepage hero, and takes a glass state that shrinks with a transform on scroll.
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-bg" aria-hidden="true" />
      <div className="site-header-inner mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2.5 no-underline md:gap-3">
          <Image
            src={business.logoPath}
            alt=""
            width={56}
            height={56}
            loading="eager"
            className="h-12 w-12 md:h-14 md:w-14"
          />
          <span className="font-display text-base font-extrabold italic uppercase leading-[0.95] text-navy md:text-lg md:text-white">
            <span className="block">{wordmarkFirst} </span>
            <span className="block text-brand">{wordmarkRest.join(" ")}</span>
          </span>
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
