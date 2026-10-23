import { assertNoDash } from "./copy-rules";

export type NotFoundLink = {
  label: "Home" | "Pricing" | "Book";
  href: "/" | "/pricing/" | "/book/";
};

export type NotFoundContent = {
  h1: string;
  body: string;
  links: readonly NotFoundLink[];
};

export const notFoundPage: NotFoundContent = {
  h1: "Page not found",
  body: "That page is not on the Ashtons Fast & Fur-ious site. Try one of these.",
  links: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Book", href: "/book/" },
  ],
};

assertNoDash(notFoundPage, "404 copy");
