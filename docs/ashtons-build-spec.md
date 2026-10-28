# Ashtons Fast & Fur-ious Website Build Spec

Oct 20, 2026 · @Richard Kolstad

## Project summary

Rebuild ashtonsfastfurious.com as a 12 page, mobile first site that ranks for mobile dog treadmill searches in Onslow and Duplin counties and turns visitors into booked free first sessions. Research found no verified mobile dog treadmill operator in the area, and page one for treadmill terms is held by out of state sites with domain authority under 12. The current site has 3 pages, two H1s (one reads "Coming Soon"), placeholder testimonials, no schema, and its only price is buried in the About FAQ.

**Business facts (from the current site):** climate controlled mobile unit with two dog treadmills; sessions 15 minutes to 1 hour; $60 per 30 minutes; first session free; 7 AM to 7 PM; serves Jacksonville, Richlands, and Beulaville NC; 910-967-0205; info@ashtonsfastfurious.com.

**Audience:** busy dog owners in Jacksonville, Richlands, and Beulaville, with a large share of military households near Camp Lejeune and MCAS New River. Priority dogs: high energy and working breeds (Malinois, German Shepherd, Husky), reactive or anxious dogs that do poorly at parks and daycare, overweight dogs, and dogs kept inside by summer heat.

**Positioning:** a climate controlled workout in your driveway. It beats walks on output and weather, beats daycare on stress and drop off, and supplements walks rather than replacing them.

**Primary conversion:** book a free first session. **Secondary:** call or text.

**Success measures (first 90 days after launch):**

- Page one for "mobile dog treadmill Jacksonville NC" and "mobile dog gym Jacksonville NC"
- Google Business Profile verified and appearing in the map pack for "dog treadmill near me" in Jacksonville
- 20 or more real Google reviews
- Booking requests tracked as a conversion in analytics

## Open items for the owner

The build can start now with marked placeholders; these answers fill them before launch. Each one changes copy, pricing, or the page list.

- [ ] Name the local competitors Richard saw in Google so the competitor section and any "first in the area" claim can be checked. Neither research pass found one.
- [ ] Confirm the primary phone. The site shows 910-967-0205 and one Facebook result shows 910-901-3332; name, phone, and site must match everywhere.
- [ ] Motorized treadmills or non motorized slatmills? This decides the safety copy ("your dog sets the pace" only works for slatmills).
- [ ] Brand and model of the treadmills, and the max dog weight.
- [ ] Can the unit enter Camp Lejeune and MCAS New River housing? This decides whether the Military Families page promises on base service.
- [ ] Route days for each town, and any travel fee (likely for Beulaville).
- [ ] Final price menu: 15, 30, 45, 60 minute rates; two dog same visit price; monthly membership; military discount.
- [ ] Cancellation policy and same day fee.
- [ ] Vaccination and eligibility rules (minimum age, vet clearance).
- [ ] Liability waiver text, reviewed by an NC attorney.
- [ ] Insurance carried (Richard's agency can confirm and word the trust line).
- [ ] Founding story, owner and handler names, any certifications.
- [ ] Real photos and short video of the unit, both treadmills, and dogs mid session.
- [ ] Real customer reviews or permission to quote existing customers. The current four testimonials come down.
- [ ] Current website platform and domain registrar logins.
- [ ] Google Business Profile: does one exist, and who owns it?

## Platform and stack

Build a custom static site in Next.js on Vercel, the same stack as Richard's other client builds. The current builder could not be identified, and Google does not rank by platform; the move is for full control of titles, H1s, alt text, JSON-LD, URLs, redirects, and speed.

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router, Server Components), TypeScript |
| Styling | Tailwind CSS, shadcn/ui for form and accordion parts |
| Hosting | Vercel, custom domain ashtonsfastfurious.com with www redirect to apex or the reverse (pick one, 301 the other) |
| Content | Page copy in MDX or typed content files so a town page or FAQ edit is one file |
| Forms | Booking form posts to a Vercel function; email via Resend to the owner plus a confirmation to the customer |
| Analytics | Vercel Web Analytics plus Google Search Console; booking submit and tel: tap tracked as events |
| Images | next/image, WebP or AVIF, explicit width and height |

**Redirects from the old site (301):**

| Old URL | New URL |
| --- | --- |
| /about-us/ | /about/ |
| /contact-us/ | /book/ |
| / | / (unchanged) |

