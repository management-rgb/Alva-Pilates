"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetCopy,
  summerResetEnabled,
} from "../lib/summerResetCopy";

export default function SummerResetFinalCtaSection() {
  if (!summerResetEnabled) return null;

  const copy = summerResetCopy.finalCta;

  return (
    <section
      className="py-24 lg:py-32 px-6 text-center bg-secondary/20"
      aria-labelledby="summer-final-cta-heading"
    >
      <div className="max-w-4xl mx-auto">
        <Reveal direction="up">
          <h2
            id="summer-final-cta-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight"
          >
            {copy.heading}
          </h2>
          <p className="text-lg lg:text-xl text-charcoal/65 mb-10 max-w-2xl mx-auto leading-relaxed">
            {copy.body}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <SummerOffersLink
              className="group bg-primary text-white px-10 py-4 rounded-full text-base lg:text-lg hover:bg-charcoal transition-colors duration-300 shadow-lg shadow-primary/15 inline-flex items-center justify-center gap-2 font-medium"
              aria-label={`${copy.primaryCta} — view summer offers on pricing`}
            >
              {copy.primaryCta}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
                aria-hidden
              />
            </SummerOffersLink>
            <a
              href="/book"
              className="px-10 py-4 rounded-full border border-charcoal/20 text-charcoal font-medium hover:border-charcoal/40 transition-colors inline-flex items-center justify-center"
              aria-label={`${copy.secondaryCta} — open class schedule`}
            >
              {copy.secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
