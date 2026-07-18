"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { getAllClasses } from "../../lib/data";
import type { Classes } from "../../types";

type FeaturedClass = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
};

/** Curated, ordered feature set — Sculpt (signature) first. */
const FEATURED: FeaturedClass[] = [
  {
    id: "class-4",
    name: "Alva Sculpt",
    subtitle: "Signature Class · Full Body Strength · 50 Min",
    description:
      "Our signature reformer experience — strength, endurance, balance, and precision woven into one dynamic full-body flow.",
  },
  {
    id: "class-2",
    name: "Alva Foundation",
    subtitle: "Beginner · Full Body Fundamentals · 50 Min",
    description:
      "The essential principles of reformer Pilates — alignment, control, and breath — taught with care and confidence.",
  },
  {
    id: "class-1",
    name: "Alva Progress",
    subtitle: "Level 1.5+ · Progressive Strength · 50 Min",
    description:
      "Layered sequencing that builds strength, stability, coordination, and control through more advanced movement.",
  },
];

const TITLE_SCALE = [
  "text-[clamp(2.5rem,5vw,4rem)]",
  "text-[clamp(2rem,3.6vw,3rem)]",
  "text-[clamp(1.75rem,3vw,2.5rem)]",
];

const GRID_POS = [
  "lg:col-start-1 lg:col-span-6 lg:row-start-1",
  "lg:col-start-2 lg:col-span-6 lg:row-start-2 lg:pt-10",
  "lg:col-start-3 lg:col-span-6 lg:row-start-3 lg:pt-4",
];

/** The single image follows the active class up and down the composition. */
const IMG_SHIFT = ["lg:-translate-y-12", "lg:translate-y-0", "lg:translate-y-12"];

export default function HomeClassesPreview() {
  const all = getAllClasses();
  const entries = FEATURED.map((feature) => ({
    feature,
    data: all.find((c) => c._id === feature.id),
  })).filter((e): e is { feature: FeaturedClass; data: Classes } => Boolean(e.data));

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="surface-paper overflow-hidden px-6 pb-20 pt-24 lg:px-16 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-[88rem]">
        {/* Masthead — the narrative continues from "Why Alva" */}
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-5">
            <p className="eyebrow">How you&rsquo;ll experience Alva</p>
            <p className="hidden font-heading text-sm tabular-nums tracking-[0.08em] text-muted sm:block">
              Three signature practices
            </p>
          </div>
        </Reveal>

        {/* One composition — staircase of titles + a single crossfading image */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8">
          {/* The single editorial photograph (crossfades + follows the active class) */}
          <Reveal className="lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-end-4 lg:-ml-12 lg:self-center lg:justify-self-start">
            <div
              className={`relative aspect-[3/4] w-52 overflow-hidden bg-secondary transition-transform duration-[900ms] ease-out sm:w-60 lg:w-64 ${IMG_SHIFT[activeIndex]}`}
            >
              {entries.map(({ feature, data }, index) => (
                <Image
                  key={feature.id}
                  src={data.classImage}
                  alt={feature.name}
                  fill
                  priority={index === 0}
                  sizes="240px"
                  className={`img-desaturate object-cover transition-opacity duration-[1000ms] ease-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </Reveal>

          {/* Titles */}
          {entries.map(({ feature, data }, index) => {
            const isActive = index === activeIndex;
            return (
              <Reveal key={feature.id} className={GRID_POS[index]}>
                <Link
                  href={`/classes/${data._id}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative block outline-none transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                  }`}
                >
                  {/* Oversized faded section number — texture, not graphic */}
                  <span
                    className="pointer-events-none absolute -top-10 -left-3 select-none font-heading text-[7rem] leading-none tracking-tight text-foreground/[0.018] lg:-top-14 lg:text-[9rem]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-center gap-4">
                    <span className="font-heading text-xs tabular-nums tracking-[0.08em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-px bg-foreground transition-all duration-700 ease-out ${
                        isActive ? "w-20 opacity-100" : "w-6 opacity-30"
                      }`}
                      aria-hidden
                    />
                  </div>

                  <h3
                    className={`relative mt-4 origin-left font-heading font-medium leading-[0.92] tracking-[-0.04em] text-foreground transition-all duration-700 ease-out group-hover:translate-x-1.5 ${
                      TITLE_SCALE[index]
                    } ${isActive ? "lg:scale-[1.04] lg:tracking-[-0.045em]" : "lg:scale-100"}`}
                  >
                    {feature.name}
                  </h3>

                  <p className="relative mt-4 text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                    {feature.subtitle}
                  </p>
                  <p className="relative mt-3 max-w-sm text-sm leading-[1.7] text-muted">
                    {feature.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}

          {/* Closing line — the final sentence of the spread */}
          <Reveal className="mt-6 lg:col-start-4 lg:col-span-5 lg:row-start-4 lg:mt-2 lg:self-start">
            <Link
              href="/classes"
              className="group inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-foreground"
            >
              <span
                className="h-px w-10 bg-foreground/40 transition-all duration-500 group-hover:w-16 group-hover:bg-foreground"
                aria-hidden
              />
              <span className="underline-grow">View All Classes</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
