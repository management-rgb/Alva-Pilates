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
      className="py-24 lg:py-32 px-6 bg-charcoal text-white relative overflow-hidden scroll-mt-40"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] border-[100px] border-white rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] border-[60px] border-white rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-[100rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {foundingMemberCopy.badge}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-7xl text-white leading-none">
                {foundingMemberCopy.headlineLead} <br />
                <span className="text-primary italic">
                  {foundingMemberCopy.headlineAccent}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed">
                {foundingMemberCopy.description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                <Link
                  href="/pricing"
                  className="bg-primary text-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg hover:bg-white hover:text-charcoal transition-all duration-300 font-medium text-base lg:text-lg inline-flex items-center justify-center gap-3"
                >
                  {foundingMemberCopy.ctaClaim}{" "}
                  <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal direction="left" delay={0.2}>
              <div className="relative aspect-[3/4] rounded-t-full overflow-hidden border-4 border-white/5">
                <Image
                  src="/founding-member-o.jpg"
                  alt="Athlete in a triceps stretch — strength and recovery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 bg-gradient-to-t from-charcoal to-transparent">
                  <p className="font-heading text-2xl lg:text-3xl text-white">
                    &quot;The best investment you can make is in yourself.&quot;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
