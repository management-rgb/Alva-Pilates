"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Header />
      <main className="pt-40 pb-24 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="space-y-3 mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
            Private Sessions
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
            Book a Private Session
          </h1>
          <p className="font-paragraph text-base lg:text-lg text-charcoal/70 max-w-3xl mx-auto">
            Schedule a personalized one-on-one session with our expert instructors.
          </p>
        </div>

        <MindbodyBrandedWidget
          widgetType="Appointments"
          widgetId="7045879e71a"
        />
      </main>
      <Footer />
    </div>
  );
}
