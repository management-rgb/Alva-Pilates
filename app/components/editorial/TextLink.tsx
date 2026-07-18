import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  onDark?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  showArrow = true,
  onDark = false,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-link group",
        onDark && "text-paper border-paper/40 hover:border-paper",
        className
      )}
    >
      {children}
      {showArrow ? (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
