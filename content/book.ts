import { business } from "./business";
import { assertNoDash } from "./copy-rules";

export type BookPageContent = {
  responseTimeLine: string;
  phoneHeading: string;
  callLabel: string;
  textLabel: string;
  areasHeading: string;
  areasIntro: string;
};

export const bookPage: BookPageContent = {
  responseTimeLine: "We reply within [RESPONSE TIME].",
  phoneHeading: "Call or text",
  callLabel: `Call ${business.phoneDisplay}`,
  textLabel: `Text ${business.phoneDisplay}`,
  areasHeading: "Service areas",
  areasIntro: "We book sessions in these towns.",
};

assertNoDash(bookPage, "book page copy");
