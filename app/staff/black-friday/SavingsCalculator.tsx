"use client";

import { useState } from "react";
import CopyButton from "../membership-guide/CopyButton";
import {
  TERMS,
  TIER_IDS,
  clientExplanation,
  compare,
  intros,
  offerFor,
  usd,
  type IntroChoice,
  type TierId,
} from "./bfStaffData";
import type { BlackFridayTerm } from "../../lib/blackFridayCampaign";

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" } as const;

const TIER_LABEL: Record<TierId, string> = { core: "Core", elite: "Elite", unlimited: "Unlimited" };
const INTRO_OPTIONS: { value: IntroChoice; label: string }[] = [
  { value: "intro69", label: "$69 Intro" },
  { value: "intro99", label: "$99 Intro" },
  { value: "none", label: "No Intro Credit" },
];

function Segmented<T extends string | number>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bf-muted)]">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bf-burgundy)] ${
                on
                  ? "border-[var(--bf-burgundy)] bg-[var(--bf-burgundy)] text-white"
                  : "border-[var(--bf-line)] bg-white text-[var(--bf-ink)] hover:bg-[var(--bf-stone)]"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Stat({ label, value, note, strong }: { label: string; value: string; note?: string; strong?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--bf-line)] bg-white px-4 py-3">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--bf-muted)]">{label}</dt>
      <dd className={`mt-1 tabular-nums ${strong ? "text-2xl font-semibold text-[var(--bf-burgundy)]" : "text-xl font-semibold"}`}>
        {value}
      </dd>
      {note ? <p className="mt-0.5 text-xs text-[var(--bf-muted)]">{note}</p> : null}
    </div>
  );
}

export default function SavingsCalculator() {
  const [tier, setTier] = useState<TierId>("core");
  const [term, setTerm] = useState<BlackFridayTerm>(12);
  const [intro, setIntro] = useState<IntroChoice>("intro99");

  const offer = offerFor(tier, term);
  const c = compare(offer, intro);
  const hasIntro = intro !== "none";
  const introName = hasIntro ? intros[intro].label : "";

  const verdict = !hasIntro
    ? `No Intro Credit: recommend Black Friday. Use code ${offer.code}.`
    : c.winner === "tie"
      ? `It's a tie: both save ${usd(c.bfSavingsCents)}.`
      : c.winner === "blackfriday"
        ? `Black Friday saves ${usd(c.differenceCents)} more.`
        : `${introName} Credit saves ${usd(c.differenceCents)} more.`;

  return (
    <div className="rounded-2xl border border-[var(--bf-burgundy)]/30 bg-white p-5 shadow-[0_1px_0_rgba(109,38,57,0.06)] sm:p-7">
      <div className="grid gap-5 md:grid-cols-3">
        <Segmented
          legend="1 · Membership"
          value={tier}
          onChange={setTier}
          options={TIER_IDS.map((t) => ({ value: t, label: TIER_LABEL[t] }))}
        />
        <Segmented
          legend="2 · Commitment"
          value={term}
          onChange={setTerm}
          options={TERMS.map((t) => ({ value: t, label: `${t} months` }))}
        />
        <Segmented legend="3 · Client eligibility" value={intro} onChange={setIntro} options={INTRO_OPTIONS} />
      </div>

      <div
        className="mt-6 rounded-xl bg-[var(--bf-burgundy)] px-5 py-4 text-white"
        role="status"
        aria-live="polite"
        data-testid="verdict"
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/75">Recommendation</p>
        <p className="mt-1 text-2xl leading-snug" style={serif}>
          {verdict}
        </p>
        <p className="mt-1 text-sm text-white/85">
          Compared on total savings across the discounted payments, not just the first month.
        </p>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Regular monthly price" value={usd(offer.regularCents)} />
        <Stat label="Black Friday monthly price" value={usd(offer.promoCents)} note={`${usd(offer.savingsPerPaymentCents)} off each discounted payment`} />
        <Stat label="Discounted payments" value={String(offer.discountedPayments)} note={`Then ${usd(offer.regularCents)}/mo`} />
        <Stat label="Total Black Friday savings" value={usd(c.bfSavingsCents)} strong />
        <Stat
          label="Intro Credit savings"
          value={hasIntro ? usd(c.introSavingsCents) : "—"}
          note={hasIntro ? "First payment only" : "No credit selected"}
          strong={hasIntro}
        />
        <Stat label="Promo code to apply" value={hasIntro && c.winner === "intro" ? "None" : offer.code} note={hasIntro && c.winner === "intro" ? "Apply the Intro Credit instead" : undefined} />
      </dl>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Stat label="First payment · Black Friday" value={usd(c.bfFirstPaymentCents)} />
        <Stat
          label="First payment · Intro Credit"
          value={hasIntro ? usd(c.introFirstPaymentCents) : "—"}
          note={hasIntro ? "Later payments are the regular rate" : undefined}
        />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-[var(--bf-muted)]">
        Both options carry the same standard membership commitment and the same regular monthly rate once the
        discount or credit has been used. The promotions can&apos;t be combined without management approval.
      </p>

      <div className="mt-5 rounded-xl border border-[var(--bf-line)] bg-[var(--bf-ivory)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bf-muted)]">Client explanation</p>
          <CopyButton text={clientExplanation(c)} label="Copy Client Explanation" />
        </div>
        <p className="mt-2 text-base leading-relaxed">{clientExplanation(c)}</p>
      </div>
    </div>
  );
}
