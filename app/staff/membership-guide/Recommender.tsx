"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import { commitmentTotal, money, perClass, termSavings, TERMS } from "./pricingMath";
import type { Plan, PlanId } from "./types";

type Freq = "once" | "twice" | "three" | "four";

type Rec = { label: string; planId: PlanId; alsoPlanId?: PlanId; reason: string; script: string };
type Group = {
  id: string;
  label: string;
  options: { id: string; label: string; note: string }[];
};

type Props = {
  plans: Plan[];
  recommendations: Record<Freq, Rec>;
  considerations: Group[];
  benefits: Record<string, string[]>;
};

const ORDER: Freq[] = ["once", "twice", "three", "four"];

export default function Recommender({ plans, recommendations, considerations, benefits }: Props) {
  const [freq, setFreq] = useState<Freq | null>(null);
  const [picked, setPicked] = useState<Record<string, string | undefined>>({});

  const byId = (id: PlanId) => plans.find((p) => p.id === id)!;
  const rec = freq ? recommendations[freq] : null;
  const plan = rec ? byId(rec.planId) : null;
  const also = rec?.alsoPlanId ? byId(rec.alsoPlanId) : null;
  const planBenefits = plan ? benefits[plan.id] : undefined;

  const notes = considerations.flatMap((g) => {
    const opt = g.options.find((o) => o.id === picked[g.id]);
    return opt ? [{ group: g.label, label: opt.label, note: opt.note }] : [];
  });

  return (
    <div className="rounded-2xl border border-[var(--sg-line)] bg-white p-5 sm:p-7">
      <fieldset>
        <legend className="text-base font-semibold text-[var(--sg-ink)] sm:text-lg">
          How many times per week would the client ideally like to attend?
        </legend>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {ORDER.map((key) => (
            <label key={key} className="cursor-pointer">
              <input
                type="radio"
                name="freq"
                value={key}
                checked={freq === key}
                onChange={() => setFreq(key)}
                className="peer sr-only"
              />
              <span className="flex min-h-14 items-center justify-center rounded-xl border border-[var(--sg-line)] bg-[var(--sg-ivory)] px-3 text-center text-sm font-medium text-[var(--sg-ink)] transition-colors peer-checked:border-[var(--sg-ink)] peer-checked:bg-[var(--sg-primary)] peer-checked:font-semibold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--sg-ink)]">
                {recommendations[key].label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {considerations.length > 0 ? (
      <div className="mt-6 border-t border-[var(--sg-line)] pt-5">
        <p className="text-sm font-semibold text-[var(--sg-ink)]">
          Optional: factor in the client&apos;s situation
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {considerations.map((g) => (
            <div key={g.id}>
              <label
                htmlFor={`cons-${g.id}`}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sg-muted)]"
              >
                {g.label}
              </label>
              <select
                id={`cons-${g.id}`}
                value={picked[g.id] ?? ""}
                onChange={(e) => setPicked((p) => ({ ...p, [g.id]: e.target.value || undefined }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--sg-line)] bg-white px-3 text-sm text-[var(--sg-ink)]"
              >
                <option value="">Not discussed</option>
                {g.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      ) : null}

      <div aria-live="polite" className="mt-6">
        {!rec || !plan ? (
          <p className="rounded-xl bg-[var(--sg-ivory)] px-4 py-5 text-sm text-[var(--sg-muted)]">
            Choose an attendance frequency to see the recommendation, pricing and a suggested script.
          </p>
        ) : (
          <div className="rounded-2xl bg-[var(--sg-ivory)] p-5 sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--sg-muted)]">
              Recommended
            </p>
            <h3
              className="mt-1 text-3xl text-[var(--sg-ink)]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {freq === "once"
                ? "Core — build toward twice a week"
                : `${plan.name} — ${plan.classesPerMonth ?? "up to 1 class/day"}${
                    plan.classesPerMonth ? " classes/month" : ""
                  }`}
            </h3>
            <p className="mt-1 text-sm text-[var(--sg-muted)]">{plan.positioning}</p>

            <h4 className="mt-5 text-sm font-semibold text-[var(--sg-ink)]">Why this recommendation</h4>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--sg-ink)]">{rec.reason}</p>

            <h4 className="mt-5 text-sm font-semibold text-[var(--sg-ink)]">Monthly price options</h4>
            <PriceOptions plan={plan} />
            <p className="mt-2 text-xs text-[var(--sg-muted)]">
              All memberships are billed monthly, not as a single upfront payment.
            </p>

            {planBenefits ? (
              <>
                <h4 className="mt-5 text-sm font-semibold text-[var(--sg-ink)]">Main benefits</h4>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-[var(--sg-ink)]">
                  {planBenefits.slice(0, 5).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--sg-ink)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-5 rounded-xl border-l-4 border-[var(--sg-primary)] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-[var(--sg-ink)]">Suggested script</h4>
                <CopyButton text={rec.script} />
              </div>
              <p className="mt-2 text-[0.95rem] italic leading-relaxed text-[var(--sg-ink)]">
                &ldquo;{rec.script}&rdquo;
              </p>
            </div>

            {also ? (
              <p className="mt-4 text-sm text-[var(--sg-muted)]">
                {also.id === "essential" ? (
                  <>
                    <span className="font-semibold text-[var(--sg-ink)]">Fallback only:</span> Essential (
                    {money(also.prices[3]!)}/mo, {also.classesPerMonth} classes) if twice a week isn&apos;t realistic yet.
                    Plan to revisit Core.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-[var(--sg-ink)]">Also consider:</span> {also.name} if the
                    client&apos;s realistic attendance is{" "}
                    {also.id === "elite" ? "closer to three times a week" : "four or more times a week"}.
                  </>
                )}
              </p>
            ) : null}

            {notes.length ? (
              <div className="mt-5 border-t border-[var(--sg-line)] pt-4">
                <h4 className="text-sm font-semibold text-[var(--sg-ink)]">Based on the client&apos;s situation</h4>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--sg-ink)]">
                  {notes.map((n) => (
                    <li key={n.group + n.label}>
                      <span className="font-semibold">{n.label}:</span> {n.note}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function PriceOptions({ plan }: { plan: Plan }) {
  const terms = TERMS.filter((t) => plan.prices[t] !== undefined);
  return (
    <ul className="mt-2 grid gap-2 sm:grid-cols-3">
      {terms.map((t) => {
        const price = plan.prices[t]!;
        const longer = terms.filter((x) => x > t).pop();
        const savings = longer ? termSavings(plan, t, longer) : null;
        return (
          <li key={t} className="rounded-xl border border-[var(--sg-line)] bg-white px-3.5 py-3">
            <p className="text-xl font-semibold text-[var(--sg-ink)]">
              {money(price)}
              <span className="text-xs font-normal text-[var(--sg-muted)]"> /month</span>
            </p>
            <p className="text-xs text-[var(--sg-muted)]">
              {t}-month minimum · {money(perClass(price, plan))}
              {plan.classesPerMonth === null ? "/class at 1 a day" : "/class"}
            </p>
            <p className="mt-0.5 text-xs text-[var(--sg-muted)]">
              Billed monthly · {money(commitmentTotal({ price, term: t }))} over {t} months
            </p>
            {savings && savings.perMonth > 0 ? (
              <p className="mt-1 text-xs font-medium text-[var(--sg-ink)]">
                {longer}-month rate saves {money(savings.perMonth)}/mo
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
