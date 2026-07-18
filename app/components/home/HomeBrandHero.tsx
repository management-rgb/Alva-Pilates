"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { useParallax } from "../../hooks/useParallax";
import { studioImagery } from "../../lib/studioImagery";

export default function HomeBrandHero() {
  const { ref, offset } = useParallax<HTMLDivElement>({ strength: 60 });

  return (
    <section className="relative flex min-h-[min(100svh,1080px)] w-full flex-col justify-end overflow-hidden bg-[var(--dark)] pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.25)_0%,rgba(17,17,17,0.15)_40%,rgba(17,17,17,0.8)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.5)_0%,rgba(17,17,17,0.15)_55%,transparent_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[112rem] px-5 lg:px-10">
        <div className="max-w-3xl">
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
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                className="btn-ghost-on-dark inline-flex items-center justify-center"
              >
                Explore Classes
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
