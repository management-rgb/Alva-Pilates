/**
 * Staff Black Friday guide — one pricing data object, every figure computed.
 *
 * Membership prices, promo codes, discounted-payment counts and class-pack prices/expiry
 * come from the same config that drives the public pages, so staff and clients never see
 * different numbers. All arithmetic is done in integer cents to avoid float drift.
 * Nothing here touches Mindbody.
 */

import {
  BLACK_FRIDAY_TIMEZONE,
  blackFridayEndsAt,
  blackFridayMemberships,
  blackFridayPacks,
  blackFridayTerms,
  type BlackFridayTerm,
} from "../../lib/blackFridayCampaign";

export const DISCOUNT_PERCENT = 20;
export const INTRO_REDEMPTION_DAYS = 7;
export const SALE_ENDS_LABEL = "November 30, 2026, 11:59 PM Pacific";
export { BLACK_FRIDAY_TIMEZONE, blackFridayEndsAt };

export type TierId = "core" | "elite" | "unlimited";
export type IntroId = "intro69" | "intro99";
export type IntroChoice = IntroId | "none";

/** True once the advertised sale window has closed (evaluated per request on the server). */
export const isSaleEnded = (now: number = Date.now()) => now > Date.parse(blackFridayEndsAt);

export const TERMS: BlackFridayTerm[] = [6, 12];
export const TIER_IDS: TierId[] = ["core", "elite", "unlimited"];

export const intros: Record<IntroId, { label: string; name: string; creditCents: number }> = {
  intro69: { label: "$69 Intro", name: "3-Class Intro", creditCents: 6900 },
  intro99: { label: "$99 Intro", name: "15-Day Unlimited Intro", creditCents: 9900 },
};

const toCents = (dollars: number) => Math.round(dollars * 100);

/** "$1,234.50" — always two decimals. */
export function usd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100).toLocaleString("en-US");
  return `${sign}$${dollars}.${String(abs % 100).padStart(2, "0")}`;
}

const NUMBER_WORDS: Record<number, string> = { 2: "two", 3: "three" };

export type Offer = {
  tier: TierId;
  name: string;
  classesLabel: string;
  term: BlackFridayTerm;
  code: string;
  regularCents: number;
  promoCents: number;
  savingsPerPaymentCents: number;
  discountedPayments: number;
  paymentsWord: string;
  totalSavingsCents: number;
};

function buildOffer(term: BlackFridayTerm, source: (typeof blackFridayMemberships)[BlackFridayTerm][number]): Offer {
  const regularCents = toCents(source.regularMonthly);
  const savingsPerPaymentCents = Math.round((regularCents * DISCOUNT_PERCENT) / 100);
  const payments = blackFridayTerms[term].promoPayments;
  return {
    tier: source.id.split("-")[0] as TierId,
    name: source.name,
    classesLabel: source.classesLabel,
    term,
    code: blackFridayTerms[term].code,
    regularCents,
    promoCents: regularCents - savingsPerPaymentCents,
    savingsPerPaymentCents,
    discountedPayments: payments,
    paymentsWord: NUMBER_WORDS[payments] ?? String(payments),
    totalSavingsCents: savingsPerPaymentCents * payments,
  };
}

export const offers: Record<BlackFridayTerm, Offer[]> = {
  6: blackFridayMemberships[6].map((o) => buildOffer(6, o)),
  12: blackFridayMemberships[12].map((o) => buildOffer(12, o)),
};

export const offerFor = (tier: TierId, term: BlackFridayTerm): Offer => {
  const found = offers[term].find((o) => o.tier === tier);
  if (!found) throw new Error(`Missing Black Friday offer: ${tier} ${term}`);
  return found;
};

export type Comparison = {
  offer: Offer;
  intro: IntroId | "none";
  introCreditCents: number;
  /** First-payment cost under each promotion (Intro Credit applies to the first payment only). */
  bfFirstPaymentCents: number;
  introFirstPaymentCents: number;
  bfSavingsCents: number;
  introSavingsCents: number;
  winner: "blackfriday" | "intro" | "tie";
  differenceCents: number;
};

