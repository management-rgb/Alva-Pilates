"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#ECE9E3] text-foreground">
      <Header />
      <section className="bg-[#ECE9E3] px-6 pb-4 pt-32 text-charcoal lg:px-10 lg:pb-5 lg:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-display text-4xl font-normal tracking-[-0.02em] text-[#201F1C] lg:text-5xl">
            Book a Class
          </h1>
          <p className="mx-auto mt-2.5 max-w-[600px] text-base leading-[1.6] text-[#6D6C68] lg:mt-3 lg:text-lg">
            Reserve your spot in our next reformer Pilates session.
          </p>
        </div>
      </section>
      <main className="bg-[#ECE9E3] px-4 pb-24 pt-2 lg:px-6 lg:pb-28 lg:pt-2">
        <div className="mx-auto max-w-[91rem]">
          <div className="overflow-hidden rounded-2xl">
            <MindbodyBrandedWidget
              widgetType="Schedules"
              widgetId="7041376e71a"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
