export function PageHeader({
  title,
  lede,
  eyebrow,
  id,
}: {
  title: string;
  lede?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <header className="speed-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 id={id} className="m-0 mt-3 max-w-4xl font-display text-[2.15rem] font-extrabold italic leading-[0.95] text-white md:text-7xl md:uppercase md:leading-[0.92]">
          {title}
        </h1>
        {lede ? <p className="m-0 mt-5 max-w-2xl text-lg leading-snug text-slate-200 md:text-xl">{lede}</p> : null}
      </div>
    </header>
  );
}
