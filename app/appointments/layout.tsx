import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Pilates Sessions",
  description:
    "Book a private one-on-one reformer Pilates session with an Alva instructor in Valencia, CA.",
  alternates: { canonical: "/appointments" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
