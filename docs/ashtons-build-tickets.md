# Build tickets and QA plan

## Workflow and ticket order

The build runs as 14 tickets, plus ticket 15 (blog) after launch. Each ticket is built in Cursor on its own branch, checked by Claude against its QA block, fixed, then merged to main and auto deployed to a Vercel preview. Every prompt below is a complete copy and paste block.

1. Paste the ticket's **Cursor prompt** into Cursor (Agent mode) at the repo root.
2. Cursor builds, runs the build and lint, and commits on branch `ticket/NN-name`.
3. Paste the ticket's **Claude QA prompt** into Claude Code with the repo open. Claude reviews the diff, runs the checks, and reports pass or fail per item. Claude does not fix.
4. Paste any failures back into Cursor to fix. Repeat step 3 until every item passes.
5. Merge to main. Vercel deploys a preview; check it on a phone.

| # | Ticket | Depends on | QA gate |
| --- | --- | --- | --- |
| 01 | Scaffold, tokens, layout shell | none | Builds clean; mobile bar and header render |
| 02 | Content model | 01 | All business facts in typed files; no hardcoded copy |
| 03 | SEO foundation | 02 | Metadata, JSON-LD, sitemap, redirects valid |
| 04 | Homepage top: hero, steps, trust, who it's for | 02 | Hero LCP under 1.8 s on mobile |
| 05 | Homepage bottom: pricing preview, reviews, FAQ preview, map | 04 | Reviews hidden when empty |
| 06 | Booking form and email | 02 | Form sends both emails; events fire |
| 07 | Service page, video facade, before and after slider | 04 | YouTube loads only on click |
| 08 | Pricing page and live price builder | 02, 06 | Totals match the price file; prefill works |
| 09 | FAQ, Safety, Daycare alternative | 03 | Each answer in its first sentence |
| 10 | Service areas hub and town pages | 03 | Each town page has its unique facts |
| 11 | About, Reviews, Book, legal, 404, Military flag | 03, 06 | No placeholder text on live pages |
| 12 | Premium polish | 04 to 11 | Reduced motion respected; CLS stays under 0.02 |
| 13 | Performance pass | 12 | Every page meets the mobile budget |
| 14 | Launch | 13, owner answers | Redirects live; Search Console and GBP linked |
| 15 | Blog (after launch) | 14, first posts written | No placeholder or draft post is published; posts meet the mobile budget |

Tickets 05 to 11 can run in parallel once 04 is merged, as long as each stays on its own branch.

## Ticket 01: Scaffold, design tokens, layout shell

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. Hours 7 AM to 7 PM. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui only where named, deployed on Vercel.
House rules: mobile first; every page must hold a PageSpeed mobile score of 95 or higher, LCP under 2.5 s (target 1.8 s), CLS under 0.1 (target 0.02), first load JS under 100 KB gzipped; no animation libraries; animate transform and opacity only; respect prefers-reduced-motion; no em dashes or en dashes in visible copy; never invent reviews, ratings, or statistics; unconfirmed facts go in as [BRACKETED PLACEHOLDERS] read from content files; one H1 per page; all copy lives in /content, not in components.

