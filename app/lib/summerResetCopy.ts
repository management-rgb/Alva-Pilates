/**
 * Summer Reset campaign — set `summerResetEnabled` to false after the promotion ends.
 * Review Mindbody service IDs and purchase links before publishing.
 */
export const summerResetEnabled = true;

export const summerResetStartDate = "2026-07-15";
export const summerResetEndDate = "2026-08-15";
export const summerResetDeadlineLabel = "Ends August 15";

export const summerResetSectionId = "summer-offers";

/** Anchor IDs for hero pricing tiles → offer cards */
export const summerResetOfferAnchors = {
  unlimitedIntro: "summer-offer-unlimited",
  threeClassIntro: "summer-offer-intro",
  classPackSale: "summer-offer-packs",
} as const;

export const summerResetCopy = {
  announcement: {
    line: "Summer Reset • New Client Intro Offers • 20% Off Class Packs • Ends August 15",
    cta: "View Offers",
  },
  hero: {
    eyebrow: "Limited-Time Summer Event",
    headline: "Your Summer Reset Starts at Alva",
    body: "Experience luxury reformer Pilates with exclusive introductory offers and limited-time savings on class packs.",
    primaryCta: "Claim Your Offer",
    secondaryCta: "View Schedule",
  },
  offers: {
    heading: "Summer Reset Offers",
    subheading:
      "Start your Pilates routine or return to the reformer with exclusive summer pricing.",
  },
  introCredit: {
    eyebrow: "Love Your Intro?",
    heading: "Become a Member and Get Your Intro Purchase Credited Back",
    body: "When you become an Alva member, we'll apply 100% of the amount you paid for your qualifying New Client Intro Offer toward your first membership payment.",
    disclaimer:
      "Valid for clients who purchase the 3-Class Intro or 15-Day Unlimited Intro and enroll in an eligible recurring membership within 15 days after their Intro Offer expires. Intro credit cannot exceed the first membership payment, has no cash value, and cannot be combined with another membership promotion.",
    cta: "Explore Memberships",
  },
  memberPerks: {
    heading: "Summer Perks for Alva Members",
    body: "Current Alva members can enjoy exclusive summer benefits while introducing friends to the studio.",
    perks: [
      "Two complimentary guest passes",
      "Complimentary Alva grip socks",
      "Complimentary Pilates assessment",
    ],
    disclaimer:
      "Available once per active member during the promotional period. Guest passes are for first-time local guests and are subject to class availability. Additional restrictions may apply.",
    cta: "Ask the Front Desk",
  },
  finalCta: {
    heading: "Move Better. Feel Stronger. Start This Summer.",
    body: "Small classes, expert instructors, and a premium reformer Pilates experience in Valencia.",
    primaryCta: "Claim Your Summer Offer",
    secondaryCta: "View Schedule",
  },
  terms: {
    heading: "Summer Offer Terms",
    items: [
      "Offers valid July 15 through August 15.",
      "Intro offers are available to first-time Alva Pilates clients only.",
      "Intro offers are limited to one per client.",
      "15-Day Unlimited Intro permits a maximum of one class per day.",
      "Advance reservations are required.",
      "Standard cancellation and no-show policies apply.",
      "Class packs are non-transferable.",
      "Class pack expiration periods remain unchanged unless otherwise stated.",
      "Intro purchase credit applies only toward an eligible recurring membership.",
      "Membership must be purchased within 15 days after the Intro Offer expires.",
      "Promotional purchases are final sale unless otherwise required by law.",
      "Offers cannot be combined with other discounts.",
      "Alva Pilates may modify or discontinue the campaign where legally permitted.",
    ],
  },
} as const;

export const summerResetOfferCards = {
  unlimitedIntro: {
    badge: "Best Value",
    title: "15-Day Unlimited Intro",
    price: "$99",
    description: "Enjoy one reformer class per day for 15 consecutive days.",
    details: [
      "First-time clients only",
      "One class per day",
      "Activates on the date of the first booked class",
      "Non-transferable",
      "Excludes private sessions and specialty events",
    ],
    cta: "Purchase Unlimited Intro",
  },
  threeClassIntro: {
    title: "3-Class Intro",
    price: "$69",
    listPrice: "Regularly $89",
    description: "A flexible introduction to the Alva Pilates experience.",
    details: [
      "First-time clients only",
      "Valid for 30 days",
      "Non-transferable",
    ],
    cta: "Purchase Intro",
  },
  classPackSale: {
    title: "Summer Class Pack Sale",
    mainOffer: "20% OFF",
    packs: [
      { label: "5-Class Pack", listPrice: "$179", salePrice: "$143" },
      { label: "10-Class Pack", listPrice: "$339", salePrice: "$271" },
      { label: "20-Class Pack", listPrice: "$629", salePrice: "$503" },
    ],
    cta: "Shop Class Packs",
  },
} as const;

/**
 * Mindbody healcode pricing-link service IDs.
 */
export const summerResetMindbodyServiceIds = {
  fifteenDayUnlimitedIntro: "100039",
  threeClassIntro: "100003",
  classPacks: "100004",
} as const;

/** Fallback routes when a Mindbody service ID is not yet configured */
export const summerResetPurchaseFallbacks = {
  fifteenDayUnlimitedIntro: "/pricing#get-started",
  threeClassIntro: "/pricing#get-started",
  classPacks: "/pricing#group-packages",
} as const;

export const summerResetSeo = {
  title: "Summer Pilates Offers in Valencia | Alva Pilates",
  description:
    "Explore limited-time summer reformer Pilates offers at Alva Pilates in Valencia, including new-client intro pricing and 20% off class packs.",
} as const;
