import { business as profile } from "./business";

export const business = {
  name: profile.name,
  phoneDisplay: profile.phoneDisplay,
  phoneTel: profile.phoneE164,
  email: profile.email,
  hours: profile.hours.display,
  logoPath: profile.logoPath,
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
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
] as const;