The owner cannot edit Next.js directly. Decide before launch whether Richard maintains updates, or whether reviews and route days come from a small editable source (a Google Sheet or a Supabase table) the site reads at build time.

## Site map

The site has 12 indexable pages plus an optional Military Families page and the legal pages. Every page links from Home or the main nav, and each town page links back to the hub.

&#91;embedded content: site map · 14 pages in 3 groups\]

Main nav: Service, Pricing, Service Areas, Reviews, About, and a Book button. Footer: the three town links, phone, hours, and the legal pages.

## Page specs

Every page has one H1 naming the service and place, one primary CTA (Book a free first session), and a sticky bottom bar on mobile with Book and Call/Text. Copy never uses placeholder reviews; where proof is missing, the build shows a labeled \[REVIEW\] slot and the section stays hidden until filled.

### Home

Section order, top to bottom:

1. **Hero.** H1: "Mobile Dog Treadmill Workouts in Jacksonville, NC." Subhead: climate controlled, supervised workouts in your driveway; first session free. Primary button: Book a free first session. Secondary: Call or text 910-967-0205. Hero image: a real photo of a dog mid session in the unit. Trust line under the buttons: Serving Jacksonville, Richlands, and Beulaville.
2. **How it works (3 steps).** Book your free session; we park in your driveway; your dog runs 15 to 60 minutes while we supervise.
3. **Trust strip.** Climate controlled unit; every session supervised; harnessed, never tied by the neck; equipment cleaned between dogs; insured \[confirm\].
4. **Who it's for.** Bento grid of dog profiles: high energy and working breeds; reactive or anxious dogs; dogs stuck inside in summer heat; weight management; busy and military households; senior dogs with vet clearance.
5. **Pricing preview.** Three cards: Free first session; 30 minute session $60; monthly membership \[price TBD\]. Link to Pricing.
6. **Reviews.** Real Google reviews only, with a link to the Google profile. Hidden until at least 3 exist.
7. **Safety and FAQ preview.** Four most asked questions (safe, how long, will my dog like it, what it costs), link to FAQ.
8. **Service area.** Map graphic or list of the three towns, each linking to its town page.
9. **Booking form** (spec in the booking section).

### Mobile Dog Treadmill (service page)

What a session looks like start to finish, session lengths 15 to 60 minutes, the intro assessment on the first visit, what the dog needs (harness, vaccinations), weather and heat policy, and how two dogs run side by side on the two treadmills. Embed one short video of a real session.

### Pricing

Opens with the answer in the first sentence: "A 30 minute mobile dog treadmill session in Jacksonville NC is $60, and your first session is free." Price cards for every session length, two dog price, monthly membership, military discount, travel fee by town, cancellation fee. No "call for pricing."

### FAQ

10 to 15 questions, each answered in its first sentence: are dog treadmills safe; are they illegal; can my dog use one; how long should a dog run; will my dog like it; what breeds; weight limits; puppies and seniors; reactive dogs; hot weather; what if it rains; how do I pay; cancellation; vaccinations; do you come on base.

### Safety

Supervision on every minute, harness setup, gradual intro, the dog is never forced, water and rest breaks, heat protocol, cleaning between dogs, vaccination and vet clearance rules, insurance statement. Repeats the vet framing that treadmill work supplements walks.

### Daycare alternative

H1: "A Dog Daycare Alternative in Jacksonville, NC." Honest comparison: no drop off, no crowd, no kennel stress, focused exercise in 30 minutes. Built for reactive and anxious dogs. Does not claim to be a daycare. Compare table: Ashtons vs daycare vs dog walker (format, time, cost range, weather, best for).

### Service Areas hub and town pages

The hub lists the three towns with links, plus Hubert, Sneads Ferry, and Swansboro as text only until service there is regular. Each town page must carry facts that are only true for that town or it gets merged into the hub:

- Neighborhoods served (Jacksonville: Piney Green, Half Moon, Midway Park; Richlands: Pumpkin Center) \[confirm\]
- Route days for that town
- Travel fee, if any
- One local condition (apartment dogs in Jacksonville; rural roads in Beulaville, Duplin County)
- One or two real reviews from customers in that town
- A photo taken in that town
- A three question town FAQ

### Military Families (build only if there is a real offer)

