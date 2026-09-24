export type GroupClassOption = {
  title: string;
  price: string;
  /** Optional struck-through price (unused for standard catalog) */
  listPrice?: string;
  validity: string;
  note: string;
  details?: readonly string[];
  badge?: string;
};

export const standardGroupClassOptions: GroupClassOption[] = [
  {
    title: "Single Class",
    price: "$39",
    validity: "—",
    note: "Join any reformer class · All levels welcome.",
  },
  {
    title: "3-Class Intro",
    price: "$69",
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

export function getPackOffersForPricing(): GroupClassOption[] {
  return standardGroupClassOptions.filter((item) =>
    item.title.includes("Pack")
  );
}
