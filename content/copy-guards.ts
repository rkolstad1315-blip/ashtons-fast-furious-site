import { collectPlaceholders } from "./placeholders";

const dash = /[\u2013\u2014]/;
const paceClaim = /sets the pace|no motor|without a motor|non-?motorized|slatmill/i;

export function assertVisitorCopy(value: unknown, label: string): void {
  const text = JSON.stringify(value);
  if (dash.test(text)) {
    throw new Error(`Em dash or en dash in ${label}.`);
  }
  if (paceClaim.test(text)) {
    throw new Error(`Unconfirmed pace or motor claim in ${label}.`);
  }
  const hits = collectPlaceholders(value);
  if (hits.length > 0) {
    throw new Error(
      `Placeholder visible in ${label}: ${hits.map((hit) => hit.value).join(", ")}`,
    );
  }
}