Ticket 01: scaffold the project and build the layout shell.
1. Create a Next.js App Router project with TypeScript, Tailwind, ESLint, src directory. Add @next/bundle-analyzer behind ANALYZE=true.
2. Design tokens in tailwind config and CSS variables: base navy #0B1220 (near black navy), brand blue [BRAND BLUE from logo, default #1E90FF], accent [ACCENT, default #FF7A1A] used only for Book buttons, white, slate grays. Radius 12px cards, 999px pills.
3. Fonts with next/font, self hosted, Latin subset, display swap: a bold condensed display face for headings (Barlow Condensed 700 or 800, italic allowed) and Inter for body. Preload the display face only.
4. Root layout: semantic header, main, footer. Header: logo left (use /public/logo.png placeholder), nav with at most six items (Service, Pricing, Service Areas, Reviews, About) and a Book button in the accent color. On mobile the nav collapses into a menu button, and a sticky bottom bar shows two buttons: Book free session (accent) and Call or text (tel: link). Bottom bar is 64px tall with padding reserved on body so nothing shifts.
5. Footer: business name, phone as tel: link, email, hours, links to /service-areas/jacksonville-nc/, /service-areas/richlands-nc/, /service-areas/beulaville-nc/, privacy, terms.
6. Viewport must allow zoom: do not set maximum-scale or user-scalable. Do not add format-detection telephone=no.
7. Add a placeholder Home page with one H1 so the build passes.
8. Run npm run build and npm run lint; fix all errors. Commit on branch ticket/01-scaffold.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/01-scaffold against main. Run npm run build and npm run lint. Report each check as PASS or FAIL with file and line evidence. Do not change any code.
Checks:
1. Build and lint pass with zero errors.
2. Fonts load through next/font, self hosted, at most two families, display swap.
3. Design tokens exist as CSS variables; the accent color is used only on Book buttons.
4. Header nav has six items or fewer; Book button present.
5. Mobile sticky bar shows Book and Call or text, the call button is a tel:+19109670205 link, and body padding reserves its height.
6. Viewport meta has no maximum-scale and no user-scalable; no format-detection telephone=no.
7. Footer links to all three town pages, privacy, and terms.
8. Semantic header, nav, main, footer landmarks present.
9. No visible copy contains an em dash or en dash.
10. No animation library in package.json.
End with a one line verdict: READY TO MERGE or NEEDS FIXES.
```

## Ticket 02: Content model

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. Hours 7 AM to 7 PM. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui only where named, deployed on Vercel.
House rules: mobile first; PageSpeed mobile 95 or higher on every page; no animation libraries; no em dashes or en dashes in visible copy; never invent reviews, ratings, or statistics; unconfirmed facts go in as [BRACKETED PLACEHOLDERS]; all copy lives in /content, not in components.

Ticket 02: build the typed content model every page will read from.
Create /content with TypeScript files and exported types:
1. business.ts: name "Ashtons Fast & Fur-ious", phone display "910-967-0205", phone E.164 "+19109670205", email, hours 07:00 to 19:00 with days [CONFIRM DAYS], service towns, social links array (empty for now), logo path, insured statement [CONFIRM INSURANCE] with a boolean flag insuredConfirmed false.
2. pricing.ts: sessions array with length in minutes and price: 15 [PRICE], 30 = 60, 45 [PRICE], 60 [PRICE]; firstSessionFree true; secondDogPrice [PRICE]; membership {sessionsPerMonth 4, price [PRICE], enabled false}; militaryDiscountPercent [PERCENT] with enabled false; travelFees by town [FEE]; lateCancelFee [FEE]. Any [PRICE] value must be typed so the UI can hide cards that are not confirmed.
3. towns.ts: jacksonville, richlands, beulaville, each with slug, display name, county (Onslow, Onslow, Duplin), neighborhoods array (Jacksonville: Piney Green, Half Moon, Midway Park; Richlands: Pumpkin Center; Beulaville: [CONFIRM]), routeDays [CONFIRM], travelFee, localNote, faqs (3 each, placeholder), reviews (empty array), photo path. Also hubOnly towns: Hubert, Sneads Ferry, Swansboro.
4. faqs.ts: question and answer pairs, with answers written so the first sentence answers the question. Include: are dog treadmills safe; are dog treadmills illegal; can my dog use a treadmill; how long should a dog run on a treadmill; will my dog like it; which breeds; weight limits [CONFIRM]; puppies and seniors; reactive dogs; hot weather; rain; payment [CONFIRM]; cancellation [CONFIRM]; vaccinations [CONFIRM]; do you come on base [CONFIRM]. Equipment type is [MOTORIZED OR SLATMILL]; do not claim the dog sets the pace until confirmed.
5. reviews.ts: empty typed array of {name, town, text, date, source: "google"}. No sample reviews.
6. stats.ts: sessionsRun and dogsServed as null; the UI hides the counter while null.
7. A helper isPlaceholder(value) that detects [BRACKETED] strings, and a dev only console warning listing every placeholder still in content.
Run build and lint. Commit on branch ticket/02-content.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/02-content against main. Run npm run build and npm run lint. Report each check as PASS or FAIL with file and line evidence. Do not change any code.
Checks:
1. Build and lint pass.
2. business.ts, pricing.ts, towns.ts, faqs.ts, reviews.ts, stats.ts exist with exported TypeScript types.
3. Phone, email, hours, and the $60 per 30 minute price match exactly: 910-967-0205, +19109670205, info@ashtonsfastfurious.com, 07:00 to 19:00, 60.
4. reviews.ts contains no reviews; stats are null.
5. Every unconfirmed fact is a [BRACKETED] placeholder, and isPlaceholder detects them.
6. No FAQ answer claims the dog sets the pace or that the treadmill has no motor.
7. Each FAQ answer's first sentence answers its question.
8. No em dashes or en dashes in any content string.
List every placeholder still in /content at the end so the owner questions can be tracked. End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 03: SEO foundation

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. Hours 7 AM to 7 PM. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. All copy lives in /content.
House rules: mobile first; PageSpeed mobile 95 or higher; no em dashes or en dashes in visible copy; never invent reviews or ratings.

Ticket 03: SEO foundation.
1. A metadata helper that every page uses: unique title under 60 characters, description under 155, self referencing canonical on https://www.ashtonsfastfurious.com, Open Graph and Twitter tags, OG image placeholder.
2. Page titles and H1s exactly as follows (URL | title | H1):
/ | Mobile Dog Treadmill in Jacksonville NC | Ashtons | Mobile Dog Treadmill Workouts in Jacksonville, NC
/mobile-dog-treadmill/ | Mobile Dog Treadmill Sessions at Your Home | Ashtons | Mobile Dog Treadmill Sessions in Your Driveway
/pricing/ | Mobile Dog Treadmill Prices | First Session Free | Mobile Dog Treadmill Pricing
/faq/ | Dog Treadmill FAQ: Safety, Breeds, Cost | Ashtons | Dog Treadmill Questions, Answered
/safety/ | Is Treadmill Exercise Safe for Dogs? | Ashtons | How We Keep Every Session Safe
/dog-daycare-alternative/ | Dog Daycare Alternative in Jacksonville NC | Ashtons | A Dog Daycare Alternative in Jacksonville, NC
/service-areas/ | Mobile Dog Gym Service Areas in Onslow County | Ashtons | Where We Bring the Mobile Dog Gym
/service-areas/jacksonville-nc/ | Mobile Dog Gym in Jacksonville, NC | Ashtons | Mobile Dog Gym in Jacksonville, NC
/service-areas/richlands-nc/ | Mobile Dog Exercise in Richlands, NC | Ashtons | Mobile Dog Exercise in Richlands, NC
/service-areas/beulaville-nc/ | Mobile Dog Exercise in Beulaville, NC | Ashtons | Mobile Dog Exercise in Beulaville, NC
/military-families/ | Dog Exercise for Military Families | Ashtons | Dog Exercise for Camp Lejeune Families
/about/ | About Ashtons Fast & Fur-ious | Jacksonville NC | About Ashtons Fast & Fur-ious
/reviews/ | Reviews | Ashtons Mobile Dog Gym, Jacksonville NC | What Dog Owners Say
/book/ | Book a Free Dog Treadmill Session | Ashtons | Book Your Free First Session
Home meta description: Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC. 30 min from $60. First session free.
3. JSON-LD component, rendered in the page head: LocalBusiness on every page with @id https://www.ashtonsfastfurious.com/#business, name, url, telephone +1-910-967-0205, email, logo, image, description, priceRange "$60 per 30-minute session", PostalAddress with addressLocality Jacksonville, addressRegion NC, postalCode [ZIP], addressCountry US and NO street address and NO geo, areaServed as three City entries, openingHoursSpecification 07:00 to 19:00, sameAs from business.ts. Service node on /mobile-dog-treadmill/ (serviceType "Mobile dog treadmill exercise", provider pointing to the @id, Offer 60 USD). BreadcrumbList on every page below Home. Never output AggregateRating or Review markup.
4. app/sitemap.ts listing every live page with lastmod; app/robots.ts allowing all and pointing to the sitemap. Exclude /military-families/ while its flag is off.
5. 301 redirects in next.config: /about-us/ to /about/, /contact-us/ to /book/. Choose www as canonical and redirect the apex to it.
6. No meta keywords tag anywhere.
Run build and lint. Commit on branch ticket/03-seo.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/03-seo against main. Run npm run build and npm run lint, then start the production server and fetch each page's HTML. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Every page has a unique title under 60 characters and a description under 155.
2. Titles and H1s match the ticket table exactly; exactly one H1 per page.
3. Canonical tags are self referencing on the www host.
4. LocalBusiness JSON-LD parses as valid JSON on every page, has no streetAddress and no geo, and uses the same @id everywhere.
5. No AggregateRating or Review markup anywhere.
6. Service JSON-LD appears on /mobile-dog-treadmill/ only; BreadcrumbList on every page below Home.
7. /sitemap.xml lists every live page with lastmod and excludes /military-families/ while flagged off; /robots.txt points to it.
8. /about-us/ returns 301 to /about/ and /contact-us/ returns 301 to /book/.
9. No meta keywords tag.
10. JSON-LD values match the visible phone, hours, and price.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 04: Homepage top

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Design tokens and fonts from ticket 01.
House rules: mobile first; PageSpeed mobile 95 or higher, LCP target 1.8 s, CLS target 0.02, first load JS under 100 KB gzipped; no animation libraries; animate transform and opacity only; respect prefers-reduced-motion; no em dashes or en dashes in visible copy; never invent reviews or statistics.

Ticket 04: build the top four homepage sections as Server Components unless noted.
1. Hero. Full width, dark navy overlay on a real photo (placeholder /public/images/hero-dog-treadmill.avif, 1600x1000, with 375, 768, 1280 srcset). Use next/image with priority and fetchPriority high, explicit width and height. Above the H1, a pill label: "Now booking: Jacksonville, Richlands, Beulaville". H1: "Mobile Dog Treadmill Workouts in Jacksonville, NC". Subhead: "Climate controlled, supervised workouts in your driveway. Your first session is free." Primary button in the accent color: "Book a free first session" linking to /book/. Under it a quiet text link: "or call or text 910-967-0205" (tel:). Kinetic headline: each line slides in from the left with a short speed blur, CSS keyframes only, 500 ms total, starting after first paint, transform and opacity only, and disabled under prefers-reduced-motion. The H1 text must be in the HTML at load so LCP is not delayed.
2. How it works. Three numbered steps with large 01, 02, 03 numerals in the display face: "Book your free session", "We park in your driveway", "Your dog runs 15 to 60 minutes while we supervise". One line of body under each from /content.
3. Trust strip. Icon row with inline SVG icons: Climate controlled; Supervised every minute; Harnessed, never tied by the neck; Cleaned between dogs; Insured (render only when insuredConfirmed is true). Stat counter for sessions run and dogs served: a small client component that counts up once when scrolled into view; render nothing while stats are null.
4. Who it's for. Bento grid on desktop (mixed tile sizes, two large and four small), single column on mobile. Tiles: High energy and working breeds; Reactive or anxious dogs; Dogs stuck inside in summer heat; Weight management; Busy and military households; Senior dogs with vet clearance. Each tile has a lazy loaded photo placeholder with explicit dimensions and alt text, a heading, and one line.
No client JavaScript in this ticket except the stat counter. Run build and lint. Commit on branch ticket/04-home-top.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/04-home-top against main. Run npm run build and npm run lint, start the production server, and run Lighthouse in mobile mode on / (npx lighthouse http://localhost:3000 --form-factor=mobile --throttling-method=simulate --output=json). Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass.
2. Lighthouse mobile performance 95 or higher; LCP under 2.5 s (flag if over 1.8 s); CLS under 0.1 (flag if over 0.02); TBT under 150 ms.
3. The LCP element is the hero image or H1, the hero image uses priority and has width and height.
4. The H1 text is present in the server HTML.
5. Hero animation uses only transform and opacity and is disabled under prefers-reduced-motion.
6. Exactly one accent colored button in the hero.
7. The Insured item does not render while insuredConfirmed is false; the stat counter renders nothing while stats are null.
8. Bento grid stacks to one column at 375 px wide with no horizontal scroll.
9. Every image has alt text and explicit dimensions; below the fold images are lazy.
10. Only the stat counter ships as a client component.
11. No em dashes or en dashes in visible copy.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 05: Homepage bottom

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Design tokens and fonts from ticket 01; homepage top from ticket 04.
House rules: mobile first; PageSpeed mobile 95 or higher, CLS target 0.02, first load JS under 100 KB gzipped; no animation libraries; respect prefers-reduced-motion; no em dashes or en dashes in visible copy; never invent reviews, ratings, or statistics.

Ticket 05: build the bottom five homepage sections.
1. Pricing preview. Three cards from pricing.ts: Free first session; 30 minute session $60 (highlighted with an accent border and a "Most popular" pill); Monthly membership (render only when membership.enabled is true and the price is not a placeholder; otherwise show a 15 or 60 minute card if confirmed, else show two cards). Link: "See all prices" to /pricing/.
2. Reviews. Render real Google reviews from reviews.ts as cards (name, town, text, date) with a link "Read all reviews on Google" [GOOGLE PROFILE URL]. Hide the whole section until at least 3 reviews exist. No star ratings rendered from our own data and no review markup.
3. FAQ preview. Four questions from faqs.ts (safe, how long, will my dog like it, what it costs) as an accessible accordion using native details and summary elements, no JavaScript. Link to /faq/.
4. Service area map. Inline SVG of Onslow and Duplin counties (simplified outline) with markers for Jacksonville, Richlands, and Beulaville. Each town is a link to its town page, lights up on hover and keyboard focus with a CSS transition, and has a visible text label. Hubert, Sneads Ferry, and Swansboro listed under the map as "Also serving on request" in plain text. The SVG carries role img and an aria-label.
5. Booking teaser. A dark section with the H2 "Book your dog's free first session", one line of copy, and the accent button to /book/. (The full form is built in ticket 06 and lives on /book/.)
Keep everything Server Components. Run build and lint. Commit on branch ticket/05-home-bottom.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/05-home-bottom against main. Run npm run build and npm run lint, start the production server, and run Lighthouse in mobile mode on /. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; Lighthouse mobile performance 95 or higher and CLS under 0.1.
2. Pricing cards read from pricing.ts; no placeholder price is ever shown; the 30 minute card is highlighted.
3. The reviews section does not render while fewer than 3 reviews exist; no star ratings or review schema anywhere.
4. FAQ preview uses details and summary and ships no JavaScript.
5. Each map town is a link to the right town page, works with keyboard focus, and has a visible label; the SVG has role img and an aria-label.
6. Hubert, Sneads Ferry, and Swansboro appear as plain text, not links.
7. No new client components were added.
8. No em dashes or en dashes in visible copy.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 06: Booking form and email

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. First session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui form primitives allowed, deployed on Vercel. Email through Resend. Copy reads from /content.
House rules: mobile first; PageSpeed mobile 95 or higher; the form must not add JavaScript to pages until it is near the viewport; tap targets at least 44 px; no em dashes or en dashes in visible copy.

Ticket 06: build the booking request form and its email flow.
1. A four step form component (client), lazy loaded with next/dynamic when it scrolls near the viewport, shown on /book/ and reusable elsewhere.
Step 1: Town (buttons: Jacksonville, Richlands, Beulaville, Other with a text field).
Step 2: Number of dogs (1, 2, 3 or more) and dog size (Under 25 lb, 25 to 60 lb, 60 to 90 lb, Over 90 lb) as buttons.
Step 3: Preferred days (Mon to Sun checkboxes) and time (Morning, Midday, Evening).
Step 4: Name, mobile phone (type tel, input mask, autocomplete tel), email (type email), dog breed (optional), notes (optional), and an SMS consent checkbox unchecked by default with the label "Text me reminders about my sessions. Message and data rates may apply. Reply STOP to opt out."
Submit button text: "Book my free session". Show a progress indicator (Step 1 of 4). Back button on steps 2 to 4. Accept URL params length and dogs so the price builder can prefill.
2. Validation with zod on client and server. Honeypot field plus a simple time on page check for spam. No CAPTCHA.
3. Route handler /api/book: validates, sends one email to the owner (to [OWNER EMAIL], default info@ashtonsfastfurious.com) with every answer in a clean table, and one confirmation email to the customer: "Thanks, we got your request. We'll text or call within [RESPONSE TIME] to set your free session." Use Resend with RESEND_API_KEY from env; never hardcode keys. Return friendly errors.
4. Thank you state on the same page with what happens next and the tel: link.
5. Analytics: fire custom events book_step_1 through book_step_4, book_submit, tel_click, sms_click through Vercel Analytics track(). Add tel_click and sms_click to every tel: and sms: link site wide.
6. Every input has a visible label; errors are announced with aria-live.
Run build and lint. Commit on branch ticket/06-booking.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/06-booking against main. Run npm run build and npm run lint, start the production server, and test the form in a 375 px wide viewport. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass.
2. The form chunk is not in the first load JS of any page; it loads with next/dynamic near the viewport.
3. Steps run in order: town, dogs and size, days and time, contact. Contact info is last.
4. Phone uses type tel and email uses type email with matching autocomplete.
5. SMS consent is unchecked by default and its label includes the opt out text.
6. Zod validation runs on both client and server; the honeypot and timing check exist.
7. /api/book reads RESEND_API_KEY from env; no secrets in the repo.
8. Owner and customer emails both render every field; test with a mock Resend client if no key is set.
9. Events book_step_1 to book_step_4, book_submit, tel_click, sms_click fire.
10. Labels on every input, aria-live on errors, tap targets at least 44 px.
11. URL params length and dogs prefill the form.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 07: Service page, video, before and after slider

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Sessions 15 to 60 minutes; $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Metadata and JSON-LD from ticket 03.
House rules: mobile first; PageSpeed mobile 95 or higher; no third party script may load before interaction; no animation libraries; respect prefers-reduced-motion; no em dashes or en dashes in visible copy; equipment type is [MOTORIZED OR SLATMILL], so do not claim the dog sets the pace until confirmed.

Ticket 07: build /mobile-dog-treadmill/.
1. Sections: H1 "Mobile Dog Treadmill Sessions in Your Driveway"; what a session looks like from arrival to goodbye (numbered list); session lengths 15 to 60 minutes; the first visit intro assessment; what your dog needs (harness provided [CONFIRM], current vaccinations); weather and heat policy; two dogs side by side on the two treadmills; a short line that treadmill sessions supplement walks rather than replace them; CTA to /book/.
2. Video facade component: shows a poster image (AVIF, explicit dimensions) with a play button; only on click does it inject the YouTube iframe using youtube-nocookie.com with autoplay=1. Video ID from content [YOUTUBE ID]; hide the block if it is a placeholder.
3. Before and after slider: a client component with two stacked images (wound up dog, calm dog after a session) and a native input type range controlling a clip-path reveal. Works with touch drag and arrow keys, has an accessible label, and both images lazy load with explicit dimensions. Hide it while the image paths are placeholders.
4. Service JSON-LD from ticket 03 renders on this page.
Run build and lint. Commit on branch ticket/07-service.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/07-service against main. Run npm run build and npm run lint, start the production server, run Lighthouse mobile on /mobile-dog-treadmill/, and watch the network panel on load. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; Lighthouse mobile performance 95 or higher.
2. No request to youtube.com, youtube-nocookie.com, or ytimg.com happens before the play button is clicked.
3. The video block and the slider are hidden while their content values are placeholders.
4. The slider works with touch and arrow keys and has an accessible label.
5. No copy claims the dog sets the pace or that the treadmill has no motor.
6. Copy states that sessions supplement walks.
7. Service JSON-LD present and valid; one H1 matching the spec.
8. No em dashes or en dashes in visible copy.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 08: Pricing page and live price builder

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Prices read only from /content/pricing.ts. Booking form from ticket 06 accepts length and dogs URL params.
House rules: mobile first; PageSpeed mobile 95 or higher; no placeholder price is ever shown to a visitor; no em dashes or en dashes in visible copy.

Ticket 08: build /pricing/.
1. The first sentence on the page, directly under the H1: "A 30 minute mobile dog treadmill session in Jacksonville NC is $60, and your first session is free."
2. Price cards for every confirmed session length, the two dog price, the monthly membership, and the military discount, each rendered only when its value is confirmed. 30 minute card highlighted.
3. Live price builder (small client component): choose session length (confirmed lengths only), number of dogs, and frequency (one time or monthly membership if enabled). The total updates instantly, shows the free first session note, and applies the military discount when a "I'm active duty or a veteran" toggle is on and the discount is enabled. Button "Book this" links to /book/?length=N&dogs=N.
4. Policies block: travel fees by town, late cancellation fee, payment methods [CONFIRM]. Hide any line whose value is a placeholder.
5. No "call for pricing" text anywhere.
Run build and lint. Commit on branch ticket/08-pricing.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/08-pricing against main. Run npm run build and npm run lint, start the production server, run Lighthouse mobile on /pricing/, and test the price builder at 375 px wide. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; Lighthouse mobile performance 95 or higher.
2. The first sentence under the H1 states $60 for 30 minutes and the free first session.
3. Every price shown comes from pricing.ts; no placeholder or bracket text is visible.
4. Builder totals are correct for each combination of length, dogs, frequency, and military toggle; list each case you tested with the expected and actual total.
5. "Book this" links to /book/ with the right length and dogs params, and the form prefills.
6. The words "call for pricing" appear nowhere.
7. The builder is the only client component on the page and is under 15 KB gzipped.
8. No em dashes or en dashes in visible copy.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 09: FAQ, Safety, Daycare alternative

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Metadata and JSON-LD from ticket 03.
House rules: mobile first; PageSpeed mobile 95 or higher; no em dashes or en dashes in visible copy; equipment type is [MOTORIZED OR SLATMILL], so do not claim the dog sets the pace until confirmed; never present Ashtons as a daycare.

Ticket 09: build three pages as Server Components.
1. /faq/: every question from faqs.ts as a details and summary accordion grouped under Safety, Fit for my dog, Scheduling and weather, Cost and policies. Each answer's first sentence answers the question. Hide any answer that is still a placeholder. Optional FAQPage JSON-LD matching the visible questions exactly. CTA to /book/ at the end.
2. /safety/: H1 "How We Keep Every Session Safe". Sections: supervised every minute; harness setup, never tied by the neck; gradual intro on the first visit; your dog is never forced; water and rest breaks; heat protocol for coastal summers; cleaning between dogs; vaccination and vet clearance rules [CONFIRM]; insured statement shown only when insuredConfirmed is true; a line that treadmill sessions supplement walks rather than replace them. CTA to /book/.
3. /dog-daycare-alternative/: H1 "A Dog Daycare Alternative in Jacksonville, NC". Opening: no drop off, no crowd, no kennel stress, focused exercise in 30 minutes in your own driveway. A section for reactive and anxious dogs. A responsive comparison table (Ashtons, Doggy daycare, Dog walker) with rows: Where it happens; Time for you; Other dogs around; Weather; Exercise intensity; Best for. Price row uses only confirmed Ashtons prices and the words "varies" for the others; do not name competitors. On mobile the table becomes stacked cards. CTA to /book/.
Run build and lint. Commit on branch ticket/09-faq-safety-daycare.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/09-faq-safety-daycare against main. Run npm run build and npm run lint, start the production server, and run Lighthouse mobile on /faq/, /safety/, and /dog-daycare-alternative/. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; each page scores 95 or higher on mobile.
2. Every FAQ answer's first sentence answers its question; quote any that do not.
3. No placeholder answer is visible; FAQPage JSON-LD, if present, matches the visible questions exactly.
4. Safety page shows the insured line only when insuredConfirmed is true and includes the supplements walks line.
5. No copy on any page claims the dog sets the pace or that the treadmill has no motor.
6. The daycare page never calls Ashtons a daycare and names no competitor.
7. The comparison table becomes stacked cards at 375 px with no horizontal scroll.
8. One H1 per page matching the spec; no em dashes or en dashes.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 10: Service areas hub and town pages

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville and Richlands in Onslow County and Beulaville in Duplin County, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Town data reads from /content/towns.ts. Metadata and JSON-LD from ticket 03. Map SVG from ticket 05.
House rules: mobile first; PageSpeed mobile 95 or higher; no em dashes or en dashes in visible copy; town pages must not be near copies of each other (Google treats that as doorway spam).

Ticket 10: build /service-areas/ and the three town pages.
1. /service-areas/: H1 "Where We Bring the Mobile Dog Gym", the map SVG, a card per town linking to its page with route days, and a plain text line "Also serving Hubert, Sneads Ferry, and Swansboro on request." CTA to /book/.
2. A town page template at /service-areas/[town]/ using generateStaticParams for jacksonville-nc, richlands-nc, beulaville-nc. Each page renders only from that town's data: H1 from the spec; an intro naming the town and county; neighborhoods served; route days; travel fee if any; the town's local note (Jacksonville: apartment and base housing dogs; Richlands: [CONFIRM]; Beulaville: rural roads with few sidewalks in Duplin County); up to two reviews from customers in that town (section hidden if none); a town photo; three town FAQs; CTA to /book/?town=slug.
3. A build time guard: if a town page has fewer than four confirmed unique facts (neighborhoods, route days, local note, photo, reviews, FAQs), log a warning and add noindex to that page until it is filled. Tell me in the commit message which town pages are noindexed.
4. BreadcrumbList JSON-LD on each page; LocalBusiness references the same @id; no new business entities.
Run build and lint. Commit on branch ticket/10-towns.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/10-towns against main. Run npm run build and npm run lint, start the production server, and fetch /service-areas/ and all three town pages. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; each page scores 95 or higher on Lighthouse mobile.
2. All three town pages are statically generated.
3. Compare the visible body text of the three town pages: report the share of sentences that are identical across pages. FAIL if more than 40 percent of sentences match outside the shared CTA and header.
4. A town page with fewer than four confirmed unique facts carries noindex; list which pages are noindexed and why.
5. Hubert, Sneads Ferry, and Swansboro appear only as plain text on the hub.
6. JSON-LD on town pages references the shared @id and adds no new LocalBusiness.
7. The Book link on each town page carries the town param and the form preselects it.
8. One H1 per page matching the spec; no em dashes or en dashes.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 11: About, Reviews, Book, legal, 404, Military

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. First session free.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Booking form from ticket 06. Metadata and JSON-LD from ticket 03.
House rules: mobile first; PageSpeed mobile 95 or higher; no em dashes or en dashes in visible copy; never invent reviews, ratings, or a founding story.

Ticket 11: build the remaining pages.
1. /about/: H1 "About Ashtons Fast & Fur-ious". Sections from content: the founding story [OWNER STORY]; who handles the dogs [NAMES]; certifications [CONFIRM]; the unit with photos; community work (a "sponsor a shelter dog run" block shown only if enabled). Hide any section whose content is a placeholder. CTA to /book/.
2. /reviews/: H1 "What Dog Owners Say". Real reviews from reviews.ts as cards, newest first, and a prominent "Leave a review on Google" button to [GOOGLE REVIEW LINK]. If there are no reviews yet, show only the button and one line inviting the first review. No star schema.
3. /book/: H1 "Book Your Free First Session", the booking form from ticket 06, a line on response time [RESPONSE TIME], the phone as tel: and sms: links, and the service area list.
4. /privacy-policy/ and /terms/: plain pages from content. Privacy covers form data, email, SMS consent, and analytics. Terms cover the waiver summary [WAIVER TEXT, attorney reviewed], cancellation policy, and vaccination rules. Add noindex to both.
5. not-found.tsx: friendly 404 with links to Home, Pricing, and Book.
6. /military-families/: build the page behind a feature flag MILITARY_PAGE_ENABLED (default false). Content: military discount from pricing.ts, deployment and PCS scheduling flexibility, base housing access [CONFIRM]. When the flag is off the route returns 404 and the page is out of the sitemap.
Run build and lint. Commit on branch ticket/11-remaining-pages.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/11-remaining-pages against main. Run npm run build and npm run lint, start the production server, and fetch /about/, /reviews/, /book/, /privacy-policy/, /terms/, a missing URL, and /military-families/. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; each indexable page scores 95 or higher on Lighthouse mobile.
2. No bracketed placeholder text is visible on any page; sections with placeholder content are hidden.
3. /reviews/ shows only reviews from reviews.ts and no star markup; the Google review button is present.
4. /book/ renders the form, tel: and sms: links, and the town list.
5. Privacy and terms carry noindex; privacy mentions SMS consent and analytics.
6. A missing URL returns the custom 404 with links to Home, Pricing, and Book.
7. With MILITARY_PAGE_ENABLED false, /military-families/ returns 404 and is not in the sitemap; with it true, the page renders.
8. One H1 per page; no em dashes or en dashes.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 12: Premium polish

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service serving Jacksonville, Richlands, and Beulaville, North Carolina. All pages exist from tickets 01 to 11.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel.
House rules: mobile first; every page must keep a PageSpeed mobile score of 95 or higher, CLS under 0.02, and first load JS under 100 KB gzipped after this ticket; no animation libraries; animate transform and opacity only; everything respects prefers-reduced-motion; no motion on prices, form fields, or buttons a visitor needs to read before acting.

Ticket 12: add the premium interaction layer.
1. Scroll reveals: one shared client component that creates a single IntersectionObserver and adds an is-visible class; sections fade in and lift 16 px over 400 ms. Content is visible by default without JavaScript; the hidden start state applies only after the script runs. Off under reduced motion.
2. Header: transparent over the hero, then a glass state on scroll (backdrop-filter blur with a solid navy fallback where unsupported) that shrinks from 80 px to 64 px using transform, not height, so nothing below shifts. Desktop only; mobile keeps the sticky bottom bar.
3. Hover: cards lift 4 px with a soft shadow; the accent Book button gets a soft glow. CSS transitions only, pointer fine devices only via @media (hover: hover).
4. Paw print cursor trail on the homepage only: a script under 2 KB loaded with requestIdleCallback, only when (pointer: fine) and reduced motion is off; draws up to 8 fading paw SVGs that follow the cursor using transform.
5. Custom inline SVG icon sprite for every icon on the site; remove any icon package.
6. Confirm the hero kinetic headline from ticket 04 and the stat counter both respect reduced motion.
Run build and lint, then Lighthouse mobile on /, /pricing/, and one town page and paste the scores in the commit message. Commit on branch ticket/12-polish.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/12-polish against main. Run npm run build and npm run lint, start the production server, and run Lighthouse mobile on /, /pricing/, and /service-areas/jacksonville-nc/. Then emulate prefers-reduced-motion: reduce and check again. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; all three pages score 95 or higher on mobile; CLS under 0.02 on each.
2. Exactly one IntersectionObserver is created site wide.
3. Content is visible with JavaScript disabled.
4. Every animation uses only transform and opacity; list any that animate other properties.
5. With reduced motion on: no reveals, no hero slide, no counter animation, no paw trail.
6. The paw trail script does not load on touch devices or on any page but Home, and is under 2 KB.
7. The header shrink causes no layout shift; mobile shows the bottom bar, not the glass header.
8. No icon package remains in package.json.
9. First load JS on / is under 100 KB gzipped; report the number.
End with READY TO MERGE or NEEDS FIXES.
```

