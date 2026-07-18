"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "../sections/AnimatedCounter";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";
import { SplitImage } from "../editorial/SplitImage";
import { studioImagery } from "../../lib/studioImagery";

const values = [
  {
    title: "Precision instruction",
    body: "Expert-led reformer classes that prioritize form, control, and lasting strength.",
  },
  {
    title: "Considered programming",
    body: "From foundations to athletic work — a clear path that meets you where you are.",
  },
  {
    title: "Architectural calm",
    body: "A studio environment designed for focus: light, space, and intentional quiet.",
  },
  {
    title: "Lasting confidence",
    body: "Progress you can feel — in posture, power, and how you move through the day.",
  },
];

const studioFacts = [
  { end: 10, suffix: "", label: "Boutique reformers" },
  { end: 40, suffix: "+", label: "Classes each week" },
  { end: 50, suffix: " min", label: "Intentional sessions" },
];

export default function HomeStudioStory() {
  return (
    <>
      {/* Why Alva — large split image */}
      <SplitImage
        src={studioImagery.storySplit}
        alt="Reformer detail in the Alva Pilates studio"
        imageSide="left"
        surface="surface-paper"
        objectPosition="center"
        animateText={false}
      >
        <div className="space-y-10">
          <div className="space-y-5">
            <Reveal>
              <p className="eyebrow">Why Alva</p>
            </Reveal>
            <RevealText
              as="h2"
              className="editorial-h2 text-balance text-foreground"
              text="Built for serious practice."
            />
          </div>

          <Reveal>
          <ul className="border-t border-[var(--border)]">
            {values.map((item) => (
              <li key={item.title} className="border-b border-[var(--border)] py-5">
                <h3 className="font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-[1.7] text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          </Reveal>

          <Reveal>
          <dl className="grid grid-cols-3 gap-4 border-b border-[var(--border)] pb-8">
            {studioFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={
                  index > 0 ? "border-l border-[var(--border)] pl-4 sm:pl-5" : ""
                }
              >
                <dt className="font-heading text-2xl font-medium leading-none tabular-nums tracking-[-0.03em] text-foreground sm:text-3xl">
                  <AnimatedCounter
                    end={fact.end}
                    suffix={fact.suffix}
                    durationMs={600}
                  />
                </dt>
                <dd className="mt-2 text-[0.6875rem] uppercase tracking-[0.06em] text-muted">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
          </Reveal>

          <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/about" className="btn-primary group">
              Discover our studio
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link href="/book" className="text-link underline-grow">
              Book a Class
            </Link>
          </div>
          </Reveal>
        </div>
      </SplitImage>
    </>
  );
}
