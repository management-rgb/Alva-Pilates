"use client";

import { useSyncExternalStore } from "react";

/** October = month index 9. */
const AWARENESS_MONTH = 9;

const subscribe = () => () => {};

/**
 * Pink ribbon for Breast Cancer Awareness Month. Shows only during October,
 * checked in the browser so it appears and disappears without a redeploy.
 */
export default function AwarenessRibbon({ className = "" }: { className?: string }) {
  // Server render and hydration use `false`; the browser then reads its own date.
  const visible = useSyncExternalStore(
    subscribe,
    () => new Date().getMonth() === AWARENESS_MONTH,
    () => false,
  );

  if (!visible) return null;

  return (
    <span className={`inline-flex ${className}`} title="Breast Cancer Awareness Month">
      <svg
        viewBox="0 0 24 32"
        width="18"
        height="24"
        fill="none"
        stroke="#ec7f9c"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M8.5 9C7 4.5 9.5 1.75 12 1.75S17 4.5 15.5 9" />
        <path d="M15.5 9 7 29.5" />
        <path d="M8.5 9 17 29.5" />
      </svg>
      <span className="sr-only">Breast Cancer Awareness Month</span>
    </span>
  );
}
