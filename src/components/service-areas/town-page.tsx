import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getPage } from "../../../content/seo";
import type { Town } from "../../../content/towns";
import {
  bookLabel,
  townBookHref,
  townPageCopy,
  townPath,
  visibleReviews,
} from "@/lib/town-pages";
import { isPlaceholder } from "../../../content/placeholders";

function photoReady(town: Town): boolean {
  return !isPlaceholder(town.photoPath) && town.photoPath.startsWith("/");
}

export function TownPage({ town }: { town: Town }) {
  const page = getPage(townPath(town.slug));
  const copy = townPageCopy(town);
  const reviews = visibleReviews(town);
  const showPhoto = photoReady(town);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <JsonLd path={townPath(town.slug)} />
      <h1
        id="town-heading"
        className="m-0 max-w-3xl text-balance font-display text-4xl leading-none md:text-6xl"
      >
        {page.h1}
      </h1>
      <p className="m-0 mt-4 max-w-2xl text-lg text-slate-700">{copy.intro}</p>
      <p className="m-0 mt-3">
        <Link href="/service-areas/" className="font-semibold text-navy hover:text-brand">
          {copy.backLabel}
        </Link>
      </p>

      <section className="mt-10" aria-labelledby="town-neighborhoods">
        <h2 id="town-neighborhoods" className="m-0 font-display text-3xl leading-none">
          {copy.neighborhoodsHeading}
        </h2>
        <ul className="m-0 mt-4 list-disc space-y-1 pl-5">
          {town.neighborhoods.map((neighborhood) => (
            <li key={neighborhood}>{neighborhood}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10" data-reveal aria-labelledby="town-route-days">
        <h2 id="town-route-days" className="m-0 font-display text-3xl leading-none">
          {copy.routeHeading}
        </h2>
        <p className="m-0 mt-4 max-w-2xl">{copy.routeBody}</p>
      </section>

      <section className="mt-10" data-reveal aria-labelledby="town-travel-fee">
        <h2 id="town-travel-fee" className="m-0 font-display text-3xl leading-none">
          {copy.feeHeading}
        </h2>
        <p className="m-0 mt-4 max-w-2xl">{copy.feeBody}</p>
      </section>

      <section className="mt-10" data-reveal aria-labelledby="town-local-note">
        <h2 id="town-local-note" className="m-0 font-display text-3xl leading-none">
          {copy.noteHeading}
        </h2>
        <p className="m-0 mt-4 max-w-2xl">{copy.noteBody}</p>
      </section>

      {reviews.length > 0 ? (
        <section className="mt-10" data-reveal aria-labelledby="town-reviews">
          <h2 id="town-reviews" className="m-0 font-display text-3xl leading-none">
            {copy.reviewsHeading}
          </h2>
          <ul className="m-0 mt-4 grid list-none gap-4 p-0">
            {reviews.map((review) => (
              <li
                key={`${review.name}-${review.date}`}
                className="rounded-card border border-slate-200 bg-slate-100 p-4"
              >
                <p className="m-0">{review.text}</p>
                <p className="m-0 mt-3 font-semibold">
                  {review.name}, {review.town}
                </p>
                <p className="m-0 text-sm text-slate-600">{review.date}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10" data-reveal aria-labelledby="town-photo">
        <h2 id="town-photo" className="m-0 font-display text-3xl leading-none">
          {copy.photoHeading}
        </h2>
        {showPhoto ? (
          <figure className="m-0 mt-4 max-w-3xl">
            <div className="relative aspect-[3/2] overflow-hidden rounded-card">
              <Image
                src={town.photoPath}
                alt={copy.photoAlt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-slate-700">{copy.photoLabel}</figcaption>
          </figure>
        ) : (
          <p className="m-0 mt-4 max-w-2xl rounded-card border border-dashed border-slate-400 bg-slate-100 px-4 py-6 text-slate-700">
            {copy.photoLabel}
          </p>
        )}
      </section>

      <section className="mt-10" data-reveal aria-labelledby="town-faqs">
        <h2 id="town-faqs" className="m-0 font-display text-3xl leading-none">
          {copy.faqsHeading}
        </h2>
        <div className="mt-4 grid gap-6">
          {town.faqs.slice(0, 3).map((faq) => (
            <article key={faq.question}>
              <h3 className="m-0 font-display text-2xl leading-tight">{faq.question}</h3>
              <p className="m-0 mt-2 max-w-2xl">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Link
        href={townBookHref(town.slug)}
        className="btn-accent mt-10 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
      >
        {bookLabel}
      </Link>
    </div>
  );
}
