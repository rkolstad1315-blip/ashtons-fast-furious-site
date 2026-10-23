import Link from "next/link";
import { book, business, callLabel } from "../../content/shell";

export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <Link
        href={book.href}
        className="inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-4 font-bold text-navy no-underline"
      >
        {book.mobileLabel}
      </Link>
      <a
        className="inline-flex min-h-11 items-center justify-center rounded-pill border border-slate-400 bg-slate-100 px-4 font-bold text-navy no-underline"
        href={`tel:${business.phoneTel}`}
      >
        {callLabel}
      </a>
    </nav>
  );
}
