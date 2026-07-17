"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { studioImagery } from "../../lib/studioImagery";

const studioFacts = [
  { value: "10", label: "Boutique reformers" },
  { value: "40+", label: "Classes each week" },
  { value: "50 min", label: "Intentional sessions" },
];

export default function HomeStudioStory() {
  return (
    <section className="surface-espresso relative overflow-hidden border-y border-on-dark/15 px-6 py-28 lg:px-14 lg:py-40">
      <div className="relative z-10 mx-auto max-w-[100rem]">
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-0">
          <Reveal direction="right" className="lg:col-span-7 lg:pr-16 xl:pr-24">
            <div className="relative min-h-[480px] overflow-hidden sm:min-h-[600px] lg:min-h-[720px]">
              <Image
                src={studioImagery.heroStudio}
                alt="Alva Pilates reformers and illuminated arch mirrors"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                quality={90}
              />
            </div>
          </Reveal>

          <div className="space-y-14 lg:col-span-5 lg:border-l lg:border-on-dark/15 lg:pl-16 xl:pl-24">
            <Reveal>
              <div className="space-y-7">
                <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                  <span className="text-on-dark/40">01</span>
                  <span className="h-px w-10 bg-on-dark/20" aria-hidden />
                  <p className="text-primary">The Alva experience</p>
                </div>
                <h2 className="font-heading text-4xl font-medium leading-[0.94] tracking-tight text-on-dark sm:text-5xl lg:text-6xl">
                  Movement, elevated.
                </h2>
                <p className="text-base leading-[1.85] text-muted-dark lg:text-lg">
                  A boutique reformer studio built around expert instruction,
                  thoughtful programming, and an environment that makes every
                  visit feel restorative.
                </p>
                <p className="text-base leading-[1.85] text-muted-dark lg:text-lg">
                  From foundations to advanced practice, our instructors help
                  you move with confidence and purpose.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-3 gap-6 border-y border-on-dark/15 py-9">
                {studioFacts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={index > 0 ? "border-l border-on-dark/15 pl-5 sm:pl-6" : ""}
                  >
                    <dt className="font-heading text-3xl font-medium text-on-dark sm:text-4xl">
                      {fact.value}
                    </dt>
                    <dd className="mt-2 text-xs tracking-[0.04em] text-muted-dark">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <Link href="/about" className="btn-ghost-on-dark group">
                Discover our studio
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
