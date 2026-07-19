"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Global smooth-scroll provider (Lenis).
 * - Respects prefers-reduced-motion (no smoothing).
 * - Intercepts same-page hash links so anchors scroll smoothly with the
 *   correct header offset (matches CSS scroll-padding-top: 8rem).
 * - Resets scroll to the top on every route change. Lenis keeps its own
 *   animatedScroll/targetScroll; if those aren't cleared, its rAF loop
 *   re-applies the previous page's offset after Next.js navigates.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const headerOffset = 128; // 8rem

    const resetToTop = () => {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
      lenis.start();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // Same-page hash anchors — smooth scroll with header offset.
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (!el) return;
        event.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -headerOffset });
        return;
      }

      // Internal page navigation — clear Lenis scroll immediately so the
      // outgoing offset can't leak onto the next page.
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
        if (url.pathname === window.location.pathname && url.hash) return;
        if (
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search
        ) {
          resetToTop();
        }
      } catch {
        // Ignore malformed hrefs.
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronous reset before paint so Lenis cannot flash the old offset.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const frames: number[] = [];

    const toTop = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        // Stop the rAF-driven lerp so it can't fight the reset, clear
        // internal scroll state, then resume.
        lenis.stop();
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.resize();
        lenis.start();
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    toTop();

    // Re-assert after layout/images settle — Lenis dimensions update async.
    frames.push(
      requestAnimationFrame(() => {
        toTop();
        frames.push(
          requestAnimationFrame(() => {
            toTop();
          })
        );
      })
    );
    timers.push(setTimeout(toTop, 50));
    timers.push(setTimeout(toTop, 150));
    timers.push(setTimeout(toTop, 300));

    return () => {
      frames.forEach((id) => cancelAnimationFrame(id));
      timers.forEach((id) => clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
