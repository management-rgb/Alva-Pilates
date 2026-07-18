"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="surface-stone border-b border-[var(--border)] px-6 pb-12 pt-40 text-charcoal lg:px-14 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-taupe">
            Book a class
          </p>
          <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-charcoal lg:text-5xl">
            Schedule your next session
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-taupe lg:text-lg">
            Browse availability and reserve your spot through Mindbody.
          </p>
        </div>
      </section>
      <main className="surface-paper border-b border-border px-6 pb-24 pt-12 lg:px-14">
        <div className="mx-auto max-w-6xl">
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
