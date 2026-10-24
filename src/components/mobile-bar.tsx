import Link from "next/link";
import { Icon } from "@/components/icons";
import { book, business, callLabel } from "../../content/shell";

export function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <Link
        href={book.href}
        className="btn-accent inline-flex min-h-11 items-center justify-center rounded-pill bg-accent px-4 font-bold text-navy no-underline"
      >
        {book.mobileLabel}
      </Link>
      <a
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-slate-400 bg-slate-100 px-4 font-bold text-navy no-underline"
        href={`tel:${business.phoneTel}`}
      >
        <Icon name="phone" className="h-4 w-4" />
        {callLabel}
      </a>
    </nav>
  );
}
