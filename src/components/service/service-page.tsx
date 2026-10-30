import type { ReactNode } from "react";
import { BookCta } from "@/components/book-cta";
import { Icon, type IconName } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
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

function DetailCard({
  id,
  icon,
  heading,
  children,
}: {
  id: string;
  icon: IconName;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="panel card flex flex-col gap-4 p-6 md:p-7" data-reveal aria-labelledby={id}>
      <span className="icon-chip">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 id={id} className="m-0 font-display text-3xl leading-none">
        {heading}
      </h3>
      {children}
    </section>
  );
}

export async function ServicePage() {
  const video = serviceVideoEnabled ? await loadVideo() : null;
  const slider = beforeAfterEnabled ? await loadSlider() : null;

  return (
    <>
      <PageHeader eyebrow={service.eyebrow} title={service.h1} lede={service.intro} />
      {video ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-4">{video}</div>
        </section>
      ) : null}

      <section className="bg-white" data-reveal aria-labelledby="session-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading id="session-heading" eyebrow={service.session.eyebrow} title={service.session.heading} />
          <ol className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {service.session.steps.map((step, index) => (
              <li key={step.title} className="panel card relative min-w-0 p-6">
                <p className="m-0 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-navy font-display text-xl italic text-white">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="m-0 mt-5 font-display text-2xl leading-tight">{step.title}</h3>
                <p className="m-0 mt-2 text-slate-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-100" aria-labelledby="details-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading id="details-heading" eyebrow={service.detailsEyebrow} title={service.detailsHeading} />
          <div
            className={`mt-10 grid grid-cols-1 gap-5 ${
              confirmedNeeds.length > 0 ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            <DetailCard id="lengths-heading" icon="clock" heading={service.lengths.heading}>
              <p className="m-0 text-slate-700">{service.lengths.body}</p>
            </DetailCard>
            <DetailCard id="intro-visit-heading" icon="clipboard" heading={service.introVisit.heading}>
              <p className="m-0 text-slate-700">{service.introVisit.body}</p>
            </DetailCard>
            {confirmedNeeds.length > 0 ? (
              <DetailCard id="needs-heading" icon="harness" heading={service.needs.heading}>
                <ul className="m-0 list-none space-y-2 p-0 text-slate-700">
                  {confirmedNeeds.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Icon name="check" className="mt-1 h-4 w-4 flex-none text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailCard>
            ) : null}
            <DetailCard id="weather-heading" icon="thermometer" heading={service.weather.heading}>
              <p className="m-0 text-slate-700">{confirmedWeather}</p>
            </DetailCard>
          </div>
        </div>
      </section>

      <section className="bg-white" data-reveal aria-labelledby="two-dogs-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="speed-bg grid gap-6 rounded-panel p-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:p-12">
            <span className="flex gap-2" aria-hidden="true">
              <span className="icon-chip h-16 w-16">
                <Icon name="paw" className="h-9 w-9" />
              </span>
              <span className="icon-chip h-16 w-16">
                <Icon name="paw" className="h-9 w-9" />
              </span>
            </span>
            <div>
              <h2 id="two-dogs-heading" className="m-0 font-display text-4xl italic uppercase leading-none text-white md:text-5xl">
                {service.twoDogs.heading}
              </h2>
              <p className="m-0 mt-3 max-w-2xl text-lg text-slate-200">{service.twoDogs.body}</p>
            </div>
          </div>
          {slider}
          <p className="m-0 mt-8 flex max-w-2xl items-start gap-3 text-lg font-semibold text-navy">
            <Icon name="check" className="mt-1 h-5 w-5 flex-none text-brand" />
            {service.walks}
          </p>
        </div>
      </section>

      <BookCta />
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
