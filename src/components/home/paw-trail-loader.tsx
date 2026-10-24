// Loads /paw-trail.js on the homepage only, at idle, on fine pointer devices
// with motion allowed. The bootstrap is inline so no React code is shipped.
const bootstrap = [
  "(function(){",
  "var m=matchMedia;",
  "if(!m('(pointer: fine)').matches||!m('(prefers-reduced-motion: no-preference)').matches)return;",
  "function l(){var s=document.createElement('script');s.src='/paw-trail.js';s.async=true;document.body.appendChild(s)}",
  "'requestIdleCallback' in window?requestIdleCallback(l,{timeout:4000}):setTimeout(l,2500)",
  "})();",
].join("");

export function PawTrailLoader() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
