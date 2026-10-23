import Image from "next/image";
import { about, type AboutPhoto } from "../../../content/about";
import { isPlaceholder } from "../../../content/placeholders";
import { getPage } from "../../../content/seo";
import { confirmedCopy } from "@/lib/confirmed-copy";
import { BookCta, PageFrame, PageH1, TextSection } from "./page-frame";

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

  return (
    <PageFrame>
      <PageH1 id="about-heading">{page.h1}</PageH1>
      <TextSection
        id="founding-story"
        heading={about.founding.heading}
        body={confirmedCopy(about.founding.body)}
      />
      <TextSection
        id="handlers"
        heading={about.handlers.heading}
        body={confirmedCopy(about.handlers.body)}
      />
      <TextSection
        id="certifications"
        heading={about.certifications.heading}
        body={confirmedCopy(about.certifications.body)}
      />
      {unitBody || photos.length > 0 ? (
        <section className="mt-10" aria-labelledby="the-unit">
          <h2 id="the-unit" className="m-0 font-display text-3xl leading-none md:text-4xl">
            {about.unit.heading}
          </h2>
          {unitBody ? (
            <p className="m-0 mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{unitBody}</p>
          ) : null}
          {photos.length > 0 ? (
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {photos.map((photo) => (
                <li key={photo.src}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full rounded-card"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
      <TextSection
        id="sponsor-shelter-run"
        heading={about.community.heading}
        body={communityBody}
      />
      <BookCta href={about.ctaHref} label={about.ctaLabel} />
    </PageFrame>
  );
}
