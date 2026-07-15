"use client";

import SummerDeadlineBadge from "./summer-reset/SummerDeadlineBadge";
import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetCopy,
  summerResetEnabled,
} from "../lib/summerResetCopy";

function MarqueeSegment({
  duplicate = false,
}: {
  duplicate?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 sm:gap-3 shrink-0 mr-5 sm:mr-7"
      aria-hidden={duplicate ? true : undefined}
    >
      <span className="font-paragraph text-[10px] sm:text-sm text-white/90 font-medium whitespace-nowrap">
        {summerResetCopy.announcement.line}
      </span>
      <SummerOffersLink
        tabIndex={duplicate ? -1 : undefined}
        aria-label={`${summerResetCopy.announcement.cta} — Summer Reset offers`}
        className="font-paragraph text-[10px] sm:text-sm text-primary font-semibold underline-offset-[3px] decoration-2 decoration-primary/90 hover:decoration-white hover:text-white underline whitespace-nowrap shrink-0 transition-colors duration-200"
      >
        {summerResetCopy.announcement.cta}
      </SummerOffersLink>
      <SummerDeadlineBadge className="!text-[9px] sm:!text-[10px] !py-0.5 shrink-0 border-white/20 bg-white/5 text-white/90" />
    </span>
  );
}

export default function SummerResetAnnouncementBar() {
  if (!summerResetEnabled) return null;

  return (
    <div className="w-full mt-2 lg:mt-2.5 border-t border-primary/30 bg-charcoal/95">
      <div className="w-full min-h-0 overflow-hidden py-2 sm:py-2.5 pl-3 sm:pl-5 pr-3 sm:pr-5">
        <span className="sr-only">
          {summerResetCopy.announcement.line}. {summerResetCopy.announcement.cta}.
          Ends August 15.
        </span>

        <div className="announcement-marquee-track">
          <MarqueeSegment />
          <MarqueeSegment duplicate />
          <MarqueeSegment duplicate />
        </div>
      </div>
    </div>
  );
}
