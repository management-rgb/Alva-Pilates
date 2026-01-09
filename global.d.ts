import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};

