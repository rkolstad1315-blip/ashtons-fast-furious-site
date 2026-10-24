import { business } from "../../content/business";

// Vercel Web Analytics without the React component. The queue exists right
// away so track() calls from the booking form are kept, tel: and sms: taps
// are recorded with one document level listener, and the analytics script
// itself is injected at idle, after everything else on the page has loaded.
// Nothing loads in development.
const analyticsSrc = "/_vercel/insights/script.js";

function bootstrap(): string {
  const inject =
    process.env.NODE_ENV === "production"
      ? `function l(){if(d.querySelector('script[src="${analyticsSrc}"]'))return;var s=d.createElement('script');s.src='${analyticsSrc}';s.defer=true;s.dataset.sdkn='@vercel/analytics/next';s.dataset.sdkv='2.0.1';d.head.appendChild(s)}` +
        `'requestIdleCallback' in w?requestIdleCallback(l,{timeout:5000}):setTimeout(l,3000);`
      : "";
  return (
    "(function(w,d){" +
    "w.va=w.va||function(){(w.vaq=w.vaq||[]).push([].slice.call(arguments))};" +
    "d.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=(a.getAttribute('href')||'').toLowerCase();" +
    "if(h.indexOf('tel:')===0)w.va('event',{name:'tel_click'});else if(h.indexOf('sms:')===0)w.va('event',{name:'sms_click'})},true);" +
    inject +
    "})(window,document);"
  );
}

export function AnalyticsBootstrap() {
  if (!business.name) {
    return null;
  }
  return <script dangerouslySetInnerHTML={{ __html: bootstrap() }} />;
}
