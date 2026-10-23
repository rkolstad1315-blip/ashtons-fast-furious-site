"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
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
    if (!node || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setNearViewport(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
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
