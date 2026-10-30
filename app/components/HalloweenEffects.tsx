"use client";

import { useEffect, useId, useSyncExternalStore } from "react";

/** Oct 24 – Nov 1 (inclusive). Month index 9 = October, 10 = November. */
function inWindow(d: Date) {
  const m = d.getMonth();
  const day = d.getDate();
  return (m === 9 && day >= 24) || (m === 10 && day <= 1);
}

const subscribe = () => () => {};

const LEAF_PATH = "M12 2C7 6 4 11 6 17c1.5 3 4 4.5 6 5 2-.5 4.5-2 6-5 2-6-1-11-6-15z";
const PUMPKIN = (
  <>
    <ellipse cx="12" cy="14" rx="9" ry="7.5" fill="#e8772e" />
    <path d="M12 6.5c-2 2-2 13 0 15M7 8c-2.5 3-2.5 10 0 13M17 8c2.5 3 2.5 10 0 13" stroke="#b9531a" strokeWidth="1" fill="none" />
    <path d="M12 6.5c0-2 .5-3 2-4" stroke="#5c7a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
  </>
);

const ITEMS = [
  { left: 6, delay: 0, dur: 16, size: 22, kind: "leaf", color: "#c9692b" },
  { left: 15, delay: 5, dur: 19, size: 26, kind: "pumpkin" },
  { left: 27, delay: 2, dur: 17, size: 20, kind: "leaf", color: "#d9a03c" },
  { left: 38, delay: 9, dur: 21, size: 22, kind: "leaf", color: "#a64b22" },
  { left: 50, delay: 4, dur: 18, size: 24, kind: "pumpkin" },
  { left: 61, delay: 11, dur: 20, size: 20, kind: "leaf", color: "#c9692b" },
  { left: 72, delay: 1, dur: 17, size: 22, kind: "leaf", color: "#d9a03c" },
  { left: 83, delay: 7, dur: 22, size: 26, kind: "pumpkin" },
  { left: 92, delay: 3, dur: 19, size: 20, kind: "leaf", color: "#a64b22" },
] as const;

const WEB_ANGLES = [180, 202.5, 225, 247.5, 270].map((a) => (a * Math.PI) / 180);
const webPoint = (r: number, a: number) =>
  `${(100 + r * Math.cos(a)).toFixed(1)} ${(-r * Math.sin(a)).toFixed(1)}`;

/**
 * Corner cobweb with a small spider bobbing on its thread. Sits in the top-right
 * of a `relative` parent; `radius` is that parent's corner radius in px so the
 * web follows the rounded corner.
 */
export function HalloweenSpider({ radius = 8 }: { radius?: number }) {
  const clipId = useId();
  const r = (radius * 100) / 80;
  const active = useSyncExternalStore(
    subscribe,
    () => inWindow(new Date()),
    () => false,
  );
  if (!active) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width="80"
      height="80"
      className="pointer-events-none absolute right-0 top-0 overflow-visible"
      aria-hidden
    >
      <clipPath id={clipId}>
        <path d={`M0 0 H${100 - r} Q100 0 100 ${r} V100 H0 Z`} />
      </clipPath>
      <g clipPath={`url(#${clipId})`} stroke="rgba(70,58,46,0.45)" strokeWidth="0.8" fill="none" strokeLinecap="round">
        {WEB_ANGLES.map((a, i) => (
          <path key={i} d={`M100 0 L${webPoint(100, a)}`} />
        ))}
        {[30, 55, 80].map((r) => (
          <path
            key={r}
            d={`M${webPoint(r, WEB_ANGLES[0])} ${WEB_ANGLES.slice(1)
              .map((a) => `Q${webPoint(r * 0.82, a + 0.1964)} ${webPoint(r, a)}`)
              .join(" ")}`}
          />
        ))}
      </g>
      <line
        className="halloween-thread"
        x1="72"
        y1="0"
        x2="72"
        y2="40"
        stroke="rgba(70,58,46,0.55)"
        strokeWidth="0.8"
      />
      <g className="halloween-spider">
        <g transform="translate(72 40)" stroke="#2a2420" strokeWidth="1" strokeLinecap="round" fill="none">
          <path d="M-3 -1 L-8 -5 L-11 1 M-3 0 L-9 1 L-11 6 M3 -1 L8 -5 L11 1 M3 0 L9 1 L11 6" />
          <path d="M-2 2 L-6 7 L-9 9 M2 2 L6 7 L9 9" />
          <circle cx="0" cy="-3" r="2.4" fill="#2a2420" />
          <ellipse cx="0" cy="2.5" rx="3.6" ry="4.4" fill="#2a2420" />
          <circle cx="-0.9" cy="-3.4" r="0.6" fill="#e8772e" stroke="none" />
          <circle cx="0.9" cy="-3.4" r="0.6" fill="#e8772e" stroke="none" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Halloween: drifting autumn leaves and tiny pumpkins, plus a glow on the intro
 * CTA. Shown only in the date window above, checked in the browser, so it
 * switches itself off without a redeploy.
 */
export default function HalloweenEffects() {
  const active = useSyncExternalStore(
    subscribe,
    () => inWindow(new Date()),
    () => false,
  );

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("halloween");
    return () => document.documentElement.classList.remove("halloween");
  }, [active]);

  if (!active) return null;

  return (
    <div className="halloween-layer" aria-hidden>
      {ITEMS.map((it, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={it.size * 1.7}
          height={it.size * 1.7}
          className="halloween-fall"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.dur}s`,
            animationDelay: `-${it.delay}s`,
          }}
        >
          {it.kind === "leaf" ? <path d={LEAF_PATH} fill={it.color} /> : PUMPKIN}
        </svg>
      ))}
    </div>
  );
}
