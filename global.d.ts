import type React from "react";

export interface HealcodeWidgetProps
  extends React.HTMLAttributes<HTMLElement> {
  "data-version"?: string;
  "data-link-class"?: string;
  "data-site-id"?: string;
  "data-mb-site-id"?: string;
  "data-service-id"?: string;
  "data-bw-identity-site"?: string;
  "data-type"?: string;
  "data-inner-html"?: string;
  "data-widget-partner"?: string;
  "data-widget-id"?: string;
  "data-widget-version"?: string;
}

declare global {
  interface Window {
    /** Set by public/error-suppress-bootstrap.js when early error hooks are installed. */
    __ALVA_ERR_SUPPRESS__?: boolean;
  }

  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": React.DetailedHTMLProps<
        HealcodeWidgetProps,
        HTMLElement
      >;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": React.DetailedHTMLProps<
        HealcodeWidgetProps,
        HTMLElement
      >;
    }
  }
}

export {};

