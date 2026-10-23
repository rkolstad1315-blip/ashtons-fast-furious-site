export type PlaceholderHit = {
  path: string;
  value: string;
};

const placeholderPattern = /\[[^[\]]+\]/;
const placeholderScan = /\[[^[\]]+\]/g;

export function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && placeholderPattern.test(value);
}

export function collectPlaceholders(value: unknown, path = "content"): PlaceholderHit[] {
  if (typeof value === "string") {
    const matches = value.match(placeholderScan);
    if (!matches) {
      return [];
    }
    return matches.map((match) => ({ path, value: match }));
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectPlaceholders(item, `${path}[${index}]`));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectPlaceholders(item, `${path}.${key}`),
    );
  }

  return [];
}

let warned = false;

export function warnContentPlaceholders(tree: unknown): void {
  if (process.env.NODE_ENV !== "development" || warned) {
    return;
  }

  const hits = collectPlaceholders(tree);
  if (hits.length === 0) {
    return;
  }

  warned = true;
  console.warn(
    `Content still has ${hits.length} placeholders:\n${hits
      .map((hit) => `${hit.path}: ${hit.value}`)
      .join("\n")}`,
  );
}
