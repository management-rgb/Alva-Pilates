"use client";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Frequently Asked Questions
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                Find answers to common questions about our classes, memberships,
                and policies.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {Object.entries(groupedFAQs).map(
              ([category, categoryFAQs], categoryIndex) => (
                <Reveal key={category} delay={categoryIndex * 0.1}>
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-charcoal">
                      {category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {categoryFAQs.map((faq) => (
                        <AccordionItem
                          key={faq._id}
                          value={faq._id}
                          className="bg-white rounded-2xl px-6 border-none"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
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

      {/* Still Have Questions */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Still Have Questions?
              </h2>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                We&apos;re here to help. Reach out to us and we&apos;ll get back
                to you as soon as possible.
              </p>
              <Link
                href="/contact"
                className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

