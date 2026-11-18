"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { blackFridayCopy, blackFridayLinks } from "../../lib/blackFridayCampaign";

/** Delicate scalloped lace trim, drawn as a repeating SVG so it stays crisp at any width. */
function LaceTrim({ className = "" }: { className?: string }) {
  return (
    <svg className={`bf-lace-trim ${className}`} width="100%" height="14" aria-hidden focusable="false">
      <defs>
        <pattern id="bf-scallop" width="22" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 1 Q11 15 22 1" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="11" cy="9" r="0.9" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill="url(#bf-scallop)" />
    </svg>
  );
}

export default function BlackFridayHero() {
  const h = blackFridayCopy.hero;

  return (
    <section data-hides-book-bar className="bf-hero" aria-labelledby="bf-hero-heading">
      <div className="bf-hero__lattice" aria-hidden />
      <div className="grain-overlay" aria-hidden />

      <div className="bf-hero__inner">
        <div className="bf-hero__copy">
          <Reveal>
            <p className="bf-eyebrow">{h.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="bf-hero-heading" className="bf-hero__headline font-display">
              {h.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="bf-hero__body">{h.body}</p>
            <p className="bf-hero__place">Reformer Pilates · Valencia, Santa Clarita</p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="bf-hero__panel-wrap">
          <div className="bf-arch">
            <div className="bf-arch__inner">
              <p className="bf-arch__big font-display" aria-label="20% off">
                <span className="bf-arch__num">20%</span>
                <span className="bf-arch__off">{h.offerLabel}</span>
              </p>
              <LaceTrim className="bf-arch__trim" />
              <p className="bf-arch__lead">{h.offerLead}</p>
              <ul className="bf-arch__lines">
                {h.offerLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="bf-arch__tiers">{h.tiers}</p>
              <p className="bf-arch__packs">{h.packsNote}</p>
              <p className="bf-arch__packs bf-arch__packs--merch">{h.merchNote}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="bf-hero__ctas">
          <Link href={blackFridayLinks.memberships} className="bf-btn bf-btn--champagne group">
            {h.primaryCta}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link href={blackFridayLinks.packs} className="bf-btn bf-btn--ghost">
            {h.secondaryCta}
          </Link>
        </Reveal>
      </div>

      <LaceTrim className="bf-hero__edge" />
    </section>
  );
}
