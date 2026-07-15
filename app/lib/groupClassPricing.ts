import {
  summerResetEnabled,
  summerResetOfferCards,
} from "./summerResetCopy";

export type GroupClassOption = {
  title: string;
  price: string;
  /** Regular price, shown struck through during a sale */
  listPrice?: string;
  validity: string;
  note: string;
  /** Optional bullet details for summer intro cards */
  details?: readonly string[];
  badge?: string;
};

export const standardGroupClassOptions: GroupClassOption[] = [
  {
    title: "Single Class",
    price: "$39",
    validity: "—",
    note: "Join any reformer class · All Levels welcome.",
  },
  {
    title: "New Client Intro Offer",
    price: "$89 (3 Classes)",
    validity: "30 days",
    note: "One-time offer for first-time clients.",
  },
  {
    title: "5-Class Pack",
    price: "$179",
    validity: "2 months",
    note: "$35.80 per class · non-member rate.",
  },
  {
    title: "10-Class Pack",
    price: "$339",
    validity: "3 months",
    note: "$33.90 per class · non-member rate.",
  },
  {
    title: "20-Class Pack",
    price: "$629",
    validity: "4 months",
    note: "$31.45 per class · non-member rate.",
  },
];

const summerIntroOffers: GroupClassOption[] = [
  {
    title: summerResetOfferCards.unlimitedIntro.title,
    badge: summerResetOfferCards.unlimitedIntro.badge,
    price: summerResetOfferCards.unlimitedIntro.price,
    validity: "15 days",
    note: summerResetOfferCards.unlimitedIntro.description,
    details: summerResetOfferCards.unlimitedIntro.details,
  },
  {
    title: summerResetOfferCards.threeClassIntro.title,
    price: summerResetOfferCards.threeClassIntro.price,
    listPrice: "$89",
    validity: "30 days",
    note: summerResetOfferCards.threeClassIntro.description,
    details: summerResetOfferCards.threeClassIntro.details,
  },
  {
    title: "Single Class",
    price: "$39",
    validity: "—",
    note: "Join any reformer class · All Levels welcome.",
  },
];

const summerPackOffers: GroupClassOption[] = [
  {
    title: "5-Class Pack",
    listPrice: "$179",
    price: "$143",
    validity: "2 months",
    note: "$28.60 per class · non-member rate · Summer Reset 20% off.",
    details: [
      "Valid for 2 months from purchase",
      "Non-transferable",
      "Advance reservations required",
      "Standard cancellation policy applies",
    ],
  },
  {
    title: "10-Class Pack",
    listPrice: "$339",
    price: "$271",
    validity: "3 months",
    note: "$27.10 per class · non-member rate · Summer Reset 20% off.",
    details: [
      "Valid for 3 months from purchase",
      "Non-transferable",
      "Advance reservations required",
      "Standard cancellation policy applies",
    ],
  },
  {
    title: "20-Class Pack",
    listPrice: "$629",
    price: "$503",
    validity: "4 months",
    note: "$25.15 per class · non-member rate · Summer Reset 20% off.",
    details: [
      "Valid for 4 months from purchase",
      "Best per-class value",
      "Non-transferable",
      "Advance reservations required",
      "Standard cancellation policy applies",
    ],
  },
];

/** @deprecated use getGroupClassOptions() */
export const groupClassOptions = standardGroupClassOptions;

export function getGroupClassOptions(): GroupClassOption[] {
  if (!summerResetEnabled) return standardGroupClassOptions;
  return [...summerIntroOffers, ...summerPackOffers];
}

export function getIntroOffersForPricing(): GroupClassOption[] {
  if (!summerResetEnabled) {
    return standardGroupClassOptions.filter((item) =>
      ["Single Class", "New Client Intro Offer"].includes(item.title)
    );
  }
  return summerIntroOffers;
}

export function getPackOffersForPricing(): GroupClassOption[] {
  if (!summerResetEnabled) {
    return standardGroupClassOptions.filter((item) =>
      item.title.includes("Pack")
    );
  }
  return summerPackOffers;
}
