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

`npm run placeholders`: no placeholder is visible on any page. The three town pages leave out every section whose fact is still unconfirmed, and they stay `noindex` and out of the sitemap until each one has four confirmed unique facts (ticket 10 guard). Everything else that is unconfirmed is hidden rather than shown. See "Owner values" below for what unlocks each hidden section.

`npm run perf` checks every hard limit. First load JavaScript is held to 150 KB gzipped (175 KB on `/book/`, which loads the booking form on arrival); the spec's original 100 KB is below the Next.js 16 framework floor (see `docs/perf-report.md`).

## Blog state at launch

Seven posts sit in `content/blog/`, all `draft: true`, with `[CONFIRM]` placeholders where an owner fact is needed (session length choices, heat cutoff, water breaks, reactive dog intro, two dogs per visit, military discount, on base access, driveway space, harness, vaccinations, weight limit, senior rules). While that is true the blog does not exist to visitors: `/blog/` is a 404 and nothing blog related is in the sitemap or footer. To publish a post, answer its placeholders, set `draft: false`, and deploy. Preview deployments can set `BLOG_PREVIEW=true` to render drafts.

## Environment variables (Vercel project settings)

| Variable | Environments | Required | What it does |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Production, Preview | Yes in production | Sends the owner notification and the customer confirmation. When it is missing and `VERCEL_ENV` is `production`, the booking API returns an error and the form asks the visitor to call. Anywhere else (Preview deployments, `next start`) a missing key means the emails are only written to the function log while the visitor still sees the thank-you screen, so set the key on Preview too, or never send real customers to a Preview URL. |
| `OWNER_EMAIL` | Production, Preview | Recommended | Where booking requests go. It wins over `content/booking.ts` `ownerEmail`; when neither is set to a real address, requests go to `info@ashtonsfastfurious.com`. |
| `RESEND_FROM_EMAIL` | Production, Preview | Recommended | From address for both emails, for example `"Ashtons Fast & Fur-ious" <bookings@ashtonsfastfurious.com>`. Default is `"Ashtons Fast & Fur-ious" <info@ashtonsfastfurious.com>`. The sending domain must be verified in Resend first. |
| `BLOG_PREVIEW` | Preview only | No | `true` renders draft and placeholder posts at their URLs for review. Never set it in production. |
| `MILITARY_PAGE_ENABLED` | Production (build time) | No | Set to exactly `true` to publish `/military-families/` and put it in the sitemap. Leave unset until the military discount or on base access is confirmed. Changing it needs a redeploy. |

`VERCEL_ENV` and `NODE_ENV` are set by Vercel. Nothing else is read from the environment.

Vercel Web Analytics must be enabled on the project (Analytics tab) or the inline bootstrap's request for `/_vercel/insights/script.js` returns 404 and no events are recorded. No key is needed.

## Domain setup in Vercel

The Vercel project already exists: `ashtons-fast-furious-site` in the `rkolstad1315-4561's projects` team, connected to this repository, deploying `main` to `https://ashtons-fast-furious-site.vercel.app` (checked October 26, 2026). That address is behind Vercel Authentication, which does not apply to custom domains. Steps:

1. Project Settings, Environment Variables: add the variables above, then redeploy `main` so the production build picks them up.
2. Project Settings, Domains. Add `www.ashtonsfastfurious.com` first and mark it the production domain. Then add `ashtonsfastfurious.com` and choose "Redirect to www.ashtonsfastfurious.com" with the 301 status (Vercel defaults to 308; both are permanent). `next.config.ts` also 301 redirects any apex request to the www host as a second line of defence.
3. Vercel shows the exact DNS records for the project on each domain card. Use those values; the table below only shows the shape.

## DNS records at the registrar

Before changing anything, export or screenshot the current zone. Keep every MX, TXT (SPF, DKIM, DMARC), and other record that is not an A, AAAA, or CNAME for `@` and `www`; email for `info@ashtonsfastfurious.com` depends on them.

Example only; copy the values from the Vercel domain cards:

| Type | Host (name) | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | the IP on the apex domain card (long standing value `76.76.21.21`; newer projects get a project specific one) | 300 (lowest the registrar allows) |
| CNAME | `www` | the CNAME on the www domain card (long standing value `cname.vercel-dns.com`; newer projects get a project specific one) | 300 |

Remove any existing A, AAAA, or CNAME records for `@` and `www` that point at the old host (two A records for the same name would split traffic). A CNAME cannot share its name with any other record, so `www` must have nothing else on it.

Check the zone for CAA records. If there are any, one must allow `letsencrypt.org`, or Vercel cannot issue the certificate. With no CAA records at all, nothing needs changing.

Vercel issues the TLS certificate automatically once the records resolve, usually within minutes; DNS propagation can take up to 48 hours depending on the old TTL.

### Email sending (Resend)

Booking emails go out from `info@ashtonsfastfurious.com` unless `RESEND_FROM_EMAIL` says otherwise, and Resend refuses to send from a domain it has not verified, so every booking fails with a 502 until this is done. In the Resend dashboard, add the sending domain (`ashtonsfastfurious.com`, or the subdomain used in `RESEND_FROM_EMAIL`) and copy the records it shows into the zone: a DKIM TXT record on `resend._domainkey`, and the MX and SPF TXT records on the `send` subdomain. These live on their own names and do not touch the existing MX records that deliver mail to the `info@` mailbox. Wait for Resend to show the domain as verified, then send one test booking on production.

Google Search Console: verify with the HTML tag by pasting the `content` value into `content/seo.ts` (`googleSiteVerification`) and deploying; the tag is omitted while that value is a placeholder. The DNS TXT method works too and does not need a deploy. Then submit `https://www.ashtonsfastfurious.com/sitemap.xml`.

## Redirects from the old site

Verified against `next start` on October 24, 2026:

| Request | Response |
| --- | --- |
| `/about-us/` | 301 to `/about/` |
| `/contact-us/` | 301 to `/book/` |
| `/about-us` and `/contact-us` (no slash) | 308 to the slashed URL, then the 301 above |
| `ashtonsfastfurious.com/` and `ashtonsfastfurious.com/<path>/` | 301 to `https://www.ashtonsfastfurious.com/<path>/` |
| `/privacy/` (an early footer link that never went live) | 404; the privacy policy is at `/privacy-policy/` |
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
| Real logo | Save it under a new name in `public/` (files there are cached for a year, so reusing `logo.png` would serve the old one), then point `content/business.ts` `logoPath` and the `src` in `src/components/site-header.tsx` at it | Header logo, link previews (Open Graph and Twitter image), and `logo` and `image` in the JSON-LD. `public/logo.png` today is the scaffold placeholder. |

## Rollback

- **Bad deploy, DNS already on Vercel:** Vercel dashboard, Deployments, pick the last good production deployment, "Promote to Production" (or "Instant Rollback"). Takes effect in seconds; no DNS change.
- **Need the old site back:** put the saved A and CNAME values for `@` and `www` back at the registrar. With a 300 second TTL most visitors see the old host within minutes. Keep the old host's hosting active for at least 72 hours after launch so this stays possible.
- **Booking emails failing:** check `RESEND_API_KEY` and the Resend domain status first; the API returns a 502 and the form tells the visitor to call 910-967-0205, so no request is silently lost.

## After launch (owner and Richard)

Submit the sitemap in Search Console, link the website on the Google Business Profile, submit citations with the same name, phone, and site, start the review request flow, and check rankings and the map pack at 30, 60, and 90 days.
