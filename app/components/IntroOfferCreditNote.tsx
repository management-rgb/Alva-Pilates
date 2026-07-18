import { summerResetCopy } from "../lib/summerResetCopy";

export default function IntroOfferCreditNote({
  className = "text-muted/80",
}: {
  className?: string;
}) {
  return (
    <p className={`text-xs leading-relaxed ${className}`}>
      {summerResetCopy.introCredit.heading}
    </p>
  );
}
