"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "../lib/site";

/** Origin of the Mindbody booking iframe on /book. */
const MINDBODY_ORIGIN = "https://go.mindbodyonline.com";

/**
 * Only purchase is mirrored: Mindbody's own events already reach our property,
 * so forwarding the others duplicates them. Purchases dedupe by transaction_id,
 * which makes this a safe backup for the conversion that matters.
 */
const FORWARDED_EVENTS = new Set(["purchase"]);

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
 * Mirrors the Mindbody widget's purchase event (sent to the page via
 * postMessage) into our own GA4 property as a backup for Google Ads conversions.
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
