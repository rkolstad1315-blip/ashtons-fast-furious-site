import { home } from "../../../content/home";
import { isPlaceholder } from "../../../content/placeholders";
import { googleProfileUrl, reviews } from "../../../content/reviews";

const minimumReviews = 3;

export function ReviewsPreview() {
  if (reviews.length < minimumReviews) {
    return null;
  }

  const copy = home.reviewsPreview;
  const profileUrl = isPlaceholder(googleProfileUrl) ? null : googleProfileUrl;

  return (
    <section className="bg-white" data-reveal aria-labelledby="reviews-preview-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="reviews-preview-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {copy.heading}
        </h2>
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.date}`} className="min-w-0">
              <figure className="card m-0 flex h-full flex-col rounded-card border border-slate-200 bg-slate-100 p-5">
                <blockquote className="m-0 flex-1">
                  <p className="m-0">{review.text}</p>
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <p className="m-0 font-semibold">{review.name}</p>
                  <p className="m-0 text-slate-600">{review.town}</p>
                  <p className="m-0 text-slate-600">{review.date}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {profileUrl ? (
          <a
            href={profileUrl}
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4"
          >
            {copy.googleLinkLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
