"use client";

import Link from "next/link";
import {
  summerResetCopy,
  summerResetEnabled,
  summerResetSectionId,
} from "../lib/summerResetCopy";

export default function SummerResetAnnouncementBar() {
  if (!summerResetEnabled) return null;

  return (
    <div
      className="promo-ticker"
      role="region"
      aria-label="Summer Reset offers"
    >
      <Link
        href={`/pricing#${summerResetSectionId}`}
        className="promo-ticker__static focus:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-inset"
      >
        <span className="promo-ticker__static-line">
          {summerResetCopy.announcement.line}
        </span>
        <span className="promo-ticker__static-cta" aria-hidden="true">
          ·
        </span>
        <span className="promo-ticker__static-cta">
          {summerResetCopy.announcement.cta}
        </span>
      </Link>
    </div>
  );
}
