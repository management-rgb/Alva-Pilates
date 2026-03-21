"use client";

import { useEffect } from "react";
import {
  reloadMindbodyBrandedEmbedScript,
  teardownMindbodyBrandedEmbedScript,
} from "../lib/mindbodyBrandedEmbed";

type Props = {
  widgetType: "Schedules" | "Appointments";
  widgetId: string;
  className?: string;
};

/**
 * Mindbody Branded Web embed target + script load. Loader clears Mindbody's one-shot
 * `window` guard so the calendar works after client-side navigation (same idea as
 * loading healcode once before rendering prospects widgets on Contact/Pricing).
 */
export default function MindbodyBrandedWidget({
  widgetType,
  widgetId,
  className = "",
}: Props) {
  useEffect(() => {
    void reloadMindbodyBrandedEmbedScript();
    return () => {
      teardownMindbodyBrandedEmbedScript();
    };
  }, []);

  return (
    <div
      className={`mindbody-widget min-h-[700px] ${className}`.trim()}
      data-widget-type={widgetType}
      data-widget-id={widgetId}
    />
  );
}
