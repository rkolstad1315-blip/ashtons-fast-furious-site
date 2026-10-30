import { PageHeader } from "@/components/page-header";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Link } from "@/components/link";
import { JsonLd } from "@/components/json-ld";
import { getPage } from "../../../content/seo";
import { business, callLabel } from "../../../content/shell";
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

const sectionHeading = "m-0 font-display text-3xl leading-none";

// Town pages are noindex until filled, but the footer links them, so any
// section whose fact is still a [PLACEHOLDER] is left out rather than shown.
export function TownPage({ town }: { town: Town }) {
  const page = getPage(townPath(town.slug));
  const copy = townPageCopy(town);
  const reviews = visibleReviews(town);
  const showPhoto = photoReady(town);
  const neighborhoods = town.neighborhoods.filter((neighborhood) => !isPlaceholder(neighborhood));
  const faqs = town.faqs
    .slice(0, 3)
    .filter((faq) => !isPlaceholder(faq.question) && !isPlaceholder(faq.answer));

  return (
    <>
      <PageHeader id="town-heading" title={page.h1} lede={copy.intro} />
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <JsonLd path={townPath(town.slug)} />
        <Link
          href="/service-areas/"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy no-underline hover:text-brand"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          {copy.backLabel}
        </Link>

        {/* Facts on the left, a sticky booking panel on the right. On a phone the panel
            follows the facts, so the call to action still closes the page. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            {neighborhoods.length > 0 ? (
              <section aria-labelledby="town-neighborhoods">
                <h2 id="town-neighborhoods" className={sectionHeading}>
                  {copy.neighborhoodsHeading}
                </h2>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {neighborhoods.map((neighborhood) => (
                    <li
                      key={neighborhood}
                      className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-slate-200 bg-slate-100 px-4 font-semibold"
                    >
                      <Icon name="pin" className="h-4 w-4 text-brand" />
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {isPlaceholder(copy.routeBody) ? null : (
              <section className="mt-10" data-reveal aria-labelledby="town-route-days">
                <h2 id="town-route-days" className={sectionHeading}>
                  {copy.routeHeading}
                </h2>
                <p className="m-0 mt-4 max-w-2xl">{copy.routeBody}</p>
              </section>
            )}

            {isPlaceholder(copy.feeBody) ? null : (
              <section className="mt-10" data-reveal aria-labelledby="town-travel-fee">
                <h2 id="town-travel-fee" className={sectionHeading}>
                  {copy.feeHeading}
                </h2>
                <p className="m-0 mt-4 max-w-2xl">{copy.feeBody}</p>
              </section>
            )}

            {isPlaceholder(copy.noteBody) ? null : (
              <section className="mt-10" data-reveal aria-labelledby="town-local-note">
                <h2 id="town-local-note" className={sectionHeading}>
                  {copy.noteHeading}
                </h2>
                <p className="m-0 mt-4 max-w-2xl">{copy.noteBody}</p>
              </section>
            )}

            {reviews.length > 0 ? (
              <section className="mt-10" data-reveal aria-labelledby="town-reviews">
                <h2 id="town-reviews" className={sectionHeading}>
                  {copy.reviewsHeading}
                </h2>
                <ul className="m-0 mt-4 grid list-none gap-4 p-0">
                  {reviews.map((review) => (
                    <li key={`${review.name}-${review.date}`} className="panel p-5">
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

            {showPhoto ? (
              <section className="mt-10" data-reveal aria-labelledby="town-photo">
                <h2 id="town-photo" className={sectionHeading}>
                  {copy.photoHeading}
                </h2>
                <figure className="m-0 mt-4 max-w-3xl">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-panel">
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
              </section>
            ) : null}

            {faqs.length > 0 ? (
              <section className="mt-10" data-reveal aria-labelledby="town-faqs">
                <h2 id="town-faqs" className={sectionHeading}>
                  {copy.faqsHeading}
                </h2>
                <div className="mt-4 grid gap-4">
                  {faqs.map((faq) => (
                    <article key={faq.question} className="panel p-5 md:p-6">
                      <h3 className="m-0 font-display text-2xl leading-tight">{faq.question}</h3>
                      <p className="m-0 mt-2 max-w-2xl text-slate-700">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="panel p-6 lg:sticky lg:top-28" aria-label={town.displayName}>
            <p className="eyebrow">{town.county} County</p>
            <p className="m-0 mt-3 font-display text-4xl leading-none">{town.displayName}</p>
            <Link
              href={townBookHref(town.slug)}
              className="btn-accent mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 text-lg font-bold text-navy no-underline"
            >
              {bookLabel}
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <a href={`tel:${business.phoneTel}`} className="btn-outline mt-3 w-full">
              <Icon name="phone" className="h-4 w-4" />
              {callLabel} {business.phoneDisplay}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
