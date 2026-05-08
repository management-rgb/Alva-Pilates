"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import {
  mothersDayDealSummary,
  mothersDaySaleEnabled,
  mothersDaySaleExpiresLine,
} from "../lib/mothersDaySale";

const SECTION_BG_IMAGE = "/mothers-day-section-bg.png";

export default function MothersDaySaleSection() {
  if (!mothersDaySaleEnabled) return null;

  return (
    <section
      className="relative scroll-mt-40 overflow-hidden border-b border-white/10 flex flex-col min-h-[24rem] sm:min-h-[26rem] lg:min-h-[30rem]"
      aria-labelledby="mothers-day-sale-heading"
    >
      {/* Shorter section + higher object-position = less top/bottom crop on landscape art */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={SECTION_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-[center_22%] sm:object-[center_24%] md:object-[center_26%] lg:object-[48%_28%]"
          sizes="100vw"
          priority
        />
        {/* Readability: darker on the left (copy + list), lighter on the right so the portrait stays visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/78 to-charcoal/35 sm:to-charcoal/25" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-36 sm:pt-40 pb-24 sm:pb-28 lg:pb-32">
        <div className="max-w-[100rem] mx-auto w-full py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-16 lg:gap-24 xl:gap-28 items-center">
            <Reveal>
              <div className="space-y-4 max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-500 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <Sparkles className="w-4 h-4 shrink-0 text-red-500" aria-hidden />
                  Limited time
                </p>
                <p
                  id="mothers-day-sale-heading"
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-red-500 leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]"
                >
                  Mother&apos;s Day Sale
                </p>
                <p className="font-paragraph text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] max-w-md">
                  {mothersDaySaleExpiresLine}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-6 lg:justify-self-end w-full max-w-lg lg:max-w-none">
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold drop-shadow-sm">
                  Non-member packs &amp; intro
                </p>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                  Save on drop-ins, intro offer &amp; class packs
                </h2>
                <p className="font-paragraph text-white/80 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                  15% off non-member packages — plus special pricing on drop-ins
                  and our new-client intro. Book through pricing or your usual
                  Mindbody flow.
                </p>

                <ul className="rounded-2xl border border-white/20 bg-black/35 backdrop-blur-md divide-y divide-white/15 shadow-xl">
                  {mothersDayDealSummary.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
                    >
                      <span className="font-paragraph text-base sm:text-lg text-white/95">
                        {row.label}
                      </span>
                      <span className="flex items-center gap-2 sm:gap-3 shrink-0 font-heading text-base sm:text-lg tabular-nums">
                        <span className="text-[#b8aea2] line-through decoration-[#8a8278]/60">
                          {row.was}
                        </span>
                        <span className="font-bold text-lg sm:text-xl text-[#f7f0e8] tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                          {row.now}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="/pricing#get-started"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-[filter]"
                  >
                    View full pricing
                    <ArrowRight size={16} />
                  </Link>
                  <a
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm bg-white/5 hover:bg-white/15 transition-colors backdrop-blur-sm"
                  >
                    Book a class
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
