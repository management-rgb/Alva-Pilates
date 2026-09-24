/**
 * Membership tiers for the pricing page.
 * Default = longest term (best monthly rate). Fill serviceId / purchaseUrl per option.
 */

export type MembershipCommitment = {
  id: string;
  months: 3 | 6 | 12;
  monthlyPrice: number;
  /** Term caption under the price, e.g. "12-month commitment" */
  commitmentLabel: string;
  /** Mindbody healcode contract-link service ID */
  serviceId?: string;
  /** Fallback purchase URL when no service ID is configured */
  purchaseUrl: string;
};

/** Structured perks — drive both the card bullets and the comparison table. */
export type MembershipPerks = {
  /** % off additional class packs & retail */
  packsRetailDiscount?: number;
  /** % off private training */
  privatesDiscount?: number;
  guestPassesPerMonth?: number;
  booking?: "priority" | "early";
  waitlistPriority?: boolean;
};

export type MembershipTier = {
  id: string;
  name: string;
  frequency: string;
  /** Included classes per month; null = unlimited */
  classesPerMonth: number | null;
  description: string;
  perks: MembershipPerks;
  ctaLabel: string;
  /** Standard monthly rate, shown struck through beside the member rate */
  regularPrice?: number;
  /** Soft warm tint — marks Elite and Unlimited as the elevated tiers */
  tint?: boolean;
  /** Card badge, e.g. "Most Popular" */
  badge?: string;
  /** Commitments sorted longest-first for display */
  commitments: MembershipCommitment[];
};

export const membershipTiers: MembershipTier[] = [
  {
    id: "essential",
    name: "Essential",
    frequency: "4 Classes / Month",
    classesPerMonth: 4,
    description: "A steady, once-a-week rhythm.",
    ctaLabel: "Join Essential",
    perks: { packsRetailDiscount: 5 },
    commitments: [
      {
        id: "essential-6",
        months: 6,
        monthlyPrice: 119,
        commitmentLabel: "6-month commitment",
        serviceId: "111",
        purchaseUrl: "",
      },
    ],
  },
  {
    id: "core",
    name: "Core",
    frequency: "8 Classes / Month",
    classesPerMonth: 8,
    description: "A consistent, twice-weekly practice.",
    ctaLabel: "Join Core",
    perks: { packsRetailDiscount: 10, privatesDiscount: 10, booking: "priority" },
    commitments: [
      {
        id: "core-12",
        months: 12,
        monthlyPrice: 199,
        commitmentLabel: "12-month commitment",
        serviceId: "116",
        purchaseUrl: "",
      },
      {
        id: "core-6",
        months: 6,
        monthlyPrice: 209,
        commitmentLabel: "6-month commitment",
        serviceId: "115",
        purchaseUrl: "",
      },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    frequency: "12 Classes / Month",
    classesPerMonth: 12,
    description: "A committed, three-times-a-week practice.",
    ctaLabel: "Join Elite",
    regularPrice: 289,
    badge: "Most Popular",
    tint: true,
    perks: {
      packsRetailDiscount: 15,
      privatesDiscount: 15,
      guestPassesPerMonth: 1,
      booking: "early",
      waitlistPriority: true,
    },
    commitments: [
      {
        id: "elite-12",
        months: 12,
        monthlyPrice: 249,
        commitmentLabel: "12-month commitment",
        serviceId: "114",
        purchaseUrl: "",
      },
      {
        id: "elite-6",
        months: 6,
        monthlyPrice: 269,
        commitmentLabel: "6-month commitment",
        serviceId: "108",
        purchaseUrl: "",
      },
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    frequency: "Unlimited Classes",
    classesPerMonth: null,
    description: "Practice as often as you'd like.",
    ctaLabel: "Join Unlimited",
    regularPrice: 399,
    badge: "Best Value",
    tint: true,
    perks: {
      packsRetailDiscount: 20,
      privatesDiscount: 20,
      guestPassesPerMonth: 1,
      booking: "early",
      waitlistPriority: true,
    },
    commitments: [
      {
        id: "unlimited-12",
        months: 12,
        monthlyPrice: 329,
        commitmentLabel: "12-month commitment",
        serviceId: "113",
        purchaseUrl: "",
      },
      {
        id: "unlimited-6",
        months: 6,
        monthlyPrice: 349,
        commitmentLabel: "6-month commitment",
        serviceId: "106",
        purchaseUrl: "",
      },
    ],
  },
];

/** Longest commitment = best monthly rate; used as the default selection. */
export function getDefaultCommitment(
  tier: MembershipTier
): MembershipCommitment {
  return tier.commitments.reduce((best, option) =>
    option.months > best.months ? option : best
  );
}

export function formatMonthlyPrice(amount: number): string {
  return `$${amount}`;
}

export function formatCommitmentTerm(months: number): string {
  return `${months} Months`;
}

/** Unlimited allows 1 class per day — its lowest possible per-class rate uses a 30-day month. */
export const UNLIMITED_MAX_CLASSES_PER_MONTH = 30;

export function formatPerClassPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? `$${rounded}` : `$${rounded.toFixed(2)}`;
}

/** Per-class price for a commitment (Unlimited: lowest rate, at 1 class a day). */
export function getPerClassPrice(
  tier: MembershipTier,
  commitment: MembershipCommitment
): number {
  const classes = tier.classesPerMonth ?? UNLIMITED_MAX_CLASSES_PER_MONTH;
  return commitment.monthlyPrice / classes;
}

/** Card bullets, in display order. Sentence case, no trailing periods. */
export function getTierBenefits(tier: MembershipTier): string[] {
  const { perks } = tier;
  const benefits: string[] = [];
  if (
    perks.packsRetailDiscount &&
    perks.packsRetailDiscount === perks.privatesDiscount
  ) {
    benefits.push(`${perks.privatesDiscount}% off privates, packs & retail`);
  } else {
    if (perks.packsRetailDiscount) {
      benefits.push(`${perks.packsRetailDiscount}% off additional packs & retail`);
    }
    if (perks.privatesDiscount) {
      benefits.push(`${perks.privatesDiscount}% off privates`);
    }
  }
  if (perks.guestPassesPerMonth) {
    benefits.push(
      `${perks.guestPassesPerMonth} guest pass${
        perks.guestPassesPerMonth > 1 ? "es" : ""
      } / month`
    );
  }
  if (perks.booking === "priority") benefits.push("Priority booking");
  if (perks.booking === "early") benefits.push("Early booking access");
  if (perks.waitlistPriority) benefits.push("Priority on the waitlist");
  return benefits;
}
