const HEALCODE_SITE_ID = "129106";
const HEALCODE_MB_SITE_ID = "5747916";

export function healcodePricingLinkHtml(
  serviceId: string,
  innerHtml = "Buy Now"
): string {
  return `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="${HEALCODE_SITE_ID}" data-mb-site-id="${HEALCODE_MB_SITE_ID}" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${innerHtml}"></healcode-widget>`;
}

export function renderHealcodePricingLink(
  serviceId: string,
  innerHtml = "Buy Now"
) {
  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: healcodePricingLinkHtml(serviceId, innerHtml),
      }}
    />
  );
}
