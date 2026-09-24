export const foundingMemberCopy = {
  badge: "Membership",
  headlineLead: "Continue your",
  headlineAccent: "practice.",
  description:
    "Choose a rhythm that fits your week, from four classes a month through unlimited access. Memberships from $119 per month.",
  ctaClaim: "Explore Memberships",
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
    serviceId: "106",
    featured: true,
  },
] as const;
