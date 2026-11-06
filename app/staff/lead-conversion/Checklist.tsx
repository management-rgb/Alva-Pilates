"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/** Training aid only: ticks live in this browser tab and are never saved or sent to Mindbody. */
export default function Checklist({ items, title }: { items: string[]; title?: string }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const complete = done.size === items.length;

  return (
    <div className="rounded-2xl border border-[var(--sg-line)] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title ?? "Checklist"}</p>
        <p className="text-xs font-medium text-[var(--sg-muted)]" aria-live="polite">
          {complete ? "All done" : `${done.size} of ${items.length}`}
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--sg-secondary)]/60" aria-hidden>
        <div
          className="h-full rounded-full bg-[var(--sg-primary)] transition-[width]"
          style={{ width: `${(done.size / items.length) * 100}%` }}
        />
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((item, i) => {
          const on = done.has(i);
          return (
            <li key={item}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 hover:bg-[var(--sg-ivory)]">
                <input type="checkbox" checked={on} onChange={() => toggle(i)} className="peer sr-only" />
                <span
                  aria-hidden
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--sg-ink)] ${
                    on ? "border-[var(--sg-ink)] bg-[var(--sg-ink)] text-white" : "border-[var(--sg-line)] bg-white"
                  }`}
                >
                  {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                </span>
                <span className={`text-[0.95rem] ${on ? "text-[var(--sg-muted)] line-through" : ""}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {done.size > 0 ? (
        <button
          type="button"
          onClick={() => setDone(new Set())}
          className="mt-2 text-xs font-semibold underline underline-offset-2"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
