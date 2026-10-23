"use client";

import Image from "next/image";
import { useState } from "react";
import { isPlaceholder } from "../../../content/placeholders";

export type BeforeAfterImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BeforeAfterSliderProps = {
  label: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
};

function canShow(pair: BeforeAfterSliderProps): boolean {
  return (
    !isPlaceholder(pair.before.src) &&
    !isPlaceholder(pair.after.src) &&
    pair.before.width > 0 &&
    pair.before.height > 0 &&
    pair.after.width > 0 &&
    pair.after.height > 0
  );
}

const sizes = "(min-width: 1152px) 1152px, 100vw";

export function BeforeAfterSlider({ pair }: { pair: BeforeAfterSliderProps }) {
  const [position, setPosition] = useState(50);

  if (!canShow(pair)) {
    return null;
  }

  const { before, after } = pair;

  return (
    <figure className="m-0 mt-8">
      <label htmlFor="before-after-range" className="m-0 block font-semibold text-navy">
        {pair.label}
      </label>
      <div
        className="relative mt-4 w-full overflow-hidden rounded-card bg-slate-100"
        style={{ aspectRatio: `${before.width} / ${before.height}` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          loading="lazy"
          fetchPriority="low"
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            loading="lazy"
            fetchPriority="low"
            sizes={sizes}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-[1] w-0.5 -translate-x-1/2 bg-white"
          style={{ left: `${position}%` }}
        />
      </div>
      <input
        id="before-after-range"
        className="mt-3 block h-11 w-full cursor-ew-resize touch-pan-y appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-moz-range-thumb]:h-11 [&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:rounded-pill [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-navy [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-pill [&::-moz-range-track]:bg-slate-400 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-pill [&::-webkit-slider-runnable-track]:bg-slate-400 [&::-webkit-slider-thumb]:mt-[-20px] [&::-webkit-slider-thumb]:h-11 [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-navy [&::-webkit-slider-thumb]:bg-white"
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </figure>
  );
}
