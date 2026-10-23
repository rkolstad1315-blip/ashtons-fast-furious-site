import Image from "next/image";
import Link from "next/link";
import { book, business, menuLabel, navItems } from "../../content/shell";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4">
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
          <details>
            <summary className="menu-button">{menuLabel}</summary>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center font-semibold text-navy no-underline hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={book.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline"
                >
                  {book.label}
                </Link>
              </li>
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
}
