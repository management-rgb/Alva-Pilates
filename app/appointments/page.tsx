"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="surface-stone border-b border-[var(--border)] px-6 pb-12 pt-40 text-charcoal lg:px-10 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-taupe">
            Private Sessions
          </p>
          <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-charcoal lg:text-5xl">
            Book a Private Session
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-taupe lg:text-lg">
            Schedule a personalized one-on-one session with our expert
            instructors.
          </p>
        </div>
      </section>
      <main className="surface-paper border-b border-border px-6 pb-24 pt-12 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="border border-border bg-card p-4 text-foreground lg:p-6">
            <MindbodyBrandedWidget
              widgetType="Appointments"
              widgetId="7045879e71a"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
