"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { observeOnce } from "@/lib/viewport-observer";
import { booking, bookingProgress } from "../../../content/booking";

const BookingForm = dynamic(() => import("./BookingForm").then((mod) => mod.BookingForm), {
  ssr: false,
  loading: () => <BookingFormFallback />,
});

export function BookingFormFallback() {
  return (
    <div className="min-h-[26rem]" aria-busy="true">
      <p className="m-0 text-sm font-semibold text-slate-600">{bookingProgress(1)}</p>
      <p className="mt-4 text-base">{booking.loadingLabel}</p>
    </div>
  );
}

export function BookingFormSlot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      const frame = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }

    // Shares the site wide IntersectionObserver; it loads the form a little before it scrolls in.
    return observeOnce(node, () => setNearViewport(true));
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[26rem]">
      {nearViewport ? (
        <Suspense fallback={<BookingFormFallback />}>
          <BookingForm />
        </Suspense>
      ) : (
        <BookingFormFallback />
      )}
    </div>
  );
}
