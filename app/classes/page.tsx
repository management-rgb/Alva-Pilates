"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllClasses } from "../lib/data";
import { studioImagery } from "../lib/studioImagery";
import { cn } from "../lib/utils";
import type { Classes } from "../types";

function level(c: Classes) {
  return c.difficultyLevel.split("•")[0].trim();
}

function firstParagraph(c: Classes) {
  return c.description.split("\n")[0];
}

function MetaLine({ c }: { c: Classes }) {
  return (
    <p className="eyebrow flex flex-wrap items-center gap-x-2">
      <span>{level(c)}</span>
      {c.bodyFocus ? (
        <>
          <span className="text-muted/50" aria-hidden>
            ·
          </span>
          <span className="normal-case tracking-[0.02em] text-muted">
            {c.bodyFocus}
          </span>
        </>
      ) : null}
      <span className="text-muted/50" aria-hidden>
        ·
      </span>
      <span>{c.durationMinutes} min</span>
    </p>
  );
}

function ClassActions({ c }: { c: Classes }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a href="/book" className="btn-primary">
        View Schedule
        <ArrowRight size={14} aria-hidden />
      </a>
      <Link
        href={`/classes/${c._id}`}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        <span className="underline-grow">Class details</span>
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}

/** Large editorial split — image beside copy */
function ClassSplit({
  c,
  imageSide = "left",
  featured = false,
  priority = false,
}: {
  c: Classes;
  imageSide?: "left" | "right";
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <Reveal
        direction={imageSide === "right" ? "left" : "right"}
        className={cn(imageSide === "right" ? "lg:order-2" : "")}
      >
        <div
          className={cn(
            "img-editorial relative overflow-hidden",
            featured
              ? "min-h-[380px] sm:min-h-[500px] lg:min-h-[620px]"
              : "min-h-[340px] sm:min-h-[440px] lg:min-h-[540px]"
          )}
        >
          <Image
            src={c.classImage}
            alt={c.className.trim()}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="img-desaturate object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
          />
        </div>
      </Reveal>
      <Reveal className={cn(imageSide === "right" ? "lg:order-1" : "")}>
        <div>
          {featured ? (
            <p className="mb-4 inline-flex items-center bg-[var(--dark)] px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-paper">
              Signature class
            </p>
          ) : null}
          <MetaLine c={c} />
          <h2
            className={cn(
              "mt-4 font-display font-normal tracking-[-0.02em] text-balance text-foreground",
              featured
                ? "text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[0.98]"
                : "text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.02]"
            )}
          >
            {c.className.trim()}
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.8] text-muted sm:text-base">
            {firstParagraph(c)}
          </p>
          <ClassActions c={c} />
        </div>
      </Reveal>
    </div>
  );
}

