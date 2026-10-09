/**
 * Standalone Mindbody cart URLs for the pricing "Buy Now" buttons.
 *
 * Healcode normally opens these same URLs inside a cross-site iframe modal. There,
 * browsers block or partition Mindbody's session cookie, so the item is added to a
 * cart the iframe cannot read back and the cart shows empty. Opened as a normal tab
 * the cookie is first-party and the cart is correct.
 *
 * The URLs are exactly the `data-url` values Healcode renders for each widget type
 * (checked against the live /pricing page).
 */

const MINDBODY_CART_BASE = "https://cart.mindbodyonline.com/sites/129106/cart";

export type MindbodyCartLinkType = "pricing-link" | "contract-link" | "gift-card-link";

export function mindbodyCartUrl(type: MindbodyCartLinkType, itemId: string): string {
  const id = encodeURIComponent(itemId);
  switch (type) {
    case "pricing-link":
      return `${MINDBODY_CART_BASE}/add_service?mbo_item_id=${id}`;
    case "contract-link":
      return `${MINDBODY_CART_BASE}/add_contract?mbo_item_id=${id}`;
    case "gift-card-link":
      return `${MINDBODY_CART_BASE}/gift_cards/add?mbo_id=${id}&source=buy_now_link&link_type=gift_card`;
  }
}
