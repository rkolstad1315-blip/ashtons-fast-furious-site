import { isPlaceholder } from "../../content/placeholders";

export function confirmedCopy(value: string): string | null {
  if (isPlaceholder(value)) {
    return null;
  }
  return value;
}

export function confirmedExternalUrl(value: string): string | null {
  const urlText = confirmedCopy(value);
  if (!urlText) {
    return null;
  }

  try {
    const url = new URL(urlText);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}
