"use client";

import Link from "next/link";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";
import {
  summerResetEnabled,
  summerResetSectionId,
  summerResetDeadlineLabel,
} from "../../lib/summerResetCopy";

/** Typographic offer bridge — no pricing cards */
export default function HomeOfferBridge() {
  return (
    <section className="surface-stone px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">
                {summerResetEnabled ? "New clients" : "Get started"}
              </p>
            </Reveal>
            <RevealText
              as="h2"
              className="editorial-h2 mt-6 max-w-2xl text-balance text-foreground"
              text={
                summerResetEnabled
                  ? "Start with a Summer Reset intro."
                  : "Your first 15 days at Alva."
              }
            />
            <Reveal>
              <p className="editorial-body mt-6 max-w-xl">
                {summerResetEnabled
                  ? `15-Day Unlimited Intro and 3-Class Intro — first-time clients only. ${summerResetDeadlineLabel}.`
                  : "Experience the studio, meet our instructors, and find the practice that fits you."}
              </p>
            </Reveal>
            {summerResetEnabled ? null : (
              <Reveal>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-heading text-[3.25rem] font-semibold leading-[0.85] tracking-[-0.045em] text-foreground sm:text-[4rem]">
                    $99
                  </span>
                  <span className="text-base text-muted">
                    15-Day Unlimited Intro
                  </span>
                </p>
                <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  One class per day · 15 consecutive days · First-time clients
                </p>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-end">
            <Reveal>
              <Link
                href={
                  summerResetEnabled
                    ? `/pricing#${summerResetSectionId}`
                    : "/pricing#get-started"
                }
                className="btn-primary"
              >
                {summerResetEnabled ? "View Offers" : "Start Your Intro"}
              </Link>
            </Reveal>
            {summerResetEnabled ? null : (
              <Reveal>
                {/* Quiet alternative — the other intro options stay available
                    without competing with the $99 offer. */}
                <p className="mt-5 text-sm leading-[1.7] text-muted lg:text-right">
                  Prefer another way to begin?{" "}
                  <Link href="/pricing#get-started" className="text-link">
                    Explore the 3-Class Intro or Single Class
                  </Link>
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
