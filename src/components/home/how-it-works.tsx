import { SectionHeading } from "@/components/section-heading";
import { home } from "../../../content/home";

export function HowItWorks() {
  const { howItWorks } = home;

  return (
    <section className="bg-white" data-reveal aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading id="how-it-works-heading" eyebrow={howItWorks.eyebrow} title={howItWorks.heading} />
        <ol className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <li key={step.number} className="panel card relative min-w-0 overflow-hidden p-6 md:p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[8rem] font-extrabold italic leading-none text-brand-50"
              >
                {step.number}
              </span>
              <p className="relative m-0 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-navy font-display text-xl italic text-white">
                {step.number}
              </p>
              <h3 className="relative m-0 mt-5 font-display text-2xl leading-tight">{step.title}</h3>
              <p className="relative m-0 mt-2 text-slate-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
