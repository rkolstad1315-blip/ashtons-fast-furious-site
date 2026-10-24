import { Fragment } from "react";
import Image from "next/image";
import { Link } from "@/components/link";
import { home } from "../../../content/home";

export function HeroSection() {
  const { hero } = home;

  return (
    <section className="hero" aria-labelledby="home-hero-heading">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width}
        height={hero.image.height}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="hero-overlay" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-4 py-10 md:py-16">
        <p className="m-0 inline-flex max-w-full rounded-pill border border-white/40 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
          {hero.pill}
        </p>
        <h1
          id="home-hero-heading"
          className="m-0 mt-4 max-w-4xl font-display text-[2.15rem] font-extrabold italic leading-[0.92] text-white sm:text-6xl md:text-7xl"
        >
          {hero.lines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? <span className="sr-only"> </span> : null}
              <span className={`hero-line hero-line-${index + 1}`}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <p className="m-0 mt-4 max-w-xl text-lg leading-snug text-white">{hero.subhead}</p>
        <Link
          href={hero.bookHref}
          className="btn-accent mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
        >
          {hero.bookLabel}
        </Link>
        <a
          href={hero.phoneHref}
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-slate-200 underline-offset-4 hover:underline"
        >
          {hero.phoneLabel}
        </a>
      </div>
    </section>
  );
}
