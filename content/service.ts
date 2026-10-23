import { business } from "./business";
import { isPlaceholder } from "./placeholders";
import { isConfirmedPrice, pricing } from "./pricing";
import { getPage } from "./seo";
import { book } from "./shell";

export type ServiceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ServiceStep = {
  title: string;
  body: string;
};

const dash = /[\u2013\u2014]/;
const paceOrMotorClaim = /sets the pace|set the pace|no motor|without a motor|slatmill|unmotorized/i;

const thirtyMinute = pricing.sessions.find((session) => session.minutes === 30);

if (!thirtyMinute || !isConfirmedPrice(thirtyMinute.price)) {
  throw new Error("The 30 minute session price is not confirmed.");
}

export const service = {
  h1: getPage("/mobile-dog-treadmill/").h1,
  intro: `The climate controlled unit, with two dog treadmills, parks in your driveway in ${business.serviceTowns.join(", ")}, North Carolina.`,
  session: {
    heading: "What a session looks like",
    steps: [
      {
        title: "We arrive",
        body: "The climate controlled unit parks in your driveway.",
      },
      {
        title: "We stay with your dog",
        body: "A person supervises every minute.",
      },
      {
        title: "Your dog uses a treadmill",
        body: "Your dog works out on a treadmill inside the unit.",
      },
      {
        title: "We say goodbye",
        body: "When the session ends, we say goodbye and leave your driveway.",
      },
    ] as const satisfies readonly ServiceStep[],
  },
  lengths: {
    heading: "Session lengths",
    body: `Sessions run 15 to 60 minutes. A 30 minute session is $${thirtyMinute.price}. Your first session is free.`,
  },
  introVisit: {
    heading: "The first visit",
    body: "The first visit includes a short intro assessment. We never force a dog to keep running.",
  },
  needs: {
    heading: "What your dog needs",
    items: [
      "Harness provided [CONFIRM].",
      "Current vaccinations. The required list is [CONFIRM].",
    ],
  },
  weather: {
    heading: "Weather and heat",
    body: "The unit is climate controlled, so the workout stays out of the summer heat. The temperature cutoff is [CONFIRM]. Whether we drive in the rain is [CONFIRM].",
  },
  twoDogs: {
    heading: "Two dogs side by side",
    body: "Two dogs can run side by side on the two treadmills.",
  },
  walks: "Treadmill sessions supplement walks rather than replace them.",
  cta: {
    label: "Book a free first session",
    href: book.href,
  },
  video: {
    youtubeId: "[YOUTUBE ID]",
    title: "A mobile dog treadmill session",
    playLabel: "Play the session video",
    poster: {
      src: "[VIDEO POSTER]",
      alt: "A dog during a mobile treadmill session inside the driveway unit",
      width: 1280,
      height: 720,
    } satisfies ServiceImage,
  },
  beforeAfter: {
    label: "Compare a wound up dog with a calm dog after a session",
    before: {
      src: "[BEFORE IMAGE]",
      alt: "A wound up dog before a treadmill session",
      width: 1200,
      height: 800,
    } satisfies ServiceImage,
    after: {
      src: "[AFTER IMAGE]",
      alt: "A calm dog after a treadmill session",
      width: 1200,
      height: 800,
    } satisfies ServiceImage,
  },
};

export function showServiceVideo(video: typeof service.video = service.video): boolean {
  return (
    !isPlaceholder(video.youtubeId) &&
    !isPlaceholder(video.poster.src) &&
    video.poster.src.endsWith(".avif") &&
    video.poster.width > 0 &&
    video.poster.height > 0
  );
}

export const serviceVideoEnabled = showServiceVideo();
export const beforeAfterEnabled = showBeforeAfter();

export function showBeforeAfter(pair: typeof service.beforeAfter = service.beforeAfter): boolean {
  return (
    !isPlaceholder(pair.before.src) &&
    !isPlaceholder(pair.after.src) &&
    pair.before.width > 0 &&
    pair.before.height > 0 &&
    pair.after.width > 0 &&
    pair.after.height > 0
  );
}

const copy = JSON.stringify(service);

if (dash.test(copy)) {
  throw new Error("Em dash or en dash in service page copy.");
}

if (paceOrMotorClaim.test(copy)) {
  throw new Error("Service copy claims an unconfirmed equipment behavior.");
}

if (service.h1 !== "Mobile Dog Treadmill Sessions in Your Driveway") {
  throw new Error("Service H1 does not match the spec.");
}

if (!service.lengths.body.includes("15 to 60 minutes")) {
  throw new Error("Session lengths must say 15 to 60 minutes.");
}

if (!service.walks.toLowerCase().includes("supplement walks")) {
  throw new Error("Service copy must say sessions supplement walks.");
}

if (!service.needs.items.some((item) => item.includes("Harness provided [CONFIRM]"))) {
  throw new Error("Harness line must keep the [CONFIRM] placeholder.");
}
