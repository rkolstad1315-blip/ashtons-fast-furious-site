"use client";

import Image from "next/image";
import { useState } from "react";
import { isPlaceholder } from "../../../content/placeholders";

export type VideoFacadeProps = {
  youtubeId: string;
  title: string;
  playLabel: string;
  poster: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

function canPlay(video: VideoFacadeProps): boolean {
  return (
    !isPlaceholder(video.youtubeId) &&
    !isPlaceholder(video.poster.src) &&
    video.poster.src.endsWith(".avif") &&
    video.poster.width > 0 &&
    video.poster.height > 0
  );
}

export function VideoFacade({ video }: { video: VideoFacadeProps }) {
  const [playing, setPlaying] = useState(false);

  if (!canPlay(video)) {
    return null;
  }

  const { poster } = video;

  return (
    <div
      className="relative mt-8 overflow-hidden rounded-card bg-navy"
      style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?autoplay=1`}
          title={video.title}
          width={poster.width}
          height={poster.height}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            loading="lazy"
            fetchPriority="low"
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <button
            type="button"
            className="absolute top-1/2 left-1/2 inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-pill bg-brand px-5 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setPlaying(true)}
          >
            <PlayIcon />
            {video.playLabel}
          </button>
        </>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 2.5v11l10-5.5-10-5.5z" fill="currentColor" />
    </svg>
  );
}
