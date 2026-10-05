"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { summerResetOfferCards } from "../lib/summerResetCopy";

/** Pages where the bar would be redundant or out of place. */
const HIDDEN_ON = ["/book", "/staff", "/marketing"];

/**
 * Booking bar pinned to the bottom of the screen below the xl breakpoint,
 * where the header has no Book a Class button (only the menu toggle).
 */
export default function MobileBookBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((path) => pathname.startsWith(path))) return null;

  const intro = summerResetOfferCards.unlimitedIntro;

  return (
    <>
      {/* Spacer so the fixed bar never covers the end of the page */}
      <div className="h-[4.5rem] xl:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[rgba(245,245,242,0.12)] bg-[var(--dark)] pb-[env(safe-area-inset-bottom)] xl:hidden">
        <div className="mx-auto flex h-[4.5rem] max-w-3xl items-center justify-between gap-4 px-5">
          <Link
            href="/pricing#get-started"
            className="flex min-h-11 flex-col justify-center text-paper"
          >
            <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-paper/70">
              New here?
            </span>
            <span className="text-sm font-medium">
              15 days for {intro.price}
            </span>
          </Link>
          <Link
            href="/book"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-paper px-6 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[var(--dark)] transition-opacity hover:opacity-90"
          >
            Book a Class
          </Link>
        </div>
      </div>
    </>
  );
}
