/**
 * TODO: Ticket 05 (branch ticket/05-home-bottom) provides the Onslow and Duplin
 * county map SVG. Keep this component name so that branch can replace the slot.
 * Do not draw a second map here.
 */
export function ServiceAreaMap() {
  return (
    <div
      className="flex min-h-48 items-center justify-center rounded-card border border-dashed border-slate-400 bg-slate-100 px-4 py-8 text-center"
      data-slot="service-area-map"
    >
      <p className="m-0 max-w-md text-slate-700">County map placeholder</p>
    </div>
  );
}
