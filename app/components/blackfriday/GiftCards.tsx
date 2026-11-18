"use client";

import MindbodyCheckoutLink from "../MindbodyCheckoutLink";
import { useBlackFridayActive } from "./useBlackFridayActive";
import { formatUsd, PHONE_DISPLAY, STUDIO_SMS_HREF } from "../../lib/blackFridayCampaign";

/** Standard gift card service (buyer picks $50–$200 in Mindbody checkout). */
const STANDARD_GIFT_CARD_ID = "100055";

/**
 * Black Friday gift cards are separate Mindbody gift card services already priced at
 * 20% off. A `null` serviceId shows a text-us fallback instead of a checkout link.
 */
const BF_GIFT_CARDS = [
  { value: 100, price: 80, serviceId: "100061" },
  { value: 150, price: 120, serviceId: "100062" },
  { value: 200, price: 160, serviceId: "100063" },
] as const;

export default function GiftCards() {
  const active = useBlackFridayActive();

  return (
    <section id="gift-cards" className="bf-section scroll-mt-32" aria-labelledby="gift-cards-heading">
      <div className="bf-section__head">
        <p className="bf-eyebrow bf-eyebrow--dark">{active ? "Black Friday · Gift Cards" : "Gift cards"}</p>
        <h2 id="gift-cards-heading" className="bf-section__title font-display">
          Give the gift of Pilates.
        </h2>
        <p className="bf-section__body">
          {active
            ? "20% off gift cards through November 30. Perfect for birthdays and holidays."
            : "Gift cards from $50 to $200, perfect for birthdays and holidays."}
        </p>
      </div>

      {active ? (
        <div className="bf-grid bf-grid--packs">
          {BF_GIFT_CARDS.map((g) => (
            <article key={g.value} className="bf-card">
              <h3 className="bf-card__name font-display">{formatUsd(g.value)} Gift Card</h3>
              <p className="bf-card__meta">Save {formatUsd(g.value - g.price)}</p>
              <div className="bf-card__price">
                <p className="bf-card__was">
                  <span className="sr-only">Value </span>
                  <s>{formatUsd(g.value)}</s>
                </p>
                <p className="bf-card__now">
                  <span className="sr-only">Black Friday price </span>
                  {formatUsd(g.price)}
                </p>
              </div>
              <p className="bf-card__note" />
              {g.serviceId ? (
                <MindbodyCheckoutLink type="gift-card-link" itemId={g.serviceId} className="bf-btn bf-btn--outline">
                  Buy Now
                </MindbodyCheckoutLink>
              ) : (
                <a href={STUDIO_SMS_HREF} className="bf-btn bf-btn--outline">
                  Text {PHONE_DISPLAY} to buy
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <MindbodyCheckoutLink type="gift-card-link" itemId={STANDARD_GIFT_CARD_ID} className="bf-btn bf-btn--solid">
          Buy a Gift Card
        </MindbodyCheckoutLink>
      )}
    </section>
  );
}
