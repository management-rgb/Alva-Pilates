"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "../lib/site";

/** Origin of the Mindbody booking iframe on /book. */
const MINDBODY_ORIGIN = "https://go.mindbodyonline.com";

/** Ecommerce events worth mirroring into our GA4 property. */
const FORWARDED_EVENTS = new Set(["view_item", "add_to_cart", "begin_checkout", "purchase"]);

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

function parseMessage(data: unknown): { type?: unknown; payload?: unknown } | null {
  if (typeof data === "string") {
    try {
      const parsed: unknown = JSON.parse(data);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return data && typeof data === "object" ? data : null;
}

/**
 * Mirrors the Mindbody widget's GA4 ecommerce events (sent to the page via
 * postMessage) into our own GA4 property. Mindbody's events only reach its own
 * property, so without this our purchases are invisible to Google Ads.
 * Used on /book and /appointments.
 */
export default function MindbodyGaBridge() {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== MINDBODY_ORIGIN) return;

      const message = parseMessage(event.data);
      if (message?.type !== "BW_GA_EVENT" || !Array.isArray(message.payload)) return;

      const [command, name, params] = message.payload as unknown[];
      if (command !== "event" || typeof name !== "string" || !FORWARDED_EVENTS.has(name)) {
        return;
      }

      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return;

      const eventParams = params && typeof params === "object" ? params : {};
      gtag("event", name, { ...eventParams, send_to: GA_MEASUREMENT_ID });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
