"use client";

import { Check } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import {
  foundingMemberCopy,
  foundingMemberOfferCards,
} from "../lib/foundingMemberCopy";

function renderHealcodeContractLink(serviceId: string) {
  const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="129106" data-mb-site-id="5747916" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>`;

  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: widgetHtml }}
    />
  );
}

export default function FoundingMemberPricingStrip() {
  return (
    <section
      id="founding-pricing"
      className="px-6 lg:px-8 pb-10 scroll-mt-40"
      aria-labelledby="founding-pricing-heading"
    >
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-background to-secondary/40 px-6 py-6 lg:px-10 lg:py-8 flex flex-col gap-8">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {foundingMemberCopy.badge}
              </p>
              <h2
                id="founding-pricing-heading"
                className="font-heading text-2xl lg:text-3xl font-semibold text-charcoal"
              >
                {foundingMemberCopy.pricingStripTitle}
              </h2>
              <p className="font-paragraph text-sm lg:text-base text-charcoal/75 leading-relaxed">
                {foundingMemberCopy.pricingStripBody}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {foundingMemberOfferCards.map((offer) => (
                <div
                  key={offer.title}
                  className={`relative rounded-2xl p-6 h-full flex flex-col border shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden pricing-card-full-buy cursor-pointer ${
                    offer.featured
                      ? "bg-gradient-to-br from-primary/10 via-white to-primary/5 border-primary/30"
                      : "bg-white/90 border-foreground/10 backdrop-blur-sm"
                  }`}
                >
                  <div className="relative z-0 flex flex-col gap-4 pointer-events-none select-none h-full min-h-0">
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${
                        offer.featured ? "bg-primary" : "bg-primary/20"
                      }`}
                    />
                    <div className="flex items-start justify-between gap-3 pt-2">
                      <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-charcoal leading-tight">
                          {offer.title}
                        </h3>
                        <p className="font-paragraph text-sm text-charcoal/70">
                          {offer.classes}
                        </p>
                        <p className="font-paragraph text-xs text-charcoal/55 mt-0.5">
                          {offer.contract}
                        </p>
                      </div>
                      <div
                        className="flex flex-col items-end gap-1 shrink-0 text-right"
                        aria-label={`Founding rate ${offer.price}, regular ${offer.listPrice}`}
                      >
                        <span className="font-paragraph text-xs text-charcoal/45 line-through decoration-charcoal/35">
                          {offer.listPrice}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                          Founding rate
                        </span>
                        <span className="font-heading text-lg sm:text-xl font-semibold text-charcoal tabular-nums">
                          {offer.price}
                        </span>
                      </div>
                    </div>
                    <div className="h-px bg-foreground/5" />
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-primary mt-1 shrink-0" />
                      <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                        {offer.benefits}
                      </p>
                    </div>
                    <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-1">
                      Buy Now
                    </p>
                  </div>
                  <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                    {renderHealcodeContractLink(offer.serviceId)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
