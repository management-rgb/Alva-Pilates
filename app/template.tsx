"use client";

import { useLayoutEffect } from "react";

/**
 * Remounts on every App Router navigation. Belt-and-suspenders scroll reset
 * for cases where Lenis / browser restoration would otherwise keep the
 * previous page's scroll offset.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return children;
}
