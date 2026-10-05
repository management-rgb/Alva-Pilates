import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Visit Alva Pilates at 23840 Copper Hill Drive, Valencia, CA. Studio hours, phone, email, directions, and ample parking.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
