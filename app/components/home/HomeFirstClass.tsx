"use client";

import Link from "next/link";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";

const steps = [
  {
    title: "No experience needed",
    description:
      "Beginners are welcome. New to the reformer? Start with Alva Foundation, or ask us which class suits you best.",
  },
  {
    title: "Arrive 10–15 minutes early",
    description:
      "Complete a little paperwork and get oriented. Ample parking is steps from the door at Tesoro Village.",
  },
  {
    title: "Wear grip socks",
    description:
      "Required for all classes and available for purchase at the studio.",
  },
  {
    title: "We guide you through it",
    description:
      "Your instructor sets up your reformer, explains the springs and straps, and offers modifications during the 50-minute class.",
  },
];

/** First-timer reassurance, placed right before the new-client offer. */
export default function HomeFirstClass() {
  return (
    <section className="surface-paper px-5 py-16 text-foreground lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="eyebrow">Your first class</p>
        </Reveal>
        <RevealText
          as="h2"
          className="editorial-h2 mt-6 max-w-2xl text-balance text-foreground"
          text="New to reformer? Here's what to expect."
        />
        <div className="mt-12 grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="h-full border-b border-[var(--border)] py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-3 font-heading text-xl font-medium tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
            <Link href="/pricing#get-started" className="btn-primary">
              Book Your First Class
            </Link>
            <Link href="/faq" className="text-link">
              More first-class questions
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
