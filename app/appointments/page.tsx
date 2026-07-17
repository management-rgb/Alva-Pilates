"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="surface-ivory border-b border-border pt-40 pb-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
        <div className="space-y-3 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
            <span className="text-muted">01</span>
            <span className="h-px w-10 bg-border" aria-hidden />
            <p className="text-primary">Private Sessions</p>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Book a Private Session
          </h1>
          <p className="font-paragraph text-base lg:text-lg text-muted max-w-3xl mx-auto">
            Schedule a personalized one-on-one session with our expert instructors.
          </p>
        </div>

        <div className="border-y border-border bg-card p-4 text-foreground lg:p-6">
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
