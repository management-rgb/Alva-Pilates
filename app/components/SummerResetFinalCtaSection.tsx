"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetCopy,
  summerResetEnabled,
} from "../lib/summerResetCopy";
import { studioImagery } from "../lib/studioImagery";

export default function SummerResetFinalCtaSection() {
  if (!summerResetEnabled) return null;

  const copy = summerResetCopy.finalCta;

  return (
    <section
      className="relative overflow-hidden border-y border-on-dark/15 px-6 py-32 text-center text-on-dark lg:px-14 lg:py-44"
      aria-labelledby="summer-final-cta-heading"
    >
      <Image
        src={studioImagery.welcomeAlva}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-charcoal/42" />
      <div className="relative mx-auto max-w-[100rem]">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
              <span className="text-on-dark/50">05</span>
              <span className="h-px w-10 bg-on-dark/25" aria-hidden />
              <p className="text-primary">Begin your practice</p>
            </div>
            <h2
              id="summer-final-cta-heading"
              className="mt-7 font-heading text-4xl font-medium leading-[0.95] tracking-tight text-on-dark sm:text-5xl lg:text-7xl"
            >
              {copy.heading}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base leading-[1.85] text-on-dark/75 lg:text-lg">
              {copy.body}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SummerOffersLink className="btn-primary group">
                {copy.primaryCta}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </SummerOffersLink>
              <a href="/book" className="btn-ghost-on-dark">
                {copy.secondaryCta}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
