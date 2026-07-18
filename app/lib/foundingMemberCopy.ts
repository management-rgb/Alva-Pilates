export const foundingMemberCopy = {
  /** Sitewide header strip — small caps label above promo line */
  headerFoundingEyebrow: "Member rates",
  barLine: "Studio membership rates — limited spots.",
  barCta: "Learn more",
  eyebrow: "Member rates — limited time",
  badge: "Member rates",
  headlineLead: "Become a",
  headlineAccent: "Studio Member",
  description:
    "Join Alva and lock in membership pricing while limited spots remain. Experience focused reformer instruction at a rate reserved for early members.",
  ctaClaim: "View Memberships",
  /** Home hero secondary CTA (pricing page) */
  viewAllMemberships: "View All memberships",
  pricingStripTitle: "Studio Membership",
  pricingStripBody:
    "Lock in membership pricing and practice with us while limited memberships remain available.",
} as const;

/** Mindbody contract-link service IDs — same products as standard Studio / Unlimited; update if you add separate contracts. */
export const foundingMemberOfferCards = [
  {
    title: "Elite",
    /** Standard membership list price (shown struck through) */
    listPrice: "$289/mo",
    /** Member rate */
    price: "$269/mo",
    classes: "12 classes / month",
    contract: "6-month contract",
    benefits:
      "15% off privates + 1 guest pass / month + early booking access + priority on the waitlist.",
    summerBenefits:
      "15% off privates + 2 guest passes / month during Summer Reset + early booking access + priority on the waitlist.",
    serviceId: "108",
    featured: false,
  },
  {
    title: "Unlimited",
    listPrice: "$399/mo",
    price: "$349/mo",
    classes: "Unlimited — as many classes per day as you like",
    contract: "6-month contract",
    benefits:
      "20% off privates + 1 guest pass / month + early booking access + priority on the waitlist.",
    summerBenefits:
      "20% off privates + 2 guest passes / month during Summer Reset + early booking access + priority on the waitlist.",
    serviceId: "106",
    featured: true,
  },
] as const;
