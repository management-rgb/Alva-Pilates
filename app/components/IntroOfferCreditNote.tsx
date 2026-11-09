import { summerResetCopy } from "../lib/summerResetCopy";

export default function IntroOfferCreditNote({
  className = "text-muted/80",
}: {
  className?: string;
}) {
  return (
    <div className="space-y-1">
      <p className={`text-xs leading-relaxed ${className}`}>
        {summerResetCopy.introCredit.heading}
      </p>
      <p
        className="text-xs font-semibold leading-relaxed"
        style={{ color: "#c0392b" }}
      >
        Credit is valid for 14 days after your intro expires
      </p>
    </div>
  );
}
