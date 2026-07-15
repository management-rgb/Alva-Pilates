"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import { summerResetCopy, summerResetEnabled } from "../lib/summerResetCopy";

export default function SummerResetMemberPerksSection() {
  if (!summerResetEnabled) return null;

  const copy = summerResetCopy.memberPerks;

  return (
    <section
      className="py-16 lg:py-20 px-6 bg-background"
      aria-labelledby="summer-member-perks-heading"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border border-foreground/10 bg-white/90 px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <h2
                  id="summer-member-perks-heading"
                  className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-charcoal leading-tight"
                >
                  {copy.heading}
                </h2>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  {copy.body}
                </p>
                <p className="font-paragraph text-xs text-charcoal/55 leading-relaxed border-t border-charcoal/8 pt-4">
                  {copy.disclaimer}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <ul className="space-y-3">
                  {copy.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 font-paragraph text-sm sm:text-base text-charcoal/80"
                    >
                      <Check size={18} className="text-primary mt-0.5 shrink-0" aria-hidden />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-charcoal/15 text-charcoal font-medium hover:border-primary hover:text-primary transition-colors w-full sm:w-auto self-start"
                  aria-label={`${copy.cta} — contact Alva Pilates`}
                >
                  {copy.cta}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
