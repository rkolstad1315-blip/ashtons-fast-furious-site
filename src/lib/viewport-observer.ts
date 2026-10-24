// The one IntersectionObserver on the site. Scroll reveals, the stat counter,
// and the lazy booking form all subscribe here instead of creating their own.
type Callback = () => void;

const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (observer) {
    return observer;
  }
  if (typeof IntersectionObserver === "undefined") {
    return null;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        const callback = callbacks.get(entry.target);
        observer?.unobserve(entry.target);
        callbacks.delete(entry.target);
        callback?.();
      }
    },
    { rootMargin: "120px 0px" },
  );
  return observer;
}

// Runs the callback once, the first time the element comes near the viewport.
// Without IntersectionObserver the callback runs on the next frame.
export function observeOnce(element: Element, callback: Callback): () => void {
  const shared = getObserver();
  if (!shared) {
    const frame = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(frame);
  }
  callbacks.set(element, callback);
  shared.observe(element);
  return () => {
    callbacks.delete(element);
    shared.unobserve(element);
  };
}
