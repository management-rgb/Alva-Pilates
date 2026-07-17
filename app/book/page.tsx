"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="surface-ivory border-b border-border px-6 pb-24 pt-40 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
              <span className="text-muted">01</span>
              <span className="h-px w-10 bg-border" aria-hidden />
              <p className="text-primary">Book a class</p>
            </div>
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
              Schedule your next session
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted lg:text-lg">
              Browse availability and reserve your spot through Mindbody.
            </p>
          </div>

          <div className="border-y border-border bg-card p-4 lg:p-6">
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
              className="inline-flex items-center gap-2 text-base text-foreground transition-colors hover:text-primary"
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
