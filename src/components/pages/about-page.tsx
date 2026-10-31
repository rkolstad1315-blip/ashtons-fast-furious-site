import Image from "next/image";
import { BookCta } from "@/components/book-cta";
import { TrustIcon } from "@/components/home/trust-icons";
import { SectionHeading } from "@/components/section-heading";
import { about, type AboutPhoto } from "../../../content/about";
import { business } from "../../../content/business";
import { home } from "../../../content/home";
import { isPlaceholder } from "../../../content/placeholders";
import { getPage } from "../../../content/seo";
import { confirmedCopy } from "@/lib/confirmed-copy";
import { TextSection } from "./page-frame";

function confirmedPhotos(photos: readonly AboutPhoto[]): AboutPhoto[] {
  return photos.filter(
    (photo) =>
      photo.src.startsWith("/") &&
      !isPlaceholder(photo.src) &&
      !isPlaceholder(photo.alt) &&
      photo.width > 0 &&
      photo.height > 0,
  );
}

export function AboutPage() {
  const page = getPage("/about/");
  const photos = confirmedPhotos(about.unit.photos);
  const unitBody = confirmedCopy(about.unit.body);
  const communityBody = about.community.enabled ? confirmedCopy(about.community.body) : null;
  const handling = home.trust.items.filter((item) =>
    "whenInsured" in item && item.whenInsured ? business.insuredConfirmed : true,
  );
  const storySections = [
    { id: "founding-story", heading: about.founding.heading, body: confirmedCopy(about.founding.body) },
    { id: "handlers", heading: about.handlers.heading, body: confirmedCopy(about.handlers.body) },
    { id: "certifications", heading: about.certifications.heading, body: confirmedCopy(about.certifications.body) },
    { id: "sponsor-shelter-run", heading: about.community.heading, body: communityBody },
  ];
  const hasStory = storySections.some((section) => section.body);

  return (
    <>
      <header className="speed-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:py-20">
          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1
              id="about-heading"
              className="m-0 mt-3 max-w-4xl font-display text-[2.4rem] font-extrabold italic uppercase leading-[0.92] text-white md:text-7xl"
            >
              {page.h1}
            </h1>
            {unitBody ? (
              <p className="m-0 mt-5 max-w-2xl text-lg leading-snug text-slate-200 md:text-xl">{unitBody}</p>
            ) : null}
          </div>
          {/* A 7 rem badge above the title on phones, full size beside it on desktop,
              the same sizing as the homepage hero so the H1 stays the LCP element. */}
          <div className="hero-logo order-first w-28 md:order-none md:w-full md:max-w-sm">
            <Image
              src="/brand/ashtons-logo-1080.webp"
              alt={home.hero.image.alt}
              width={1080}
              height={1080}
              priority
              sizes="(min-width: 768px) 384px, 112px"
              className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </header>

      <section className="bg-white" data-reveal aria-labelledby="about-handling-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <SectionHeading
            id="about-handling-heading"
            eyebrow={home.trust.eyebrow}
            title={home.trust.heading}
          />
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {handling.map((item) => (
              <li key={item.id} className="panel card flex min-w-0 items-center gap-4 p-5 sm:flex-col sm:items-start sm:p-6">
                <TrustIcon id={item.id} />
                <span className="font-display text-2xl leading-tight">{item.label}</span>
              </li>
            ))}
          </ul>
          {photos.length > 0 ? (
            <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2">
              {photos.map((photo) => (
                <li key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full rounded-panel"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {hasStory ? (
        <section className="bg-slate-100" aria-label={about.storyLabel}>
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-24">
            {storySections.map((section) => (
              <TextSection key={section.id} id={section.id} heading={section.heading} body={section.body} />
            ))}
          </div>
        </section>
      ) : null}

      <BookCta />
    </>
  );
}
