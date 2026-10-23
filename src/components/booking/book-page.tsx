import { Suspense } from "react";
import { getPage } from "../../../content/seo";
import { BookingFormFallback, BookingFormSlot } from "./BookingFormSlot";

export function BookPage() {
  const page = getPage("/book/");

  return (
    <article className="mx-auto w-full max-w-xl px-4 py-8">
      <h1 className="m-0 text-4xl leading-none">{page.h1}</h1>
      <div className="mt-6">
        <Suspense fallback={<BookingFormFallback />}>
          <BookingFormSlot />
        </Suspense>
      </div>
    </article>
  );
}
