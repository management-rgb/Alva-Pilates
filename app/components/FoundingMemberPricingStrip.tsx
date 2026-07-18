"use client";

import { Reveal } from "./sections/Reveal";
import { RevealText } from "./sections/RevealText";
import {
  foundingMemberCopy,
  foundingMemberOfferCards,
} from "../lib/foundingMemberCopy";
import { summerResetEnabled } from "../lib/summerResetCopy";

function renderHealcodeContractLink(serviceId: string) {
  const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="129106" data-mb-site-id="5747916" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>`;

  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: widgetHtml }}
    />
  );
}

type Offer = (typeof foundingMemberOfferCards)[number];

function benefitSource(offer: Offer): string {
  return summerResetEnabled && offer.summerBenefits
    ? offer.summerBenefits
    : offer.benefits;
}

function privateDiscount(offer: Offer): string {
  const match = benefitSource(offer).match(/(\d+%\s+off\s+privates)/i);
  return match?.[1] ?? "Member private rate";
}

function guestPasses(offer: Offer): string {
  const match = benefitSource(offer).match(/(\d+\s+guest\s+pass(?:es)?[^.+]*)/i);
  return match?.[1]?.trim() ?? "Guest passes";
}

function earlyAccess(offer: Offer): string {
  const source = benefitSource(offer);
  const parts: string[] = [];
  if (/early booking/i.test(source)) parts.push("Early booking access");
  if (/waitlist/i.test(source)) parts.push("Waitlist priority");
  return parts.length ? parts.join(" · ") : "Priority booking";
}

function FoundingCard({ offer }: { offer: Offer }) {
  const featured = offer.featured;
  const features = [
    offer.classes,
    offer.contract,
    privateDiscount(offer),
    guestPasses(offer),
    earlyAccess(offer),
  ];

  return (
    <div
      className={`pcard pricing-card-full-buy ${
        featured ? "pcard--tint pcard--feature" : ""
      }`}
    >
      <div className="pcard__head">
        <p className="pcard__eyebrow">Founding membership</p>
        {featured ? (
          <span className="pcard__badge">Unlimited access</span>
        ) : null}
      </div>
      <h3 className="pcard__name">{offer.title}</h3>
      <div className="pcard__price-row">
        <span className="pcard__price pcard__price-sm">{offer.price}</span>
        <span className="pcard__was">{offer.listPrice}</span>
      </div>
      <div className="pcard__divider" />
      <ul className="pcard__list pcard__list--check">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="pcard__cta-wrap">
        <span className="pcard__cta">Join Membership</span>
      </div>
      <div className="pricing-card-full-buy-overlay">
        {renderHealcodeContractLink(offer.serviceId)}
      </div>
    </div>
  );
}

export default function FoundingMemberPricingStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      id="founding-pricing"
      className={`scroll-mt-40 px-5 py-24 lg:px-10 lg:py-36 ${className}`}
      aria-labelledby="founding-pricing-heading"
    >
      <div className="mx-auto max-w-[64rem]">
        <div className="max-w-xl space-y-4">
          <Reveal>
            <p className="eyebrow">{foundingMemberCopy.badge}</p>
          </Reveal>
          <RevealText
            as="h2"
            id="founding-pricing-heading"
            className="editorial-h2 text-balance text-foreground"
            text="Founding Memberships"
          />
          <Reveal>
            <p className="text-[0.9375rem] leading-[1.75] text-muted sm:text-base">
              {foundingMemberCopy.pricingStripBody}
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-12">
          <div className="pcard-grid pcard-grid--2">
            {foundingMemberOfferCards.map((offer) => (
              <FoundingCard key={offer.title} offer={offer} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
