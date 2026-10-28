import { business } from "./business";
import { isConfirmedPrice, pricing } from "./pricing";

export const siteUrl = "https://www.ashtonsfastfurious.com";
export const businessId = `${siteUrl}/#business`;
export const postalCode = "[ZIP]" as const;
export const schemaTelephone = `+1-${business.phoneDisplay}`;
// Link preview image: the logo on the site light slate at the 1200x630 size that
// Facebook, iMessage, and summary_large_image cards expect.
export const ogImagePath = "/brand/ashtons-og-1200x630.jpg";
export const ogImageSize = { width: 1200, height: 630 } as const;
export const contentUpdated = "2026-10-24";

// Google Search Console HTML tag value (the content attribute only). Hidden until confirmed.
export const googleSiteVerification = "[GOOGLE SITE VERIFICATION]";

// Off unless MILITARY_PAGE_ENABLED is exactly "true" at build time.
export const militaryFamiliesEnabled = process.env.MILITARY_PAGE_ENABLED === "true";

const thirtyMinute = pricing.sessions.find((session) => session.minutes === 30);

if (!thirtyMinute || !isConfirmedPrice(thirtyMinute.price)) {
  throw new Error("The 30 minute session price is not confirmed.");
}

export const priceRange = `$${thirtyMinute.price} per 30-minute session`;

export const businessDescription =
  "Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC.";

const homeDescription =
  "Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC. 30 min from $60. First session free.";

export type PagePath =
  | "/"
  | "/mobile-dog-treadmill/"
  | "/pricing/"
  | "/faq/"
  | "/safety/"
  | "/dog-daycare-alternative/"
  | "/service-areas/"
  | "/service-areas/jacksonville-nc/"
  | "/service-areas/richlands-nc/"
  | "/service-areas/beulaville-nc/"
  | "/military-families/"
  | "/about/"
  | "/reviews/"
  | "/book/";

export type Crumb = {
  name: string;
  path: string;
};

export type SeoPage = {
  path: PagePath;
  title: string;
  description: string;
  h1: string;
  crumbs: readonly Crumb[];
};

const homeCrumb: Crumb = { name: "Home", path: "/" };

const serviceAreasH1 = "Where We Bring the Mobile Dog Gym";
const serviceAreasPath = "/service-areas/" as const;
const serviceAreasCrumb: Crumb = { name: serviceAreasH1, path: serviceAreasPath };

function trail(path: PagePath, name: string, parent?: Crumb): Crumb[] {
  const crumbs = [homeCrumb];
  if (parent) {
    crumbs.push(parent);
  }
  crumbs.push({ name, path });
  return crumbs;
}

