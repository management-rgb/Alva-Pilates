import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Studio",
  description:
    "Meet Alva Pilates, a boutique reformer studio in Valencia built around expert instruction, intentional movement, and a welcoming community.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
