"use client";

import { useEffect, useState } from "react";
import { ensureMindbodyHealcodeScript } from "../lib/mindbodyHealcode";

const WIDGET_HTML =
  '<healcode-widget data-version="0.2" data-link-class="healcode-login-register-text-link" data-site-id="129106" data-mb-site-id="5747916" data-bw-identity-site="true" data-type="account-link" data-inner-html="Login / Register"></healcode-widget>';

type Props = {
  className?: string;
};

/** Mindbody client login/register; renders after healcode.js is ready (SPA-safe). */
export default function MindbodyAccountLink({ className = "" }: Props) {
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
      <span
        className={`inline-block h-12 min-w-[9.5rem] rounded-2xl border border-border bg-transparent ${className}`.trim()}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={className}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: WIDGET_HTML }}
    />
  );
}
