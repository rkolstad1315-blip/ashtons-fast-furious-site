import { assertMetaLength } from "./copy-rules";
import { assertVisitorCopy } from "./copy-guards";
import { business } from "./business";
import { book } from "./shell";

export const blogPage = {
  path: "/blog/" as const,
  title: "Dog Exercise Tips for Jacksonville NC | Ashtons",
  description:
    "Practical dog exercise tips for owners in Jacksonville, Richlands, and Beulaville NC, from the Ashtons mobile dog treadmill team.",
  h1: "Dog Exercise Tips from Ashtons",
  intro:
    "Short, practical answers to the questions dog owners around Jacksonville, NC ask us most, with no made up numbers. When a post touches health, check with your vet first.",
  crumbName: "Blog",
  footerLabel: "Blog",
  publishedLabel: "Published",
  updatedLabel: "Updated",
  readMoreLabel: "Read more",
  relatedHeading: "Related posts",
  backLabel: "All posts",
  cta: {
    heading: "Ready to try a session?",
    body: "Your first session is free. We bring the climate controlled unit to your driveway in Jacksonville, Richlands, or Beulaville.",
    bookLabel: "Book a free first session",
    bookHref: book.href,
    callLabel: `or call or text ${business.phoneDisplay}`,
    callHref: `tel:${business.phoneE164}`,
  },
  // Every post must link to at least one of these. The /book/ link comes from
  // the closing call to action the page adds under every post.
  requiredLinkTargets: [
    "/mobile-dog-treadmill/",
    "/safety/",
    "/faq/",
    "/service-areas/jacksonville-nc/",
    "/service-areas/richlands-nc/",
    "/service-areas/beulaville-nc/",
  ] as const,
};

assertMetaLength(blogPage.title, blogPage.description, "Blog index");
assertVisitorCopy(blogPage, "blog page copy");
