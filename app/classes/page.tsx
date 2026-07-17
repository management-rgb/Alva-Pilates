"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllClasses } from "../lib/data";
import { studioImagery } from "../lib/studioImagery";

export default function ClassesPage() {
  const classes = getAllClasses();

  const pillars = [
    {
      title: "Small class sizes",
      description:
        "Limited capacity ensures personalized attention and proper form corrections.",
    },
    {
      title: "Flexible scheduling",
      description:
        "Multiple class times throughout the week to fit your lifestyle.",
    },
    {
      title: "Progressive programming",
      description:
        "Classes build on each other so you advance safely and confidently.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative min-h-[min(70svh,720px)] overflow-hidden bg-charcoal">
        <Image
          src={studioImagery.heroStudio}
          alt="Reformer class at Alva Pilates"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,38,34,0.35)_0%,rgba(43,38,34,0.62)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[min(70svh,720px)] max-w-[100rem] flex-col justify-end px-6 pb-16 pt-44 lg:px-14 lg:pb-24">
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-primary">
              Practice
            </p>
            <h1 className="mt-6 max-w-3xl font-heading text-5xl font-medium leading-[0.92] tracking-tight text-on-dark sm:text-6xl lg:text-7xl">
              Our classes
            </h1>
            <p className="mt-7 max-w-lg text-base leading-[1.85] text-on-dark/80 lg:text-lg">
              From foundations to advanced reformer — classes designed to meet
              you where you are and help you progress.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory border-b border-border px-6 py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-3 lg:pt-16">
            {classes.map((classItem, index) => (
              <Reveal key={classItem._id} delay={index * 0.05}>
                <Link
                  href={`/classes/${classItem._id}`}
                  className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative aspect-[3/4] max-h-[440px] w-full overflow-hidden bg-secondary">
                    <Image
                      src={classItem.classImage}
                      alt={classItem.className}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-border pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="text-[0.625rem] tracking-[0.1em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-[0.6875rem] font-medium tracking-[0.06em] text-muted">
                      {classItem.difficultyLevel}
                      <span className="mx-2 text-border" aria-hidden>
                        ·
                      </span>
                      {classItem.durationMinutes} min
                    </p>
                    </div>
                    <h3 className="mt-3 font-heading text-[1.75rem] font-medium tracking-tight text-foreground">
                      {classItem.className.trim()}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {classItem.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      Learn more
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-secondary border-b border-border px-6 py-28 lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <div className="mb-14 max-w-2xl space-y-5 lg:mb-18">
              <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                <span className="text-muted">02</span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <p className="text-primary">Why Alva</p>
              </div>
              <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
                Built for real progress.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <div className={`h-full py-8 md:px-10 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
                  <span className="mb-8 block text-[0.625rem] tracking-[0.1em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-espresso border-y border-on-dark/15 px-6 py-28 text-center lg:px-14 lg:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-4xl font-medium tracking-tight text-on-dark lg:text-5xl">
              Ready to begin?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-dark lg:text-lg">
              Book your first class and experience intentional movement in a
              calm, elevated studio.
            </p>
            <a href="/book" className="btn-primary mx-auto mt-10">
              Book a class
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
