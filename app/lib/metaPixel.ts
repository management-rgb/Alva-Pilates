/** Public Meta dataset ID; this is not a credential. */
export const META_PIXEL_ID = "28700740322914402";

type Pixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Pixel;
  loaded: boolean;
  version: string;
};

type PixelWindow = Window & {
  fbq?: Pixel;
  _fbq?: Pixel;
  __alvaMetaPixel?: { lastPath?: string };
};

/** Keep previews, internal tools and browsers requesting no tracking out of ads data. */
function trackingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const production = ["alvapilates.com", "www.alvapilates.com"].includes(window.location.hostname);
  const internal = /^\/(api|staff|marketing|front-desk)(\/|$)/.test(window.location.pathname);
  const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
  return production && !internal && !privacy.globalPrivacyControl && navigator.doNotTrack !== "1";
}

function getPixel(): Pixel | undefined {
  if (!trackingAllowed()) return;
  const target = window as PixelWindow;
  if (!target.fbq) {
    const pixel: Pixel = Object.assign(
      (...args: unknown[]) => {
        if (pixel.callMethod) pixel.callMethod(...args);
        else pixel.queue.push(args);
      },
      { queue: [] as unknown[][], loaded: true, version: "2.0" },
    ) as Pixel;
    pixel.push = pixel;
    target.fbq = pixel;
    target._fbq ??= pixel;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.id = "alva-meta-pixel";
    document.head.appendChild(script);
  }
  if (!target.__alvaMetaPixel) {
    // Only explicit events; no automatic form-field or customer-data matching.
    target.fbq("set", "autoConfig", false, META_PIXEL_ID);
    target.fbq("init", META_PIXEL_ID);
    target.__alvaMetaPixel = {};
  }
  return target.fbq;
}

/** Once per route transition, including Next.js navigation and Back/Forward. */
export function trackMetaPageView(pathname: string): void {
  const pixel = getPixel();
  if (!pixel) return;
  const state = (window as PixelWindow).__alvaMetaPixel;
  if (!state || state.lastPath === pathname) return;
  pixel("trackSingle", META_PIXEL_ID, "PageView");
  state.lastPath = pathname;
}

/** A handoff to Mindbody is intent, never proof of a payment or a purchase. */
export function trackMetaCheckoutClick(itemId: string, linkType: string): void {
  getPixel()?.("trackSingleCustom", META_PIXEL_ID, "CheckoutClick", {
    item_id: itemId,
    link_type: linkType,
  });
}
