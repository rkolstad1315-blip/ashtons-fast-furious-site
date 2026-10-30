import type { ReactNode } from "react";

// Eyebrow label, display heading, and optional intro shared by every section.
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="m-0 mt-3 font-display text-4xl leading-none md:text-5xl">
        {title}
      </h2>
      {intro ? <p className="m-0 mt-4 max-w-2xl text-lg leading-snug opacity-80">{intro}</p> : null}
    </div>
  );
}
