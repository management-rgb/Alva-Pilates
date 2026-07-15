"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Summer campaign offers live on the pricing page intro section. */
export const SUMMER_OFFERS_HREF = "/pricing#get-started";

type SummerOffersLinkProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  tabIndex?: number;
};

export default function SummerOffersLink({
  children,
  className,
  tabIndex,
  "aria-label": ariaLabel,
}: SummerOffersLinkProps) {
  return (
    <Link
      href={SUMMER_OFFERS_HREF}
      className={className}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {children}
    </Link>
  );
}
