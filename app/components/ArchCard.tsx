import type { ReactNode } from "react";

type ArchCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  /** Full-card buy overlay (Healcode / fallback link) */
  overlay?: ReactNode;
  /** When true, body content ignores pointer events so overlay receives clicks */
  interactive?: boolean;
};

/**
 * Rectangular pricing panel (arch decorative cap retired).
 * Healcode overlay pattern preserved for full-card purchase clicks.
 */
export default function ArchCard({
  children,
  className = "",
  featured = false,
  overlay = null,
  interactive = false,
}: ArchCardProps) {
  return (
    <div
      className={`price-card group ${
        interactive ? "pricing-card-full-buy cursor-pointer" : ""
      } ${featured ? "price-card--featured" : ""} ${className}`.trim()}
    >
      <div
        className={`price-card__body ${
          interactive ? "pointer-events-none select-none" : ""
        }`}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}
