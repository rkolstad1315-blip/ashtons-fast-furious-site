import { Link } from "@/components/link";
import type { ReactNode } from "react";

export function PageFrame({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">{children}</div>;
}

export function PageH1({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h1 id={id} className="m-0 max-w-4xl font-display text-4xl font-extrabold leading-none md:text-6xl">
      {children}
    </h1>
  );
}

export function TextSection({
  id,
  heading,
  body,
}: {
  id: string;
  heading: string;
  body: string | null;
}) {
  if (!body) {
    return null;
  }

  return (
    <section className="mt-10" data-reveal aria-labelledby={id}>
      <h2 id={id} className="m-0 font-display text-3xl leading-none md:text-4xl">
        {heading}
      </h2>
      <p className="m-0 mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{body}</p>
    </section>
  );
}

export function BookCta({ href, label }: { href: string; label: string }) {
  return (
    <p className="m-0 mt-10">
      <Link
        href={href}
        className="btn-accent inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
      >
        {label}
      </Link>
    </p>
  );
}
