"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import { foundingMemberCopy } from "../lib/foundingMemberCopy";

export default function FoundingMemberSection() {
  return (
    <section
      id="founding"
      className="surface-espresso relative scroll-mt-40 overflow-hidden px-6 py-28 text-on-dark lg:px-14 lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-[100rem]">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
                {foundingMemberCopy.badge}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 max-w-3xl font-heading text-4xl font-medium leading-[0.92] tracking-tight text-on-dark sm:text-5xl lg:text-6xl">
                {foundingMemberCopy.headlineLead}{" "}
                <span className="text-primary">
                  {foundingMemberCopy.headlineAccent}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-dark lg:text-lg">
                {foundingMemberCopy.description}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/pricing#founding-pricing"
                className="btn-primary group mt-10 self-start"
              >
                {foundingMemberCopy.ctaClaim}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>

          <div className="relative min-h-[420px] lg:col-span-6 lg:min-h-[560px]">
            <Reveal direction="left" delay={0.1} className="h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden lg:min-h-[560px]">
                <Image
                  src="/founding-member-o.jpg"
                  alt="Athlete stretching after a strength-focused workout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
