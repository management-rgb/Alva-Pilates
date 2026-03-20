/**
 * Single shared Mindbody healcode.js loader for the SPA.
 * Do not remove/re-add the script on route changes — that breaks Mindbody internals
 * (e.g. Uncaught TypeError: Cannot read properties of null (reading 'match')).
 */

let healcodeLoadPromise: Promise<void> | null = null;

function attachNewScript(resolve: () => void) {
  const script = document.createElement("script");
  script.id = "mindbody-healcode-script";
  script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
  script.type = "text/javascript";
  script.async = false;
  const done = () => {
    script.dataset.loaded = "true";
    resolve();
  };
  script.onload = done;
  script.onerror = done;
  document.body.appendChild(script);
}

export function ensureMindbodyHealcodeScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (healcodeLoadPromise) return healcodeLoadPromise;

  healcodeLoadPromise = new Promise((resolve) => {
    const finish = () => resolve();

    const run = () => {
      const el = document.getElementById(
        "mindbody-healcode-script"
      ) as HTMLScriptElement | null;

      if (el?.dataset.loaded === "true") {
        finish();
        return;
      }

      if (el) {
        const onLoad = () => {
          el.dataset.loaded = "true";
          finish();
        };
        el.addEventListener("load", onLoad, { once: true });
        el.addEventListener("error", finish, { once: true });
        const s = el as HTMLScriptElement & { complete?: boolean };
        if (s.complete) {
          onLoad();
        }
        return;
      }

      attachNewScript(finish);
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run);
    });
  });

  return healcodeLoadPromise;
}