/** Compact editorial card for two-up rows */
function ClassCardTwoUp({ c }: { c: Classes }) {
  return (
    <div className="card-lift group flex h-full flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <Image
          src={c.classImage}
          alt={c.className.trim()}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="img-desaturate object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <MetaLine c={c} />
        <h3 className="mt-3 font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-foreground">
          {c.className.trim()}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-[1.75] text-muted">
          {firstParagraph(c)}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
          <a href="/book" className="btn-primary">
            View Schedule
            <ArrowRight size={14} aria-hidden />
          </a>
          <Link
            href={`/classes/${c._id}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <span className="underline-grow">Details</span>
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Calm full-bleed image band with overlaid copy */
function ClassCalmBand({ c }: { c: Classes }) {
  return (
    <section className="relative min-h-[min(78svh,760px)] w-full overflow-hidden bg-charcoal">
      <Image
        src={c.classImage}
        alt={c.className.trim()}
        fill
        sizes="100vw"
        className="img-desaturate object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.15)_0%,rgba(17,17,17,0.1)_40%,rgba(17,17,17,0.72)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[min(78svh,760px)] max-w-[100rem] flex-col justify-end px-5 pb-16 pt-40 lg:px-10 lg:pb-24">
        <Reveal>
          <MetaLine c={c} />
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-balance text-paper">
            {c.className.trim()}
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] leading-[1.8] text-paper/80 sm:text-base">
            {firstParagraph(c)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/book" className="btn-primary">
              View Schedule
              <ArrowRight size={14} aria-hidden />
            </a>
            <Link
              href={`/classes/${c._id}`}
              className="btn-ghost-on-dark"
            >
              Class details
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const section = "px-5 py-24 lg:px-10 lg:py-32";
const sectionInner = "mx-auto max-w-[100rem]";

export default function ClassesPage() {
  const classes = getAllClasses();
  const byId = (id: string) => classes.find((c) => c._id === id);

  const sculpt = byId("class-4");
  const foundation = byId("class-2");
  const progress = byId("class-1");
  const cardio = byId("class-5");
  const stretch = byId("class-6");
  const lowerBody = byId("class-7");

  const twoUp = [foundation, progress].filter(Boolean) as Classes[];

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

      {/* Hero */}
      <section className="relative min-h-[min(36svh,320px)] overflow-hidden bg-charcoal">
        <Image
          src={studioImagery.heroStudio}
          alt="Reformer class at Alva Pilates"
          fill
          priority
          className="img-desaturate img-entry object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.35)_0%,rgba(17,17,17,0.2)_45%,rgba(17,17,17,0.7)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[min(36svh,320px)] max-w-[100rem] flex-col justify-end px-5 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <Reveal>
            <p className="eyebrow text-paper/60">Practice</p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-paper sm:text-4xl">
              Our classes
            </h1>
            <p className="mt-3 max-w-md text-sm leading-[1.7] text-paper/80">
              From foundations to advanced reformer — each class is an experience
              designed to meet you where you are and help you progress.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured — Alva Sculpt */}
      {sculpt ? (
        <section className={`surface-paper ${section}`}>
          <div className={sectionInner}>
            <ClassSplit c={sculpt} imageSide="left" featured priority />
          </div>
        </section>
      ) : null}

      {/* Foundation + Progress — two up */}
      {twoUp.length ? (
        <section className={`surface-stone ${section}`}>
          <div className={`${sectionInner} space-y-10`}>
            <Reveal>
              <h2 className="editorial-h3 max-w-xl text-foreground">
                Build your foundation, then progress
              </h2>
            </Reveal>
            <Reveal stagger>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {twoUp.map((c) => (
                  <ClassCardTwoUp key={c._id} c={c} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Cardio Jump — split, image right */}
      {cardio ? (
        <section className={`surface-paper ${section}`}>
          <div className={sectionInner}>
            <ClassSplit c={cardio} imageSide="right" />
          </div>
        </section>
      ) : null}

      {/* Stretch & Flow — calm full-bleed band */}
      {stretch ? <ClassCalmBand c={stretch} /> : null}

      {/* Lower Body — split, image left */}
      {lowerBody ? (
        <section className={`surface-paper ${section}`}>
          <div className={sectionInner}>
            <ClassSplit c={lowerBody} imageSide="left" />
          </div>
        </section>
      ) : null}

      {/* Why Alva */}
      <section className="surface-stone px-6 py-28 text-charcoal lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <div className="mb-14 max-w-2xl space-y-5 lg:mb-18">
              <p className="eyebrow">Why Alva</p>
              <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-charcoal lg:text-5xl">
                Built for real progress.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-[var(--border)] md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <div
                  className={`h-full py-8 md:px-10 ${
                    index > 0
                      ? "border-t border-[var(--border)] md:border-l md:border-t-0"
                      : ""
                  }`}
                >
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-charcoal">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-taupe">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="surface-paper lighting-top px-6 py-28 text-center lg:px-14 lg:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
              Ready to begin?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted lg:text-lg">
              Book your first class and experience intentional movement in a
              calm, elevated studio.
            </p>
            <a href="/book" className="btn-primary mx-auto mt-10">
              View Schedule
              <ArrowRight size={14} aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
