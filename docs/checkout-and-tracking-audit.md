# Checkout and conversion tracking audit

Audited 2026-10-09. GA4 property `G-FR15M2BQQM`.

> **Do not enter `G-FR15M2BQQM` (or any GA ID that feeds the same property) inside Mindbody**,
> including Branded Web or Healcode analytics settings, while `MindbodyGaBridge` is responsible for
> forwarding Mindbody's events. Mindbody's iframe sends its own hits to every GA ID configured
> in Mindbody, directly from the iframe, so Mindbody's original `purchase` for class bookings
> would reach our property and bypass the bridge. That brings back the inflated purchase counts and the
> wrong Google Ads conversions this change removes. If Mindbody-side analytics is ever wanted, remove or
> rework the bridge first.

## 1. Empty cart in the Healcode modal

**Cause.** Every pricing "Buy Now" was a Healcode widget (`rev=iframe`,
`data-hc-open-modal=modal-iframe`) that opens `cart.mindbodyonline.com/...` in an iframe on
alvapilates.com. In that cross-site iframe browsers block or partition Mindbody's session cookie,
so the item is added to a cart the iframe cannot read back and the cart renders empty. Mindbody's
own modal shows a cookie-settings warning when this happens. Fetching each URL standalone with a
first-party cookie jar returns the correct product and price. No headers, CSP or cookie code in
this repo is involved.

**Fix (all 15 pricing buttons).** `renderHealcodeWidget` in `app/pricing/page.tsx` now renders
`app/components/MindbodyCheckoutLink.tsx`: a plain `<a target="_blank" rel="noopener noreferrer">`
carrying the same `healcode-*-text-link` class, so the existing overlay CSS applies unchanged. URLs
come from `app/lib/mindbodyCart.ts` and are exactly the `data-url` values Healcode rendered:

| Type | URL |
|---|---|
| pricing-link (intros 100039/100003, single 100002, packs 100004-6, privates 100014/15/16/40) | `.../cart/add_service?mbo_item_id=<id>` |
| contract-link (memberships 111, 113, 114, 116) | `.../cart/add_contract?mbo_item_id=<id>` |
| gift-card-link (100055) | `.../cart/gift_cards/add?mbo_id=100055&source=buy_now_link&link_type=gift_card` |

Not changed: the header "Login / Register" account link (`/client` login, not a pricing button) and
the contact/registration form widgets. They are Healcode embeds and may show the same cookie issue
when third-party cookies are blocked.

## 2. Tracking inventory

| What | Where | Notes |
|---|---|---|
| Google tag (gtag.js) | `app/layout.tsx` via `@next/third-parties` | Site-wide since 2026-10-05. No GTM anywhere. |
| Mindbody Branded Web widget | `MindbodyBrandedWidget.tsx`, `lib/mindbodyBrandedEmbed.ts`, `/book`, `/appointments` | Reloads `widget.js` on each visit. |
| Mindbody GA bridge | `MindbodyGaBridge.tsx` (rewritten) | Sole path for the widget's GA events into our property. |
| Healcode widgets | `lib/mindbodyHealcode.ts`, header login, contact | No GA events reach our page. |
| Vercel Analytics | `app/layout.tsx` | Page views only. |
| New | `checkout_click` in `MindbodyCheckoutLink.tsx` | Intent signal, no value, not a conversion. |

## 3. Findings

1. **What triggers `purchase`.** Mindbody's booking iframe emits GA `purchase`
   (`transaction_id`, `value`, `items`, `first_time_guest`) and posts it to the page as
   `BW_GA_EVENT`. Mindbody's `widget.js` replays it into our `gtag`. The report shows class names
   as items and three $0 rows, which matches class reservations, not intro sales. (I could not
   exercise a live booking, so the exact trigger point inside Mindbody's lazy-loaded checkout
   code is inferred from the payload and your report.)
2. **Revenue.** `value` is the listed class price, or 0 when a pass pays for it. It is not money
   collected. The 9 purchases / $234 are bookings, not sales.
3. **Transaction IDs and double firing.** IDs come from Mindbody and are stable per booking, but
   events could fire repeatedly: (a) `widget.js` is re-injected on every client-side visit to
   `/book` or `/appointments` and each copy adds a permanent `message` listener, so one event is
   replayed once per visit; (b) the old bridge sent `purchase` a second time on top of
   `widget.js`'s own replay. That is a plausible source of the repeated transaction ID.
   Mindbody also configures its own property `G-DQG857GLED` on our page, so events sent
   without `send_to` go to both properties.
4. **Branded checkout to this property.** No. Nothing in the repo or in the Mindbody code sends
   a completed intro purchase to GA4. The Healcode cart does not post GA events to the page, and the
   new standalone cart tab is on `cart.mindbodyonline.com` and can't reach our tag. Intro
   purchases currently produce no `purchase` event.
5. **Attribution across the website to Mindbody hop.** It does not survive. GA4 has no cross-domain
   configuration, and the cart is on a different domain with a different `client_id`.
6. **Identifying new clients.** `first_time_guest` is on the widget's events (kept on
   `class_booking`). In Mindbody itself, the intro offers (100003 and 100039) are first-time-only,
   so each paid sale of those pricing options is a new client. Reconcile with the Pricing Option
   Sales report filtered to those two options, and the new-client report for the client creation
   date.

Also note the repo's GA tag only exists from 2026-10-05, but your report starts Sep 11. Pre-Oct-5
purchases cannot have come from this site tag, so check the Mindbody Branded Web admin for a GA ID
entered there and confirm the report date range.

