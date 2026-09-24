"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { useParallax } from "../../hooks/useParallax";
import { studioImagery } from "../../lib/studioImagery";
import { summerResetOfferCards } from "../../lib/summerResetCopy";

export default function HomeBrandHero() {
  const { ref, offset } = useParallax<HTMLDivElement>({ strength: 60 });
  const unlimited = summerResetOfferCards.unlimitedIntro;

  return (
    <section className="relative flex min-h-[min(100svh,1080px)] w-full flex-col justify-end overflow-hidden bg-[var(--dark)] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:justify-center lg:pb-24 lg:pt-32">
      <div
        ref={ref}
        className="absolute inset-0 -top-[8%] -bottom-[8%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src={studioImagery.heroPrimary}
          alt="Alva Pilates reformer studio"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="img-desaturate object-cover object-[center_40%]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.2)_0%,rgba(17,17,17,0.1)_40%,rgba(17,17,17,0.7)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.44)_0%,rgba(17,17,17,0.12)_55%,transparent_100%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[112rem] items-end gap-y-10 px-5 lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:px-10">
        <div className="max-w-3xl lg:col-span-7 xl:col-span-6">
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-paper/55">
              Valencia, California
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-normal leading-[0.9] tracking-[-0.02em] text-balance text-paper">
              Movement, elevated.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-lg text-base leading-[1.75] text-paper/75 sm:text-lg">
              A considered reformer Pilates experience built around strength,
              precision, and lasting confidence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a href="/book" className="btn-primary group">
                Book a Class
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <Link
                href="/classes"
                className="group inline-flex min-h-[3rem] items-center gap-2 self-start text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-paper/85 transition-colors duration-300 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-paper/70"
              >
                <span className="border-b border-paper/30 pb-1 transition-colors duration-300 group-hover:border-paper/80">
                  Explore Classes
                </span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
          <Reveal delay={0.24}>
            <div className="w-full max-w-md rounded-[8px] border border-[rgba(74,64,50,0.16)] bg-[rgba(248,244,238,0.97)] p-7 shadow-[0_18px_48px_-34px_rgba(30,22,14,0.28)] backdrop-blur-[2px] sm:p-9">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#201f1c]">
                New clients
              </p>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-[#6d6c68]">
                New to Alva
              </p>

              <div className="mt-8 border-t border-[rgba(74,64,50,0.14)] pt-8 sm:mt-9 sm:pt-9">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#6d6c68]">
                  15 Days Unlimited
                </p>
                <p className="mt-3 font-heading text-[4.25rem] font-semibold leading-[0.82] tracking-[-0.045em] text-[#201f1c] sm:text-[4.75rem]">
                  {unlimited.price}
                </p>
                <p className="mt-4 text-[0.8125rem] leading-[1.7] text-[#6d6c68]">
                  One class per day
                  <br />
                  15 consecutive days
                </p>
              </div>

              <Link
                href="/pricing#get-started"
                className="group mt-9 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--dark)] px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-paper transition-[background-color] duration-300 ease-out hover:bg-[#4a453f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark)] focus-visible:ring-offset-2"
              >
                Start Your Intro
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
