import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Everything under /staff is private: never indexed, never cached. */
export const metadata: Metadata = {
  title: { absolute: "Alva Staff" },
  robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true },
};

export default function StaffLayout({ children }: { children: ReactNode }) {
  return children;
}
