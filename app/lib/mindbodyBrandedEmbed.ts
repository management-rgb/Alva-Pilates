/**
 * Mindbody Branded Web embed (widget.js) runs its initializer only once per window:
 * it sets window["bw-widget-unique-identifier"] and skips further inits. Removing
 * the <script> tag does not clear that flag, so client navigations to /book or
 * /appointments need an explicit reset before injecting the script again.
 */

export const MINDBODY_BRANDED_EMBED_SRC =
  "https://brandedweb.mindbodyonline.com/embed/widget.js";

const SCRIPT_ID = "mindbody-branded-embed-script";

/** Name inside Mindbody's bundle — must match their IIFE guard. */
const WIDGET_RUN_GUARD = "bw-widget-unique-identifier";

function clearMindbodyBrandedEmbedGuard(): void {
  try {
    delete (window as unknown as Record<string, unknown>)[WIDGET_RUN_GUARD];
  } catch {
    /* ignore */
  }
}

function removeMindbodyBrandedEmbedScript(): void {
  document.getElementById(SCRIPT_ID)?.remove();
  document
    .querySelectorAll(`script[src^="${MINDBODY_BRANDED_EMBED_SRC}"]`)
    .forEach((node) => node.parentNode?.removeChild(node));
}

/**
 * Clears Mindbody's guard, removes any prior embed script, and loads widget.js.
 * Call after `.mindbody-widget` elements are in the DOM (e.g. in useEffect).
 */
export function reloadMindbodyBrandedEmbedScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  removeMindbodyBrandedEmbedScript();
  clearMindbodyBrandedEmbedGuard();

  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = `${MINDBODY_BRANDED_EMBED_SRC}?t=${Date.now()}`;
        script.async = true;
        const done = () => resolve();
        script.onload = done;
        script.onerror = done;
        document.body.appendChild(script);
      });
    });
  });
}

/** Run when leaving a page that used the embed so the next visit can re-init cleanly. */
export function teardownMindbodyBrandedEmbedScript(): void {
  if (typeof window === "undefined") return;
  removeMindbodyBrandedEmbedScript();
  clearMindbodyBrandedEmbedGuard();
}
