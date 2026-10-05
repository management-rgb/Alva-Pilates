import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reformer Pilates Classes in Valencia, CA",
  description:
    "Explore Alva's reformer classes, from beginner-friendly Foundation to Sculpt, Cardio Jump, and Stretch & Flow. Small groups, expert instructors.",
  alternates: { canonical: "/classes" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
