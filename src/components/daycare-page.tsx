import { daycarePage } from "../../content/daycare-page";
import { getPage } from "../../content/seo";
import { BookCta } from "./book-cta";
import { PageHeader } from "./page-header";

export function DaycareAlternativePage() {
  const page = getPage("/dog-daycare-alternative/");
  const { columns, rows } = daycarePage;

  return (
    <>
      <PageHeader title={page.h1} lede={daycarePage.opening} />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:py-16">
        <section data-reveal aria-labelledby="daycare-reactive">
          <h2 id="daycare-reactive" className="m-0 font-display text-3xl leading-none md:text-4xl">
            {daycarePage.reactive.heading}
          </h2>
          <p className="m-0 mt-3 max-w-3xl text-slate-700">{daycarePage.reactive.body}</p>
        </section>
        <section data-reveal aria-labelledby="daycare-compare">
          <h2 id="daycare-compare" className="m-0 font-display text-3xl leading-none md:text-4xl">
            {daycarePage.compareHeading}
          </h2>
          <div className="compare-wrap mt-6">
            <table className="compare">
              <caption className="sr-only">{daycarePage.compareHeading}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Topic</span>
                  </th>
                  {columns.map((column) => (
                    <th key={column.id} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    {columns.map((column) => (
                      <td key={column.id}>
                        <span className="compare-label" aria-hidden="true">
                          {column.label}
                        </span>
                        {row.cells[column.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <BookCta />
    </>
  );
}
