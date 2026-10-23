import { BookingFormSlot as LazyBookingForm } from "@/components/booking/BookingFormSlot";

export function BookingFormSlot() {
  return (
    <div id="booking-form" className="mt-8">
      <LazyBookingForm />
    </div>
  );
}