Military discount, deployment and PCS scheduling flexibility, and base housing access if confirmed. Skip the page if neither the discount nor base access is real.

### About

The founding story, who handles the dogs, certifications, the unit, and community work (a "sponsor a shelter dog run" program is common among peers and worth offering). Owner to supply story and photos.

### Reviews

Embedded Google reviews with a Leave a review button linking to the Google review form. No star schema on this page.

### Book

The booking form, a short note on response time, phone and text, and the service area list.

### Legal (footer)

Privacy policy covering form data and SMS consent; Terms with waiver summary, cancellation policy, and vaccination rules.

## On-page SEO

Every page gets a unique title under 60 characters, a meta description under 155, and one H1. Every local phrase carries "NC" or a county name, because "Jacksonville" alone pulls Florida searches. Keyword volumes are from Ubersuggest, October 20, 2026.

| Page | URL | Title tag | H1 | Primary keyword |
| --- | --- | --- | --- | --- |
| Home | / | Mobile Dog Treadmill in Jacksonville NC \| Ashtons | Mobile Dog Treadmill Workouts in Jacksonville, NC | mobile dog treadmill Jacksonville NC |
| Service | /mobile-dog-treadmill/ | Mobile Dog Treadmill Sessions at Your Home \| Ashtons | Mobile Dog Treadmill Sessions in Your Driveway | mobile dog treadmill service |
| Pricing | /pricing/ | Mobile Dog Treadmill Prices \| First Session Free | Mobile Dog Treadmill Pricing | mobile dog treadmill cost |
| FAQ | /faq/ | Dog Treadmill FAQ: Safety, Breeds, Cost \| Ashtons | Dog Treadmill Questions, Answered | are dog treadmills safe |
| Safety | /safety/ | Is Treadmill Exercise Safe for Dogs? \| Ashtons | How We Keep Every Session Safe | is treadmill exercise safe for dogs |
| Daycare alternative | /dog-daycare-alternative/ | Dog Daycare Alternative in Jacksonville NC \| Ashtons | A Dog Daycare Alternative in Jacksonville, NC | dog daycare alternative Jacksonville NC |
| Service areas | /service-areas/ | Mobile Dog Gym Service Areas in Onslow County \| Ashtons | Where We Bring the Mobile Dog Gym | mobile dog gym Onslow County |
| Jacksonville | /service-areas/jacksonville-nc/ | Mobile Dog Gym in Jacksonville, NC \| Ashtons | Mobile Dog Gym in Jacksonville, NC | mobile dog gym Jacksonville NC |
| Richlands | /service-areas/richlands-nc/ | Mobile Dog Exercise in Richlands, NC \| Ashtons | Mobile Dog Exercise in Richlands, NC | dog exercise Richlands NC |
| Beulaville | /service-areas/beulaville-nc/ | Mobile Dog Exercise in Beulaville, NC \| Ashtons | Mobile Dog Exercise in Beulaville, NC | dog exercise Beulaville NC |
| Military | /military-families/ | Dog Exercise for Military Families \| Ashtons | Dog Exercise for Camp Lejeune Families | dog exercise for military families |
| About | /about/ | About Ashtons Fast & Fur-ious \| Jacksonville NC | About Ashtons Fast & Fur-ious | brand |
| Reviews | /reviews/ | Reviews \| Ashtons Mobile Dog Gym, Jacksonville NC | What Dog Owners Say | brand reviews |
| Book | /book/ | Book a Free Dog Treadmill Session \| Ashtons | Book Your Free First Session | book mobile dog treadmill |

**Model meta description (Home):** Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC. 30 min from $60. First session free.

**Secondary terms to work into body copy:** mobile dog gym (1,600 US searches a month), dog treadmill near me (880), mobile dog treadmill (390), dog treadmill service near me (260), dog exercise near me (210).

**Fixes the rebuild must make:** remove the "Coming Soon" H1, the meta keywords tag, maximum-scale and user-scalable in the viewport, and format-detection telephone=no; one H1 per page with no skipped heading levels; descriptive image file names and alt text; tel: links on every phone number; footer links to all three town pages; XML sitemap with lastmod dates; robots.txt pointing to it.

## Structured data

Use plain LocalBusiness, since schema.org has no PetService type. Show city, state, and ZIP only, with no street address or geo, so the owner's home is not exposed. Town pages reference the same @id instead of declaring new businesses.

