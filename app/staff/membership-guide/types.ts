export type Term = 3 | 6 | 12;

export type PlanId = "essential" | "core" | "elite" | "unlimited";

export type Plan = {
  id: PlanId;
  name: string;
  /** Included classes per month; null = no fixed allowance (up to 1 class/day) */
  classesPerMonth: number | null;
  /** Monthly price by minimum commitment (months). Missing key = not offered. */
  prices: Partial<Record<Term, number>>;
  /** Comparison-only plans don't get a full section or recommendation card. */
  comparisonOnly?: boolean;
  positioning: string;
  weeklyLabel: string;
  guestPassesPerMonth: number;
  /** % off privates / packs & retail */
  privatesDiscount: number;
  packsRetailDiscount: number;
  booking: "standard" | "priority" | "early";
  waitlistPriority: boolean;
};

export type CompareOption = {
  key: string; // e.g. "core-6"
  plan: Plan;
  term: Term;
  price: number;
};
