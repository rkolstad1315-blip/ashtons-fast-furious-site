# Launch runbook

Production host: `https://www.ashtonsfastfurious.com` (www is primary; the apex redirects to it). Hosting: Vercel, project imported from this GitHub repository, production branch `main`.

## Pre-launch checks (run on the launch commit)

```bash
npm ci
npm run lint
npm run build
npm run placeholders   # exits 1 if any [PLACEHOLDER] is visible on an indexable page
npm run start          # in one terminal
npm run perf           # in another; Lighthouse mobile on every sitemap route
```

`npm run placeholders` on October 24, 2026: no placeholder is visible on any indexable page. The three town pages still show `[CONFIRM]` and `[FEE]` and stay `noindex` and out of the sitemap until each one has four confirmed unique facts (ticket 10 guard). Everything else that is unconfirmed is hidden rather than shown. See "Owner values" below for what unlocks each hidden section.

`npm run perf` passes every hard limit except first load JavaScript, which is a framework floor on Next.js 16 (see `docs/perf-report.md`). Run it with `--js-limit 150` for a green gate until the budget is revised.

## Environment variables (Vercel project settings)

| Variable | Environments | Required | What it does |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Production, Preview | Yes in production | Sends the owner notification and the customer confirmation. When it is missing and `VERCEL_ENV` is `production`, the booking API returns an error instead of pretending to send. Outside Vercel production the mailer logs the email to the console. |
| `OWNER_EMAIL` | Production, Preview | Recommended | Where booking requests go. Falls back to `content/booking.ts` `ownerEmail` while that is still a placeholder it falls back again to `info@ashtonsfastfurious.com`. |
| `RESEND_FROM_EMAIL` | Production, Preview | Recommended | From address for both emails, for example `"Ashtons Fast & Fur-ious" <bookings@ashtonsfastfurious.com>`. Default is `"Ashtons Fast & Fur-ious" <info@ashtonsfastfurious.com>`. The sending domain must be verified in Resend first. |
| `MILITARY_PAGE_ENABLED` | Production (build time) | No | Set to exactly `true` to publish `/military-families/` and put it in the sitemap. Leave unset until the military discount or on base access is confirmed. Changing it needs a redeploy. |

`VERCEL_ENV` and `NODE_ENV` are set by Vercel. Nothing else is read from the environment.

Vercel Web Analytics must be enabled on the project (Analytics tab) or the inline bootstrap's request for `/_vercel/insights/script.js` returns 404 and no events are recorded. No key is needed.

## Domain setup in Vercel

No Vercel project for this site exists yet in the `rkolstad1315-4561's projects` team (checked October 24, 2026). Steps:

1. Vercel dashboard, Add New Project, import `rkolstad1315-blip/ashtons-fast-furious-site`. Framework preset Next.js, no build overrides, root directory `/`. Add the environment variables above before the first production deploy.
2. Project Settings, Domains. Add `www.ashtonsfastfurious.com` first and mark it the production domain. Then add `ashtonsfastfurious.com` and choose "Redirect to www.ashtonsfastfurious.com" (Vercel answers with a 308). `next.config.ts` also 301 redirects any apex request to the www host as a second line of defence.
3. Vercel shows the exact records for the project on the domain card and under `vercel domains inspect ashtonsfastfurious.com`. If the values shown differ from the table below, use the dashboard's.

## DNS records at the registrar

Before changing anything, export or screenshot the current zone. Keep every MX, TXT (SPF, DKIM, DMARC), and other record that is not an A, AAAA, or CNAME for `@` and `www`; email for `info@ashtonsfastfurious.com` depends on them.

| Type | Host (name) | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | 300 (lowest the registrar allows) |
| CNAME | `www` | `cname.vercel-dns-0.com` | 300 |

Remove any existing A, AAAA, or CNAME records for `@` and `www` that point at the old host (two A records for the same name would split traffic). If the registrar does not allow a CNAME on `www` alongside other records, use the A record value for `www` as well.

Vercel issues the TLS certificate automatically once the records resolve, usually within minutes; DNS propagation can take up to 48 hours depending on the old TTL.

Google Search Console: verify with the HTML tag by pasting the `content` value into `content/seo.ts` (`googleSiteVerification`) and deploying; the tag is omitted while that value is a placeholder. The DNS TXT method works too and does not need a deploy. Then submit `https://www.ashtonsfastfurious.com/sitemap.xml`.

