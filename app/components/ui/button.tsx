"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium tracking-wide transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default: "bg-charcoal text-paper hover:opacity-88",
      destructive: "bg-charcoal text-paper hover:opacity-88",
      outline:
        "border border-[var(--border)] bg-transparent text-charcoal hover:border-charcoal",
      secondary:
        "border border-[var(--border)] bg-transparent text-charcoal hover:border-charcoal",
      ghost: "text-charcoal hover:bg-secondary",
      link: "text-charcoal underline-offset-4 hover:underline font-medium",
    };

    const sizes: Record<string, string> = {
      default: "h-12 px-8",
      sm: "h-10 px-5 text-xs",
      lg: "h-14 px-10 text-base",
      icon: "h-12 w-12",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
