import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Teach or work at Alva Pilates in Valencia, CA. We're looking for passionate reformer instructors and studio staff. Apply online.",
  alternates: { canonical: "/join-the-team" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
