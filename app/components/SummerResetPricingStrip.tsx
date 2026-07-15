"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import SummerDeadlineBadge from "./summer-reset/SummerDeadlineBadge";
import SummerPriceDisplay from "./summer-reset/SummerPriceDisplay";
import { SummerPacksRowPreview } from "./summer-reset/SummerPacksRow";
import {
  summerResetCopy,
  summerResetEnabled,
  summerResetOfferCards,
} from "../lib/summerResetCopy";

export default function SummerResetPricingStrip() {
  if (!summerResetEnabled) return null;

  const { unlimitedIntro, threeClassIntro } = summerResetOfferCards;

  return (
    <section
      id="summer-reset-pricing"
      className="px-6 lg:px-8 pb-10 scroll-mt-40"
      aria-labelledby="summer-reset-pricing-heading"
    >
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-background to-secondary/40 px-6 py-6 lg:px-10 lg:py-8 space-y-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {summerResetCopy.hero.eyebrow}
                </p>
                <SummerDeadlineBadge />
              </div>
              <h2
                id="summer-reset-pricing-heading"
                className="font-heading text-2xl lg:text-3xl font-semibold text-charcoal"
              >
                {summerResetCopy.offers.heading}
              </h2>
              <p className="font-paragraph text-sm lg:text-base text-charcoal/75 leading-relaxed">
                {summerResetCopy.offers.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              <Link
                href="#get-started"
                className="lg:col-span-7 rounded-2xl border border-primary/25 bg-white/95 p-5 sm:p-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  {unlimitedIntro.badge}
                </span>
                <p className="font-heading text-xl sm:text-2xl font-semibold text-charcoal mt-2">
                  {unlimitedIntro.title}
                </p>
                <SummerPriceDisplay price={unlimitedIntro.price} size="lg" />
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-4">
                  View intro offers <ArrowRight size={12} aria-hidden />
                </span>
              </Link>

              <Link
                href="#get-started"
                className="lg:col-span-5 rounded-2xl border border-foreground/10 bg-white/90 p-5 sm:p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <p className="font-heading text-lg font-semibold text-charcoal">
                  {threeClassIntro.title}
                </p>
                <SummerPriceDisplay
                  price={threeClassIntro.price}
                  listPrice="$89"
                  size="md"
                />
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-4">
                  View intro offers <ArrowRight size={12} aria-hidden />
                </span>
              </Link>

              <SummerPacksRowPreview href="#group-packages" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
