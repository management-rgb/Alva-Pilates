/**
 * Smooth-scroll to an element by id, accounting for the fixed header + announcement bar
 * and any sticky section nav marked with `data-sticky-subnav`.
 */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 140;
  // Page-level sticky section nav (e.g. pricing) sits under the header.
  const subnav = document.querySelector("[data-sticky-subnav]");
  const subnavHeight = subnav?.getBoundingClientRect().height ?? 0;
  const gap = 12;
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    subnavHeight -
    gap;

  window.scrollTo({ top: Math.max(0, top), behavior });

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }
}

export function scheduleScrollToSection(id: string, delayMs = 80) {
  if (typeof window === "undefined") return;
  window.setTimeout(() => scrollToSection(id), delayMs);
}
