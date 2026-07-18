"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounterProps = {
  end: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export function AnimatedCounter({
  end,
  suffix = "",
  durationMs,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const hasAnimated = useRef(false);

  const duration = durationMs ?? 600;
  const ticks = useMemo(
    () => Array.from({ length: end + 1 }, (_, i) => i),
    [end]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || finished) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          window.setTimeout(() => setActive(true), 180);
          observer.unobserve(element);
        }
      },
      { threshold: 0.45, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [finished]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!active || !strip) return;

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "transform") return;
      setFinished(true);
    };

    strip.addEventListener("transitionend", onEnd);
    // Fallback if transitionend is missed
    const fallback = window.setTimeout(() => setFinished(true), duration + 120);

    return () => {
      strip.removeEventListener("transitionend", onEnd);
      window.clearTimeout(fallback);
    };
  }, [active, duration]);

  if (finished) {
    return (
      <span className={`inline-flex items-baseline ${className}`}>
        {end}
        {suffix}
      </span>
    );
  }

  // Percentage of the strip height — lands exactly on the final tick
  const offsetPercent = (end / (end + 1)) * 100;

  return (
    <span
      ref={ref}
      className={`counter-reel inline-flex items-baseline ${className}`}
      aria-label={`${end}${suffix}`}
    >
      <span className="counter-reel-window" aria-hidden>
        <span
          ref={stripRef}
          className="counter-reel-strip"
          style={{
            transform: active
              ? `translate3d(0, -${offsetPercent}%, 0)`
              : "translate3d(0, 0, 0)",
            transitionDuration: active ? `${duration}ms` : "0ms",
          }}
        >
          {ticks.map((n) => (
            <span key={n} className="counter-reel-tick">
              {n}
            </span>
          ))}
        </span>
      </span>
      {suffix ? <span className="counter-reel-suffix">{suffix}</span> : null}
    </span>
  );
}
