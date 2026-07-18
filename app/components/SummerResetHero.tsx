"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./sections/Reveal";
import { RevealText } from "./sections/RevealText";
import { useParallax } from "../hooks/useParallax";
import {
  summerResetCopy,
  summerResetDeadlineLabel,
  summerResetEnabled,
  summerResetOfferCards,
} from "../lib/summerResetCopy";
import { studioImagery } from "../lib/studioImagery";

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

export default function SummerResetHero() {
  const { ref, offset } = useParallax<HTMLDivElement>({ strength: 60 });
  const reduceMotion = useReducedMotion();

  if (!summerResetEnabled) return null;

  const unlimited = summerResetOfferCards.unlimitedIntro;

  return (
    <section
      className="relative flex min-h-[min(100svh,1040px)] w-full flex-col justify-center overflow-hidden bg-[var(--dark)] pt-28 pb-[21svh] sm:pt-32 lg:pt-28 lg:pb-[24svh]"
      aria-labelledby="summer-reset-hero-heading"
    >
      <div
        ref={ref}
        className="absolute inset-0 -top-[8%] -bottom-[8%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src={studioImagery.heroPrimary}
          alt="Alva Pilates reformer studio in Valencia"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="img-hero img-slow-zoom object-cover object-[center_38%]"
        />
      </div>

      {/* Editorial film grain only — the vignette was removed because its
          radial edge-darkening fought the directional grade on the right. */}
      <div className="grain-overlay" aria-hidden />

      {/* SINGLE INTENTIONAL BACKGROUND TREATMENT (three cooperating layers).
          1 — Organic left-side light falloff. NOT a vertical fade: a large,
          soft, curved espresso shadow anchored off the left edge that wraps
          around the headline and eases into the center of the frame. Built
          from layered radial gradients so it reads as natural light falloff
          rather than a flat overlay. Deepest (warm near-black) on the far left,
          transparent well before the right so the studio and offer-card area
          stay bright. Warm espresso / brown / taupe only — never pure black. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(126% 108% at -8% 40%, rgba(10,7,3,0.98) 0%, rgba(18,12,7,0.9) 26%, rgba(30,21,13,0.64) 48%, rgba(46,33,21,0.26) 66%, transparent 80%), radial-gradient(82% 72% at -12% 82%, rgba(9,6,3,0.78) 0%, rgba(22,15,10,0.34) 44%, transparent 70%), radial-gradient(56% 62% at 3% 10%, rgba(7,4,2,0.68) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      {/* 2 — Subtle warm bottom vignette: clear through the middle, warm
          charcoal settling in near the floor to ground the reformers. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(32,25,18,0.24)_100%)]" />
      {/* 3 — Broad, diffused warm-ivory light behind the offer card so it sits
          in a softly illuminated pocket of the room. No hard spotlight edge. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(66%_66%_at_87%_54%,rgba(255,245,228,0.06)_0%,rgba(255,245,228,0.02)_48%,transparent_82%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[112rem] items-start gap-y-9 gap-x-12 px-5 lg:grid-cols-12 lg:items-center lg:px-10">
        {/* Headline group — large confident hierarchy, generous breathing room */}
        <div className="lg:col-span-7 xl:col-span-6">
          <Reveal delay={0.2}>
            <p className="inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-paper/75">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-paper/80"
                aria-hidden
              />
              {summerResetCopy.hero.eyebrow}
              <span className="font-normal tracking-[0.04em] text-paper/55">
                · {summerResetDeadlineLabel}
              </span>
            </p>
          </Reveal>

          <RevealText
            as="h1"
            id="summer-reset-hero-heading"
            mode="hero"
            delay={0.34}
            text={summerResetCopy.hero.headline}
            className="font-display mt-8 text-[clamp(5.5rem,8.5vw,6.75rem)] font-normal leading-[0.9] tracking-[-0.02em] text-balance text-paper sm:mt-9"
          />

          <Reveal delay={0.72}>
            <p className="font-hero-body mt-12 max-w-[430px] text-[clamp(1.375rem,2.2vw,1.625rem)] font-medium leading-[1.4] tracking-[-0.01em] text-paper/90 sm:mt-14">
              Boutique reformer Pilates in Valencia for every level.
            </p>
          </Reveal>

          <Reveal delay={0.86}>
            <p className="font-hero-body mt-6 max-w-[380px] text-[clamp(1.0625rem,1.4vw,1.125rem)] font-normal leading-[1.6] text-paper/60">
              Strength, precision, and mindful movement in a luxury boutique
              studio designed to help you move and feel your best.
            </p>
          </Reveal>
        </div>

        {/* Promotion panel — editorial offer invitation */}
        <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.8, ease: CARD_EASE, delay: 1.05 }}
            className="w-full max-w-md rounded-[8px] border border-[rgba(74,64,50,0.16)] bg-[rgba(248,244,238,0.97)] p-8 shadow-[0_18px_48px_-34px_rgba(30,22,14,0.28)] backdrop-blur-[2px] sm:p-9"
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#201f1c]">
              {summerResetCopy.hero.eyebrow}
            </p>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-[#6d6c68]">
              Limited through August 15
            </p>

            <div className="mt-9 border-t border-[rgba(74,64,50,0.14)] pt-9">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#6d6c68]">
                15 Days Unlimited
              </p>
              <p className="mt-3 font-heading text-[4.75rem] font-semibold leading-[0.82] tracking-[-0.045em] text-[#201f1c]">
                {unlimited.price}
              </p>
              <p className="mt-4 text-[0.8125rem] leading-[1.7] text-[#6d6c68]">
                One class per day
                <br />
                15 consecutive days
              </p>
            </div>

            <Link
              href="/pricing#class-packs"
              className="group mt-9 block border-t border-[rgba(74,64,50,0.14)] pt-6 transition-[border-color] duration-300 ease-out hover:border-[rgba(74,64,50,0.38)]"
            >
              <span className="block text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[#8a8880]">
                Also available
              </span>
              <span className="mt-2.5 flex items-center justify-between gap-4">
                <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-[#4a4945] transition-colors duration-300 group-hover:text-[#201f1c]">
                  20% Off Class Packs
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-[#6d6c68] transition-[transform,color] duration-300 ease-out group-hover:translate-x-1 group-hover:text-[#201f1c]"
                  aria-hidden
                />
              </span>
            </Link>

            <Link
              href="/pricing#summer-reset"
              className="group mt-9 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--dark)] px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-paper transition-[background-color] duration-300 ease-out hover:bg-[#4a453f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark)] focus-visible:ring-offset-2"
            >
              View Summer Offers
              <ArrowRight
                size={14}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
