import type { ReactNode } from "react";

export function BookingFormSlot({ children }: { children?: ReactNode }) {
  return (
    <div id="booking-form" className="mt-8" data-booking-form-slot="ticket-06">
      {/* TODO: ticket 06 BookingForm mounts here */}
      {children}
    </div>
  );
}
