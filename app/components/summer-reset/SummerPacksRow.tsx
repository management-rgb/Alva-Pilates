"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SummerPriceDisplay from "./SummerPriceDisplay";
import { summerResetOfferCards } from "../../lib/summerResetCopy";

type SummerPacksRowProps = {
  overlay?: React.ReactNode;
  ariaLabel?: string;
  interactive?: boolean;
};

export default function SummerPacksRow({
  overlay,
  ariaLabel,
  interactive = true,
}: SummerPacksRowProps) {
  const packs = summerResetOfferCards.classPackSale;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-foreground/10 shadow-md transition-all duration-200 ${
        interactive ? "hover:shadow-xl pricing-card-full-buy cursor-pointer" : ""
      }`}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-primary/30" />
      <div className="relative z-0 pointer-events-none select-none p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <div className="shrink-0 space-y-1">
            <p className="font-paragraph text-sm text-charcoal/70">
              {packs.title}
            </p>
            <p className="font-heading text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              {packs.mainOffer}
            </p>
          </div>

          <ul
            className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            aria-label="Summer class pack pricing"
          >
            {packs.packs.map((pack) => (
              <li
                key={pack.label}
                className="flex flex-col sm:items-center sm:text-center gap-1 border-t sm:border-t-0 sm:border-l border-charcoal/10 pt-4 sm:pt-0 sm:pl-6 first:border-0 first:pl-0 first:pt-0"
              >
                <span className="font-paragraph text-sm font-medium text-charcoal">
                  {pack.label}
                </span>
                <SummerPriceDisplay
                  price={pack.salePrice}
                  listPrice={pack.listPrice}
                  size="md"
                  align="left"
                />
              </li>
            ))}
          </ul>

          <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold shrink-0 inline-flex items-center gap-1 lg:self-center">
            {packs.cta}
            <ArrowRight size={14} aria-hidden />
          </p>
        </div>
      </div>
      {interactive && overlay && (
        <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
          {overlay}
        </div>
      )}
    </div>
  );
}

/** Non-interactive packs row for pricing strip (links only) */
export function SummerPacksRowPreview({ href }: { href: string }) {
  const packs = summerResetOfferCards.classPackSale;

  return (
    <Link
      href={href}
      className="block rounded-2xl border border-foreground/10 bg-white/90 p-5 sm:p-6 hover:border-primary/30 hover:shadow-md transition-all lg:col-span-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="font-paragraph text-sm text-charcoal/70">{packs.title}</p>
          <p className="font-heading text-2xl font-bold text-primary">{packs.mainOffer}</p>
        </div>
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {packs.packs.map((pack) => (
            <li key={pack.label} className="flex justify-between sm:flex-col sm:items-start gap-1">
              <span className="text-charcoal/80">{pack.label}</span>
              <span className="tabular-nums">
                <span className="line-through text-charcoal/40 mr-1.5">{pack.listPrice}</span>
                <span className="font-heading font-bold text-charcoal">{pack.salePrice}</span>
              </span>
            </li>
          ))}
        </ul>
        <span className="text-xs text-primary font-semibold uppercase tracking-wide inline-flex items-center gap-1 shrink-0">
          {packs.cta} <ArrowRight size={12} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
