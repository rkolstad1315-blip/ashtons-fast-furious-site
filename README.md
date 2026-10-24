Ashtons Fast & Fur-ious website rebuild. Spec and tickets in /docs.

## Scripts

- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- `npm run perf`: Lighthouse mobile on every sitemap route against a running `next start` (see `docs/perf-report.md`)
- `npm run placeholders`: lists every `[PLACEHOLDER]` in `/content` and whether it is visible on an indexable page (after `npm run build`)

Launch steps, DNS records, and environment variables are in `LAUNCH.md`.
