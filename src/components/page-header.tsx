export function PageHeader({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="m-0 max-w-4xl font-display text-[2.15rem] font-extrabold italic leading-[0.95] md:text-6xl">
          {title}
        </h1>
        <p className="m-0 mt-4 max-w-2xl text-lg leading-snug text-slate-200">{lede}</p>
      </div>
    </header>
  );
}
