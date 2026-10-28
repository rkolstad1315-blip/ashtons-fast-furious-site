import type { SocialLink } from "./types";

export type { SocialLink };

export type BusinessHours = {
  opens: "07:00";
  closes: "19:00";
  label: "07:00 to 19:00";
  days: "[CONFIRM DAYS]";
  display: "7 AM to 7 PM";
};

export type Business = {
  name: "Ashtons Fast & Fur-ious";
  phoneDisplay: "910-967-0205";
  phoneE164: "+19109670205";
  email: "info@ashtonsfastfurious.com";
  hours: BusinessHours;
  serviceTowns: readonly ["Jacksonville", "Richlands", "Beulaville"];
  socialLinks: readonly SocialLink[];
  logoPath: "/brand/ashtons-logo-512.png";
  insuredStatement: "[CONFIRM INSURANCE]";
  insuredConfirmed: false;
};

export const business: Business = {
  name: "Ashtons Fast & Fur-ious",
  phoneDisplay: "910-967-0205",
  phoneE164: "+19109670205",
  email: "info@ashtonsfastfurious.com",
  hours: {
    opens: "07:00",
    closes: "19:00",
    label: "07:00 to 19:00",
    days: "[CONFIRM DAYS]",
    display: "7 AM to 7 PM",
  },
  serviceTowns: ["Jacksonville", "Richlands", "Beulaville"],
  socialLinks: [],
  logoPath: "/brand/ashtons-logo-512.png",
  insuredStatement: "[CONFIRM INSURANCE]",
  insuredConfirmed: false,
};
