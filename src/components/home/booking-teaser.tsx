import Image from "next/image";
import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { home } from "../../../content/home";
import { business } from "../../../content/shell";

export function BookingTeaser() {
  const copy = home.bookingTeaser;

  return (
    <section className="speed-bg" data-reveal aria-labelledby="booking-teaser-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:py-24">
        <div>
          <h2
            id="booking-teaser-heading"
            className="m-0 max-w-3xl font-display text-4xl italic uppercase leading-none text-white md:text-6xl"
          >
            {copy.heading}
          </h2>
          <p className="m-0 mt-4 max-w-xl text-lg text-slate-200">{copy.body}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={copy.buttonHref}
              className="btn-accent inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-accent px-6 text-lg font-bold text-navy no-underline"
            >
              {copy.buttonLabel}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <a href={copy.phoneHref} className="btn-ghost min-h-12">
              <Icon name="phone" className="h-4 w-4" />
              {copy.phoneLabel}
            </a>
          </div>
        </div>
        <Image
          src={business.logoPath}
          alt=""
          width={256}
          height={256}
          loading="lazy"
          className="order-first h-36 w-36 md:order-none md:h-56 md:w-56"
        />
      </div>
    </section>
  );
}
