import { Fragment } from "react";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { home } from "../../../content/home";

export function HeroSection() {
  const { hero } = home;

  return (
    <section className="hero speed-bg" aria-labelledby="home-hero-heading">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 py-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-10 md:py-16">
        {/* On a phone the artwork is a 7 rem badge above the headline: small enough
            that the H1 stays the LCP element, and the 112 px slot keeps the request
            to the smallest variants. Desktop gets the full size logo beside the copy. */}
        <div className="hero-logo w-28 md:order-last md:w-full md:max-w-md">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 420px, 112px"
            className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start">
          <p className="m-0 inline-flex max-w-full items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            <span className="h-2 w-2 flex-none rounded-pill bg-accent" aria-hidden="true" />
            {hero.pill}
          </p>
          <h1
            id="home-hero-heading"
            className="m-0 mt-4 max-w-4xl font-display text-[2.4rem] font-extrabold italic uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl"
          >
            {hero.lines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 ? <span className="sr-only"> </span> : null}
                <span className={`hero-line hero-line-${index + 1}${index > 0 ? " text-brand" : ""}`}>
                  {line}
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="m-0 mt-5 max-w-xl text-lg leading-snug text-slate-200 md:text-xl">{hero.subhead}</p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={hero.bookHref}
              className="btn-accent inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-accent px-6 text-lg font-bold text-navy no-underline"
            >
              {hero.bookLabel}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <a href={hero.phoneHref} className="btn-ghost min-h-12">
              <Icon name="phone" className="h-4 w-4" />
              {hero.phoneLabel}
            </a>
          </div>
          <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm font-semibold text-slate-200">
            {hero.highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-pill bg-brand text-white">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
