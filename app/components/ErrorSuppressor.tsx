"use client";

import { useEffect } from "react";

// Helper functions to check if errors should be suppressed
const isMixpanelError = (message: string): boolean => {
  return (
    message.includes("Mixpanel") &&
    message.includes("You must name your new library")
  );
};

const isPendoRetryTrackerError = (message: string): boolean => {
  return (
    message.includes("pendoRetryTracker") &&
    message.includes("has already been declared")
  );
};

const isHealcodeError = (
  message: string,
  source?: string,
  stack?: string
): boolean => {
  const isHealcodeSource =
    (source?.includes("healcode.js") ?? false) ||
    message.includes("healcode") ||
    message.includes("healcode.js") ||
    (stack?.includes("healcode.js") ?? false);
  const isNullMatchError =
    message.includes("Cannot read properties of null") ||
    message.includes("reading 'match'") ||
    message.includes("match") ||
    message.includes("null");
  return isHealcodeSource && isNullMatchError;
};

const isGenericNullMatchError = (message: string): boolean => {
  return (
    message.includes("Cannot read properties of null") &&
    message.includes("match")
  );
};

const shouldSuppressError = (
  message: string,
  source?: string,
  stack?: string
): boolean => {
  return (
    isMixpanelError(message) ||
    isPendoRetryTrackerError(message) ||
    isHealcodeError(message, source, stack) ||
    isGenericNullMatchError(message)
  );
};

export default function ErrorSuppressor() {
  useEffect(() => {
    // Suppress errors from third-party scripts (like Mindbody widgets)
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const errorMessage = args[0];
      if (typeof errorMessage === "string" && shouldSuppressError(errorMessage)) {
        return;
      }
      // Log all other errors normally
      originalError.apply(console, args);
    };

    // Handle runtime errors (like SyntaxError for pendoRetryTracker and healcode.js errors)
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || String(event.error);
      const errorSource = event.filename || "";
      const stackTrace = event.error?.stack || "";

      if (shouldSuppressError(errorMessage, errorSource, stackTrace)) {
        event.preventDefault();
        return false;
      }

      return true;
    };

    window.addEventListener("error", handleError);

    // Also handle unhandled promise rejections that might contain errors
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const reasonString =
        typeof reason === "string"
          ? reason
          : reason && typeof reason === "object" && "message" in reason
            ? String(reason.message)
            : String(reason);

      if (reasonString && shouldSuppressError(reasonString)) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      console.error = originalError;
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}

