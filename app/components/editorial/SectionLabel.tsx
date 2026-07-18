import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
};

export function SectionLabel({
  children,
  className,
  onDark = false,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "eyebrow",
        onDark && "text-[rgba(245,245,242,0.55)]",
        className
      )}
    >
      {children}
    </p>
  );
}
