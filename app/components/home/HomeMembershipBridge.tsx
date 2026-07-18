"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";
import { summerResetCopy, summerResetEnabled } from "../../lib/summerResetCopy";

export default function HomeMembershipBridge() {
  if (!summerResetEnabled) {
    return (
      <section className="surface-paper px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Memberships</p>
              </Reveal>
              <RevealText
                as="h2"
                className="editorial-h2 mt-6 max-w-2xl text-balance text-foreground"
                text="Practice with consistency."
              />
              <Reveal>
                <p className="editorial-body mt-6">
                  From Essential to Unlimited — choose the cadence that fits
                  your life. Auto-renews monthly with pause or cancel on 14-day
                  notice.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Reveal>
                <Link href="/pricing#memberships" className="btn-primary group">
                  Explore Memberships
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const credit = summerResetCopy.introCredit;
  const perks = summerResetCopy.memberPerks;

  return (
    <section className="surface-white px-5 py-24 text-foreground lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-0">
          <div className="lg:col-span-7 lg:pr-14 xl:pr-20">
            <Reveal>
              <p className="eyebrow">{credit.eyebrow}</p>
            </Reveal>
            <RevealText
              as="h2"
              className="editorial-h2 mt-6 max-w-2xl text-balance text-foreground"
              text={credit.heading}
            />
            <Reveal>
              <p className="editorial-body mt-6">{credit.body}</p>
            </Reveal>
            <Reveal>
              <Link
                href="/pricing#memberships"
                className="btn-primary group mt-10"
              >
                {credit.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
            <Reveal>
              <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted">
                {credit.disclaimer}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col border border-[var(--border)] bg-[var(--surface-muted)] px-8 py-10 sm:px-10 sm:py-12">
              <p className="eyebrow">Current members</p>
              <h3 className="mt-5 font-heading text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                {perks.heading}
              </h3>
              <p className="mt-4 text-sm leading-[1.75] text-muted sm:text-base">
                {perks.body}
              </p>
              <ul className="mt-8 border-t border-[var(--border)]">
                {perks.perks.map((perk) => (
                  <li
                    key={perk}
                    className="border-b border-[var(--border)] py-4 text-sm text-foreground sm:text-base"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="text-link mt-8">
                {perks.cta}
              </Link>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                {perks.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
