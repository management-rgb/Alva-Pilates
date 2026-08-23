import type { ReactNode } from "react";

/**
 * Renders a plain string that may contain simple **bold** markers into
 * React nodes, wrapping bolded segments in <strong>. Used for class
 * descriptions authored with lightweight markdown-style emphasis.
 */
export function renderBoldText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
