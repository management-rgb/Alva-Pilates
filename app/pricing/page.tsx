"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--lp-ivory)] text-foreground">
      <Header />

      <main className="mx-auto max-w-5xl px-6 pb-20 pt-28 lg:pt-32">
        <MindbodyBrandedWidget widgetType="Pricing" widgetId="706724e71a" />
      </main>

      <Footer />
    </div>
  );
}