## Ticket 13: Performance pass

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service serving Jacksonville, Richlands, and Beulaville, North Carolina. The site is feature complete after ticket 12.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel.
House rules: mobile load speed is a launch blocker.

Ticket 13: bring every page inside this mobile budget, measured with Lighthouse mobile simulated throttling.
Targets (hard limits in parentheses): performance score 98 (95); LCP 1.8 s (2.5 s); INP 100 ms (200 ms); CLS 0.02 (0.1); FCP 1.2 s (1.8 s); TBT 50 ms (150 ms); first load JS 70 KB gzipped (100 KB); total first load weight 500 KB (900 KB); hero image 80 KB AVIF (150 KB).
1. Run ANALYZE=true npm run build and list every client chunk over 30 KB with the reason it exists; split or remove any that are not needed.
2. Convert every image to AVIF with WebP fallback through next/image, correct sizes attributes, explicit dimensions, lazy below the fold. Compress the hero to the budget.
3. Fonts: confirm two families at most, Latin subset, only the display face preloaded, no unused weights.
4. Confirm no third party script loads before interaction or idle; defer Vercel Analytics.
5. Confirm every page is statically generated and served from the Vercel edge cache; set long cache headers on /_next/static and images.
6. Remove unused Tailwind classes and dead code; check that no shadcn component was imported that is not used.
7. Write scripts/perf.mjs that runs Lighthouse mobile on every route in the sitemap and fails if any page misses a hard limit, and add npm run perf.
Paste the perf table for every page in the commit message. Commit on branch ticket/13-performance.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/13-performance against main. Run npm run build, start the production server, and run npm run perf. Also run Lighthouse mobile by hand on /, /pricing/, and /book/ to confirm the script's numbers. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. npm run perf passes on every route; paste its table.
2. Every page meets the hard limits: score 95, LCP 2.5 s, INP 200 ms, CLS 0.1, FCP 1.8 s, TBT 150 ms, first load JS 100 KB gzipped, total weight 900 KB.
3. Flag every page that misses a target (98, 1.8 s, 100 ms, 0.02, 1.2 s, 50 ms, 70 KB, 500 KB) even if it passes the hard limit.
4. The hero image is AVIF and under 150 KB; report its size.
5. No client chunk over 30 KB without a stated reason.
6. No third party request before interaction on any page.
7. Every route is static.
End with READY TO MERGE or NEEDS FIXES and a list of the three biggest remaining speed wins, if any.
```

## Ticket 14: Launch

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Email info@ashtonsfastfurious.com. The site has passed tickets 01 to 13.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel.
House rules: no bracketed placeholder may be visible on any indexable page at launch.

Ticket 14: prepare the production launch.
1. Run the dev placeholder report from ticket 02 and list every remaining [PLACEHOLDER] with its file and whether its section is hidden or visible. Any visible one blocks launch.
2. Fill in final values I give you for: ZIP, sameAs profile URLs (Google Business Profile, Facebook, Instagram, YouTube, Nextdoor), Google review link, owner email, response time.
3. Confirm production env vars on Vercel: RESEND_API_KEY, owner email, MILITARY_PAGE_ENABLED.
4. Add the custom domain in Vercel with www as primary and the apex redirecting to it. Write out the exact DNS records I need to set at the registrar.
5. Add the Google Search Console verification meta tag from content.
6. Final redirect check: /about-us/ and /contact-us/ return 301 to /about/ and /book/; any other old URL from the live site returns a 301 to the closest new page.
7. Write LAUNCH.md with the DNS records, the env vars, and a rollback note.
Commit on branch ticket/14-launch.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website rebuild (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). This is the final launch check on the production URL after DNS is live. Fetch every URL in /sitemap.xml plus /about-us/, /contact-us/, and a missing URL. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Every sitemap URL returns 200 over HTTPS on the www host; the apex redirects to www.
2. /about-us/ and /contact-us/ return 301 to /about/ and /book/.
3. No bracketed placeholder text appears on any indexable page.
4. Phone 910-967-0205, email, hours, and prices match across the header, footer, pages, and JSON-LD.
5. JSON-LD is valid on Home, the service page, and one town page; sameAs lists the live profiles; no AggregateRating.
6. Submit a test booking: the owner email and the customer confirmation both arrive.
7. Lighthouse mobile on Home, Pricing, and Book meets the hard limits on the live domain.
8. Search Console verification tag is present; robots.txt allows crawling and points to the sitemap.
9. The site renders and the sticky bar works on a 375 px wide phone.
End with LAUNCH APPROVED or BLOCKED and the exact blockers.
```

