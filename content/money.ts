export function formatDollars(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new Error("Price is not a finite number.");
  }

  const cents = Math.round(amount * 100);
  const negative = cents < 0;
  const absolute = Math.abs(cents);
  const dollars = Math.floor(absolute / 100);
  const remainder = absolute % 100;
  const body =
    remainder === 0 ? String(dollars) : `${dollars}.${String(remainder).padStart(2, "0")}`;

  return `${negative ? "-" : ""}$${body}`;
}
