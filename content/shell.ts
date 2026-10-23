import { business as profile } from "./business";

export const business = {
  name: profile.name,
  phoneDisplay: profile.phoneDisplay,
  phoneTel: profile.phoneE164,
  email: profile.email,
  hours: profile.hours.display,
};

export const navItems = [
  { label: "Service", href: "/mobile-dog-treadmill/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "About", href: "/about/" },
] as const;

export const book = {
  label: "Book",
  mobileLabel: "Book free session",
  href: "/book/",
} as const;

export const callLabel = "Call or text";

export const menuLabel = "Menu";

export const footerTowns = [
  { label: "Jacksonville, NC", href: "/service-areas/jacksonville-nc/" },
  { label: "Richlands, NC", href: "/service-areas/richlands-nc/" },
  { label: "Beulaville, NC", href: "/service-areas/beulaville-nc/" },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
] as const;

export const home = {
  h1: "Mobile Dog Treadmill Workouts in Jacksonville, NC",
} as const;

export const metadataCopy = {
  title: "Mobile Dog Treadmill in Jacksonville NC | Ashtons",
  description:
    "Climate controlled mobile dog treadmill sessions in your driveway in Jacksonville, Richlands and Beulaville NC. 30 min from $60. First session free.",
} as const;
