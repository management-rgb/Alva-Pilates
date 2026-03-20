"use client";

import { useEffect, useState } from "react";
import { ensureMindbodyHealcodeScript } from "../lib/mindbodyHealcode";

const WIDGET_HTML =
  '<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="70164909e71a" data-widget-version="0"></healcode-widget>';

export default function MindbodyRegistrationWidget() {
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
        className="min-h-[400px] rounded-lg bg-secondary/50 border border-foreground/5"
        aria-busy="true"
        aria-label="Loading registration form"
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
