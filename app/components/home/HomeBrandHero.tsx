"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { foundingMemberCopy } from "../../lib/foundingMemberCopy";
import { studioImagery } from "../../lib/studioImagery";

export default function HomeBrandHero() {
  return (
    <section className="relative flex min-h-[min(100svh,1080px)] w-full flex-col justify-end overflow-hidden bg-charcoal pb-20 pt-44 sm:pb-24 sm:pt-48 lg:pb-28 lg:pt-52">
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
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-primary">
              Valencia, California
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href="/pricing#founding-pricing"
              className="mt-6 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-on-dark/75 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {foundingMemberCopy.eyebrow}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-heading text-6xl font-medium leading-[0.88] tracking-[-0.04em] text-on-dark sm:text-7xl lg:text-8xl xl:text-[6.75rem]">
              Alva Pilates
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-9 max-w-lg text-base leading-[1.85] text-on-dark/80 sm:text-lg">
              Expert-led reformer Pilates in a calm, elevated studio designed
              for strength, confidence, and lasting progress.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href="/book" className="btn-primary group">
                Book a class
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <Link href="/pricing" className="btn-ghost-on-dark">
                View memberships
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
