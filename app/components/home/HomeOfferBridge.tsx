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
                  : "Begin with an intro offer."
              }
            />
            <Reveal>
              <p className="editorial-body mt-6">
                {summerResetEnabled
                  ? `15-Day Unlimited Intro and 3-Class Intro — first-time clients only. ${summerResetDeadlineLabel}.`
                  : "Try a single class or our introductory pack — then find the membership that fits your practice."}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <Reveal>
              <Link
                href={
                  summerResetEnabled
                    ? `/pricing#${summerResetSectionId}`
                    : "/pricing#get-started"
                }
                className="btn-primary"
              >
                View Offers
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
