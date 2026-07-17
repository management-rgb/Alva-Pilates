"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { STUDIO_INSTAGRAM_URL } from "../../lib/socialLinks";

export default function HomeVisitCommunity() {
  return (
    <section className="surface-ivory border-b border-border px-6 py-28 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <div className="mb-14 max-w-2xl space-y-6 lg:mb-20">
            <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
              <span className="text-muted">04</span>
              <span className="h-px w-10 bg-border" aria-hidden />
              <p className="text-primary">Visit Alva</p>
            </div>
            <h2 className="font-heading text-4xl font-medium leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your space to move, reset, and reconnect.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-0 lg:pt-16">
          <Reveal className="lg:col-span-7 lg:pr-16 xl:pr-24">
            <a
              href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[480px] overflow-hidden bg-secondary text-on-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:min-h-[560px]"
            >
              <Image
                src="/our-story-studio.jpg"
                alt="Pilates client seated on a reformer in a bright studio"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
              <div className="relative mt-auto flex w-full items-end justify-between gap-5 p-8 sm:p-10">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
                    Valencia, CA
                  </p>
                  <h3 className="mt-3 font-heading text-3xl font-medium text-on-dark sm:text-4xl">
                    23840 Copper Hill Drive
                  </h3>
                  <p className="mt-2 text-sm text-on-dark/70">Valencia, CA 91354</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                  <ArrowUpRight size={17} aria-hidden />
                </span>
              </div>
            </a>
          </Reveal>

          <div className="flex flex-col justify-between gap-14 lg:col-span-5 lg:border-l lg:border-border lg:pl-16 xl:pl-24">
            <Reveal delay={0.08}>
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
                  Studio hours
                </p>
                <h3 className="mt-4 font-heading text-3xl font-medium tracking-tight text-foreground">
                  Move on your schedule.
                </h3>
                <div className="mt-8 border-t border-border text-sm">
                  <div className="flex justify-between gap-4 border-b border-border py-4">
                    <p className="text-muted">Monday – Saturday</p>
                    <p className="text-foreground">7am – 7pm</p>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-border py-4">
                    <p className="text-muted">Sunday</p>
                    <p className="text-foreground">9am – 12pm</p>
                  </div>
                </div>
                <Link
                  href="/classes"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  View classes
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-t border-border pt-8 text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
                    Follow the studio
                  </p>
                  <p className="mt-2 font-heading text-2xl font-medium tracking-tight sm:text-3xl">
                    @alvapilates
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
