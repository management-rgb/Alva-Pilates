"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import { RevealText } from "./sections/RevealText";
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
      className="surface-stone lighting-top px-5 py-28 text-center text-foreground lg:px-10 lg:py-40"
      aria-labelledby="summer-final-cta-heading"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="eyebrow">Begin your practice</p>
          </Reveal>
          <RevealText
            as="h2"
            id="summer-final-cta-heading"
            className="editorial-h1 mt-6 text-balance text-foreground"
            text={copy.heading}
          />
          <Reveal>
            <p className="mx-auto mt-7 max-w-lg text-base leading-[1.75] text-muted">
              {copy.body}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SummerOffersLink className="btn-primary group">
                {copy.primaryCta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </SummerOffersLink>
              <a href="/book" className="btn-ghost-on-dark">
                {copy.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
