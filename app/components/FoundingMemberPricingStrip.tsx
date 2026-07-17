"use client";

import { Reveal } from "./sections/Reveal";
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

function benefitBullets(text: string): string[] {
  return text
    .split(/\s*\+\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

const cardTitle =
  "font-heading text-[1.375rem] font-medium leading-snug tracking-tight text-foreground";
const cardPrice =
  "font-heading text-[1.75rem] font-medium leading-none tabular-nums tracking-tight text-foreground";
const cardMeta = "text-[0.8125rem] leading-relaxed text-muted";
const cardCopy = "text-[0.8125rem] leading-[1.7] text-muted";

export default function FoundingMemberPricingStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      id="founding-pricing"
      className={`scroll-mt-40 px-6 py-32 lg:px-14 lg:py-44 ${className}`}
      aria-labelledby="founding-pricing-heading"
    >
      <div className="mx-auto max-w-[72rem] xl:max-w-[80rem]">
        <Reveal>
          <div className="flex flex-col gap-12">
            <div className="mx-auto max-w-xl space-y-4 text-center">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-primary">
                {foundingMemberCopy.badge}
              </p>
              <h2
                id="founding-pricing-heading"
                className="font-heading text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl"
              >
                {foundingMemberCopy.pricingStripTitle}
              </h2>
              <p className="text-[0.9375rem] leading-[1.8] text-muted sm:text-base">
                {foundingMemberCopy.pricingStripBody}
              </p>
            </div>

            <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {foundingMemberOfferCards.map((offer) => {
                const bullets = benefitBullets(
                  summerResetEnabled && offer.summerBenefits
                    ? offer.summerBenefits
                    : offer.benefits
                );
                return (
                  <div
                    key={offer.title}
                    className={`pricing-offer pricing-card-full-buy group cursor-pointer ${
                      offer.featured ? "pricing-offer-featured" : ""
                    }`}
                  >
                    <div className="relative z-0 flex h-full min-h-0 flex-col pointer-events-none select-none">
                      <h3 className={cardTitle}>{offer.title}</h3>
                      <div className="mt-6 flex items-baseline gap-2.5">
                        <p className={cardPrice}>{offer.price}</p>
                        <p className="text-sm text-muted line-through">
                          {offer.listPrice}
                        </p>
                      </div>
                      <p className={`mt-3 ${cardMeta}`}>
                        {offer.classes}
                        <span className="text-border"> · </span>
                        {offer.contract}
                      </p>
                      <ul className="mt-6 space-y-2">
                        {bullets.map((bullet) => (
                          <li key={bullet} className={cardCopy}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto pt-10 text-[0.8125rem] font-medium tracking-[0.02em] text-muted transition-colors duration-300 group-hover:text-foreground">
                        Join Membership
                        <span
                          aria-hidden
                          className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </p>
                    </div>
                    <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                      {renderHealcodeContractLink(offer.serviceId)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
