"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import { RevealText } from "./sections/RevealText";
import { foundingMemberCopy } from "../lib/foundingMemberCopy";

export default function FoundingMemberSection() {
  return (
    <section
      id="founding"
      className="surface-charcoal-soft relative scroll-mt-40 overflow-hidden px-5 py-24 text-paper lg:px-10 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-[100rem]">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-[rgba(247,247,244,0.6)]">
                {foundingMemberCopy.badge}
              </p>
            </Reveal>
            <RevealText
              as="h2"
              delay={0.05}
              className="editorial-h2 mt-6 max-w-3xl text-balance text-paper"
              text={`${foundingMemberCopy.headlineLead} ${foundingMemberCopy.headlineAccent}`}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-[rgba(247,247,244,0.64)]">
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
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>

          <div className="relative min-h-[400px] lg:col-span-6 lg:min-h-[520px]">
            <Reveal direction="left" delay={0.1} className="h-full">
              <div className="img-editorial relative h-full min-h-[400px] lg:min-h-[520px]">
                <Image
                  src="/founding-member-o.jpg"
                  alt="Athlete stretching after a strength-focused workout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="img-desaturate object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
