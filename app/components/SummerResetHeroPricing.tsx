"use client";

import { ArrowRight } from "lucide-react";
import IntroOfferCreditNote from "./IntroOfferCreditNote";
import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetOfferCards,
} from "../lib/summerResetCopy";

const unlimited = summerResetOfferCards.unlimitedIntro;
const threeClass = summerResetOfferCards.threeClassIntro;
const packs = summerResetOfferCards.classPackSale;

export default function SummerResetHeroPricing() {
  return (
    <aside
      className="w-full rounded-3xl border border-white/20 bg-charcoal/70 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-black/30"
      aria-label="Summer Reset offer snapshot"
    >
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">
        Summer offers at a glance
      </p>

      <div className="space-y-3 sm:space-y-4">
        <SummerOffersLink
          className="block rounded-xl border border-primary/35 bg-primary/15 px-4 py-3.5 sm:py-4 space-y-3 hover:border-primary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${unlimited.title}, ${unlimited.price}. View offer`}
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-2">
              {unlimited.badge}
            </span>
            <p className="font-paragraph text-sm text-white/80">{unlimited.title}</p>
            <p className="font-heading font-bold text-white text-4xl sm:text-5xl tabular-nums mt-1">
              {unlimited.price}
            </p>
            <p className="font-paragraph text-xs text-white/55 mt-1">
              1 class per day · 15 days
            </p>
          </div>
          <IntroOfferCreditNote variant="heroDark" />
        </SummerOffersLink>

        <SummerOffersLink
          className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 space-y-3 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${threeClass.title}, ${threeClass.price}. View offer`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-paragraph text-sm text-white/80">{threeClass.title}</p>
              <p className="font-paragraph text-[11px] text-white/50">Valid 30 days</p>
            </div>
            <div className="text-right tabular-nums shrink-0">
              <p className="font-paragraph text-sm text-white/40 line-through">$89</p>
              <p className="font-heading font-bold text-white text-2xl sm:text-3xl">
                {threeClass.price}
              </p>
            </div>
          </div>
          <IntroOfferCreditNote variant="heroDark" />
        </SummerOffersLink>

        <a
          href="/pricing#group-packages"
          className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 space-y-2.5 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${packs.title}, ${packs.mainOffer}. View offer`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-paragraph text-sm text-white/80">Class packs</p>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              {packs.mainOffer}
            </span>
          </div>
          <ul className="space-y-2">
            {packs.packs.map((pack) => (
              <li
                key={pack.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="font-paragraph text-sm text-white/70">
                  {pack.label}
                </span>
                <span className="flex items-baseline gap-2 tabular-nums">
                  <span className="font-paragraph text-xs text-white/40 line-through">
                    {pack.listPrice}
                  </span>
                  <span className="font-heading font-bold text-white text-lg sm:text-xl">
                    {pack.salePrice}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </a>

        <SummerOffersLink
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-white transition-colors"
          aria-label="See all summer offers on pricing"
        >
          See all offers
          <ArrowRight size={16} aria-hidden />
        </SummerOffersLink>
      </div>
    </aside>
  );
}
