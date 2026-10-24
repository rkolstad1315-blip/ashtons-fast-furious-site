import { Link } from "@/components/link";
import { isPlaceholder } from "../../../content/placeholders";
import {
  beforeAfterEnabled,
  service,
  serviceVideoEnabled,
} from "../../../content/service";

// Sentences that still carry a placeholder stay out of the page until confirmed.
function confirmedSentences(text: string): string {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !isPlaceholder(sentence))
    .join(" ");
}

const confirmedNeeds = service.needs.items.filter((item) => !isPlaceholder(item));
const confirmedWeather = confirmedSentences(service.weather.body);

export async function ServicePage() {
  const video = serviceVideoEnabled ? await loadVideo() : null;
  const slider = beforeAfterEnabled ? await loadSlider() : null;

  return (
    <>
      <section className="bg-white" aria-labelledby="service-heading">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1
            id="service-heading"
            className="m-0 max-w-4xl font-display text-4xl leading-none italic md:text-6xl"
          >
            {service.h1}
          </h1>
          <p className="m-0 mt-4 max-w-2xl text-lg leading-snug text-slate-700">{service.intro}</p>
          {video}
        </div>
      </section>

      <section className="bg-slate-100" data-reveal aria-labelledby="session-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 id="session-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
            {service.session.heading}
          </h2>
          <ol className="m-0 mt-8 max-w-3xl list-decimal space-y-6 pl-6">
            {service.session.steps.map((step) => (
              <li key={step.title} className="min-w-0 ps-2">
                <h3 className="m-0 font-display text-2xl leading-tight">{step.title}</h3>
                <p className="m-0 mt-2 text-slate-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <section data-reveal aria-labelledby="lengths-heading">
            <h2 id="lengths-heading" className="m-0 font-display text-4xl leading-none">
              {service.lengths.heading}
            </h2>
            <p className="m-0 mt-4 text-slate-700">{service.lengths.body}</p>
          </section>
          <section data-reveal aria-labelledby="intro-visit-heading">
            <h2 id="intro-visit-heading" className="m-0 font-display text-4xl leading-none">
              {service.introVisit.heading}
            </h2>
            <p className="m-0 mt-4 text-slate-700">{service.introVisit.body}</p>
          </section>
          {confirmedNeeds.length > 0 ? (
            <section data-reveal aria-labelledby="needs-heading">
              <h2 id="needs-heading" className="m-0 font-display text-4xl leading-none">
                {service.needs.heading}
              </h2>
              <ul className="m-0 mt-4 list-disc space-y-2 pl-5 text-slate-700">
                {confirmedNeeds.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <section data-reveal aria-labelledby="weather-heading">
            <h2 id="weather-heading" className="m-0 font-display text-4xl leading-none">
              {service.weather.heading}
            </h2>
            <p className="m-0 mt-4 text-slate-700">{confirmedWeather}</p>
          </section>
        </div>
      </div>

      <section className="bg-slate-100" data-reveal aria-labelledby="two-dogs-heading">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 id="two-dogs-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
            {service.twoDogs.heading}
          </h2>
          <p className="m-0 mt-4 max-w-2xl text-slate-700">{service.twoDogs.body}</p>
          {slider}
          <p className="m-0 mt-8 max-w-2xl text-lg text-navy">{service.walks}</p>
        </div>
      </section>

      <section className="bg-navy" aria-label={service.cta.label}>
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Link
            href={service.cta.href}
            className="btn-accent inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
          >
            {service.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}

async function loadVideo() {
  const { VideoFacade } = await import("./video-facade");
  return <VideoFacade video={service.video} />;
}

async function loadSlider() {
  const { BeforeAfterSlider } = await import("./before-after-slider");
  return <BeforeAfterSlider pair={service.beforeAfter} />;
}
