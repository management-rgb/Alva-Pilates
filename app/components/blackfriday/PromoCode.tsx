"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Promo code chip with a one-tap copy. Falls back to a hidden-textarea copy on old browsers. */
export default function PromoCode({ code, tone = "light" }: { code: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more to try; the code is visible on screen */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`bf-code ${tone === "dark" ? "bf-code--dark" : ""}`}
      aria-label={`Copy promo code ${code}`}
    >
      <span className="bf-code__label">Code</span>
      <span className="bf-code__value">{code}</span>
      <span className="bf-code__action" aria-live="polite">
        {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </span>
    </button>
  );
}
