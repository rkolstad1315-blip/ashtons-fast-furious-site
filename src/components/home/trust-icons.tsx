import type { TrustItemId } from "../../../content/home";

const iconProps = {
  viewBox: "0 0 32 32",
  "aria-hidden": true,
  className: "h-8 w-8 shrink-0 text-navy",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function TrustIcon({ id }: { id: TrustItemId }) {
  if (id === "climate") {
    return (
      <svg {...iconProps}>
        <path d="M16 4v24M8.5 8.5l15 15M23.5 8.5l-15 15M5 16h22" />
        <path d="M16 7.5l1.6 2.2M16 24.5l-1.6-2.2M10 16H7.2M24.8 16H22" />
      </svg>
    );
  }

  if (id === "supervised") {
    return (
      <svg {...iconProps}>
        <path d="M3.5 16S8.2 9 16 9s12.5 7 12.5 7-4.7 7-12.5 7S3.5 16 3.5 16z" />
        <circle cx="16" cy="16" r="3.25" />
      </svg>
    );
  }

  if (id === "harness") {
    return (
      <svg {...iconProps}>
        <path d="M11 5v22M21 5v22M11 13h10M11 20h10" />
        <circle cx="16" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === "cleaned") {
    return (
      <svg {...iconProps}>
        <path d="M16 4.5l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5L16 4.5zM24.5 18l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M16 4.5l9 3.8v6.8c0 5.6-3.6 9-9 10.6-5.4-1.6-9-5-9-10.6V8.3l9-3.8z" />
    </svg>
  );
}
