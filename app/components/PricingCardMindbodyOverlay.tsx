"use client";

import { useCallback, useEffect, useRef } from "react";

type HealcodeType = "contract-link" | "pricing-link";

function healcodeWidgetHtml(type: HealcodeType, serviceId: string) {
  const linkClass =
    type === "contract-link"
      ? "healcode-contract-text-link"
      : "healcode-pricing-option-text-link";
  return `<healcode-widget data-version="0.2" data-link-class="${linkClass}" data-site-id="129106" data-mb-site-id="5747916" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="${type}" data-inner-html="Buy Now"></healcode-widget>`;
}

/**
 * Full-card Mindbody purchase without stretching the real <a> across the card.
 * That pattern surfaces raw Mindbody URLs (with service IDs) in the browser status bar on hover.
 */
export function PricingCardMindbodyOverlay({
  type,
  serviceId,
  ariaLabel,
}: {
  type: HealcodeType;
  serviceId: string;
  ariaLabel: string;
}) {
  const sinkRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const syncLink = useCallback(() => {
    const root = sinkRef.current;
    if (!root) return;
    const a = root.querySelector<HTMLAnchorElement>(
      "a.healcode-contract-text-link, a.healcode-pricing-option-text-link"
    );
    linkRef.current = a;
    if (a) {
      a.removeAttribute("title");
    }
  }, []);

  useEffect(() => {
    const root = sinkRef.current;
    if (!root) return;
    syncLink();
    const mo = new MutationObserver(syncLink);
    mo.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "title"],
    });
    return () => mo.disconnect();
  }, [serviceId, syncLink]);

  const activate = () => {
    syncLink();
    linkRef.current?.click();
  };

  return (
    <>
      <div
        className="absolute inset-0 z-10 pricing-card-mindbody-hit-area outline-none"
        role="link"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={activate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate();
          }
        }}
      />
      <div
        ref={sinkRef}
        className="pricing-card-healcode-sink"
        aria-hidden
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: healcodeWidgetHtml(type, serviceId),
        }}
      />
    </>
  );
}