export function compare(offer: Offer, intro: IntroChoice): Comparison {
  const introCreditCents = intro === "none" ? 0 : intros[intro].creditCents;
  // The credit can never exceed the first payment (no cash value).
  const introSavingsCents = Math.min(introCreditCents, offer.regularCents);
  const bfSavingsCents = offer.totalSavingsCents;
  const winner =
    bfSavingsCents === introSavingsCents ? "tie" : bfSavingsCents > introSavingsCents ? "blackfriday" : "intro";
  return {
    offer,
    intro,
    introCreditCents,
    bfFirstPaymentCents: offer.promoCents,
    introFirstPaymentCents: offer.regularCents - introSavingsCents,
    bfSavingsCents,
    introSavingsCents,
    winner,
    differenceCents: Math.abs(bfSavingsCents - introSavingsCents),
  };
}

/** The six membership × term comparisons against one Intro Credit, in the order staff read them. */
export function comparisonTable(intro: IntroId): Comparison[] {
  return TERMS.flatMap((term) => TIER_IDS.map((tier) => compare(offerFor(tier, term), intro)));
}

export type PackRow = {
  classes: number;
  regularCents: number;
  saleCents: number;
  savingsCents: number;
  expires: string;
};

export const packRows: PackRow[] = blackFridayPacks.map((p) => {
  const regularCents = toCents(p.regular);
  const savingsCents = Math.round((regularCents * DISCOUNT_PERCENT) / 100);
  return {
    classes: p.classes,
    regularCents,
    saleCents: regularCents - savingsCents,
    savingsCents,
    expires: p.expires,
  };
});

/** Plain-language, client-ready explanation of one comparison. */
export function clientExplanation(c: Comparison): string {
  const { offer } = c;
  const plan = `${offer.name} on a ${offer.term}-month membership`;
  const bf = `${usd(c.bfSavingsCents)} across your first ${offer.paymentsWord} payments`;
  if (c.intro === "none") {
    return `For ${plan}, our Black Friday offer takes 20% off your first ${offer.paymentsWord} monthly payments, saving you ${usd(c.bfSavingsCents)} in total. Just use code ${offer.code} at checkout!`;
  }
  const introLabel = `$${intros[c.intro].creditCents / 100} Intro Credit`;
  if (c.winner === "tie") {
    return `For ${plan}, our Black Friday offer saves you ${bf}, which matches your ${introLabel} exactly. Either option works equally well, so choose whichever you prefer!`;
  }
  if (c.winner === "blackfriday") {
    return `For ${plan}, our Black Friday offer saves you ${bf}, compared with your ${introLabel}. That's an extra ${usd(c.differenceCents)} in savings, so Black Friday is the better deal for you!`;
  }
  return `For ${plan}, your ${introLabel} saves you ${usd(c.introSavingsCents)} on your first payment, compared with ${usd(c.bfSavingsCents)} from Black Friday across your first ${offer.paymentsWord} payments. That's an extra ${usd(c.differenceCents)} in savings, so using your Intro Credit is the better deal for you!`;
}

export const faqs = [
  {
    q: "Can clients combine Intro Credit and Black Friday?",
    a: "No. Promotions cannot normally be combined. Management must approve any exception.",
  },
  {
    q: "Should I automatically apply Intro Credit?",
    a: "No. First verify eligibility and compare the available savings. Apply the promotion the client chooses.",
  },
  {
    q: "Are Black Friday discounts applied for all 6 or 12 months?",
    a: "No. For a 6-month membership, the discount applies to the first two payments. For a 12-month membership, it applies to the first three.",
  },
  {
    q: "Can an existing member get the promotion?",
    a: "Do not promise eligibility automatically. Verify the current sale terms and check with management, especially for upgrades or existing agreements.",
  },
  {
    q: "What if the client's Intro Credit expired?",
    a: "Verify the redemption deadline. Any extension requires management approval.",
  },
  {
    q: "What happens after Black Friday?",
    a: "The promotional codes are valid only during the advertised sale. Do not advertise sale savings as available after the deadline without management authorization.",
  },
] as const;
