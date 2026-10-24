"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { observeOnce } from "@/lib/viewport-observer";

const SCROLL_THRESHOLD = 8;

// Scroll reveals and the header scroll state. Content is visible without
// JavaScript; the hidden start state only applies once the html element
// carries the js class, which the inline head script adds before first paint.
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
    const cleanups = Array.from(targets, (target) =>
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