## 4. Changes

- `MindbodyGaBridge.tsx`: capture-phase listener, Mindbody origin only, installed once per
  session so it always runs before any `widget.js` copy. It stops propagation of `BW_GA_EVENT`
  messages so Mindbody's own `purchase` never reaches `gtag`; `event` calls are sent once with
  `send_to: G-FR15M2BQQM`; `purchase` becomes `class_booking` (params kept, `original_event` added),
  de-duplicated by `transaction_id` for the browser session (booking events only);
  `config`/`set` are replayed unchanged; other message types are untouched. `?ga_debug=1` adds
  `debug_mode` for GA4 DebugView.
- Standalone checkout for every pricing button (section 1).
- Limit: the iframe also sends its own hits to any GA ID configured *inside Mindbody*. Today that is
  only Mindbody's `G-DQG857GLED`. If `G-FR15M2BQQM` is ever entered in Mindbody's analytics settings,
  the iframe would send `purchase` to our property directly and the bridge cannot stop it.

**Effect on reporting.** `purchase` stops arriving until a real payment signal exists. In GA4 keep
`class_booking` as a non-key event, and in Google Ads stop using `purchase` as a primary goal until
section 5 is live.

## 5. Reporting completed payments for pricing options 100003 and 100039

Source: Mindbody Public API webhooks, https://developers.mindbodyonline.com/WebhooksDocumentation
(read 2026-10-09).

**Supported signal: the `clientSale.created` webhook.** Mindbody sends it when a sale is made to a
client. Payload fields that matter:

- `saleId`: stable ID, use as GA4 `transaction_id`.
- `saleDateTime` (UTC).
- `totalAmountPaid` and `items[].amountPaid`: money actually paid, including tax and discounts.
  Use these as `value`, never a listed price.
- `payments[]`: payment method and amount per payment.
- `items[]`: `type` (`Service` is a pricing option), `itemId`, `name`, `quantity`.
- `purchasingClientId`.

Class reservations are not sales, so they do not produce this event. A $0 sale (for example a
fully discounted cart) can still produce it, so skip events where `totalAmountPaid` is 0.

**Status: not built.** Confirm the three prerequisites below first. Revenue without a click match
cannot verify Google Ads performance.

### Prerequisites to confirm before building

| # | Question | Status | How to confirm |
|---|---|---|---|
| 1 | Does the studio have Mindbody Public API and webhook access? | **Unconfirmed.** The docs say subscriptions need an API key from a server, but public documentation does not say what account, approval or fee is required. | Studio owner creates a developer account at developers.mindbodyonline.com and links the API key to site 129106 (the studio's Mindbody site ID is 5747916 in widget markup and 129106 in cart URLs; confirm which the API expects). Ask Mindbody support whether webhooks are enabled for this site. |
| 2 | What `itemId` does `clientSale.created` send for the intro offers? | **Unconfirmed.** Docs call `items[].itemId` the product ID and do not state it equals pricing option 100003 / 100039. | With an API key, call `GET /public/v6/sale/services` and compare `ProductId` with `Id`; then make one real $69 test intro purchase (or refund it) and read the delivered payload. Match on `type: "Service"` plus the confirmed ID, or on `name` as a fallback. |
| 3 | Is there a supported way to match a completed sale to its ad click? | **Unconfirmed, and nothing found in public docs.** The webhook payload has no GA `client_id`, `gclid`, UTM or referrer, and the cart URL has no documented attribution parameters. | Ask Mindbody support in writing: (a) can the Branded Web cart or Healcode link carry a click ID or UTM and store it on the sale or client? (b) is there a client lead-source field settable at account creation? If not supported, the click must be joined through something the customer enters on our site (for example a Prospects form that stores the `gclid` in a client note or custom field, then matched to the buyer by `purchasingClientId`). That is a design decision for after Mindbody replies. |

If #3 has no supported answer, report revenue from Mindbody sales and judge Google Ads with
click-level data (Ads clicks, `checkout_click`, call/lead volume), not imported revenue.

### Build outline (only after the three checks pass)

1. Server-side only: `POST https://mb-api.mindbodyonline.com/push/api/v1/subscriptions` with
   `eventIds: ["clientSale.created"]`, `eventSchemaVersion: 1`, an HTTPS `webhookUrl` (accepts
   POST and HEAD). Save the returned `messageSignatureKey`, then `PATCH` the subscription to `Active`.
2. Verify `X-Mindbody-Signature` (`sha256=` + base64 HMAC-SHA-256 of the raw body).
3. Keep sales whose `items[]` match the confirmed intro IDs and where `totalAmountPaid` > 0.
4. Send the conversion to GA4 / Google Ads only with the matched click identifier from check #3,
   using `saleId` as the transaction ID and `totalAmountPaid` as the value.

**Limits.**
- Attribution: the payload carries no GA `client_id`, `gclid` or UTM. Events sent this way are
  not tied to the website session or ad click unless you also pass a click identifier through the
  cart, which Mindbody's cart URL does not currently support. Report revenue by this event and
  attribution from `checkout_click` plus Google Ads click data separately.
- New clients: `client.created` webhook (new client added) and the intro offers being
  first-time-only both identify them. Join by `purchasingClientId`.
- Not verified: whether Mindbody's Branded Web admin offers a GA4 field that makes the hosted
  cart send `purchase` itself. I could not find documentation for it, so I do not recommend relying
  on it, and see the warning at the top: our GA ID must not be entered in Mindbody.

Until the webhook is live, count paid intros from Mindbody's own sales report for those two
pricing options.
