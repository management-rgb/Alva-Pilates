export const foundingMemberCopy = {
  /** Sitewide header strip — small caps label above promo line */
  headerFoundingEyebrow: "Founding membership",
  barLine: "Founding member rates — limited spots.",
  barCta: "Learn more",
  eyebrow: "Founding member pricing — limited time",
  badge: "Limited Time Offer",
  headlineLead: "Become a",
  headlineAccent: "Founding Member",
  description:
    "Join us as a founding member and secure exclusive pricing for life. Experience premium Pilates instruction at an exceptional value before our grand opening rates expire.",
  ctaClaim: "Claim Founding Rate",
  /** Home hero secondary CTA (pricing page) */
  viewAllMemberships: "View All memberships",
  pricingStripTitle: "Founding member offer",
  pricingStripBody:
    "Lock in exclusive founding rates on our top tiers while spots last. Standard memberships and packs are below.",
} as const;

/** Mindbody contract-link service IDs — same products as standard Elite / Unlimited; update if you add separate founding contracts. */
export const foundingMemberOfferCards = [
  {
    title: "Founding Member — Elite",
    /** Standard membership list price (shown struck through) */
    listPrice: "$289/mo",
    /** Founding member rate */
    price: "$269/mo",
    classes: "12 classes / month",
    benefits: "15% off privates + 1 guest pass / month.",
    serviceId: "108",
    featured: false,
  },
  {
    title: "Founding Member — Unlimited",
    listPrice: "$399/mo",
    price: "$349/mo",
    classes: "Unlimited (1/day)",
    benefits:
      "20% off privates + 1 guest pass / month + early booking access.",
    serviceId: "106",
    featured: true,
  },
] as const;
