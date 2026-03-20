"use client";

import { useEffect, useState } from "react";
import { ensureMindbodyHealcodeScript } from "../lib/mindbodyHealcode";

const WIDGET_HTML =
  '<healcode-widget data-type="prospects" data-widget-partner="object" data-widget-id="7061777e71a" data-widget-version="0"></healcode-widget>';

/** Renders after healcode.js is ready so Mindbody does not run on a null DOM ref. */
export default function MindbodyProspectsWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void ensureMindbodyHealcodeScript().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div
        className="min-h-[280px] rounded-lg bg-secondary/50 border border-foreground/5"
        aria-busy="true"
        aria-label="Loading contact form"
      />
    );
  }

  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: WIDGET_HTML }}
    />
  );
}
