import { summerResetCopy } from "../lib/summerResetCopy";

type IntroOfferCreditNoteProps = {
  variant?: "card" | "hero" | "heroDark";
};

export default function IntroOfferCreditNote({
  variant = "card",
}: IntroOfferCreditNoteProps) {
  if (variant === "heroDark") {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/15 px-2.5 py-2">
        <p className="font-paragraph text-[11px] sm:text-xs font-medium text-white/90 leading-snug">
          {summerResetCopy.introCredit.heading}
        </p>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <p className="font-paragraph text-[11px] sm:text-xs text-charcoal/65 leading-snug px-1 py-2 border-t border-charcoal/10">
        {summerResetCopy.introCredit.heading}
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5">
      <p className="font-paragraph text-xs sm:text-sm font-medium text-charcoal leading-snug">
        {summerResetCopy.introCredit.heading}
      </p>
    </div>
  );
}
