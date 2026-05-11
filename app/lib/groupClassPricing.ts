export type GroupClassOption = {
  title: string;
  price: string;
  /** Regular price, shown struck through during a sale */
  listPrice?: string;
  validity: string;
  note: string;
};

export const groupClassOptions: GroupClassOption[] = [
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
