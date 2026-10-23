import { business } from "./business";
import { assertVisitorCopy } from "./copy-guards";
import { faqs } from "./faqs";
import { home } from "./home";
import { isPlaceholder } from "./placeholders";

export type SafetySection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
};

function clearanceParagraphs(): string[] {
  const senior = home.who.tiles.find((tile) => tile.id === "senior");
  if (!senior) {
    throw new Error("Senior tile is missing.");
  }

  const paragraphs: string[] = [senior.body];
  for (const id of ["vaccinations", "puppies-seniors"] as const) {
    const faq = faqs.find((item) => item.id === id);
    if (faq && !isPlaceholder(faq.answer)) {
      paragraphs.push(faq.answer);
    }
  }
  return paragraphs;
}

export function safetySections(): SafetySection[] {
  const sections: SafetySection[] = [
    {
      id: "supervised",
      heading: "Supervised every minute",
      paragraphs: [
        "A person supervises every minute of the session, from the moment the treadmill starts until your dog is done.",
      ],
    },
    {
      id: "harness",
      heading: "Harness setup, never tied by the neck",
      paragraphs: [
        "Your dog wears a harness for the session. We never tie a dog by the neck.",
      ],
    },
    {
      id: "intro",
      heading: "Gradual intro on the first visit",
      paragraphs: [
        "The first visit starts with a short intro so your dog can try the treadmill before a longer run.",
      ],
    },
    {
      id: "never-forced",
      heading: "Your dog is never forced",
      paragraphs: ["Your dog is never forced to keep running."],
    },
    {
      id: "water",
      heading: "Water and rest breaks",
      paragraphs: ["Water and rest breaks are part of every session."],
    },
    {
      id: "heat",
      heading: "Heat protocol for coastal summers",
      paragraphs: [
        "The unit is climate controlled for coastal summers. The workout happens inside it, out of the heat.",
      ],
    },
    {
      id: "cleaning",
      heading: "Cleaning between dogs",
      paragraphs: ["The treadmills and the unit are cleaned between dogs."],
    },
    {
      id: "clearance",
      heading: "Vaccination and vet clearance rules",
      paragraphs: clearanceParagraphs(),
    },
  ];

  if (business.insuredConfirmed && !isPlaceholder(business.insuredStatement)) {
    sections.push({
      id: "insured",
      heading: "Insured",
      paragraphs: [business.insuredStatement],
    });
  }

  sections.push({
    id: "supplement-walks",
    heading: "Sessions supplement walks",
    paragraphs: ["Treadmill sessions supplement walks rather than replace them."],
  });

  return sections;
}

export const safetyPageCopy = {
  lede: "A person stays with your dog, the harness stays on, and we never tie a dog by the neck.",
};

assertVisitorCopy(safetyPageCopy, "safety page lede");
assertVisitorCopy(safetySections(), "safety page");
