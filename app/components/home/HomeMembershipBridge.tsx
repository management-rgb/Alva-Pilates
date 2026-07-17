"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { summerResetCopy, summerResetEnabled } from "../../lib/summerResetCopy";

export default function HomeMembershipBridge() {
  if (!summerResetEnabled) return null;

  const credit = summerResetCopy.introCredit;
  const perks = summerResetCopy.memberPerks;

  return (
    <section className="surface-ivory border-b border-border px-6 py-28 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-16 border-t border-border pt-12 lg:grid-cols-12 lg:gap-0 lg:pt-16">
          <Reveal className="lg:col-span-7 lg:pr-16 xl:pr-24">
            <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
              <span className="text-muted">02</span>
              <span className="h-px w-10 bg-border" aria-hidden />
              <p className="text-primary">{credit.eyebrow}</p>
            </div>
            <h2 className="mt-8 max-w-2xl font-heading text-4xl font-medium leading-[0.94] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {credit.heading}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-[1.85] text-muted lg:text-lg">
              {credit.body}
            </p>
            <Link href="/pricing#memberships" className="btn-primary group mt-12">
              {credit.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <p className="mt-10 max-w-xl text-xs leading-relaxed text-muted">
              {credit.disclaimer}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="border-t border-border pt-12 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0 xl:pl-24">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
                Current members
              </p>
              <h3 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
                {perks.heading}
              </h3>
              <p className="mt-5 text-sm leading-[1.8] text-muted sm:text-base">
                {perks.body}
              </p>
              <ol className="mt-10 border-t border-border">
                {perks.perks.map((perk, index) => (
                  <li
                    key={perk}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-border py-4 text-sm text-foreground sm:text-base"
                  >
                    <span className="text-[0.625rem] tracking-[0.08em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ol>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-[0.02em] text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {perks.cta}
                <ArrowRight size={15} aria-hidden />
              </Link>
              <p className="mt-8 text-xs leading-relaxed text-muted">
                {perks.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
