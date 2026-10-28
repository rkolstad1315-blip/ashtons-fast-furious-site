"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { observeOnce } from "@/lib/viewport-observer";

const SCROLL_THRESHOLD = 8;

// Scroll reveals and the header scroll state. Content is visible until this
// component runs: the hidden start state only applies once the html element
// carries reveal-ready, so a failed or slow script never leaves blank sections.
export function InteractionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      root.toggleAttribute("data-scrolled", window.scrollY > SCROLL_THRESHOLD);
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    // Sections the visitor can already see stay as painted; only sections
    // below the fold take the hidden start state.
    const pending = Array.from(targets).filter((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight) {
        target.classList.add("is-visible");
        return false;
      }
      return true;
    });
    document.documentElement.classList.add("reveal-ready");
    const cleanups = pending.map((target) =>
      observeOnce(target, () => target.classList.add("is-visible")),
    );
    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, [pathname]);

  return null;
}
