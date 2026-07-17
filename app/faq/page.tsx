"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { getFAQsByCategory } from "../lib/data";

export default function FAQPage() {
  const groupedFAQs = getFAQsByCategory();

  useEffect(() => {
    function scrollToPolicies() {
      if (window.location.hash !== "#policies") return;
      const el = document.getElementById("policies");
      if (!el) return;
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    scrollToPolicies();
    window.addEventListener("hashchange", scrollToPolicies);
    return () => window.removeEventListener("hashchange", scrollToPolicies);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-ivory px-6 pb-12 pt-40 lg:px-14 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
                <span className="text-muted">01</span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <p className="text-primary">Support</p>
              </div>
              <h1 className="font-heading text-5xl font-medium tracking-tight text-foreground lg:text-6xl">
                Frequently asked questions
              </h1>
              <p className="mx-auto max-w-xl text-base leading-[1.85] text-muted lg:text-lg">
                Answers about classes, memberships, and studio policies.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory border-b border-border px-6 pb-24 lg:px-14 lg:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-16">
            {Object.entries(groupedFAQs).map(
              ([category, categoryFAQs], categoryIndex) => (
                <Reveal key={category} delay={categoryIndex * 0.06}>
                  <div
                    id={category === "Policies" ? "policies" : undefined}
                    className="scroll-mt-36"
                  >
                    <div className="mb-6 grid grid-cols-[2.5rem_1fr] items-baseline gap-4">
                      <span className="text-[0.625rem] tracking-[0.1em] text-muted">{String(categoryIndex + 1).padStart(2, "0")}</span>
                      <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground lg:text-3xl">
                        {category}
                      </h2>
                    </div>
                    <Accordion type="single" collapsible className="border-t border-border">
                      {categoryFAQs.map((faq) => (
                        <AccordionItem
                          key={faq._id}
                          value={faq._id}
                          className="border-b border-border px-0"
                        >
                          <AccordionTrigger className="py-5 text-left text-foreground hover:no-underline hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 text-muted">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      <section className="surface-secondary border-b border-border px-6 py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <Reveal>
            <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
              Still have questions?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted lg:text-lg">
              Reach out — we&apos;ll get back to you as soon as we can.
            </p>
            <Link href="/contact" className="btn-primary mx-auto mt-10">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
