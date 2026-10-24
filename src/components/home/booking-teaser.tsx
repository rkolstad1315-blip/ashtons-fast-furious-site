import { Link } from "@/components/link";
import { home } from "../../../content/home";

export function BookingTeaser() {
  const copy = home.bookingTeaser;

  return (
    <section className="bg-navy text-white" data-reveal aria-labelledby="booking-teaser-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2
          id="booking-teaser-heading"
          className="m-0 max-w-3xl font-display text-4xl leading-none text-white md:text-5xl"
        >
          {copy.heading}
        </h2>
        <p className="m-0 mt-4 max-w-xl text-lg text-slate-200">{copy.body}</p>
        <Link
          href={copy.buttonHref}
          className="btn-accent mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
        >
          {copy.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
