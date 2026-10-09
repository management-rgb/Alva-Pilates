"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "../lib/site";

/**
 * The Mindbody booking widget (go.mindbodyonline.com iframe) posts its GA calls to
 * the page as `BW_GA_EVENT` messages, and Mindbody's embed script (widget.js)
 * replays each one into this page's `gtag`, so they reach our GA4 property.
 *
 * Two problems with leaving that alone:
 *  1. The widget fires `purchase` for class bookings: items are the class, value
 *     is the listed price (or 0 when a pass covers it), and no payment is implied.
 *     GA4 and Google Ads count it as a sale.
 *  2. We re-inject widget.js on every client-side visit to /book or /appointments
 *     (see mindbodyBrandedEmbed.ts) and each copy adds its own, never-removed
 *     `message` listener, so one event is replayed once per visit.
 *
 * This bridge listens first (capture phase) and takes over forwarding for
 * Mindbody-origin `BW_GA_EVENT` messages, so Mindbody's original `purchase` never
 * reaches gtag:
 *  - `event` calls are sent once, explicitly to our property (`send_to`).
 *  - `purchase` becomes `class_booking` (parameters kept, including
 *    `first_time_guest`). Only these are de-duplicated, by transaction_id.
 *  - `config`/`set`/anything else is replayed unchanged, as widget.js did.
 * Other message types (iframe sizing, modal, GTM) are not touched.
 *
 * `purchase` is then free to mean a paid sale, which must be confirmed on the
 * Mindbody side (docs/checkout-and-tracking-audit.md).
 *
 * Used on /book and /appointments. The listener lives for the whole session on
 * purpose, so it always runs before any widget.js copy. It cannot stop hits the
 * iframe sends itself: those only reach GA IDs configured inside Mindbody, so do
 * not enter our measurement ID in Mindbody's analytics settings.
 */

const MINDBODY_ORIGIN = "https://go.mindbodyonline.com";
const BW_GA_EVENT = "BW_GA_EVENT";
const MINDBODY_PURCHASE = "purchase";
const BOOKING_EVENT = "class_booking";
const SEEN_STORAGE_KEY = "alva-mbo-class-bookings";
const SEEN_LIMIT = 100;

type Gtag = (...args: unknown[]) => void;

let installed = false;
const seenInMemory = new Set<string>();

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
 * True the first time a booking transaction is seen. Remembered for the browser
 * session, so reloading a confirmation screen does not log it again. Without a
 * transaction_id nothing can be matched, so the event is always sent.
 */
function isFirstBooking(transactionId: unknown): boolean {
  if (typeof transactionId !== "string" || !transactionId) return true;
  if (seenInMemory.has(transactionId)) return false;

  let stored: string[] = [];
  try {
    stored = JSON.parse(window.sessionStorage.getItem(SEEN_STORAGE_KEY) ?? "[]");
    if (!Array.isArray(stored)) stored = [];
  } catch {
    stored = [];
  }
  if (stored.includes(transactionId)) {
    seenInMemory.add(transactionId);
    return false;
  }

  seenInMemory.add(transactionId);
  try {
    window.sessionStorage.setItem(
      SEEN_STORAGE_KEY,
      JSON.stringify([...stored, transactionId].slice(-SEEN_LIMIT))
    );
  } catch {
    /* storage unavailable: in-memory de-duplication still applies */
  }
  return true;
}

/** Adds `debug_mode` when the page was opened with ?ga_debug=1 (GA4 DebugView). */
function debugParams(): Record<string, unknown> {
  return new URLSearchParams(window.location.search).get("ga_debug") === "1"
    ? { debug_mode: true }
    : {};
}

/** Returns the gtag arguments to send, or null to drop the call. */
function toGtagArgs(payload: unknown[]): unknown[] | null {
  const [command, name, rawParams] = payload;
  if (command !== "event" || typeof name !== "string") return payload;

  const params =
    rawParams && typeof rawParams === "object"
      ? (rawParams as Record<string, unknown>)
      : {};

  if (name === MINDBODY_PURCHASE) {
    if (!isFirstBooking(params.transaction_id)) return null;
    return [
      "event",
      BOOKING_EVENT,
      {
        ...params,
        original_event: MINDBODY_PURCHASE,
        ...debugParams(),
        send_to: GA_MEASUREMENT_ID,
      },
    ];
  }

  return ["event", name, { ...params, ...debugParams(), send_to: GA_MEASUREMENT_ID }];
}

function onMessage(event: MessageEvent) {
  if (event.origin !== MINDBODY_ORIGIN) return;

  const message = parseMessage(event.data);
  if (message?.type !== BW_GA_EVENT || !Array.isArray(message.payload)) return;

  // Keep widget.js's own listeners from replaying the original call.
  event.stopImmediatePropagation();

  const args = toGtagArgs(message.payload as unknown[]);
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (args && typeof gtag === "function") gtag(...args);
}

export default function MindbodyGaBridge() {
  useEffect(() => {
    if (installed) return;
    installed = true;
    window.addEventListener("message", onMessage, true);
  }, []);

  return null;
}
