import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing, Memberships & Intro Offers",
  description:
    "Reformer Pilates pricing in Valencia: new-client intro offers, monthly memberships, class packs, and private training at Alva Pilates.",
  alternates: { canonical: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
