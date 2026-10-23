import Link from "next/link";
import { towns, type Town } from "../../content/towns";

const viewBox = { width: 400, height: 260 };

const duplinOutline =
  "M 45 32 L 150 24 L 196 44 L 180 78 L 156 107 L 134 146 L 118 184 L 75 196 L 36 165 L 26 110 L 32 60 Z";

const onslowOutline =
  "M 196 44 L 180 78 L 156 107 L 134 146 L 118 184 L 125 200 L 180 228 L 245 225 L 300 195 L 340 165 L 368 135 L 374 100 L 360 78 L 348 58 L 320 36 L 260 28 Z";

const markerLayout = {
  jacksonville: { x: 248, y: 150, place: "below" },
  richlands: { x: 236, y: 104, place: "right" },
  beulaville: { x: 132, y: 86, place: "left" },
} as const satisfies Record<
  Town["id"],
  { x: number; y: number; place: "below" | "above" | "left" | "right" }
>;

// Onslow and Duplin county map with a link to each town page. Shared by the homepage and /service-areas/.
export function CountyMap({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      <svg
        className="service-map block h-auto w-full rounded-card border border-slate-200"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        role="img"
        aria-label={label}
        focusable="false"
      >
        <rect width={viewBox.width} height={viewBox.height} fill="#F1F5F9" />
        <path
          d="M 300 12 L 394 12 L 394 248 L 286 248 L 310 200 L 348 150 L 372 96 L 348 48 Z"
          fill="#1E90FF"
          fillOpacity="0.16"
        />
        <path className="county" d={duplinOutline} />
        <path className="county" d={onslowOutline} />
      </svg>
      <div className="absolute inset-0">
        {towns.map((town) => {
          const marker = markerLayout[town.id];
          return (
            <span
              key={town.id}
              className="map-pin"
              style={{
                left: `${(marker.x / viewBox.width) * 100}%`,
                top: `${(marker.y / viewBox.height) * 100}%`,
              }}
            >
              <Link
                href={`/service-areas/${town.slug}/`}
                className={`town-link town-link-${marker.place}`}
              >
                <span className="town-dot" aria-hidden="true" />
                <span className="town-name">{town.displayName}</span>
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
