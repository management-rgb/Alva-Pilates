"use client";

import type { MindbodyCartLinkType } from "../lib/mindbodyCart";
import { mindbodyCartUrl } from "../lib/mindbodyCart";

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

/**
 * "Buy Now" link that opens the Mindbody cart in its own tab (see lib/mindbodyCart
 * for why the Healcode iframe modal is avoided). `className` carries the same
 * `healcode-*-text-link` class Healcode used, so the existing overlay CSS applies.
 *
 * The click is logged as `checkout_click`: an intent signal with no value that is
 * never a purchase.
 */
export default function MindbodyCheckoutLink({
  type,
  itemId,
  className,
  children = "Buy Now",
}: {
  type: MindbodyCartLinkType;
  itemId: string;
  className: string;
  children?: string;
}) {
  const onClick = () => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", "checkout_click", {
      item_id: itemId,
      link_type: type,
      page_path: window.location.pathname,
    });
  };

  return (
    <a
      href={mindbodyCartUrl(type, itemId)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${children} (opens in a new tab)`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