**Rules:**

- No AggregateRating or Review markup for the business's own reviews. Google treats it as self serving and the page loses star eligibility.
- FAQPage markup is allowed but no longer earns rich results (ended May 7, 2026). Optional.
- Structured data must match visible page content exactly (hours, phone, price).
- Add sameAs links as each profile goes live (Google Business Profile, Facebook, Instagram, YouTube, Nextdoor).

**Homepage JSON-LD (ZIP and sameAs to fill):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ashtonsfastfurious.com/#business",
  "name": "Ashtons Fast & Fur-ious",
  "url": "https://www.ashtonsfastfurious.com/",
  "telephone": "+1-910-967-0205",
  "email": "info@ashtonsfastfurious.com",
  "logo": "https://www.ashtonsfastfurious.com/logo.png",
  "image": "https://www.ashtonsfastfurious.com/images/mobile-dog-treadmill-unit.jpg",
  "description": "Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC.",
  "priceRange": "$60 per 30-minute session",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jacksonville",
    "addressRegion": "NC",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Jacksonville, NC"},
    {"@type": "City", "name": "Richlands, NC"},
    {"@type": "City", "name": "Beulaville, NC"}
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "07:00",
    "closes": "19:00"
  }],
  "sameAs": []
}
```

Confirm the days of the week with the owner; the current site lists only 7 AM to 7 PM.

**Service page:** add a Service node with serviceType "Mobile dog treadmill exercise", provider pointing to the @id above, areaServed the three towns, and an Offer at 60 USD for a 30 minute session.

**All pages below Home:** BreadcrumbList.

## Design direction

The best looking mobile dog gym sites put the vehicle or a dog on the treadmill in the hero, use one strong accent color for the Book button, and set headlines in bold display type. Seven operator sites were reviewed in Chrome on October 22, 2026.

| Site | What it looks like | Worth copying | Avoid |
| --- | --- | --- | --- |
| [Paws in Motion](https://www.pawsinmotionmobile.com/) (Syracuse NY) | Dark navy background, orange accent, tall condensed uppercase headlines, illustrated mascot logo | "Now booking" label above the H1; numbered 01 02 03 steps; profile cards for high energy, apartment, weight, senior, reactive dogs; orange used only for buttons | Hero art is the logo, not a real dog |
| [Tread & Wag](https://treadandwag.com/) (Texas) | Photo of the wrapped van as the hero under a dark overlay, serif headline with one word in yellow, cream sections | Pill badge over the headline; icon cards on light tiles; real photo of a dog mid run | A "portal under maintenance" notice high on the homepage; cookie banner covering the button |
| [UpDog](https://www.updoggym.com/) | Lime, teal, and purple pulled straight from the van wrap | Top bar with the intro offer and a Book link; "New here? Get started" button | Two equal buttons in the hero |
| [Run-N-Paw](https://run-n-paw.com/) (Florida) | Teal and purple on white, older WordPress look | Session video beside the steps; trust icon row (insured, climate controlled, shelter partner); highlighted middle price card | Nine item nav, small logo, crowded type |
| [Ruff Ruff Run](https://ruffruffrun.com/) (New Jersey) | Wrapped bus in front of the skyline | Banner for 15% off for military, first responders, veterans | Builder ad bar and cookie popup over the hero |
| [Run Buddy](https://runbuddymobile.com/) (Phoenix) | Light blue, spaced serif caps, stock style photos | Little | Dated look, generic photos |
| [Jog Dat Dog](https://jogdatdog.com/) (Kansas City) | Teal contact strip over a white header | Phone and email in a top strip | Hero was still blank after 5 seconds |

**Direction for Ashtons:**

- **The unit and Ashton are the hero.** The current logo already shows Ashton, a dog, and the van. Lead with a real photo of a dog running in the unit, or the unit in a local driveway, under a dark overlay.
- **Palette from the logo:** near black navy as the base, the logo's bright blue as the brand color, white text. Add one warm accent (orange or yellow) used only for Book buttons \[confirm with the owner\].
- **Type:** a bold condensed or slightly slanted display face for headlines to match "Fast," with a clean sans for body. Do not imitate the Fast & Furious film logo or lettering; the brand needs its own look to avoid a trademark problem.
- **Hero layout:** pill label "Now booking: Jacksonville, Richlands, Beulaville"; H1; one line subhead; Book a free first session button; call or text as a quiet text link.
- **Top bar:** "First session free" plus the military discount once it is set.
- **Sections:** numbered 3 step row; icon cards for who it's for; trust icon row; price cards with the 30 minute card highlighted; one session video.
- **Photography:** real photos only. Needed: the unit in a driveway, both treadmills in use, a close up of the harness, Ashton with a dog. Remove the stock "dog walker" image on the current About page.
- **Video:** a 30 to 60 second session clip on YouTube, embedded on the service page with a click to play poster; never autoplay in the hero.
- **Avoid:** cookie popups over the hero, notices or announcements above the fold, more than six nav items, carousels, stock photos.
- **Mockup step:** before coding, build the homepage as a design mockup (mobile and desktop) for the owner to approve.

## Premium design features

Every feature below must pass the mobile speed budget in the next section. Each is built with CSS and small client components; no animation library, no autoplay video, and nothing that blocks the first paint.

| Feature | Where | How it is built | Mobile behavior |
| --- | --- | --- | --- |
| Kinetic hero headline: words slide in with a short speed blur | Home hero | CSS keyframes on transform and opacity, under 600 ms total, starts after first paint | Same, shorter distance |
| Scroll reveals: sections fade and lift in | All pages | One shared IntersectionObserver, CSS classes | Same; off when reduced motion is on |
| Stat counter (sessions run, dogs served) | Home trust strip | Counts up once in view; numbers from a content file | Same; hidden until real numbers exist |
| Bento grid with real photos | Home "Who it's for" | CSS grid, mixed tile sizes, lazy images | Stacks to one column |
| Before and after slider (wound up dog vs calm dog) | Service page | Small client component with a range input | Touch drag; keyboard accessible |
| Live price builder: pick length and dogs, total updates | Pricing | Client component reading the price content file; links into the booking form prefilled | Full width, large tap targets |
| Glass sticky header that shrinks on scroll | All pages | backdrop-filter with a solid fallback | Replaced by the sticky bottom Book and Call bar |
| Card hover lift and soft glow on the Book button | All pages | CSS transitions only | Off; tap states instead |
| Paw print cursor trail | Home only | Tiny script, loads after idle, pointer fine devices only | Never loads |
| Service area map with towns that light up | Service Areas hub, Home | Inline SVG of Onslow and Duplin, CSS hover and focus | Tap a town to open its page |
| Video facade | Service page | Poster image; YouTube iframe loads on click | Same |
| Custom icon set | Site wide | Inline SVG sprite, one file | Same |

**Rules for all motion:** honor prefers-reduced-motion; animate transform and opacity only; no layout shift; no motion on anything the visitor needs to read before acting (prices, form fields, buttons).

## Booking and conversion

The booking form is a short multi step request, not a calendar, because route days vary by town. Easiest questions come first and contact details come last.

| Step | Fields | Input type |
| --- | --- | --- |
| 1 | Town (Jacksonville, Richlands, Beulaville, Other) | Buttons |
| 2 | Number of dogs (1, 2, 3+); dog size (under 25 lb, 25 to 60, 60 to 90, over 90) | Buttons |
| 3 | Preferred days; morning, midday, or evening | Checkboxes |
| 4 | Name; mobile phone; email; dog breed (optional); notes (optional) | Text, tel, email |
| Submit | Button text: Book my free session |  |

**After submit:** thank you screen with what happens next and the phone number; email to the owner with all answers; confirmation email to the customer; SMS consent checkbox only if the owner will text reminders (unchecked by default).

**Conversion elements on every page:**

- Sticky mobile bar: Book free session (primary) and Call or text (secondary), tap targets at least 44 px
- Price shown before the form, so there are no surprises
- Real review or rating near every Book button once reviews exist
- Free first session stated in the hero, on Pricing, and on the button

**Analytics events:** form step completed (1 to 4), form submitted, tel: tap, sms: tap, Google review link click.

**First A/B test after launch:** hero button text, "Book a free first session" vs "Try a free session."

## Mobile speed, accessibility, and technical

Mobile load speed is a launch blocker. Most visitors will come from phones near Camp Lejeune, often on cell data, and every 100 ms of extra load time costs roughly 3.5% of conversions. No page ships until it meets every number below on a throttled mobile test.

**Mobile budget (PageSpeed Insights, mobile, every page):**

| Measure | Target | Hard limit |
| --- | --- | --- |
| Performance score | 98 or higher | 95 |
| Largest Contentful Paint | 1.8 s or less | 2.5 s |
| Interaction to Next Paint | 100 ms or less | 200 ms |
| Cumulative Layout Shift | 0.02 or less | 0.1 |
| First Contentful Paint | 1.2 s or less | 1.8 s |
| Total Blocking Time | 50 ms or less | 150 ms |
| JavaScript shipped on first load | 70 KB gzipped or less | 150 KB (175 KB on /book/) |
| Total page weight on first load | 500 KB or less | 900 KB |
| Hero image | 80 KB or less (AVIF) | 150 KB |

**How the build hits it:**

- [ ] Static generation for every page; no client side data fetching on load
- [ ] Server Components by default; client components only for the price builder, slider, booking form, and header scroll state
- [ ] Hero image preloaded with fetchpriority high, AVIF with WebP fallback, sized srcset for 375, 768, 1280 widths, explicit width and height
- [ ] Every image below the fold lazy loaded and served through next/image
- [ ] Fonts self hosted with next/font, two families at most, subset to Latin, font-display swap, display face preloaded
- [ ] No animation library; CSS transitions and one shared IntersectionObserver
- [ ] Third party scripts loaded after interaction or idle only (YouTube on click, analytics deferred); no chat widget, no cookie popup unless legally needed
- [ ] Booking form code split so it loads when scrolled near
- [ ] Inline SVG icons and map, no icon font
- [ ] Tailwind purged; critical CSS inlined by Next
- [ ] Vercel edge caching on static pages; images served from the Vercel image CDN
- [ ] Bundle analyzer run before launch; any client chunk over 30 KB needs a reason

**Accessibility (WCAG 2.2 AA floor):**

- [ ] Viewport allows pinch zoom
- [ ] Text contrast at least 4.5:1, visible focus states, labeled form inputs
- [ ] Semantic landmarks and one H1 per page
- [ ] Descriptive alt text on every image
- [ ] Reduced motion respected

**Technical:**

- [ ] HTTPS, one canonical host, self referencing canonical tags
- [ ] XML sitemap with lastmod, robots.txt, 404 page with a Book link
- [ ] 301 redirects from the old URLs live on launch day
- [ ] Search Console verified and sitemap submitted
- [ ] Speed tested on a real mid range Android phone on cell data, not only in the lab

## Google Business Profile, reviews, and launch

Local searches for this service resolve in the map pack, so the Google Business Profile does as much ranking work as the site. Set it up as a service area business with the address hidden.

**Profile settings:**

- Name: Ashtons Fast & Fur-ious only, with no keywords added (adding them violates Google's guidelines)
- Primary category: Dog walker; secondary: Pet sitter. No dog exercise category exists; confirm both in the live editor
- Service areas: Jacksonville, Richlands, Beulaville, plus ZIPs actually served; no padding
- Services with prices: free first session, 30 minute session $60, two dog session, other lengths
- Hours 7 AM to 7 PM, website link to the homepage
- Photos and video of the unit, treadmills, and real sessions
- Verification may be by live video: put a decal or magnet on the unit first

**Review system:** a QR card in the unit and a text with the review link after every session; reply to every review; aim for a steady pace rather than bursts. Target 20 reviews in 90 days.

**Citations (same name, phone, and site everywhere, no street address):** Bing Places, Apple Business Connect, Facebook (rename to match), Nextdoor, Yelp, Instagram, YouTube, Jacksonville Onslow Chamber.

**Launch checklist:**

- [ ] Owner answers the open items above
- [ ] Homepage mockup approved
- [ ] Copy written in a human voice and reviewed by the owner
- [ ] All pages built, placeholders cleared or hidden
- [ ] Booking form tested end to end on iPhone and Android
- [ ] Redirects, sitemap, schema validated (Rich Results Test and schema.org validator)
- [ ] DNS cut over to Vercel
- [ ] Search Console and analytics live
- [ ] Google Business Profile verified and linked
- [ ] Citations submitted
- [ ] Review request flow running
- [ ] Rankings and map pack checked at 30, 60, and 90 days

## Build tickets

The Cursor build tickets and Claude QA plan are in Build tickets.
