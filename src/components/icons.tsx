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
  | "menu"
  | "bolt"
  | "heart"
  | "sun"
  | "scale"
  | "home"
  | "paw"
  | "clock"
  | "clipboard"
  | "thermometer"
  | "check"
  | "arrow"
  | "mail"
  | "pin";

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
      <symbol id="icon-bolt" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M18 3.5L7 18h8l-1.5 10.5L25 14h-8l1-10.5z" />
      </symbol>
      <symbol id="icon-heart" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M16 26.5S4.5 19.6 4.5 11.8A5.8 5.8 0 0 1 16 9.4a5.8 5.8 0 0 1 11.5 2.4C27.5 19.6 16 26.5 16 26.5z" />
      </symbol>
      <symbol id="icon-sun" viewBox="0 0 32 32" {...strokeSymbol}>
        <circle cx="16" cy="16" r="5.5" />
        <path d="M16 3.5v3M16 25.5v3M3.5 16h3M25.5 16h3M7.2 7.2l2.1 2.1M22.7 22.7l2.1 2.1M7.2 24.8l2.1-2.1M22.7 9.3l2.1-2.1" />
      </symbol>
      <symbol id="icon-scale" viewBox="0 0 32 32" {...strokeSymbol}>
        <rect x="4.5" y="6" width="23" height="21" rx="4" />
        <path d="M10.5 13a7.5 7.5 0 0 1 11 0M16 16l2.5-3.5" />
      </symbol>
      <symbol id="icon-home" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M4.5 15L16 5l11.5 10M8 12.5V27h16V12.5M13 27v-7h6v7" />
      </symbol>
      <symbol id="icon-paw" viewBox="0 0 32 32" fill="currentColor">
        <ellipse cx="9" cy="13" rx="2.6" ry="3.4" />
        <ellipse cx="14" cy="8.5" rx="2.6" ry="3.4" />
        <ellipse cx="20" cy="8.5" rx="2.6" ry="3.4" />
        <ellipse cx="25" cy="13" rx="2.6" ry="3.4" />
        <path d="M17 14.5c-3.6 0-8 5.6-8 9.2 0 2.4 2 3.3 3.9 3.3 1.8 0 2.7-1 4.1-1s2.3 1 4.1 1c1.9 0 3.9-.9 3.9-3.3 0-3.6-4.4-9.2-8-9.2z" />
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 32 32" {...strokeSymbol}>
        <circle cx="16" cy="16" r="11.5" />
        <path d="M16 9v7l4.5 3" />
      </symbol>
      <symbol id="icon-clipboard" viewBox="0 0 32 32" {...strokeSymbol}>
        <rect x="7" y="6" width="18" height="22" rx="3" />
        <path d="M12 6V4.5h8V6M11.5 16l3 3 6-6.5" />
      </symbol>
      <symbol id="icon-thermometer" viewBox="0 0 32 32" {...strokeSymbol}>
        <path d="M13 18.5V7a3 3 0 0 1 6 0v11.5a5.5 5.5 0 1 1-6 0z" />
        <path d="M16 12v9" />
      </symbol>
      <symbol id="icon-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 10.5l3.5 3.5 7.5-8" />
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10h12M11 5l5 5-5 5" />
      </symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
      </symbol>
      <symbol id="icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
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
