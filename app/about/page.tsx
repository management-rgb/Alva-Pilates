"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { studioImagery } from "../lib/studioImagery";

export default function AboutPage() {
  const values = [
    {
      title: "Expert instruction",
      description:
        "Certified instructors with deep understanding of movement, anatomy, and form.",
    },
    {
      title: "Intentional practice",
      description:
        "Every exercise is purposeful — quality over quantity for lasting results.",
    },
    {
      title: "Personal attention",
      description:
        "Small class sizes so you get the guidance and corrections you need.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Editorial hero — photography first */}
      <section className="relative min-h-[min(36svh,320px)] overflow-hidden bg-charcoal">
        <Image
          src={studioImagery.ourStory}
          alt="Alva Pilates — studio architecture and reformers"
          fill
          priority
          className="img-desaturate object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.35)_0%,rgba(17,17,17,0.2)_45%,rgba(17,17,17,0.7)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[min(36svh,320px)] max-w-[100rem] flex-col justify-end px-5 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <Reveal>
            <p className="eyebrow text-paper/60">About Alva</p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-balance text-paper sm:text-4xl">
              Our story
            </h1>
            <p className="mt-3 max-w-md text-sm leading-[1.7] text-paper/80">
              A boutique reformer studio in Valencia — built for intentional
              movement, expert guidance, and a shared sense of belonging.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="surface-paper px-6 py-28 lg:px-14 lg:py-40">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <div className="mx-auto grid max-w-4xl gap-8 border-t border-border pt-10 text-lg leading-[1.85] text-muted sm:grid-cols-[3rem_1fr] sm:gap-10">
              <span className="text-[0.625rem] tracking-[0.1em] text-muted">01</span>
              <div className="space-y-7">
              <p>
                Alva Pilates began with our desire to create more than just a
                studio.
              </p>
              <p>
                We envisioned a space where movement becomes an experience —
                defined by refined design, expert instruction, and meaningful
                connection.
              </p>
              <p>
                Every element reflects our commitment to quality, intention, and
                elevated living. At its core, Alva is our way of bringing people
                together through movement, strength, and belonging.
              </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy — photo + text */}
      <section className="surface-stone px-6 py-28 text-charcoal lg:px-14 lg:py-40">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 items-stretch gap-14 border-t border-[var(--border)] pt-12 lg:grid-cols-2 lg:gap-0 lg:pt-16">
            <Reveal direction="right" className="lg:pr-16 xl:pr-24">
              <div className="img-editorial relative h-[420px] overflow-hidden lg:h-[560px]">
                <Image
                  src={studioImagery.philosophy}
                  alt="Instructor guiding a client on the reformer in the Alva Pilates studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="left" className="lg:border-l lg:border-[var(--border)] lg:pl-16 xl:pl-24">
              <div className="space-y-7">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe">
                  Philosophy
                </p>
                <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-charcoal lg:text-5xl">
                  Practice with intention.
                </h2>
                <p className="text-base leading-[1.85] text-taupe lg:text-lg">
                  True transformation comes from intentional practice. Every
                  movement is an opportunity to connect with your body, build
                  strength, and cultivate awareness.
                </p>
                <p className="text-base leading-[1.85] text-taupe lg:text-lg">
                  We&apos;re not about quick fixes or trendy workouts. We&apos;re
                  about sustainable results through expert guidance, proper form,
                  and a commitment to excellence.
                </p>
                <p className="text-base leading-[1.85] text-taupe lg:text-lg">
                  Our studio is a sanctuary — a place to escape the noise and
                  focus entirely on your practice.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values — typography, not cards */}
      <section className="surface-paper px-6 py-28 lg:px-14 lg:py-40">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <div className="mb-16 max-w-2xl space-y-5 lg:mb-20">
              <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                <span className="text-muted">03</span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <p className="text-taupe">What sets us apart</p>
              </div>
              <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
                An elevated approach to practice.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className={`h-full py-8 md:px-10 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}>
                  <p className="mb-8 text-[0.625rem] tracking-[0.1em] text-muted">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-heading text-2xl font-medium text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment CTA */}
      <section className="surface-stone lighting-top px-6 py-28 text-charcoal lg:px-14 lg:py-36">
        <div className="mx-auto max-w-[100rem] text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-7">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe">
                Begin
              </p>
              <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-charcoal lg:text-5xl">
                Our commitment to you
              </h2>
              <p className="text-base leading-[1.85] text-taupe lg:text-lg">
                Whether you&apos;re building strength, improving posture,
                recovering from injury, or finding a mindful practice — we&apos;re
                here to support you every step of the way.
              </p>
              <Link href="/book" className="btn-primary mx-auto mt-4">
                Book a class
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
