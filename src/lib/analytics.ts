// Vercel Web Analytics events. The queue (window.va) is created by the inline
// analytics bootstrap in the root layout, so events sent before the analytics
// script loads are kept and flushed once it arrives.
type VercelAnalytics = (event: "event", payload: { name: string }) => void;

declare global {
  interface Window {
    va?: VercelAnalytics;
  }
}

export function trackEvent(name: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.va?.("event", { name });
}
