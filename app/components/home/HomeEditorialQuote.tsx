"use client";

import { Reveal } from "../sections/Reveal";

/** Editorial pull-quote — the one place a serif accent is allowed */
export default function HomeEditorialQuote() {
  return (
    <section className="surface-stone-deep px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[68rem]">
        <Reveal>
          <p className="eyebrow">The Alva philosophy</p>
          <blockquote className="mt-9">
            <p className="font-display text-[clamp(2rem,4.4vw,3.5rem)] italic leading-[1.12] tracking-[-0.015em] text-foreground">
              “Movement, practiced with intention, becomes the quietest form of
              confidence.”
            </p>
          </blockquote>
          <p className="mt-8 text-[0.8125rem] uppercase tracking-[0.12em] text-muted">
            Alva Pilates · Valencia
          </p>
        </Reveal>
      </div>
    </section>
  );
}
