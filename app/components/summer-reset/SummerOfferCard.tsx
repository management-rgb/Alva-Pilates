"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SummerPriceDisplay from "./SummerPriceDisplay";
import OfferDetailList from "./OfferDetailList";
import IntroOfferCreditNote from "../IntroOfferCreditNote";

type SummerOfferCardProps = {
  badge?: string;
  title: string;
  price: string;
  listPrice?: string;
  description: string;
  details?: readonly string[];
  cta: string;
  featured?: boolean;
  compact?: boolean;
  showIntroCredit?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  overlay: React.ReactNode;
  ariaLabel: string;
  priceSize?: "md" | "lg" | "xl";
};

export default function SummerOfferCard({
  badge,
  title,
  price,
  listPrice,
  description,
  details,
  cta,
  featured = false,
  compact = false,
  showIntroCredit = false,
  imageSrc,
  imageAlt,
  overlay,
  ariaLabel,
  priceSize = "lg",
}: SummerOfferCardProps) {
  const showImage = Boolean(imageSrc) && !compact;

  return (
    <div
      className={`relative overflow-hidden bg-white/95 backdrop-blur border shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 h-full pricing-card-full-buy cursor-pointer ${
        compact ? "rounded-2xl" : "rounded-3xl"
      } ${
        featured
          ? "border-primary/25 shadow-primary/5"
          : "border-foreground/10"
      }`}
      aria-label={ariaLabel}
    >
      <div
        className={`absolute inset-x-0 top-0 ${
          compact ? "h-0.5" : "h-1"
        } ${featured ? "bg-primary" : "bg-primary/20"}`}
      />
      <div
        className={`relative z-0 flex flex-col h-full pointer-events-none select-none ${
          showImage ? "lg:flex-row" : ""
        }`}
      >
        <div
          className={`flex flex-col flex-1 min-h-0 ${
            compact
              ? "gap-3 p-4 sm:p-5"
              : "gap-4 sm:gap-5 p-6 sm:p-8"
          } ${showImage ? "lg:max-w-[58%]" : ""}`}
        >
          {badge && (
            <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-[0.18em] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              {badge}
            </span>
          )}
          <div className={compact ? "space-y-1.5" : "space-y-2"}>
            <h3
              className={`font-heading font-semibold text-charcoal leading-tight ${
                compact
                  ? "text-xl sm:text-2xl"
                  : featured
                    ? "text-2xl sm:text-3xl lg:text-4xl"
                    : "text-2xl sm:text-3xl"
              }`}
            >
              {title}
            </h3>
            <SummerPriceDisplay
              price={price}
              listPrice={listPrice}
              size={compact ? "md" : featured ? "xl" : priceSize}
            />
            <p
              className={`font-paragraph text-charcoal/75 leading-relaxed ${
                compact ? "text-sm" : "text-sm sm:text-base"
              }`}
            >
              {description}
            </p>
          </div>
          {details && details.length > 0 && (
            <OfferDetailList items={details} compact={compact} />
          )}
          {showIntroCredit && <IntroOfferCreditNote />}
          <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-1 inline-flex items-center gap-1">
            {cta}
            <ArrowRight size={14} aria-hidden />
          </p>
        </div>
        {showImage && (
          <div className="relative hidden lg:block lg:w-[42%] min-h-[220px] m-4 ml-0 rounded-2xl overflow-hidden">
            <Image
              src={imageSrc!}
              alt={imageAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 0vw, 28vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
        {overlay}
      </div>
    </div>
  );
}
