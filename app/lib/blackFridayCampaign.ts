/**
 * Black Friday 2026 campaign — single source of truth for dates, prices, codes and copy.
 *
 * Display logic: the campaign shows when `blackFridayEnabled` is true AND the current
 * time is inside [start, end]. Set `blackFridayEnabled = false` to pull it early, or
 * change the two timestamps to extend/shift it. After the end the site falls back to
 * the regular homepage and the plain Mindbody pricing widget automatically.
 *
 * Membership regular prices and Mindbody contract IDs come from `membershipPricing.ts`
 * (never duplicated here). Class-pack IDs are the existing Mindbody pricing-link IDs.
 * This file never changes anything in Mindbody; discounts are applied there by promo code.
 */

import { membershipTiers } from "./membershipPricing";
import { getPackOffersForPricing } from "./groupClassPricing";
import { studio, STUDIO_SMS_HREF } from "./site";

export const blackFridayEnabled = true;

/** Nov 17, 2026 00:00 PST (UTC-8) */
export const blackFridayStartsAt = "2026-11-17T00:00:00-08:00";
/** Nov 30, 2026 11:59:59 PM PST (UTC-8) */
export const blackFridayEndsAt = "2026-11-30T23:59:59-08:00";
export const BLACK_FRIDAY_TIMEZONE = "America/Los_Angeles";

export function isBlackFridayActive(now: number = Date.now()): boolean {
  return (
    blackFridayEnabled &&
    now >= Date.parse(blackFridayStartsAt) &&
    now <= Date.parse(blackFridayEndsAt)
  );
}

export const blackFridayIds = {
  membershipsSection: "black-friday-memberships",
  packsSection: "black-friday-class-packs",
} as const;

export const blackFridayLinks = {
  memberships: `/pricing#${blackFridayIds.membershipsSection}`,
  packs: `/pricing#${blackFridayIds.packsSection}`,
} as const;

export const PHONE_DISPLAY = "(661) 977-7898";
export const PHONE_TEL_HREF = `tel:${studio.telephone.replace(/[^+\d]/g, "")}`;
export { STUDIO_SMS_HREF };

export const blackFridayCopy = {
  announcement: "BLACK FRIDAY IS HERE · 20% OFF MEMBERSHIPS & CLASS PACKS · ENDS NOV 30",
  hero: {
    eyebrow: "ALVA PILATES · BLACK FRIDAY 2026",
    headline: "Black Friday, The Alva Way.",
    body: "A little extra love for your movement routine.",
    offerLabel: "OFF",
    offerLead: "Your first membership payments.",
    offerLines: [
      "6-month memberships · First 2 payments",
      "12-month memberships · First 3 payments",
    ],
    tiers: "Core, Elite & Unlimited",
    packsNote: "Plus, 20% off class packs & gift cards.",
    merchNote: "And 30% off all merchandise.",
    primaryCta: "Explore Black Friday Offers",
    secondaryCta: "View Class Packs",
  },
  memberships: {
    heading: "Your Next Chapter Starts Here.",
    body: "Enjoy a little extra love for your movement routine with 20% off your first membership payments.",
    resume: "Regular monthly billing resumes after the promotional payments.",
    cta: "Claim This Offer",
  },
  packs: {
    heading: "Your Practice, Your Pace.",
    body: "Not ready for a membership? Enjoy 20% off class packs and move whenever it feels right.",
  },
  redeem:
    "Copy your code, then enter it in the promo code field at checkout. Your discount will show in your cart before you pay.",
  help: "Need help claiming your offer? Text or call us.",
  terms:
    "Offer valid November 17–30, 2026, on eligible new Core, Elite, and Unlimited membership purchases. Discount applies to the first 2 payments of a 6-month membership or first 3 payments of a 12-month membership. Regular monthly billing resumes thereafter. Membership commitment and studio policies apply. Cannot be combined with other offers.",
  packTerms:
    "20% off eligible 5-, 10-, and 20-class pack purchases made November 17–30, 2026. Pack expiration periods are unchanged. Cannot be combined with other offers.",
} as const;

const DISCOUNT_PERCENT = 20;

/** Integer-cent math so every promotional price is exact. */
const discountedPrice = (regular: number) =>
  (regular * 100 * (100 - DISCOUNT_PERCENT)) / 100 / 100;

export const formatUsd = (n: number): string =>
  Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;

export type BlackFridayTerm = 6 | 12;

export type BlackFridayMembershipOffer = {
  id: string;
  name: string;
  classesLabel: string;
  term: BlackFridayTerm;
  regularMonthly: number;
  promoMonthly: number;
  promoPayments: 2 | 3;
  code: string;
  /** Mindbody contract (membership) ID for the existing checkout */
  contractId: string;
};

export const blackFridayTerms: Record<
  BlackFridayTerm,
  { code: string; promoPayments: 2 | 3; tabLabel: string }
> = {
  6: { code: "FEELGOOD6", promoPayments: 2, tabLabel: "6-Month Membership" },
  12: { code: "FEELGOOD12", promoPayments: 3, tabLabel: "12-Month Membership" },
};

function buildMembershipOffers(term: BlackFridayTerm): BlackFridayMembershipOffer[] {
  return (["core", "elite", "unlimited"] as const).map((tierId) => {
    const tier = membershipTiers.find((t) => t.id === tierId);
    const commitment = tier?.commitments.find((c) => c.months === term);
    if (!tier || !commitment?.serviceId) {
      throw new Error(`Black Friday: missing ${tierId} ${term}-month Mindbody contract`);
    }
    return {
      id: commitment.id,
      name: tier.name,
      classesLabel:
        tier.classesPerMonth === null ? "Unlimited classes" : `${tier.classesPerMonth} classes / month`,
      term,
      regularMonthly: commitment.monthlyPrice,
      promoMonthly: discountedPrice(commitment.monthlyPrice),
      promoPayments: blackFridayTerms[term].promoPayments,
      code: blackFridayTerms[term].code,
      contractId: commitment.serviceId,
    };
  });
}

export const blackFridayMemberships: Record<BlackFridayTerm, BlackFridayMembershipOffer[]> = {
  6: buildMembershipOffers(6),
  12: buildMembershipOffers(12),
};

export const BLACK_FRIDAY_PACK_CODE = "PACK20";

export type BlackFridayPackOffer = {
  id: string;
  name: string;
  classes: number;
  regular: number;
  promo: number;
  perClass: number;
  expires: string;
  code: string;
  /** Existing Mindbody pricing-link ID for this pack */
  pricingId: string;
  cta: string;
  featured?: boolean;
};

const PACKS = [
  { classes: 5, regular: 179, pricingId: "100004" },
  { classes: 10, regular: 339, pricingId: "100005", featured: true },
  { classes: 20, regular: 629, pricingId: "100006" },
] as const;

export const blackFridayPacks: BlackFridayPackOffer[] = PACKS.map((p) => {
  const name = `${p.classes}-Class Pack`;
  // Expiry comes from the existing catalog (e.g. "2 months") so it can't drift.
  const validity = getPackOffersForPricing().find((o) => o.title === name)?.validity ?? "";
  const promo = discountedPrice(p.regular);
  return {
    id: `pack-${p.classes}`,
    name,
    classes: p.classes,
    regular: p.regular,
    promo,
    perClass: Math.round((promo / p.classes) * 100) / 100,
    expires: validity,
    code: BLACK_FRIDAY_PACK_CODE,
    pricingId: p.pricingId,
    cta: `Get ${p.classes} Classes`,
    featured: "featured" in p ? p.featured : false,
  };
});
