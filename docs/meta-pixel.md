# Meta website tracking

Dataset: Alva Pilates Website — `28700740322914402`.

The public website loads the Meta pixel and sends PageView on the initial visit
and subsequent Next.js route changes. Consecutive duplicate route effects do not
send duplicate views. Mindbody pricing buttons send a custom CheckoutClick event
with only the item ID and link type, independently of Google Analytics availability.
No Purchase event is emitted. No customer form values or advanced matching are supplied.
Automatic event configuration is disabled.

Tracking runs only on alvapilates.com and www.alvapilates.com, excludes internal
staff/marketing/front-desk/API routes, and does not start when Global Privacy Control
or Do Not Track is enabled. There is no noscript beacon that bypasses these checks.
If a consent manager is added, integrate its marketing consent with the loader.

## Activation and verification

This change must be deployed before Meta can detect the website connection.
In Events Manager, open this dataset's Test Events, visit the live homepage, then
navigate to pricing: expect one PageView for each visit. Click a pricing purchase
button: expect CheckoutClick, never Purchase. Verify browser opt-out prevents the
Meta script from loading. Ad blockers may also prevent delivery.

## Completed sales are still pending

Checkout opens on cart.mindbodyonline.com. A website pixel cannot observe completed
payments on that separate domain. Do not label CheckoutClick or class reservations
as purchases, or optimize for Purchase until real paid events are verified.
See checkout-and-tracking-audit.md for the existing Mindbody sale webhook,
product-ID and attribution prerequisites. No webhook, Conversions API token,
customer-data export or checkout installation is configured by this change.
