"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="surface-stone border-b border-[var(--border)] px-6 pb-6 pt-32 text-charcoal lg:px-14 lg:pb-8 lg:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#C6AA83]">
            Book a Class
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal tracking-[-0.02em] text-[#201F1C] lg:mt-3.5 lg:text-5xl">
            Book a Class
          </h1>
          <p className="mx-auto mt-2.5 max-w-[600px] text-base leading-[1.6] text-[#6D6C68] lg:mt-3 lg:text-lg">
            Reserve your spot in our next reformer Pilates session.
          </p>
        </div>
      </section>
      <main className="surface-paper border-b border-border px-6 pb-24 pt-0 lg:px-14">
        <div className="mx-auto max-w-[84.5rem]">
          <div className="border border-border bg-card p-4 lg:p-6">
            <MindbodyBrandedWidget
              widgetType="Schedules"
              widgetId="7041376e71a"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-muted">
              Looking for a private session?
            </p>
            <a
              href="/appointments"
              className="inline-flex items-center gap-2 text-base text-foreground transition-colors duration-300 hover:text-charcoal"
            >
              Book a private session
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
