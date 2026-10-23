import Link from "next/link";
import { BookingFormSlot } from "@/components/booking-form-slot";
import { bookPage } from "../../../content/book";
import { business } from "../../../content/business";
import { getPage } from "../../../content/seo";
import { towns } from "../../../content/towns";
import { confirmedCopy } from "@/lib/confirmed-copy";
import { PageFrame, PageH1 } from "./page-frame";

const phoneLinkClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-pill border border-slate-400 bg-slate-100 px-5 font-bold text-navy no-underline sm:w-auto";

export function BookPage() {
  const page = getPage("/book/");
  const responseTime = confirmedCopy(bookPage.responseTimeLine);

  return (
    <PageFrame>
      <PageH1 id="book-heading">{page.h1}</PageH1>
      <BookingFormSlot />
      {responseTime ? (
        <p className="m-0 mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{responseTime}</p>
      ) : null}
      <section className="mt-10" aria-labelledby="book-phone">
        <h2 id="book-phone" className="m-0 font-display text-3xl leading-none md:text-4xl">
          {bookPage.phoneHeading}
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a className={phoneLinkClass} href={`tel:${business.phoneE164}`}>
            {bookPage.callLabel}
          </a>
          <a className={phoneLinkClass} href={`sms:${business.phoneE164}`}>
            {bookPage.textLabel}
          </a>
        </div>
      </section>
      <section className="mt-10" aria-labelledby="book-areas">
        <h2 id="book-areas" className="m-0 font-display text-3xl leading-none md:text-4xl">
          {bookPage.areasHeading}
        </h2>
        <p className="m-0 mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
          {bookPage.areasIntro}
        </p>
        <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
          {towns.map((town) => (
            <li key={town.slug}>
              <Link
                href={`/service-areas/${town.slug}/`}
                className="inline-flex min-h-11 items-center font-bold text-navy underline"
              >
                {town.displayName}, {town.county} County, NC
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  );
}
