import Image from "next/image";
import { home, type WhoTileId } from "../../../content/home";

function tileSizes(id: WhoTileId): string {
  if (id === "energy") {
    return "(min-width: 768px) 50vw, 100vw";
  }
  if (id === "senior") {
    return "100vw";
  }
  return "(min-width: 768px) 25vw, 100vw";
}

export function WhoItsFor() {
  const { who } = home;

  return (
    <section className="bg-white" aria-labelledby="who-its-for-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="who-its-for-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {who.heading}
        </h2>
        <ul className="bento m-0 mt-8 list-none p-0">
          {who.tiles.map((tile) => (
            <li key={tile.id} className={`bento-${tile.id} min-w-0`}>
              <article className="flex h-full flex-col overflow-hidden rounded-card border border-slate-200 bg-slate-100">
                <div
                  className="tile-photo relative"
                  style={{ ["--tile-ratio" as string]: `${tile.image.width} / ${tile.image.height}` }}
                >
                  <Image
                    src={tile.image.src}
                    alt={tile.image.alt}
                    width={tile.image.width}
                    height={tile.image.height}
                    loading="lazy"
                    fetchPriority="low"
                    sizes={tileSizes(tile.id)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="m-0 font-display text-2xl leading-tight">{tile.heading}</h3>
                  <p className="m-0 text-slate-700">{tile.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
