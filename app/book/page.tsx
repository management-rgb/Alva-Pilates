"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WIDGET_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

export default function BookPage() {
  const pathname = usePathname();
  const [widgetKey, setWidgetKey] = useState(() => Date.now());

  useEffect(() => {
    // Force re-init on client navigation by clearing any prior script and widget markup,
    // then injecting a fresh script with a cache-busting param so Mindbody re-parses.
    
    // Clear existing scripts
    document
      .querySelectorAll(`script[src^="${WIDGET_SRC}"]`)
      .forEach((node) => {
        try {
          node.parentNode?.removeChild(node);
        } catch (e) {
          // Ignore errors when removing nodes
        }
      });

    // Clear widget content
    document
      .querySelectorAll(".mindbody-widget")
      .forEach((node) => {
        try {
          node.innerHTML = "";
        } catch (e) {
          // Ignore errors when clearing content
        }
      });

    // Check if script is already loading/loaded to prevent duplicate declarations
    const existingScript = document.querySelector(
      `script[src^="${WIDGET_SRC}"]`
    );
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${WIDGET_SRC}?t=${Date.now()}`;
      script.async = true;
      
      // Handle script load errors gracefully
      script.onerror = () => {
        // Silently handle script load errors
      };
      
      try {
        document.body.appendChild(script);
      } catch (e) {
        // Ignore appendChild errors (like pendoRetryTracker re-declaration)
      }
    }

    // bump key so container remounts
    setWidgetKey(Date.now());
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Header />
      <main className="pt-28 pb-24 px-6 lg:px-10 max-w-6xl mx-auto">
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
      </main>
      <Footer />
    </div>
  );
}

