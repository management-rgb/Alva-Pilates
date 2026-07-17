"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetCopy,
  summerResetDeadlineLabel,
  summerResetEnabled,
} from "../lib/summerResetCopy";
import { studioImagery } from "../lib/studioImagery";

export default function SummerResetHero() {
  if (!summerResetEnabled) return null;

  return (
    <section
      className="relative flex min-h-[min(100svh,1080px)] w-full flex-col justify-end overflow-hidden bg-charcoal pb-20 pt-44 sm:pb-24 sm:pt-48 lg:pb-28 lg:pt-52"
      aria-labelledby="summer-reset-hero-heading"
    >
      <Image
        src={studioImagery.hero}
        alt="Alva Pilates studio with warm illuminated arches and reformers"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,38,34,0.35)_0%,rgba(43,38,34,0.2)_40%,rgba(43,38,34,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,38,34,0.55)_0%,rgba(43,38,34,0.2)_55%,transparent_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[112rem] px-6 lg:px-14">
        <div className="max-w-3xl">
          <Reveal delay={0.05}>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-primary">
              {summerResetCopy.hero.eyebrow}
              <span className="mx-2.5 font-normal normal-case tracking-[0.04em] text-on-dark/45">
                ·
              </span>
              <span className="font-normal normal-case tracking-[0.04em] text-on-dark/55">
                {summerResetDeadlineLabel}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              id="summer-reset-hero-heading"
              className="mt-7 max-w-3xl font-heading text-5xl font-medium leading-[0.9] tracking-[-0.04em] text-on-dark sm:text-6xl lg:text-7xl xl:text-[5.75rem]"
            >
              {summerResetCopy.hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-[1.85] text-on-dark/80 sm:text-lg">
              Expert-led reformer Pilates in a calm, elevated Valencia studio.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/book" className="btn-primary">
                Book a class
                <ArrowRight size={16} aria-hidden />
              </a>
              <SummerOffersLink className="btn-ghost-on-dark">
                {summerResetCopy.hero.primaryCta}
              </SummerOffersLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
