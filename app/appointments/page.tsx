"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WIDGET_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

export default function AppointmentsPage() {
  const pathname = usePathname();
  const [widgetKey, setWidgetKey] = useState(() => Date.now());

  const resetWidget = () => {
    document
      .querySelectorAll(`script[src^="${WIDGET_SRC}"]`)
      .forEach((node) => node.parentNode?.removeChild(node));

    document
      .querySelectorAll(".mindbody-widget")
      .forEach((node) => {
        try {
          node.innerHTML = "";
        } catch {
          /* ignore */
        }
      });

    const existingScript = document.querySelector(
      `script[src^="${WIDGET_SRC}"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${WIDGET_SRC}?t=${Date.now()}`;
      script.async = true;
      document.body.appendChild(script);
    }

    setWidgetKey(Date.now());
  };

  useEffect(() => {
    resetWidget();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Header />
      <main className="pt-28 pb-24 px-6 lg:px-10 max-w-6xl mx-auto">
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

        <div
          key={widgetKey}
          className="mindbody-widget min-h-[700px]"
          data-widget-type="Appointments"
          data-widget-id="7045879e71a"
        />
      </main>
      <Footer />
    </div>
  );
}

