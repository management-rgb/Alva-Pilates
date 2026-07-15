import { summerResetDeadlineLabel } from "../../lib/summerResetCopy";

export default function SummerDeadlineBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-primary ${className}`}
    >
      {summerResetDeadlineLabel}
    </span>
  );
}