## Redirects from the old site

Verified against `next start` on October 24, 2026:

| Request | Response |
| --- | --- |
| `/about-us/` | 301 to `/about/` |
| `/contact-us/` | 301 to `/book/` |
| `/about-us` and `/contact-us` (no slash) | 308 to the slashed URL, then the 301 above |
| `ashtonsfastfurious.com/` and `ashtonsfastfurious.com/<path>/` | 301 to `https://www.ashtonsfastfurious.com/<path>/` |
| Any unknown URL | 404 page with a Book link |

The spec records the live site as three pages: `/`, `/about-us/`, and `/contact-us/`. The live site could not be fetched from the build environment on October 24, 2026 (DNS did not resolve from the sandbox), so if the old platform served any other URL (for example `/services/` or `/faq/`), add it to `redirects()` in `next.config.ts` pointing at the closest new page before DNS moves.

## Owner values that unlock hidden sections

Each item is a `[PLACEHOLDER]` in `/content`. Fill the value, run `npm run build && npm run placeholders`, and the section appears.

| Value | File | Unlocks |
| --- | --- | --- |
| ZIP code | `content/seo.ts` `postalCode` | `postalCode` in the LocalBusiness JSON-LD on every page |
| Google Search Console tag | `content/seo.ts` `googleSiteVerification` | Verification meta tag |
| Google Business Profile, Facebook, Instagram, YouTube, Nextdoor URLs | `content/business.ts` `socialLinks` | `sameAs` in the JSON-LD |
| Google review link | `content/reviews.ts` `reviewsPage.googleReviewUrl` | Leave a review button on `/reviews/` |
| Google profile URL | `content/reviews.ts` `googleProfileUrl` | Read all reviews link on Home (once 3 reviews exist) |
| Owner email | `content/booking.ts` `ownerEmail` (or the `OWNER_EMAIL` env var) | Booking notifications |
| Response time | `content/booking.ts` `responseTime` | "We reply within ..." on `/book/` and in the confirmation |
| Days open | `content/business.ts` `hours.days` | `dayOfWeek` in the opening hours markup |
| Insurance statement | `content/business.ts` `insuredStatement`, set `insuredConfirmed: true` | Insured trust item and safety section |
| Equipment type (motorized or slatmill) | `content/faqs.ts` `equipmentType` | Pace and motor wording across the site |
| Weight limit, puppy and senior rules, heat cutoff, rain policy, payment methods, cancellation policy, vaccinations, on base visits | `content/faqs.ts` | Those FAQ answers, the matching safety and service copy, pricing policies |
| Harness line and vaccination list | `content/service.ts` `needs.items` | "What your dog needs" on the service page |
| Session prices (15, 45, 60 min), second dog, membership, military percent, travel fees, late cancel fee | `content/pricing.ts` | Price cards, price builder options, policies |
| Route days, Beulaville neighborhoods, Richlands local note, town photos, town reviews | `content/towns.ts` | Town pages become indexable at four confirmed facts |
| Founding story, handler names, certifications, unit photos, community program | `content/about.ts` | About page sections |
| Waiver text, cancellation policy, vaccination rules | `content/legal.ts` | Terms sections |
| Base housing access | `content/military.ts` | Military page section (with `MILITARY_PAGE_ENABLED`) |
| YouTube ID and poster, before and after photos | `content/service.ts` | Session video and slider |
| Real reviews | `content/reviews.ts` `reviews` | Reviews page cards, Home reviews (at 3 or more) |
| Sessions run and dogs served | `content/stats.ts` | Stat counter on Home |

## Rollback

- **Bad deploy, DNS already on Vercel:** Vercel dashboard, Deployments, pick the last good production deployment, "Promote to Production" (or "Instant Rollback"). Takes effect in seconds; no DNS change.
- **Need the old site back:** put the saved A and CNAME values for `@` and `www` back at the registrar. With a 300 second TTL most visitors see the old host within minutes. Keep the old host's hosting active for at least 72 hours after launch so this stays possible.
- **Booking emails failing:** check `RESEND_API_KEY` and the Resend domain status first; the API returns a 502 and the form tells the visitor to call 910-967-0205, so no request is silently lost.

## After launch (owner and Richard)

Submit the sitemap in Search Console, link the website on the Google Business Profile, submit citations with the same name, phone, and site, start the review request flow, and check rankings and the map pack at 30, 60, and 90 days.