**After launch (Richard):** submit the sitemap in Search Console, link the website on the Google Business Profile, submit citations, start the review request flow, and check rankings and the map pack at 30, 60, and 90 days.

## Ticket 15: Blog (after launch)

Start this ticket only after launch, and only once the first four posts are written and the owner has agreed to about one new post a month. A blog with two old posts looks abandoned. Post outlines are in `docs/ashtons-blog-outlines.md`.

**Cursor prompt**

```text
Project: rebuild of ashtonsfastfurious.com for Ashtons Fast & Fur-ious, a mobile dog treadmill service (climate controlled unit with two dog treadmills that parks in the customer's driveway) serving Jacksonville, Richlands, and Beulaville, North Carolina. Phone 910-967-0205. Price $60 per 30 minutes; first session free. The site has passed tickets 01 to 14 and is live.
Stack: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel. Copy reads from /content. Metadata helper and JSON-LD component from ticket 03. Read the MDX guide in node_modules/next/dist/docs/ before choosing how to load Markdown.
House rules: mobile first; PageSpeed mobile 95 or higher, LCP under 2.5 s, CLS under 0.1, first load JS under 100 KB gzipped; no new client JavaScript; no em dashes or en dashes in visible copy; never invent reviews, ratings, or statistics; one H1 per page; all copy lives in /content.

Ticket 15: add a blog.
1. Posts are Markdown files in /content/blog/, one per post, with typed frontmatter: title, description, slug, publishedAt, updatedAt, author, primaryKeyword, relatedFaqIds, draft (boolean). Parse them on the server at build time; every blog route is prerendered static HTML with no client component.
2. Build time validation that fails the build: title under 60 characters, description under 155, unique slugs, no em dash or en dash in any title, description, or body, and no H1 inside a post body (the page renders the H1 from the title). In production builds, leave out any post with draft true or any [BRACKETED] placeholder in its frontmatter or body. Log which posts were left out and why.
3. /blog/: title "Dog Exercise Tips for Jacksonville NC | Ashtons", H1 "Dog Exercise Tips from Ashtons", a short intro from /content, and post cards (title, description, published date) newest first. While no post is publishable, return 404 and leave /blog/ out of the sitemap and the footer.
4. /blog/[slug]/: H1 is the post title; visible published date and, when different, updated date; the body with H2 and H3 only and no skipped levels; one closing call to action with the accent Book button linking to /book/ and the call or text tel: link; up to two related posts. Images use next/image with explicit width and height and alt text; all post images are lazy except the first image when it sits above the fold.
5. Every post must link to /book/ and to at least one of /mobile-dog-treadmill/, /safety/, /faq/, or a town page. Fail the build when a post has neither.
6. Metadata through the ticket 03 helper: self referencing canonical on the www host, Open Graph type article with published and modified times. JSON-LD: BlogPosting with headline, description, datePublished, dateModified, author, image, mainEntityOfPage, and publisher pointing to https://www.ashtonsfastfurious.com/#business; BreadcrumbList Home, Blog, post. No AggregateRating or Review markup.
7. Add /blog/ and every published post to app/sitemap.ts, with lastmod set to updatedAt.
8. Links: add Blog to the footer. Do not add it to the header nav, which stays at six items or fewer. On /faq/, an answer whose id is in a post's relatedFaqIds gets a "Read more" link to that post.
9. Add one sample post with draft true so the pipeline is tested without publishing it.
Run build and lint. Commit on branch ticket/15-blog.
```

