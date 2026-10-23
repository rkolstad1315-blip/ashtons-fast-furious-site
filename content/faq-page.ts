import { assertVisitorCopy } from "./copy-guards";
import { faqs, type Faq } from "./faqs";
import { isPlaceholder } from "./placeholders";

export type FaqGroupId = "safety" | "fit" | "scheduling" | "cost";

export type FaqGroupDef = {
  id: FaqGroupId;
  heading: string;
  ids: readonly string[];
};

// what-it-costs and how-long are the confirmed answers that state the price,
// so they sit under Cost and policies. Weather, payment, and cancellation
// answers stay grouped and are omitted while they are still placeholders.
export const faqGroupDefs = [
  {
    id: "safety",
    heading: "Safety",
    ids: ["safe", "illegal", "vaccinations"],
  },
  {
    id: "fit",
    heading: "Fit for my dog",
    ids: [
      "can-my-dog",
      "will-my-dog-like-it",
      "breeds",
      "weight-limits",
      "puppies-seniors",
      "reactive",
    ],
  },
  {
    id: "scheduling",
    heading: "Scheduling and weather",
    ids: ["hot-weather", "rain", "on-base"],
  },
  {
    id: "cost",
    heading: "Cost and policies",
    ids: ["what-it-costs", "how-long", "payment", "cancellation"],
  },
] as const satisfies readonly FaqGroupDef[];

const seen = new Set<string>();

for (const group of faqGroupDefs) {
  for (const id of group.ids) {
    if (!faqs.some((faq) => faq.id === id)) {
      throw new Error(`Unknown FAQ id: ${id}`);
    }
    if (seen.has(id)) {
      throw new Error(`FAQ grouped twice: ${id}`);
    }
    seen.add(id);
  }
}

for (const faq of faqs) {
  if (!seen.has(faq.id)) {
    throw new Error(`FAQ missing a group: ${faq.id}`);
  }
}

export type VisibleFaqGroup = {
  id: FaqGroupId;
  heading: string;
  items: readonly Faq[];
};

export function visibleFaqGroups(): VisibleFaqGroup[] {
  return faqGroupDefs.flatMap((group) => {
    const items = group.ids.flatMap((id) => {
      const faq = faqs.find((item) => item.id === id);
      if (!faq || isPlaceholder(faq.answer)) {
        return [];
      }
      const firstSentence = faq.answer.split(/(?<=\.)\s/)[0];
      if (!firstSentence || !firstSentence.endsWith(".")) {
        throw new Error(`FAQ ${faq.id} does not open with a sentence.`);
      }
      return [faq];
    });
    if (items.length === 0) {
      return [];
    }
    return [{ id: group.id, heading: group.heading, items }];
  });
}

export function faqPageSchema() {
  const items = visibleFaqGroups().flatMap((group) => group.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

const visible = visibleFaqGroups();
const schema = faqPageSchema();

if (schema.mainEntity.length !== visible.flatMap((group) => group.items).length) {
  throw new Error("FAQPage JSON-LD does not match the visible questions.");
}

visible
  .flatMap((group) => group.items)
  .forEach((faq, index) => {
    const question = schema.mainEntity[index];
    if (
      !question ||
      question.name !== faq.question ||
      question.acceptedAnswer.text !== faq.answer
    ) {
      throw new Error(`FAQPage JSON-LD drifted from the visible FAQ: ${faq.id}`);
    }
  });

export const faqPageCopy = {
  lede: "Answers on safety, which dogs fit, and what a session costs in Jacksonville, Richlands, and Beulaville NC.",
};

assertVisitorCopy(visible, "FAQ page");
assertVisitorCopy(schema, "FAQPage JSON-LD");
assertVisitorCopy(faqPageCopy, "FAQ page lede");
