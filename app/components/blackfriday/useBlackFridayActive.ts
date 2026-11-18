"use client";

import { useSyncExternalStore } from "react";
import { isBlackFridayActive } from "../../lib/blackFridayCampaign";

function subscribe(onChange: () => void) {
  // Re-check every minute so a tab left open (or a cached page) retires itself at the deadline.
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/**
 * True while the campaign is live. The server snapshot uses the render-time clock so the
 * promo is in the first paint (no layout shift); the client then re-evaluates against the
 * visitor's clock, which hides expired offers even on stale cached HTML.
 */
export function useBlackFridayActive(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isBlackFridayActive(),
    () => isBlackFridayActive()
  );
}