**Claude QA prompt**

```text
You are QA for the Ashtons Fast & Fur-ious website (Next.js App Router, TypeScript, Tailwind, Vercel; mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC). Review branch ticket/15-blog against main. Run npm run build and npm run lint, start the production server, fetch /blog/ and every post, and run Lighthouse mobile on /blog/ and the longest post. Report each check as PASS or FAIL with evidence. Do not change any code.
Checks:
1. Build and lint pass; /blog/ and every post are listed as static in the build output; no blog route ships a client component.
2. Lighthouse mobile 95 or higher on /blog/ and the longest post; LCP under 2.5 s; CLS under 0.1.
3. No draft post and no post containing a [BRACKETED] placeholder appears on /blog/, at its URL, or in the sitemap. Temporarily add a placeholder to a published post, rebuild, confirm it drops out, then revert.
4. Each post has one H1 equal to its title, no skipped heading levels, a title under 60 characters, a description under 155, and a self referencing www canonical.
5. BlogPosting JSON-LD parses, has datePublished and dateModified matching the visible dates, and its publisher @id is https://www.ashtonsfastfurious.com/#business; BreadcrumbList is Home, Blog, post; no AggregateRating or Review markup.
6. Every post links to /book/ and to at least one service, safety, FAQ, or town page.
7. /sitemap.xml lists /blog/ and each published post with lastmod equal to updatedAt.
8. Blog appears in the footer and not in the header nav; header nav still has six items or fewer.
9. No statistic, health claim, or temperature figure in a post appears without either a confirmed owner fact or a linked source; quote any that do not.
10. No em dashes or en dashes in visible copy; no post claims the dog sets the pace or that the treadmill has no motor.
End with READY TO MERGE or NEEDS FIXES.
```
