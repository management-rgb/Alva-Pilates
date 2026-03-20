"use client";

import { useEffect } from "react";
import { ensureMindbodyHealcodeScript } from "../lib/mindbodyHealcode";

/**
 * Ensures healcode.js is loaded once (never removed on client navigation).
 */
export function useMindbodyHealcodeScript() {
  useEffect(() => {
    void ensureMindbodyHealcodeScript();
  }, []);
}
