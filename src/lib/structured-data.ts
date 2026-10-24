import { business } from "../../content/business";
import {
  businessDescription,
  businessId,
  getPage,
  ogImagePath,
  postalCode,
  priceRange,
  schemaTelephone,
  siteUrl,
  type PagePath,
} from "../../content/seo";
import { isPlaceholder } from "../../content/placeholders";
import { isConfirmedPrice, pricing } from "../../content/pricing";

export type JsonLdBlock = Record<string, unknown>;

function absolute(path: string): string {
  return new URL(path, siteUrl).href;
}

function cities(): JsonLdBlock[] {
  return business.serviceTowns.map((town) => ({
    "@type": "City",
    name: `${town}, NC`,
  }));
}

function localBusiness(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    url: absolute("/"),
    telephone: schemaTelephone,
    email: business.email,
    logo: absolute(business.logoPath),
    image: absolute(ogImagePath),
    description: businessDescription,
    priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jacksonville",
      addressRegion: "NC",
      // The ZIP joins the markup once the owner confirms it; a placeholder never ships.
      ...(isPlaceholder(postalCode) ? {} : { postalCode }),
      addressCountry: "US",
    },
    areaServed: cities(),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    sameAs: business.socialLinks.map((link) => link.url),
  };
}

function serviceNode(): JsonLdBlock {
  const thirtyMinute = pricing.sessions.find((session) => session.minutes === 30);
  if (!thirtyMinute || !isConfirmedPrice(thirtyMinute.price)) {
    throw new Error("The 30 minute session price is not confirmed.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile dog treadmill exercise",
    provider: { "@id": businessId },
    areaServed: cities(),
    offers: {
      "@type": "Offer",
      price: String(thirtyMinute.price),
      priceCurrency: "USD",
    },
  };
}

function breadcrumbNode(path: PagePath): JsonLdBlock {
  const page = getPage(path);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function jsonLdFor(path: PagePath): JsonLdBlock[] {
  const blocks = [localBusiness()];
  if (path !== "/") {
    blocks.push(breadcrumbNode(path));
  }
  if (path === "/mobile-dog-treadmill/") {
    blocks.push(serviceNode());
  }
  return blocks;
}
