import type { CompareOption, Plan, Term } from "./types";

/** Unlimited allows 1 class/day, so its lowest possible per-class rate uses a 30-day month. */
export const UNLIMITED_MAX_CLASSES = 30;

export const TERMS: Term[] = [3, 6, 12];

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function money(n: number): string {
  const r = round2(n);
  const formatted = r.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(r) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
}

export function classCap(plan: Plan): number {
  return plan.classesPerMonth ?? UNLIMITED_MAX_CLASSES;
}

/** Classes actually used given attendance (null = full use). */
export function classesUsed(plan: Plan, attended: number | null): number {
  const cap = classCap(plan);
  return attended === null ? cap : Math.max(1, Math.min(attended, cap));
}

export function perClass(price: number, plan: Plan, attended: number | null = null): number {
  return price / classesUsed(plan, attended);
}

export function planOptions(plans: Plan[]): CompareOption[] {
  const out: CompareOption[] = [];
  for (const plan of plans) {
    for (const term of TERMS) {
      const price = plan.prices[term];
      if (price !== undefined) out.push({ key: `${plan.id}-${term}`, plan, term, price });
    }
  }
  return out;
}

/** Total commitment value (monthly price × months) — billed monthly, never upfront. */
export function commitmentTotal(opt: { price: number; term: Term }): number {
  return opt.price * opt.term;
}

/** Savings of choosing a longer commitment over a shorter one of the same plan. */
export function termSavings(plan: Plan, shorter: Term, longer: Term) {
  const a = plan.prices[shorter];
  const b = plan.prices[longer];
  if (a === undefined || b === undefined) return null;
  return { perMonth: a - b, perYear: (a - b) * 12 };
}

export type Comparison = {
  priceDiff: number; // B - A per month
  classDiff: number | null; // capped plans only; null when either is Unlimited
  perAdditionalClass: number | null;
  aPerClass: number;
  bPerClass: number;
  aClasses: number;
  bClasses: number;
  /** Classes/month at which B's per-class cost drops to A's full-use per-class */
  breakEven: number | null;
  perClassVerdict: "lower" | "higher" | "equal";
};

export function compare(a: CompareOption, b: CompareOption, attended: number | null = null): Comparison {
  const aClasses = classesUsed(a.plan, attended);
  const bClasses = classesUsed(b.plan, attended);
  const aPer = a.price / aClasses;
  const bPer = b.price / bClasses;
  const bothCapped = a.plan.classesPerMonth !== null && b.plan.classesPerMonth !== null;
  const classDiff = bothCapped ? b.plan.classesPerMonth! - a.plan.classesPerMonth! : null;
  const priceDiff = b.price - a.price;

  const perAdditionalClass = classDiff !== null && classDiff > 0 ? priceDiff / classDiff : null;

  // B needs n classes to match A's full-use per-class: b.price / n = a.price / aCap
  const aFull = a.price / classCap(a.plan);
  const needed = b.price / aFull;
  const breakEven =
    classCap(b.plan) > classCap(a.plan) && priceDiff > 0 ? Math.ceil(needed - 1e-9) : null;

  const diff = round2(bPer) - round2(aPer);
  return {
    priceDiff,
    classDiff,
    perAdditionalClass,
    aPerClass: aPer,
    bPerClass: bPer,
    aClasses,
    bClasses,
    breakEven,
    perClassVerdict: diff < 0 ? "lower" : diff > 0 ? "higher" : "equal",
  };
}
