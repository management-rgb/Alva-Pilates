"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";

const groupClassOptions = [
  {
    title: "Single Class",
    price: "$39",
    validity: "—",
    note: "Join any reformer class · All Levels welcome.",
  },
  {
    title: "New Client Intro Offer",
    price: "$89 (3 Classes)",
    validity: "14 days",
    note: "One-time offer for first-time clients.",
  },
  {
    title: "5-Class Pack",
    price: "$179",
    validity: "2 months",
    note: "$35.80 per class · non-member rate.",
  },
  {
    title: "10-Class Pack",
    price: "$339",
    validity: "3 months",
    note: "$33.90 per class · non-member rate.",
  },
  {
    title: "20-Class Pack",
    price: "$629",
    validity: "4 months",
    note: "$31.45 per class · non-member rate.",
  },
];

const memberships = [
  {
    title: "Essential",
    price: "$129/mo",
    classes: "4 classes / month",
    benefits: "5% off additional packs & retail.",
  },
  {
    title: "Core",
    price: "$239/mo",
    classes: "8 classes / month",
    benefits: "10% off privates & priority booking.",
  },
  {
    title: "Elite",
    price: "$319/mo",
    classes: "12 classes / month",
    benefits: "15% off privates + 1 guest pass / month.",
  },
  {
    title: "Unlimited",
    price: "$429/mo",
    classes: "Unlimited (1/day)",
    benefits:
      "20% off privates + 1 guest pass / month + early booking access.",
    featured: true,
  },
];

const guestOptions = [
  {
    title: "Member Guest Pass",
    price: "$20 / guest",
    detail: "Guest must attend with member. Limit 3 discounted visits per guest.",
  },
  {
    title: "Elite & Unlimited Members",
    price: "1 Free Guest Pass / month",
    detail: "Additional guests $20 each.",
  },
];

const privatesNonMember = [
  { title: "Single Private", price: "$120", validity: "—", note: "60-minute personalized session." },
  { title: "5-Pack Private", price: "$575", validity: "3 months", note: "$115 per session." },
  { title: "10-Pack Private", price: "$1,100", validity: "4 months", note: "$110 per session." },
];

const memberPrivateRates = [
  { tier: "Essential (5%)", single: "$114", fivePack: "$545", tenPack: "$1,045" },
  { tier: "Core (10%)", single: "$108", fivePack: "$520", tenPack: "$990" },
  { tier: "Elite (15%)", single: "$102", fivePack: "$490", tenPack: "$935" },
  { tier: "Unlimited (20%)", single: "$96", fivePack: "$460", tenPack: "$880" },
];

const privateEvents = [
  {
    title: "Private Group Class (up to 10 people)",
    price: "$350 / session",
    detail: "50-minute custom reformer class with instructor & exclusive studio use.",
  },
  {
    title: "Extended Private Event (90 min)",
    price: "$500 / session",
    detail: "Includes class + guided stretch or wellness experience.",
  },
  {
    title: "Corporate / Wellness Series",
    price: "From $1,200",
    detail: "Multi-session customized program for companies or retreats.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Pricing & Memberships
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                Choose the option that fits your practice—packs, memberships, privates, and events.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Group Reformer Classes */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Group Reformer Classes
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Core Sculpt · Alva Restore — 50 minutes
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupClassOptions.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 h-full flex flex-col gap-4 p-6">
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="flex items-start justify-between gap-3 pt-2">
                    <div className="space-y-1">
                      <h3 className="font-heading text-2xl font-semibold text-charcoal">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-xs uppercase tracking-[0.16em] text-charcoal/50">
                        {item.validity}
                      </p>
                    </div>
                    <span className="font-heading text-base text-primary whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
                      {item.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-16 px-6 lg:px-8 bg-secondary/60">
        <div className="max-w-[100rem] mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Monthly Auto-Renew · Priority Booking & Perks
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Memberships
              </h2>
              <p className="font-paragraph text-base text-charcoal/70">
                Auto-renews monthly · pause or cancel with 14-day notice.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberships.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 0.05}>
                <div
                  className={`relative rounded-3xl p-6 h-full flex flex-col gap-4 border shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden ${
                    m.featured
                      ? "bg-gradient-to-br from-primary/10 via-white to-primary/5 border-primary/30"
                      : "bg-white border-foreground/10"
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${
                      m.featured ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                  <div className="flex items-start justify-between gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-heading text-2xl font-semibold text-charcoal">
                        {m.title}
                      </h3>
                      <p className="font-paragraph text-sm text-charcoal/70">
                        {m.classes}
                      </p>
                    </div>
                    <span className="font-heading text-base text-primary whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
                      {m.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-1" />
                    <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                      {m.benefits}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
                      Monthly Auto-Renew
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bring a friend */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Bring-a-Friend Program
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">
                Train together, save together.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guestOptions.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col gap-3">
                  <div className="flex items-center justify-between pt-1">
                    <h3 className="font-heading text-xl font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <span className="font-heading text-base text-primary px-3 py-1 rounded-full bg-primary/10">
                      {item.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Private sessions */}
      <section className="py-16 px-6 lg:px-8 bg-secondary/60">
        <div className="max-w-[100rem] mx-auto space-y-10">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Private Reformer Sessions (1:1)
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Personalized coaching for faster progress.
              </h2>
              <p className="font-paragraph text-base text-charcoal/70">
                Privates available Mon–Fri 11 AM–4 PM · Weekends by appointment.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privatesNonMember.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col gap-3">
                  <div className="flex items-start justify-between pt-1">
                    <h3 className="font-heading text-xl font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <span className="font-heading text-base text-primary px-3 py-1 rounded-full bg-primary/10">
                      {item.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <p className="font-paragraph text-sm text-charcoal/70">
                    Validity: {item.validity}
                  </p>
                  <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl transition-all overflow-x-auto">
              <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                Member Rates
              </h3>
              <table className="w-full text-left text-sm font-paragraph text-charcoal/80">
                <thead className="text-charcoal">
                  <tr className="border-b border-foreground/10">
                    <th className="py-3 pr-3">Tier</th>
                    <th className="py-3 pr-3">Single</th>
                    <th className="py-3 pr-3">5-Pack</th>
                    <th className="py-3 pr-3">10-Pack</th>
                  </tr>
                </thead>
                <tbody>
                  {memberPrivateRates.map((row) => (
                    <tr key={row.tier} className="border-b border-foreground/5">
                      <td className="py-3 pr-3 font-semibold text-charcoal">
                        {row.tier}
                      </td>
                      <td className="py-3 pr-3">{row.single}</td>
                      <td className="py-3 pr-3">{row.fivePack}</td>
                      <td className="py-3 pr-3">{row.tenPack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Private events */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Private Events & Studio Rentals
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Host your next wellness experience with us.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateEvents.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <h3 className="font-heading text-xl font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <span className="font-heading text-base text-primary whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
                      {item.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="bg-charcoal text-white rounded-3xl p-8 lg:p-16 text-center space-y-6 shadow-lg">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold">
                Ready to get started?
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Book your spot or reach out for a custom plan. We’re here to help you move with intention.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/book"
                  className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2 justify-center"
                >
                  Book a Class
                </Link>
                <Link
                  href="/contact"
                  className="font-paragraph text-base bg-white text-charcoal px-8 py-4 rounded-lg hover:bg-white/90 transition-all inline-flex items-center gap-2 justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

