import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class Schedule & Booking",
  description:
    "View the Alva Pilates class schedule and reserve your spot in an upcoming reformer Pilates class in Valencia, CA.",
  alternates: { canonical: "/book" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
