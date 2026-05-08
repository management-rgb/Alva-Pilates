/**
 * Mother's Day sale — set `mothersDaySaleEnabled` to false after the promotion ends.
 * Pricing page and home promo read from this module.
 * Align Mindbody / Healcode pricing with these display prices when running a sale.
 */
export const mothersDaySaleEnabled = true;

export const mothersDaySaleExpiresLine =
  "Offer ends May 10 — prices return to regular rates after that date.";

export type GroupClassOption = {
  title: string;
  price: string;
  /** Regular price, shown struck through during a sale */
  listPrice?: string;
  validity: string;
  note: string;
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

const mothersDayGroupClassOptions: GroupClassOption[] = [
  {
    title: "Single Class",
    listPrice: "$39",
    price: "$25",
    validity: "—",
    note: "Join any reformer class · All Levels welcome.",
  },
  {
    title: "New Client Intro Offer",
    listPrice: "$89",
    price: "$69 (3 Classes)",
    validity: "30 days",
    note: "One-time offer for first-time clients.",
  },
  {
    title: "5-Class Pack",
    listPrice: "$179",
    price: "$150",
    validity: "2 months",
    note: "$30 per class · non-member rate · 15% off sale price.",
  },
  {
    title: "10-Class Pack",
    listPrice: "$339",
    price: "$288",
    validity: "3 months",
    note: "$28.80 per class · non-member rate · 15% off sale price.",
  },
  {
    title: "20-Class Pack",
    listPrice: "$629",
    price: "$534",
    validity: "4 months",
    note: "$26.70 per class · non-member rate · 15% off sale price.",
  },
];

export function getGroupClassOptions(): GroupClassOption[] {
  return mothersDaySaleEnabled
    ? mothersDayGroupClassOptions
    : standardGroupClassOptions;
}

export const mothersDayDealSummary = [
  { label: "Drop-in", was: "$39", now: "$25" },
  { label: "New client intro · 3 classes", was: "$89", now: "$69" },
  { label: "5-class pack", was: "$179", now: "$150" },
  { label: "10-class pack", was: "$339", now: "$288" },
  { label: "20-class pack", was: "$629", now: "$534" },
] as const;
