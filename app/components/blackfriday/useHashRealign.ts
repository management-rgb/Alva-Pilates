"use client";

import { useEffect } from "react";

/**
 * The Mindbody widget loads late and grows, pushing anchored sections (e.g. the class
 * packs below it) away from where the browser scrolled on load. For a few seconds after
 * arrival, keep the hash target aligned unless the visitor starts scrolling themselves.
 */
export function useHashRealign(ids: readonly string[]) {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !ids.includes(id)) return;

    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    const align = () => {
      if (stopped) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));

    const main = document.querySelector("main");
    const ro = main ? new ResizeObserver(align) : null;
    if (main) ro?.observe(main);
    const timeout = window.setTimeout(() => {
      stopped = true;
    }, 6000);
    align();

    return () => {
      stopped = true;
      ro?.disconnect();
      window.clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [ids]);
}
