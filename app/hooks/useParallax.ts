"use client";

import { useEffect, useRef, useState } from "react";

type ParallaxOptions = {
  /** Max translate in px applied across the element's scroll travel */
  strength?: number;
  /** Disable entirely (e.g. for reduced motion is handled internally) */
  disabled?: boolean;
};

/**
 * Lightweight, rAF-throttled parallax. Returns a ref to attach to the
 * scrolling container and the current translateY offset in px.
 * Respects prefers-reduced-motion (returns 0 offset).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  strength = 60,
  disabled = false,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      // progress: -1 (below viewport) → 0 (centered) → 1 (above viewport)
      const center = rect.top + rect.height / 2;
      const progress = (center - viewportH / 2) / (viewportH / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      setOffset(-clamped * strength);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength, disabled]);

  return { ref, offset };
}
