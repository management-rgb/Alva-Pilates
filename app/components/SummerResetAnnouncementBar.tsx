"use client";

import SummerOffersLink from "./SummerOffersLink";
import {
  summerResetCopy,
  summerResetDeadlineLabel,
  summerResetEnabled,
} from "../lib/summerResetCopy";

export default function SummerResetAnnouncementBar() {
  if (!summerResetEnabled) return null;

  return (
    <div className="border-t border-border/60 bg-secondary/80">
      <div className="mx-auto flex max-w-[120rem] flex-col items-center justify-center gap-1 px-6 py-2.5 text-center sm:flex-row sm:gap-3 sm:py-3 lg:px-12">
        <p className="text-[0.6875rem] tracking-[0.04em] text-muted sm:text-[0.8125rem]">
          {summerResetCopy.announcement.line}
          <span className="mx-2 text-border" aria-hidden>
            ·
          </span>
          {summerResetDeadlineLabel}
        </p>
        <SummerOffersLink
          aria-label={`${summerResetCopy.announcement.cta} — Summer Reset offers`}
          className="text-[0.6875rem] font-medium tracking-[0.06em] text-foreground/80 transition-colors duration-300 hover:text-primary sm:text-[0.8125rem]"
        >
          {summerResetCopy.announcement.cta}
        </SummerOffersLink>
      </div>
    </div>
  );
}