export const pages = [
  {
    path: "/",
    title: "Mobile Dog Treadmill in Jacksonville NC | Ashtons",
    description: homeDescription,
    h1: "Mobile Dog Treadmill Workouts in Jacksonville, NC",
    crumbs: [],
  },
  {
    path: "/mobile-dog-treadmill/",
    title: "Mobile Dog Treadmill Sessions at Your Home | Ashtons",
    description:
      "Supervised mobile dog treadmill sessions in your driveway. 30 minutes is $60. First session free in Jacksonville, Richlands, and Beulaville NC.",
    h1: "Mobile Dog Treadmill Sessions in Your Driveway",
    crumbs: trail(
      "/mobile-dog-treadmill/",
      "Mobile Dog Treadmill Sessions in Your Driveway",
    ),
  },
  {
    path: "/pricing/",
    title: "Mobile Dog Treadmill Prices | First Session Free",
    description:
      "A 30 minute mobile dog treadmill session is $60. Your first session is free. Serving Jacksonville, Richlands, and Beulaville NC.",
    h1: "Mobile Dog Treadmill Pricing",
    crumbs: trail("/pricing/", "Mobile Dog Treadmill Pricing"),
  },
  {
    path: "/faq/",
    title: "Dog Treadmill FAQ: Safety, Breeds, Cost | Ashtons",
    description:
      "Answers on dog treadmill safety, session length, breeds, and the $60 price. Serving Jacksonville, Richlands, and Beulaville NC.",
    h1: "Dog Treadmill Questions, Answered",
    crumbs: trail("/faq/", "Dog Treadmill Questions, Answered"),
  },
  {
    path: "/safety/",
    title: "Is Treadmill Exercise Safe for Dogs? | Ashtons",
    description:
      "How Ashtons keeps each treadmill session supervised, harnessed, and never tied by the neck. Jacksonville, Richlands, and Beulaville NC.",
    h1: "How We Keep Every Session Safe",
    crumbs: trail("/safety/", "How We Keep Every Session Safe"),
  },
  {
    path: "/dog-daycare-alternative/",
    title: "Dog Daycare Alternative in Jacksonville NC | Ashtons",
    description:
      "A driveway workout instead of drop off daycare. No crowd. 30 minutes from $60 in Jacksonville NC. First session free.",
    h1: "A Dog Daycare Alternative in Jacksonville, NC",
    crumbs: trail(
      "/dog-daycare-alternative/",
      "A Dog Daycare Alternative in Jacksonville, NC",
    ),
  },
  {
    path: serviceAreasPath,
    title: "Mobile Dog Gym Service Areas in Onslow County | Ashtons",
    description:
      "Mobile dog gym visits in Jacksonville, Richlands, and Beulaville NC, covering Onslow County and Duplin County.",
    h1: serviceAreasH1,
    crumbs: trail(serviceAreasPath, serviceAreasH1),
  },
  {
    path: "/service-areas/jacksonville-nc/",
    title: "Mobile Dog Gym in Jacksonville, NC | Ashtons",
    description:
      "Mobile dog gym sessions in Jacksonville, NC, including Piney Green, Half Moon, and Midway Park. 30 minutes is $60.",
    h1: "Mobile Dog Gym in Jacksonville, NC",
    crumbs: trail(
      "/service-areas/jacksonville-nc/",
      "Mobile Dog Gym in Jacksonville, NC",
      serviceAreasCrumb,
    ),
  },
  {
    path: "/service-areas/richlands-nc/",
    title: "Mobile Dog Exercise in Richlands, NC | Ashtons",
    description:
      "Mobile dog exercise in Richlands, NC, including Pumpkin Center. 30 minute sessions are $60. First session free.",
    h1: "Mobile Dog Exercise in Richlands, NC",
    crumbs: trail(
      "/service-areas/richlands-nc/",
      "Mobile Dog Exercise in Richlands, NC",
      serviceAreasCrumb,
    ),
  },
  {
    path: "/service-areas/beulaville-nc/",
    title: "Mobile Dog Exercise in Beulaville, NC | Ashtons",
    description:
      "Mobile dog exercise in Beulaville, NC, in Duplin County. 30 minute sessions are $60. First session free.",
    h1: "Mobile Dog Exercise in Beulaville, NC",
    crumbs: trail(
      "/service-areas/beulaville-nc/",
      "Mobile Dog Exercise in Beulaville, NC",
      serviceAreasCrumb,
    ),
  },
  {
    path: "/military-families/",
    title: "Dog Exercise for Military Families | Ashtons",
    description:
      "Dog exercise for military families near Camp Lejeune. Mobile treadmill sessions in Jacksonville, Richlands, and Beulaville NC.",
    h1: "Dog Exercise for Camp Lejeune Families",
    crumbs: trail("/military-families/", "Dog Exercise for Camp Lejeune Families"),
  },
  {
    path: "/about/",
    title: "About Ashtons Fast & Fur-ious | Jacksonville NC",
    description:
      "About Ashtons Fast & Fur-ious, a mobile dog treadmill service in Jacksonville, Richlands, and Beulaville NC.",
    h1: "About Ashtons Fast & Fur-ious",
    crumbs: trail("/about/", "About Ashtons Fast & Fur-ious"),
  },
  {
    path: "/reviews/",
    title: "Reviews | Ashtons Mobile Dog Gym, Jacksonville NC",
    description:
      "What dog owners say about Ashtons mobile dog gym in Jacksonville, Richlands, and Beulaville NC.",
    h1: "What Dog Owners Say",
    crumbs: trail("/reviews/", "What Dog Owners Say"),
  },
  {
    path: "/book/",
    title: "Book a Free Dog Treadmill Session | Ashtons",
    description:
      "Book your free first mobile dog treadmill session in Jacksonville, Richlands, or Beulaville NC. 30 minutes is $60 after that.",
    h1: "Book Your Free First Session",
    crumbs: trail("/book/", "Book Your Free First Session"),
  },
] as const satisfies readonly SeoPage[];

const titles = new Set<string>();
const descriptions = new Set<string>();
const h1s = new Set<string>();
const dash = /[\u2013\u2014]/;

for (const page of pages) {
  if (page.title.length >= 60) {
    throw new Error(`Title is not under 60 characters: ${page.path}`);
  }
  if (page.description.length >= 155) {
    throw new Error(`Description is not under 155 characters: ${page.path}`);
  }
  if (titles.has(page.title) || descriptions.has(page.description) || h1s.has(page.h1)) {
    throw new Error(`Duplicate title, description, or H1: ${page.path}`);
  }
  if (dash.test(page.title) || dash.test(page.description) || dash.test(page.h1)) {
    throw new Error(`Em dash or en dash in SEO copy: ${page.path}`);
  }
  if (page.path === "/" && page.crumbs.length !== 0) {
    throw new Error("Home does not use a breadcrumb trail.");
  }
  if (page.path !== "/" && page.crumbs.length < 2) {
    throw new Error(`Missing breadcrumb trail: ${page.path}`);
  }
  titles.add(page.title);
  descriptions.add(page.description);
  h1s.add(page.h1);
}

if (pages[0]?.description !== homeDescription) {
  throw new Error("Home meta description does not match the required sentence.");
}

if (priceRange !== "$60 per 30-minute session") {
  throw new Error("priceRange does not match the confirmed 30 minute price.");
}

if (schemaTelephone !== "+1-910-967-0205") {
  throw new Error("Schema telephone does not match the published phone number.");
}

export function getPage(path: PagePath): SeoPage {
  const page = pages.find((item) => item.path === path);
  if (!page) {
    throw new Error(`Missing SEO page: ${path}`);
  }
  return page;
}

export function isPagePath(path: string): path is PagePath {
  return pages.some((page) => page.path === path);
}

export function pathFromSlug(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) {
    return "/";
  }
  return `/${slug.join("/")}/`;
}

export function livePages(): readonly SeoPage[] {
  return pages.filter(
    (page) => page.path !== "/military-families/" || militaryFamiliesEnabled,
  );
}
