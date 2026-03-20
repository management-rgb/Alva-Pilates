"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WIDGET_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

export default function BookPage() {
  const pathname = usePathname();
  const [widgetKey, setWidgetKey] = useState(() => Date.now());

  const resetWidget = () => {
    // Remove existing widget script instances
    document
      .querySelectorAll(`script[src^="${WIDGET_SRC}"]`)
      .forEach((node) => node.parentNode?.removeChild(node));

    // Clear existing widget content
    document
      .querySelectorAll(".mindbody-widget")
      .forEach((node) => {
        try {
          node.innerHTML = "";
        } catch {
          /* ignore */
        }
      });

    // Inject fresh script if not already present
    const existingScript = document.querySelector(
      `script[src^="${WIDGET_SRC}"]`
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${WIDGET_SRC}?t=${Date.now()}`;
      script.async = true;
      document.body.appendChild(script);
    }

    // Force widget container remount
    setWidgetKey(Date.now());
  };

  useEffect(() => {
    resetWidget();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Header />
      <main className="pt-40 pb-24 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="space-y-3 mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
            Book a Class
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
            Schedule Your Next Session
          </h1>
          <p className="font-paragraph text-base lg:text-lg text-charcoal/70 max-w-3xl mx-auto">
            Browse availability and reserve your spot instantly through Mindbody.
          </p>
        </div>

        <div
          key={widgetKey}
          className="mindbody-widget min-h-[700px]"
          data-widget-type="Schedules"
          data-widget-id="7041376e71a"
        />

        <div className="mt-12 text-center">
          <p className="font-paragraph text-sm text-charcoal/60 mb-4">
            Looking for a private session?
          </p>
          <a
            href="/appointments"
            className="font-paragraph text-base text-primary hover:underline inline-flex items-center gap-2"
          >
            Book a Private Session
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}