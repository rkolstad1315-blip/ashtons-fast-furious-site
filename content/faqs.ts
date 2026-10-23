export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type EquipmentType = "[MOTORIZED OR SLATMILL]";

export const equipmentType: EquipmentType = "[MOTORIZED OR SLATMILL]";

export const faqs: readonly Faq[] = [
  {
    id: "safe",
    question: "Are dog treadmills safe?",
    answer:
      "Yes. A person supervises every minute, and your dog wears a harness and is never tied by the neck.",
  },
  {
    id: "illegal",
    question: "Are dog treadmills illegal?",
    answer: "No. Sessions happen in your driveway in Jacksonville, Richlands, and Beulaville, NC.",
  },
  {
    id: "can-my-dog",
    question: "Can my dog use a treadmill?",
    answer: "Yes, your dog can try a session. The weight limit is [CONFIRM].",
  },
  {
    id: "how-long",
    question: "How long should a dog run on a treadmill?",
    answer: "A session lasts 15 to 60 minutes. A 30 minute session is $60, and the first session is free.",
  },
  {
    id: "will-my-dog-like-it",
    question: "Will my dog like it?",
    answer: "We learn that on a short intro at the first visit. We never force a dog to keep running.",
  },
  {
    id: "breeds",
    question: "Which breeds can use the treadmill?",
    answer:
      "High energy and working breeds such as Malinois, German Shepherd, and Husky are the priority.",
  },
  {
    id: "weight-limits",
    question: "What is the weight limit?",
    answer: "The weight limit is [CONFIRM].",
  },
  {
    id: "puppies-seniors",
    question: "Can puppies and seniors use the treadmill?",
    answer: "Puppy and senior rules are [CONFIRM].",
  },
  {
    id: "reactive",
    question: "Do you take reactive dogs?",
    answer: "Yes. Reactive or anxious dogs work in your driveway instead of a crowded park.",
  },
  {
    id: "hot-weather",
    question: "Do you come in hot weather?",
    answer: "Yes. The unit is climate controlled. The temperature cutoff is [CONFIRM].",
  },
  {
    id: "rain",
    question: "What if it rains?",
    answer: "Whether we drive in the rain is [CONFIRM]. The workout is inside the climate controlled unit.",
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer: "Payment methods are [CONFIRM].",
  },
  {
    id: "cancellation",
    question: "What is your cancellation policy?",
    answer: "The cancellation policy is [CONFIRM].",
  },
  {
    id: "vaccinations",
    question: "Which vaccinations do you require?",
    answer: "Vaccination rules are [CONFIRM].",
  },
  {
    id: "on-base",
    question: "Do you come on base?",
    answer: "On base visits at Camp Lejeune and MCAS New River are [CONFIRM].",
  },
];
