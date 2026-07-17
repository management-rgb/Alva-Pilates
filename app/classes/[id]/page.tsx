"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Reveal } from "../../components/sections/Reveal";
import { getClassById } from "../../lib/data";
import NotFound from "./not-found";

export default function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const classItem = getClassById(id);

  if (!classItem) {
    return <NotFound />;
  }

  const expectItems = [
    {
      title: "Before class",
      body: "Arrive 10 minutes early to check in and get settled. Wear comfortable, form-fitting clothing. Grip socks are recommended.",
    },
    {
      title: "During class",
      body: "Your instructor will guide you through each exercise with modifications and corrections. Focus on breath, form, and quality of movement.",
    },
    {
      title: "After class",
      body: "Take a moment to stretch and hydrate. Feel free to ask your instructor any questions about the exercises or your practice.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative min-h-[min(70svh,760px)] overflow-hidden bg-charcoal">
        <Image
          src={classItem.classImage}
          alt={classItem.className}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,38,34,0.35)_0%,rgba(43,38,34,0.7)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[min(70svh,760px)] max-w-[100rem] flex-col justify-between px-6 pb-16 pt-36 lg:px-14 lg:pb-24 lg:pt-40">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 self-start text-sm text-on-dark/75 transition-colors hover:text-on-dark"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to classes
          </Link>
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-[0.6875rem] font-medium tracking-[0.1em] text-on-dark/70">
                {classItem.difficultyLevel}
                <span className="mx-2" aria-hidden>
                  ·
                </span>
                {classItem.classType}
                <span className="mx-2" aria-hidden>
                  ·
                </span>
                {classItem.durationMinutes} min
              </p>
              <h1 className="mt-5 font-heading text-5xl font-medium tracking-tight text-on-dark sm:text-6xl lg:text-7xl">
                {classItem.className.trim()}
              </h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory px-6 py-20 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <p className="whitespace-pre-line text-lg leading-[1.85] text-muted">
                {classItem.description}
              </p>
              <a href="/book" className="btn-primary group mt-10">
                Book this class
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-foreground">
                What to expect
              </h2>
              <ol className="mt-8 space-y-8">
                {expectItems.map((item, i) => (
                  <li key={item.title} className="border-t border-border pt-6">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
                      0{i + 1}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface-espresso px-6 py-24 text-center lg:px-14 lg:py-32">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium tracking-tight text-on-dark lg:text-5xl">
            Ready to join us?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-dark">
            Explore memberships or book your spot in class.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/book" className="btn-primary">
              Book a class
            </Link>
            <Link href="/pricing" className="btn-ghost-on-dark">
              View memberships
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
