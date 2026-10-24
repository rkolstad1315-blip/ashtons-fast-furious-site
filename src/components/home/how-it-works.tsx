import { home } from "../../../content/home";

export function HowItWorks() {
  const { howItWorks } = home;

  return (
    <section className="bg-white" data-reveal aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id="how-it-works-heading" className="m-0 font-display text-4xl leading-none md:text-5xl">
          {howItWorks.heading}
        </h2>
        <ol className="m-0 mt-8 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <li key={step.number} className="min-w-0">
              <p className="m-0 font-display text-6xl font-extrabold italic leading-none text-brand md:text-7xl">
                {step.number}
              </p>
              <h3 className="m-0 mt-3 font-display text-2xl leading-tight">{step.title}</h3>
              <p className="m-0 mt-2 text-slate-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
