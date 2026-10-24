// Runs Lighthouse mobile (simulated throttling) on every route in the sitemap
// and fails when any page misses a hard limit from the build spec.
//
//   npm run build && npm run start      (in one terminal)
//   npm run perf                        (in another)
//
// Options:
//   --base <url>     Site to test. Default http://localhost:3000
//   --runs <n>       Lighthouse runs per URL; the median is reported. Default 3
//   --js-limit <kb>  Hard limit for first load JS in KB. Default 100, from the spec
//   --json <file>    Also write the full results as JSON
//   --route <path>   Test only this route (repeatable); skips the sitemap
//
// Chrome comes from CHROME_PATH when set, otherwise chrome-launcher finds one.
import { writeFileSync } from "node:fs";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const budget = {
  score: { target: 98, limit: 95, unit: "", higherIsBetter: true },
  lcp: { target: 1800, limit: 2500, unit: "ms" },
  inp: { target: 100, limit: 200, unit: "ms" },
  cls: { target: 0.02, limit: 0.1, unit: "" },
  fcp: { target: 1200, limit: 1800, unit: "ms" },
  tbt: { target: 50, limit: 150, unit: "ms" },
  js: { target: 70 * 1024, limit: 100 * 1024, unit: "B" },
  weight: { target: 500 * 1024, limit: 900 * 1024, unit: "B" },
  hero: { target: 80 * 1024, limit: 150 * 1024, unit: "B" },
};

const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}
function options(name) {
  return args.flatMap((arg, index) => (arg === name ? [args[index + 1]] : []));
}

const base = (option("--base", process.env.PERF_BASE_URL ?? "http://localhost:3000")).replace(/\/$/, "");
const runs = Math.max(1, Number(option("--runs", "3")) || 3);
const jsLimitKb = Number(option("--js-limit", "100")) || 100;
budget.js.limit = jsLimitKb * 1024;
const jsonOut = option("--json", null);
const onlyRoutes = options("--route");

async function routesFromSitemap() {
  const response = await fetch(`${base}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Could not fetch ${base}/sitemap.xml (${response.status}). Is the server running?`);
  }
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  if (locs.length === 0) {
    throw new Error("The sitemap has no URLs.");
  }
  return locs;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function measure(lhr, url) {
  const audits = lhr.audits;
  const requests = audits["network-requests"]?.details?.items ?? [];
  const scripts = requests.filter((item) => item.resourceType === "Script");
  const js = scripts.reduce((sum, item) => sum + (item.transferSize || 0), 0);
  const lcpNode = (audits["lcp-breakdown-insight"]?.details?.items ?? []).find((item) => item.type === "node");
  const lcpIsImage = lcpNode?.snippet?.startsWith("<img") ?? false;
  const heroRequest = lcpIsImage
    ? requests
        .filter((item) => item.resourceType === "Image")
        .sort((a, b) => a.networkRequestTime - b.networkRequestTime)[0]
    : null;
  const thirdParty = requests.filter((item) => {
    try {
      return new URL(item.url).origin !== new URL(url).origin;
    } catch {
      return false;
    }
  });
  return {
    score: Math.round((lhr.categories.performance.score ?? 0) * 100),
    lcp: audits["largest-contentful-paint"].numericValue,
    // Lighthouse cannot measure INP in the lab. TBT stands in, as the spec's lab proxy.
    inp: audits["total-blocking-time"].numericValue,
    cls: audits["cumulative-layout-shift"].numericValue,
    fcp: audits["first-contentful-paint"].numericValue,
    tbt: audits["total-blocking-time"].numericValue,
    js,
    weight: audits["total-byte-weight"].numericValue,
    hero: heroRequest ? heroRequest.transferSize : null,
    lcpElement: lcpNode?.selector ?? "",
    thirdParty: thirdParty.map((item) => item.url),
    scripts: scripts.map((item) => ({ url: item.url.replace(base, ""), bytes: item.transferSize })),
  };
}

function format(key, value) {
  if (value === null || value === undefined) {
    return "n/a";
  }
  if (key === "cls") {
    return value.toFixed(3);
  }
  if (budget[key].unit === "ms") {
    return `${(value / 1000).toFixed(2)} s`;
  }
  if (budget[key].unit === "B") {
    return `${(value / 1024).toFixed(1)} KB`;
  }
  return String(value);
}

function judge(key, value) {
  if (value === null || value === undefined) {
    return "n/a";
  }
  const rule = budget[key];
  const missesLimit = rule.higherIsBetter ? value < rule.limit : value > rule.limit;
  const missesTarget = rule.higherIsBetter ? value < rule.target : value > rule.target;
  if (missesLimit) {
    return "FAIL";
  }
  return missesTarget ? "warn" : "ok";
}

const chromePath = process.env.CHROME_PATH;
const chrome = await launch({
  ...(chromePath ? { chromePath } : {}),
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

const results = [];
let failed = false;
try {
  const routes = onlyRoutes.length > 0 ? onlyRoutes : await routesFromSitemap();
  console.log(`Lighthouse mobile on ${routes.length} routes at ${base} (${runs} run${runs === 1 ? "" : "s"} each)\n`);

  for (const route of routes) {
    const url = `${base}${route}`;
    const samples = [];
    for (let run = 0; run < runs; run += 1) {
      const result = await lighthouse(url, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance"],
        formFactor: "mobile",
        throttlingMethod: "simulate",
        screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
      });
      samples.push(measure(result.lhr, url));
    }
    const row = { route };
    for (const key of Object.keys(budget)) {
      const values = samples.map((sample) => sample[key]).filter((value) => value !== null && value !== undefined);
      row[key] = values.length > 0 ? median(values) : null;
    }
    row.lcpElement = samples[0].lcpElement;
    row.thirdParty = samples[0].thirdParty;
    row.scripts = samples[0].scripts;
    row.verdicts = Object.fromEntries(Object.keys(budget).map((key) => [key, judge(key, row[key])]));
    if (Object.values(row.verdicts).includes("FAIL")) {
      failed = true;
    }
    results.push(row);

    const cells = Object.keys(budget).map((key) => `${key} ${format(key, row[key])} ${row.verdicts[key]}`);
    console.log(`${route}\n  ${cells.join(" | ")}`);
    if (row.thirdParty.length > 0) {
      console.log(`  third party: ${row.thirdParty.join(", ")}`);
    }
  }
} finally {
  await chrome.kill();
}

console.log("\nColumns: score, LCP, INP (lab proxy: TBT), CLS, FCP, TBT, first load JS (transfer), total weight (transfer), hero image (transfer).");
console.log("ok = meets the target, warn = passes the hard limit but misses the target, FAIL = misses the hard limit.");

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ base, runs, budget, results }, null, 2));
  console.log(`\nWrote ${jsonOut}`);
}

const jsOnlyFailure =
  failed &&
  results.every((row) =>
    Object.entries(row.verdicts).every(([key, verdict]) => verdict !== "FAIL" || key === "js"),
  );
if (jsOnlyFailure) {
  console.error(
    "\nFirst load JS is the only hard limit missed. The Next.js 16 App Router runtime alone " +
      "(react-dom, the router, and the module loader) is about 124 KB gzipped, so no page can come " +
      "under the 100 KB spec limit on this stack. See docs/perf-report.md. Pass --js-limit <kb> once " +
      "a revised budget is agreed.",
  );
}
if (failed) {
  console.error("\nPERF FAIL: at least one page misses a hard limit.");
  process.exit(1);
}
console.log("\nPERF PASS: every page is inside the hard limits.");
