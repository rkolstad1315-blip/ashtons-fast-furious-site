import { isPlaceholder } from "../../../content/placeholders";
import { reviews, reviewsNewestFirst, reviewsPage, type Review } from "../../../content/reviews";
import { getPage } from "../../../content/seo";
import { confirmedCopy, confirmedExternalUrl } from "@/lib/confirmed-copy";
import { PageFrame, PageH1 } from "./page-frame";

function visibleReviews(list: readonly Review[]): Review[] {
  return reviewsNewestFirst(list).filter(
    (review) =>
      !isPlaceholder(review.name) &&
      !isPlaceholder(review.town) &&
      !isPlaceholder(review.text) &&
      !isPlaceholder(review.date),
  );
}

function formatReviewDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) {
    return date;
  }
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(parsed));
}

function GoogleReviewButton({ href }: { href: string }) {
  return (
    <a
      className="inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-brand px-6 text-center text-lg font-bold text-white no-underline sm:w-auto"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {reviewsPage.googleReviewLabel}
    </a>
  );
}

export function ReviewsPage() {
  const page = getPage("/reviews/");
  const cards = visibleReviews(reviews);
  const invite = confirmedCopy(reviewsPage.emptyInvite);
  // The button has nowhere to go until the Google review link is confirmed.
  const reviewHref = confirmedExternalUrl(reviewsPage.googleReviewUrl);

  return (
    <PageFrame>
      <PageH1 id="reviews-heading">{page.h1}</PageH1>
      {cards.length === 0 ? (
        invite ? <p className="m-0 mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{invite}</p> : null
      ) : (
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {cards.map((review) => (
            <li key={`${review.date}-${review.name}`}>
              <article className="card h-full rounded-card border border-slate-200 bg-white p-4">
                <h2 className="m-0 font-display text-2xl leading-tight">{review.name}</h2>
                <p className="m-0 mt-1 text-sm font-semibold text-slate-600">{review.town}</p>
                <p className="m-0 mt-3 leading-relaxed text-slate-700">{review.text}</p>
                <p className="m-0 mt-3 text-sm text-slate-600">
                  <time dateTime={review.date}>{formatReviewDate(review.date)}</time>
                </p>
                <p className="m-0 mt-3 text-sm font-semibold text-navy">Google</p>
              </article>
            </li>
          ))}
        </ul>
      )}
      {reviewHref ? (
        <p className="m-0 mt-8">
          <GoogleReviewButton href={reviewHref} />
        </p>
      ) : null}
    </PageFrame>
  );
}
