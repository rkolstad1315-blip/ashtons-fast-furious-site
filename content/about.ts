import { assertNoDash } from "./copy-rules";
import { book } from "./shell";

export type AboutPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type AboutSection = {
  heading: string;
  body: string;
};

export type AboutContent = {
  founding: AboutSection;
  handlers: AboutSection;
  certifications: AboutSection;
  unit: AboutSection & {
    photos: readonly AboutPhoto[];
  };
  community: AboutSection & {
    enabled: boolean;
  };
  ctaLabel: string;
  ctaHref: string;
};

export const about: AboutContent = {
  founding: {
    heading: "The founding story",
    body: "[OWNER STORY]",
  },
  handlers: {
    heading: "Who handles the dogs",
    body: "[NAMES]",
  },
  certifications: {
    heading: "Certifications",
    body: "[CONFIRM]",
  },
  unit: {
    heading: "The unit",
    body: "The climate controlled unit has two dog treadmills and parks in your driveway in Jacksonville, Richlands, and Beulaville, NC.",
    photos: [
      {
        src: "[CONFIRM]",
        alt: "[CONFIRM]",
        width: 1600,
        height: 1000,
      },
    ],
  },
  community: {
    enabled: false,
    heading: "Sponsor a shelter dog run",
    body: "[CONFIRM]",
  },
  ctaLabel: "Book a free first session",
  ctaHref: book.href,
};

assertNoDash(about, "about copy");
