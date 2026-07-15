"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import SummerDeadlineBadge from "./summer-reset/SummerDeadlineBadge";
import SummerResetHeroPricing from "./SummerResetHeroPricing";
import SummerOffersLink from "./SummerOffersLink";
import { studioImagery } from "../lib/studioImagery";
import {
  summerResetCopy,
  summerResetEnabled,
} from "../lib/summerResetCopy";

export default function SummerResetHero() {
  if (!summerResetEnabled) return null;

  return (
    <section
      className="relative min-h-[min(100svh,920px)] w-full flex flex-col justify-center overflow-hidden pt-36 sm:pt-40 pb-16 sm:pb-20"
      aria-labelledby="summer-reset-hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={studioImagery.hero}
          alt="Alva Pilates studio with lit arch mirrors, reformers, and warm boutique lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="container max-w-[120rem] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-7 lg:row-start-1 flex flex-col justify-center space-y-6 sm:space-y-8 order-1">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-white/40" />
                <span className="text-sm uppercase tracking-[0.2em] text-white/70 font-medium">
                  Valencia, CA · Alva Pilates
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {summerResetCopy.hero.eyebrow}
                </p>
                <SummerDeadlineBadge className="border-white/25 bg-white/10 text-white" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1
                id="summer-reset-hero-heading"
                className="font-heading text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] text-white tracking-tight"
              >
                {summerResetCopy.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl border-l-2 border-primary/50 pl-6">
                {summerResetCopy.offers.subheading}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 self-center order-2">
            <Reveal delay={0.25} direction="left">
              <SummerResetHeroPricing />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:row-start-2 order-3">
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 pt-1">
                <SummerOffersLink
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-charcoal rounded-full font-medium hover:shadow-lg hover:shadow-white/20 transition-all"
                  aria-label={`${summerResetCopy.hero.primaryCta} — view summer offers on pricing`}
                >
                  {summerResetCopy.hero.primaryCta}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                    aria-hidden
                  />
                </SummerOffersLink>
                <a
                  href="/book"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/30 text-white font-medium hover:border-white transition-colors"
                  aria-label={`${summerResetCopy.hero.secondaryCta} — open class schedule`}
                >
                  {summerResetCopy.hero.secondaryCta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
