"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import { summerResetCopy, summerResetEnabled } from "../lib/summerResetCopy";

export default function SummerResetIntroCreditSection() {
  if (!summerResetEnabled) return null;

  const copy = summerResetCopy.introCredit;

  return (
    <section
      className="py-20 lg:py-28 px-6 bg-charcoal text-white"
      aria-labelledby="summer-intro-credit-heading"
    >
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {copy.eyebrow}
              </p>
              <h2
                id="summer-intro-credit-heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white"
              >
                {copy.heading}
              </h2>
              <p className="font-paragraph text-base lg:text-lg text-white/75 leading-relaxed max-w-xl">
                {copy.body}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 sm:px-8">
              <p className="font-paragraph text-xs sm:text-sm text-white/55 leading-relaxed">
                {copy.disclaimer}
              </p>
              <Link
                href="/pricing#memberships"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-charcoal transition-colors duration-300 w-full sm:w-auto"
                aria-label={`${copy.cta} — view membership options`}
              >
                {copy.cta}
                <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
