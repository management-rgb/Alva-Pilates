"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { STUDIO_INSTAGRAM_URL } from "../../lib/socialLinks";

export default function HomeVisitCommunity() {
  return (
    <section className="surface-paper px-5 py-24 text-foreground lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-0">
          <Reveal className="lg:col-span-7 lg:pr-14 xl:pr-20">
            <a
              href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
              target="_blank"
              rel="noopener noreferrer"
              className="img-editorial group relative flex min-h-[420px] bg-secondary text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal lg:min-h-[520px]"
            >
              <Image
                src="/our-story-studio.jpg"
                alt="Pilates client seated on a reformer in the Alva studio"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-desaturate object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(17,17,17,0)_35%,rgba(17,17,17,0.55)_100%)]" />
              <div className="relative mt-auto flex w-full items-end justify-between gap-5 p-8 sm:p-10">
                <div>
                  <p className="eyebrow text-paper/70">Valencia, CA</p>
                  <h3 className="mt-3 font-heading text-2xl font-medium tracking-[-0.02em] text-paper sm:text-3xl">
                    23840 Copper Hill Drive
                  </h3>
                  <p className="mt-2 text-sm text-paper/70">Valencia, CA 91354</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-paper text-[var(--dark)]">
                  <ArrowRight size={16} aria-hidden />
                </span>
              </div>
            </a>
          </Reveal>

          <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:border-l lg:border-[var(--border)] lg:pl-14 xl:pl-20">
            <Reveal delay={0.08}>
              <div>
                <p className="eyebrow">Studio hours</p>
                <h3 className="mt-4 font-heading text-2xl font-medium tracking-[-0.02em] text-foreground sm:text-3xl">
                  Move on your schedule.
                </h3>
                <div className="mt-8 border-t border-[var(--border)] text-sm">
                  <div className="flex justify-between gap-4 border-b border-[var(--border)] py-4">
                    <p className="text-muted">Monday – Friday</p>
                    <p className="text-foreground">8am – 7pm</p>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[var(--border)] py-4">
                    <p className="text-muted">Sunday & Sundday</p>
                    <p className="text-foreground">9am – 12pm</p>
                  </div>
                </div>
                <Link href="/classes" className="text-link mt-8">
                  View classes
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-t border-[var(--border)] pt-8 text-foreground transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
              >
                <div>
                  <p className="eyebrow">Follow the studio</p>
                  <p className="mt-2 font-heading text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                    @alvapilates
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
