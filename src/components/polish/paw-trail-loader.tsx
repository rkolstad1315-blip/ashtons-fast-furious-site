// Loads /paw-trail-2.js at idle on fine pointer devices with motion allowed.
// It sits in the layout so client side navigation into the homepage still has
// it; the script itself only draws on the homepage. The bootstrap is inline so
// no React code is shipped. Files in /public are cached for a year, so a
// changed script needs a new file name.
const bootstrap = [
  "(function(){",
  "var m=matchMedia;",
  "if(!m('(pointer: fine)').matches||!m('(prefers-reduced-motion: no-preference)').matches)return;",
  "function l(){var s=document.createElement('script');s.src='/paw-trail-2.js';s.async=true;document.body.appendChild(s)}",
  "'requestIdleCallback' in window?requestIdleCallback(l,{timeout:4000}):setTimeout(l,2500)",
  "})();",
].join("");

export function PawTrailLoader() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
