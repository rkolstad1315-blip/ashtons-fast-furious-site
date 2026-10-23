"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

function trackContactHref(href: string) {
  const normalized = href.toLowerCase();
  if (normalized.startsWith("tel:")) {
    track("tel_click");
    return;
  }
  if (normalized.startsWith("sms:")) {
    track("sms_click");
  }
}

export function ContactAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (!href) {
        return;
      }
      trackContactHref(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
