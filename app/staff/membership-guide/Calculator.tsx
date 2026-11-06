"use client";

import { useMemo, useState } from "react";
import { compare, commitmentTotal, money, planOptions } from "./pricingMath";
import type { CompareOption, Plan } from "./types";

type Props = {
  plans: Plan[];
  presets: { label: string; from: string; to: string }[];
  whyUpgrade: Record<string, string[]>;
};

const BOOKING_RANK = { standard: 0, priority: 1, early: 2 } as const;
const BOOKING_LABEL = { standard: "standard booking", priority: "priority booking", early: "early booking access" } as const;

function describe(opt: CompareOption) {
  const classes = opt.plan.classesPerMonth === null ? "up to 1 class/day" : `${opt.plan.classesPerMonth} classes`;
  return `${opt.plan.name} · ${opt.term}-month · ${money(opt.price)}/mo · ${classes}`;
}

export default function Calculator({ plans, presets, whyUpgrade }: Props) {
  const options = useMemo(() => planOptions(plans), [plans]);
  const byKey = (k: string) => options.find((o) => o.key === k)!;

  const [aKey, setAKey] = useState(presets[0]?.from ?? options[0].key);
  const [bKey, setBKey] = useState(presets[0]?.to ?? options[1].key);
  const [attended, setAttended] = useState<number | null>(null);

  const a = byKey(aKey);
  const b = byKey(bKey);
  const c = compare(a, b, attended);
  const aUnl = a.plan.classesPerMonth === null;
  const bUnl = b.plan.classesPerMonth === null;
  const same = a.key === b.key;

  const perClassLabel = (opt: CompareOption, value: number) =>
    `${money(value)}${opt.plan.classesPerMonth === null && attended === null ? " (as low as, at 1/day)" : ""}`;

  /* ---- plain-language summary, only claiming what the numbers support ---- */
  const lines: string[] = [];
  if (!same) {
    const abs = money(Math.abs(c.priceDiff));
    if (c.priceDiff > 0) lines.push(`${b.plan.name} costs ${abs} more per month than ${a.plan.name}.`);
    else if (c.priceDiff < 0) lines.push(`${b.plan.name} has a ${abs} lower monthly payment than ${a.plan.name}.`);
    else lines.push("The monthly payments are the same.");

    if (c.classDiff !== null) {
      if (c.classDiff > 0 && c.priceDiff > 0 && c.perAdditionalClass !== null) {
        lines.push(
          `That adds ${c.classDiff} classes a month — effectively ${money(c.perAdditionalClass)} per additional class.`
        );
      } else if (c.classDiff < 0) {
        lines.push(`${b.plan.name} includes ${Math.abs(c.classDiff)} fewer classes per month.`);
      } else if (c.classDiff === 0) {
        lines.push("Both include the same number of classes.");
      }
    } else if (bUnl && !aUnl) {
      lines.push(`${b.plan.name} has no fixed class allowance (up to 1 class/day) for ${money(c.priceDiff)} more per month.`);
    } else if (aUnl && !bUnl) {
      lines.push(`${b.plan.name} includes ${b.plan.classesPerMonth} classes a month instead of up to 1 class/day.`);
    }

    if (attended === null && !aUnl && !bUnl) {
      if (c.perClassVerdict === "lower")
        lines.push(`When every class is used, ${b.plan.name} has the lower cost per class (${money(c.bPerClass)} vs ${money(c.aPerClass)}).`);
      else if (c.perClassVerdict === "higher")
        lines.push(`When every class is used, ${b.plan.name} has a higher cost per class (${money(c.bPerClass)} vs ${money(c.aPerClass)}).`);
    } else if (attended !== null) {
      if (c.perClassVerdict === "lower")
        lines.push(`At ${attended} classes a month, ${b.plan.name} works out to ${money(c.bPerClass)} per class vs ${money(c.aPerClass)}.`);
      else if (c.perClassVerdict === "higher")
        lines.push(`At ${attended} classes a month, ${b.plan.name} works out to ${money(c.bPerClass)} per class — higher than ${money(c.aPerClass)}.`);
    }

    if (c.breakEven !== null && c.priceDiff > 0) {
      lines.push(
        `${b.plan.name}'s cost per class drops below ${a.plan.name}'s full-use rate once the client attends about ${c.breakEven}+ classes a month.`
      );
    }
    if (c.priceDiff > 0 && c.perClassVerdict === "higher" && attended !== null) {
      lines.push("At this attendance the higher plan doesn't save money per class — recommend the plan that matches real usage.");
    }
  }

  /* ---- perk differences (only upgrades) ---- */
  const perkDiffs: string[] = [];
  if (!same) {
    const ap = a.plan;
    const bp = b.plan;
    if (bp.privatesDiscount > ap.privatesDiscount) perkDiffs.push(`${bp.privatesDiscount}% off privates (vs ${ap.privatesDiscount}%)`);
    if (bp.packsRetailDiscount > ap.packsRetailDiscount) perkDiffs.push(`${bp.packsRetailDiscount}% off packs & retail (vs ${ap.packsRetailDiscount}%)`);
    if (BOOKING_RANK[bp.booking] > BOOKING_RANK[ap.booking]) perkDiffs.push(BOOKING_LABEL[bp.booking]);
    if (bp.waitlistPriority && !ap.waitlistPriority) perkDiffs.push("priority on the waitlist");
    if (bp.guestPassesPerMonth > ap.guestPassesPerMonth) perkDiffs.push(`${bp.guestPassesPerMonth} guest pass per month`);
  }
  const advantages = !same && b.plan.id !== a.plan.id && c.priceDiff >= 0 ? whyUpgrade[b.plan.id] ?? [] : [];

  const rows: [string, string, string][] = [
    ["Monthly payment", money(a.price), money(b.price)],
    ["Classes per month", aUnl ? "Up to 1/day" : String(a.plan.classesPerMonth), bUnl ? "Up to 1/day" : String(b.plan.classesPerMonth)],
    [
      attended === null ? "Effective price per class" : `Price per class at ${attended}/mo`,
      perClassLabel(a, c.aPerClass),
      perClassLabel(b, c.bPerClass),
    ],
    ["Minimum commitment", `${a.term} months`, `${b.term} months`],
    ["Billed over the commitment", `${money(commitmentTotal(a))} (monthly)`, `${money(commitmentTotal(b))} (monthly)`],
  ];

  const select = (id: string, label: string, value: string, set: (v: string) => void) => (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sg-muted)]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="mt-1.5 h-12 w-full rounded-xl border border-[var(--sg-line)] bg-white px-3 text-sm text-[var(--sg-ink)]"
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {describe(o)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[var(--sg-line)] bg-white p-5 sm:p-7">
      <p className="text-sm font-semibold text-[var(--sg-ink)]">Quick comparisons</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {presets.map((p) => {
          const on = p.from === aKey && p.to === bKey;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setAKey(p.from);
                setBKey(p.to);
              }}
              aria-pressed={on}
              className={`h-10 rounded-full border px-4 text-sm transition-colors ${
                on
                  ? "border-[var(--sg-ink)] bg-[var(--sg-primary)] font-semibold text-[var(--sg-ink)]"
                  : "border-[var(--sg-line)] bg-[var(--sg-ivory)] text-[var(--sg-ink)] hover:bg-[var(--sg-secondary)]"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {select("calc-a", "Current plan (A)", aKey, setAKey)}
        {select("calc-b", "Compare to (B)", bKey, setBKey)}
      </div>

      <div className="mt-5">
        <label htmlFor="calc-attend" className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sg-muted)]">
          Classes the client will actually attend per month
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            id="calc-attend"
            type="range"
            min={1}
            max={30}
            value={attended ?? 12}
            onChange={(e) => setAttended(Number(e.target.value))}
            className="h-2 w-full accent-[#8a7d6b]"
            aria-valuetext={attended === null ? "Full use of every class" : `${attended} classes per month`}
          />
          <span className="w-24 shrink-0 text-right text-sm font-medium text-[var(--sg-ink)]">
            {attended === null ? "Full use" : `${attended} / month`}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-[var(--sg-muted)]">
          <span>Moves per-class pricing from “every class used” to real attendance.</span>
          {attended !== null ? (
            <button type="button" onClick={() => setAttended(null)} className="font-semibold text-[var(--sg-ink)] underline">
              Reset to full use
            </button>
          ) : null}
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--sg-line)]">
        <table className="w-full min-w-[30rem] text-left text-sm">
          <caption className="sr-only">Plan A compared with plan B</caption>
          <thead className="bg-[var(--sg-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--sg-muted)]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">&nbsp;</th>
              <th scope="col" className="px-4 py-3 font-semibold">A · {a.plan.name}</th>
              <th scope="col" className="px-4 py-3 font-semibold">B · {b.plan.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, av, bv]) => (
              <tr key={label} className="border-t border-[var(--sg-line)]">
                <th scope="row" className="px-4 py-3 font-medium text-[var(--sg-muted)]">{label}</th>
                <td className="px-4 py-3 text-[var(--sg-ink)]">{av}</td>
                <td className="px-4 py-3 font-semibold text-[var(--sg-ink)]">{bv}</td>
              </tr>
            ))}
            <tr className="border-t border-[var(--sg-line)] bg-[var(--sg-ivory)]">
              <th scope="row" className="px-4 py-3 font-medium text-[var(--sg-muted)]">Monthly price difference</th>
              <td colSpan={2} className="px-4 py-3 font-semibold text-[var(--sg-ink)]">
                {same
                  ? "Same plan selected"
                  : c.priceDiff === 0
                  ? "No difference"
                  : `${c.priceDiff > 0 ? "+" : "−"}${money(Math.abs(c.priceDiff))} per month (B vs A)`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[var(--sg-muted)]">
        Always billed monthly, never upfront. Unlimited per-class pricing assumes up to 1 class per day (30-day month) — real cost per class depends on attendance.
      </p>

      <div className="mt-5 rounded-xl bg-[var(--sg-ivory)] p-4 sm:p-5" aria-live="polite">
        <h4 className="text-sm font-semibold text-[var(--sg-ink)]">What this means</h4>
        {same ? (
          <p className="mt-2 text-sm text-[var(--sg-muted)]">Choose two different plans to compare.</p>
        ) : (
          <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed text-[var(--sg-ink)]">
            {lines.map((l) => (
              <li key={l}>• {l}</li>
            ))}
          </ul>
        )}

        {advantages.length || perkDiffs.length ? (
          <div className="mt-4 border-t border-[var(--sg-line)] pt-4">
            <h4 className="text-sm font-semibold text-[var(--sg-ink)]">Main advantages of choosing {b.plan.name}</h4>
            <ul className="mt-2 space-y-1.5 text-[0.95rem] text-[var(--sg-ink)]">
              {advantages.map((x) => (
                <li key={x}>• {x}</li>
              ))}
              {perkDiffs.length ? <li>• Member perks: {perkDiffs.join("; ")}</li> : null}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
