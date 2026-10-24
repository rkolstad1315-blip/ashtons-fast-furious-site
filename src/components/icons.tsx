import type { SVGProps } from "react";

// Every icon on the site lives in this sprite. Render IconSprite once in the
// root layout and reference a symbol with <Icon name="..." />.
export type IconName =
  | "climate"
  | "supervised"
  | "harness"
  | "cleaned"
  | "insured"
  | "plus"
  | "play"
  | "phone"
  | "menu";

const strokeSymbol = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <symbol id="icon-climate" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M16 4v24M8.5 8.5l15 15M23.5 8.5l-15 15M5 16h22" />
        <path d="M16 7.5l1.6 2.2M16 24.5l-1.6-2.2M10 16H7.2M24.8 16H22" />
      </symbol>
      <symbol id="icon-supervised" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M3.5 16S8.2 9 16 9s12.5 7 12.5 7-4.7 7-12.5 7S3.5 16 3.5 16z" />
        <circle cx="16" cy="16" r="3.25" />
      </symbol>
      <symbol id="icon-harness" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M11 5v22M21 5v22M11 13h10M11 20h10" />
        <circle cx="16" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
      </symbol>
      <symbol id="icon-cleaned" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M16 4.5l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5L16 4.5zM24.5 18l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z" />
      </symbol>
      <symbol id="icon-insured" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M16 4.5l9 3.8v6.8c0 5.6-3.6 9-9 10.6-5.4-1.6-9-5-9-10.6V8.3l9-3.8z" />
      </symbol>
      <symbol id="icon-plus" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M10 4v12M4 10h12" />
      </symbol>
      <symbol id="icon-play" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2.5v11l10-5.5-10-5.5z" />
      </symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </symbol>
      <symbol id="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </symbol>
    </svg>
  );
}

export function Icon({
  name,
  className,
  ...rest
}: { name: IconName } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg aria-hidden="true" focusable="false" className={className} {...rest}>
      <use href={`#icon-${name}`} />
    </svg>
  );
}
