// Placeholder report for launch (ticket 14).
//
//   npm run build && npm run placeholders
//
// Lists every [BRACKETED PLACEHOLDER] in /content with its file and line, and
// says whether that text is visible in any prerendered page (HTML or JSON-LD)
// from the last build. A visible placeholder blocks launch, so the script
// exits non zero when it finds one. Hidden placeholders are listed too: their
// sections stay hidden until the owner confirms the value.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const contentDir = join(root, "content");
const buildDir = join(root, ".next", "server", "app");

function walk(dir, keep) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, keep));
    } else if (keep(full)) {
      out.push(full);
    }
  }
  return out;
}

let pages;
try {
  pages = walk(buildDir, (file) => file.endsWith(".html")).map((file) => {
    const html = readFileSync(file, "utf8");
    return {
      route: `/${relative(buildDir, file).replace(/index\.html$/, "").replace(/\.html$/, "/")}`.replace(/\/\/$/, "/"),
      html,
      indexable: !/name="robots" content="noindex/.test(html),
    };
  });
} catch {
  console.error("No build output in .next/server/app. Run npm run build first.");
  process.exit(2);
}

const placeholderPattern = /\[[A-Z][A-Za-z0-9 ,&'./:-]*\]/g;
const hits = [];
for (const file of walk(contentDir, (f) => f.endsWith(".ts") && !f.endsWith("placeholders.ts") && !f.endsWith("copy-guards.ts"))) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (/^\s*(\/\/|\*)/.test(line)) {
      return; // comments
    }
    for (const match of line.match(placeholderPattern) ?? []) {
      hits.push({ file: relative(root, file), line: index + 1, value: match });
    }
  });
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// Group by placeholder text: the same token can come from several lines, and
// the built HTML only tells us which token is visible, not which line wrote it.
const byValue = new Map();
for (const hit of hits) {
  const group = byValue.get(hit.value) ?? { value: hit.value, sources: new Set(), indexable: [], noindex: [] };
  group.sources.add(`${hit.file}:${hit.line}`);
  byValue.set(hit.value, group);
}
for (const group of byValue.values()) {
  const needles = [group.value, escapeHtml(group.value), group.value.replaceAll("'", "&#x27;"), JSON.stringify(group.value).slice(1, -1)];
  for (const page of pages) {
    if (needles.some((needle) => page.html.includes(needle))) {
      (page.indexable ? group.indexable : group.noindex).push(page.route);
    }
  }
}
const report = [...byValue.values()].sort((a, b) => (b.indexable.length - a.indexable.length) || (b.noindex.length - a.noindex.length) || a.value.localeCompare(b.value));

const blocking = report.filter((group) => group.indexable.length > 0);
const noindexOnly = report.filter((group) => group.indexable.length === 0 && group.noindex.length > 0);
const hidden = report.filter((group) => group.indexable.length === 0 && group.noindex.length === 0);
const list = (group) => [...group.sources].sort().join(", ");

console.log(`Checked ${pages.length} prerendered pages (${pages.filter((page) => page.indexable).length} indexable) against ${hits.length} placeholder occurrences, ${report.length} distinct values.\n`);
if (blocking.length > 0) {
  console.log("VISIBLE ON INDEXABLE PAGES (blocks launch):");
  for (const group of blocking) {
    console.log(`  ${group.value}\n    pages: ${group.indexable.join(", ")}\n    from: ${list(group)}`);
  }
  console.log("");
}
if (noindexOnly.length > 0) {
  console.log("VISIBLE ONLY ON NOINDEX PAGES (town pages stay noindex until their facts are confirmed):");
  for (const group of noindexOnly) {
    console.log(`  ${group.value}\n    pages: ${group.noindex.join(", ")}\n    from: ${list(group)}`);
  }
  console.log("");
}
console.log("HIDDEN (the section or value stays out of every page until confirmed):");
for (const group of hidden) {
  console.log(`  ${group.value}  ${list(group)}`);
}

if (blocking.length > 0) {
  console.error(`\nLAUNCH BLOCKED: ${blocking.length} placeholder value${blocking.length === 1 ? "" : "s"} visible on indexable pages.`);
  process.exit(1);
}
console.log("\nNo placeholder is visible on any indexable page.");
