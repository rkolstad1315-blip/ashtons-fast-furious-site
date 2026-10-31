import { Icon, type IconName } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { home, type WhoTileId } from "../../../content/home";

const tileIcons: Record<WhoTileId, IconName> = {
  energy: "bolt",
  reactive: "heart",
  heat: "sun",
  weight: "scale",
  military: "home",
  senior: "paw",
};

// Blue, orange, navy, repeating, so six cards do not read as one blue block.
const chipTones = ["icon-chip", "icon-chip icon-chip-accent", "icon-chip icon-chip-navy"] as const;

export function WhoItsFor() {
  const { who } = home;

  return (
    <section className="bg-slate-100" data-reveal aria-labelledby="who-its-for-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading id="who-its-for-heading" eyebrow={who.eyebrow} title={who.heading} />
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {who.tiles.map((tile, index) => (
            <li key={tile.id} className="card min-w-0 rounded-panel">
              <article className="panel flex h-full flex-col gap-4 p-6">
                <span className={chipTones[index % chipTones.length]}>
                  <Icon name={tileIcons[tile.id]} className="h-7 w-7" />
                </span>
                <h3 className="m-0 font-display text-2xl leading-tight">{tile.heading}</h3>
                <p className="m-0 text-slate-700">{tile.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
