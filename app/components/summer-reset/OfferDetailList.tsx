import { Check } from "lucide-react";

export default function OfferDetailList({
  items,
  compact = false,
}: {
  items: readonly string[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-1.5" : "space-y-2"}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2 text-charcoal/75 ${
            compact ? "text-xs sm:text-sm" : "text-sm"
          }`}
        >
          <Check
            size={compact ? 14 : 16}
            className="text-primary mt-0.5 shrink-0"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
