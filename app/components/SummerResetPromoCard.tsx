"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  summerResetCopy,
  summerResetOfferCards,
} from "../lib/summerResetCopy";

export const SUMMER_RESET_LANDING_URL = "https://www.alvapilates.com/offers";

type Props = {
  /** Primary CTA destination */
  ctaHref?: string;
  /** Secondary “Also available” link */
  secondaryHref?: string;
  className?: string;
  /** When true, omit interactive hover affordances (e.g. static MMS capture) */
  staticMode?: boolean;
  /** Optional QR code image URL (data URL or path) shown for MMS / print */
  qrCodeSrc?: string;
  qrCodeHref?: string;
};

/**
 * Homepage Summer Reset promotion card — shared by the hero, the
 * `/offers` landing page, and the MMS image generator.
 *
 * Visual / copy changes here must stay aligned with:
 *   scripts/generate-summer-reset-mms.ts
 *   app/lib/summerResetCopy.ts
 *
 * Regenerate the MMS asset after edits:
 *   npm run generate:mms-card
 */
export default function SummerResetPromoCard({
  ctaHref = "/pricing#summer-reset",
  secondaryHref = "/pricing#class-packs",
  className = "",
  staticMode = false,
  qrCodeSrc,
  qrCodeHref = SUMMER_RESET_LANDING_URL,
}: Props) {
  const unlimited = summerResetOfferCards.unlimitedIntro;
  const hover = !staticMode;

  return (
    <div
      className={`w-full max-w-md rounded-[8px] border border-[rgba(74,64,50,0.16)] bg-[rgba(248,244,238,0.97)] p-8 shadow-[0_18px_48px_-34px_rgba(30,22,14,0.28)] backdrop-blur-[2px] sm:p-9 ${className}`.trim()}
      data-summer-reset-promo-card
    >
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#201f1c]">
        {summerResetCopy.hero.eyebrow}
      </p>
      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-[#6d6c68]">
        Limited through August 15
      </p>

      <div className="mt-9 border-t border-[rgba(74,64,50,0.14)] pt-9">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#6d6c68]">
          15 Days Unlimited
        </p>
        <p className="mt-3 font-heading text-[4.75rem] font-semibold leading-[0.82] tracking-[-0.045em] text-[#201f1c]">
          {unlimited.price}
        </p>
        <p className="mt-4 text-[0.8125rem] leading-[1.7] text-[#6d6c68]">
          One class per day
          <br />
          15 consecutive days
        </p>
      </div>

      {staticMode ? (
        <div className="mt-9 block border-t border-[rgba(74,64,50,0.14)] pt-6">
          <span className="block text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[#8a8880]">
            Also available
          </span>
          <span className="mt-2.5 flex items-center justify-between gap-4">
            <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-[#4a4945]">
              20% Off Class Packs
            </span>
            <ArrowRight
              size={14}
              className="shrink-0 text-[#6d6c68]"
              aria-hidden
            />
          </span>
        </div>
      ) : (
        <Link
          href={secondaryHref}
          className={`group mt-9 block border-t border-[rgba(74,64,50,0.14)] pt-6 transition-[border-color] duration-300 ease-out ${
            hover ? "hover:border-[rgba(74,64,50,0.38)]" : ""
          }`}
        >
          <span className="block text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[#8a8880]">
            Also available
          </span>
          <span className="mt-2.5 flex items-center justify-between gap-4">
            <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-[#4a4945] transition-colors duration-300 group-hover:text-[#201f1c]">
              20% Off Class Packs
            </span>
            <ArrowRight
              size={14}
              className="shrink-0 text-[#6d6c68] transition-[transform,color] duration-300 ease-out group-hover:translate-x-1 group-hover:text-[#201f1c]"
              aria-hidden
            />
          </span>
        </Link>
      )}

      {staticMode ? (
        <div className="mt-9 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--dark)] px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-paper">
          View Summer Offers
          <ArrowRight size={14} aria-hidden />
        </div>
      ) : (
        <Link
          href={ctaHref}
          className="group mt-9 inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--dark)] px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-paper transition-[background-color] duration-300 ease-out hover:bg-[#4a453f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark)] focus-visible:ring-offset-2"
        >
          View Summer Offers
          <ArrowRight
            size={14}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}

      {qrCodeSrc ? (
        <div className="mt-8 flex items-end justify-between gap-4 border-t border-[rgba(74,64,50,0.14)] pt-6">
          <div className="min-w-0">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[#8a8880]">
              Scan to book
            </p>
            <p className="mt-1.5 truncate text-[0.6875rem] leading-snug text-[#6d6c68]">
              alvapilates.com/offers
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrCodeSrc}
            alt={`QR code linking to ${qrCodeHref}`}
            width={72}
            height={72}
            className="h-[72px] w-[72px] shrink-0 rounded-[4px] bg-white p-1"
          />
        </div>
      ) : null}
    </div>
  );
}
