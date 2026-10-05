"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Pages where the button would be redundant or out of place. */
const HIDDEN_ON = ["/book", "/staff", "/marketing"];

/**
 * Sections marked with this attribute have their own call to action (e.g. the
 * homepage intro offer), so the floating button steps aside while they're on screen.
 */
const HIDES_BAR_SELECTOR = "[data-hides-book-bar]";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  // Re-check once the new page has rendered (client navigation).
  const frame = requestAnimationFrame(onChange);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** True while any marked section is meaningfully on screen. */
function isBlockedOnScreen() {
  return Array.from(document.querySelectorAll(HIDES_BAR_SELECTOR)).some((el) => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 120 && rect.top < window.innerHeight;
  });
}

/**
 * Floating Book a Class button pinned to the bottom of the screen below the
 * xl breakpoint, where the header has no booking button (only the menu toggle).
 */
export default function MobileBookBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((path) => pathname.startsWith(path))) return null;
  // Remount per page so the new page's sections are checked right away.
  return <FloatingBookButton key={pathname} />;
}

function FloatingBookButton() {
  // Recomputed on scroll/resize; the server render assumes nothing blocks it.
  const blocked = useSyncExternalStore(subscribe, isBlockedOnScreen, () => false);

  return (
    <>
      {/* Spacer so the floating button never covers the end of the page */}
      <div className="h-20 xl:hidden" aria-hidden />
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 ease-out xl:hidden ${
          blocked ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-hidden={blocked}
      >
        <Link
          href="/book"
          tabIndex={blocked ? -1 : undefined}
          className={`mx-auto flex h-12 w-full max-w-md items-center justify-center rounded-[var(--radius-sm)] bg-[rgba(52,51,48,0.72)] backdrop-blur-md text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-paper ring-1 ring-[rgba(245,245,242,0.22)] shadow-[0_12px_32px_-12px_rgba(20,14,9,0.55)] transition-opacity hover:opacity-90 ${
            blocked ? "" : "pointer-events-auto"
          }`}
        >
          Book a Class
        </Link>
      </div>
    </>
  );
}
