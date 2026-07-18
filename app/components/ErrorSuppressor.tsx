"use client";

import { useLayoutEffect } from "react";

function stringifyConsoleArgs(args: unknown[]): string {
  return args
    .map((a) => {
      if (typeof a === "string") return a;
      if (a instanceof Error) return `${a.name} ${a.message}`;
      if (a && typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");
}

const isMixpanelError = (message: string): boolean => {
  if (!message.includes("Mixpanel")) return false;
  return (
    message.includes("You must name your new library") ||
    message.includes("init(token, config, name)") ||
    message.includes("Mixpanel error")
  );
};

/** Pendo / Mindbody double-inject — match case-insensitively (browser/Next vary). */
const isPendoOrDuplicateDeclareError = (message: string): boolean => {
  const m = message.toLowerCase();
  if (m.includes("pendoretrytracker")) return true;
  if (
    m.includes("appendchild") &&
    m.includes("node") &&
    m.includes("already been declared")
  ) {
    return true;
  }
  if (
    m.includes("identifier") &&
    m.includes("already been declared") &&
    (m.includes("pendo") || m.includes("retrytracker"))
  ) {
    return true;
  }
  return false;
};

const isThirdPartyInvalidJsonUndefined = (
  message: string,
  source?: string,
  stack?: string
): boolean => {
  if (!message.includes("is not valid JSON")) return false;
  if (!message.includes("undefined")) return false;

  const hay = `${source ?? ""}\n${stack ?? ""}`.toLowerCase();
  if (
    hay.includes("jquery") ||
    hay.includes("healcode") ||
    hay.includes("mindbody") ||
    hay.includes("brandedweb")
  ) {
    return true;
  }
  if (hay.includes("htmldocument") || hay.includes("html document")) {
    return true;
  }
  if (hay.includes("<anonymous>") || hay.includes("anonymous")) {
    return true;
  }
  if (!source || source === "") {
    return true;
  }
  return false;
};

const isHealcodeNullMatch = (
  message: string,
  source?: string,
  stack?: string
): boolean => {
  if (!/Cannot read properties of null.*\bmatch\b/i.test(message)) return false;
  const hay = `${source ?? ""}\n${message}\n${stack ?? ""}`.toLowerCase();
  return (
    hay.includes("healcode") ||
    hay.includes("mindbody") ||
    hay.includes("jquery") ||
    hay.includes("<anonymous>")
  );
};

const shouldSuppressError = (
  message: string,
  source?: string,
  stack?: string
): boolean => {
  if (
    isMixpanelError(message) ||
    isPendoOrDuplicateDeclareError(message) ||
    isThirdPartyInvalidJsonUndefined(message, source, stack) ||
    isHealcodeNullMatch(message, source, stack)
  ) {
    return true;
  }
  const m = message.toLowerCase();
  const hay = `${message}\n${source ?? ""}\n${stack ?? ""}`.toLowerCase();
  if (
    m.includes("already been declared") &&
    (hay.includes("healcode") ||
      hay.includes("mindbody") ||
      hay.includes("brandedweb") ||
      hay.includes("pendo") ||
      m.includes("pendo"))
  ) {
    return true;
  }
  return false;
};

function normalizeErrorEventMessage(event: ErrorEvent): {
  message: string;
  source: string;
  stack: string;
} {
  const err = event.error;
  let message = event.message || "";
  let stack = "";

  if (err instanceof Error) {
    message = message || err.message;
    stack = err.stack ?? "";
  } else if (err != null && typeof err === "object" && "message" in err) {
    message = message || String((err as { message: unknown }).message);
  } else if (!message && err != null) {
    message = String(err);
  }

  return {
    message,
    source: event.filename || "",
    stack,
  };
}

export default function ErrorSuppressor() {
  useLayoutEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const combined = stringifyConsoleArgs(args);
      if (shouldSuppressError(combined)) {
        return;
      }
      originalError.apply(console, args);
    };

    if (typeof window !== "undefined" && window.__ALVA_ERR_SUPPRESS__) {
      return () => {
        console.error = originalError;
      };
    }

    const suppressIfNeeded = (event: ErrorEvent): boolean => {
      const { message, source, stack } = normalizeErrorEventMessage(event);
      if (!shouldSuppressError(message, source, stack)) return false;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return true;
    };

    const handleError = (event: ErrorEvent) => {
      suppressIfNeeded(event);
    };

    window.addEventListener("error", handleError, true);

    const previousOnError = window.onerror;
    window.onerror = (
      message,
      source,
      _lineno,
      _colno,
      error
    ): boolean => {
      const msg =
        typeof message === "string" ? message : String(message ?? "");
      const stack = error instanceof Error ? error.stack ?? "" : "";
      if (shouldSuppressError(msg, source ?? "", stack)) {
        return true;
      }
      if (typeof previousOnError === "function") {
        return (
          previousOnError.call(
            window,
            message,
            source,
            _lineno,
            _colno,
            error
          ) ?? false
        );
      }
      return false;
    };

    const reportError = window.reportError?.bind(window);
    if (typeof reportError === "function") {
      window.reportError = (e: unknown) => {
        if (e instanceof Error && shouldSuppressError(e.message, "", e.stack ?? "")) {
          return;
        }
        reportError(e);
      };
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      let reasonString: string;
      let stack = "";
      if (typeof reason === "string") {
        reasonString = reason;
      } else if (reason instanceof Error) {
        reasonString = reason.message;
        stack = reason.stack ?? "";
      } else if (reason && typeof reason === "object" && "message" in reason) {
        reasonString = String(reason.message);
        stack =
          "stack" in reason && typeof (reason as Error).stack === "string"
            ? (reason as Error).stack!
            : "";
      } else {
        reasonString = String(reason);
      }

      if (reasonString && shouldSuppressError(reasonString, "", stack)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection, true);

    return () => {
      console.error = originalError;
      window.removeEventListener("error", handleError, true);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
        true
      );
      window.onerror = previousOnError;
      if (typeof reportError === "function") {
        window.reportError = reportError;
      }
    };
  }, []);

  return null;
}
