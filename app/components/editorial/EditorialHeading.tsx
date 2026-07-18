import type { ElementType, ReactNode } from "react";
import { cn } from "../../lib/utils";

type EditorialHeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  onDark?: boolean;
};

const sizeClass = {
  display: "editorial-display",
  h1: "editorial-h1",
  h2: "editorial-h2",
  h3: "editorial-h3",
} as const;

export function EditorialHeading({
  children,
  as,
  size = "h2",
  className,
  id,
  onDark = false,
}: EditorialHeadingProps) {
  const Tag = (as ?? (size === "display" || size === "h1" ? "h1" : size)) as ElementType;
  return (
    <Tag
      id={id}
      className={cn(
        sizeClass[size],
        onDark ? "text-paper" : "text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}
