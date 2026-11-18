"use client";

import MindbodyCheckoutLink from "../MindbodyCheckoutLink";
import { useBlackFridayActive } from "./useBlackFridayActive";
import {
  blackFridayCopy,
  blackFridayIds,
  blackFridayPacks,
  formatUsd,
} from "../../lib/blackFridayCampaign";

export default function BlackFridayClassPacks() {
  const active = useBlackFridayActive();
  if (!active) return null;

  return (
    <section
      id={blackFridayIds.packsSection}
      className="bf-section scroll-mt-32"
      aria-labelledby="bf-packs-heading"
    >
      <div className="bf-section__head">
        <p className="bf-eyebrow bf-eyebrow--dark">Black Friday · Class Packs</p>
        <h2 id="bf-packs-heading" className="bf-section__title font-display">
          {blackFridayCopy.packs.heading}
        </h2>
        <p className="bf-section__body">{blackFridayCopy.packs.body}</p>
      </div>

      <div className="bf-grid bf-grid--packs">
        {blackFridayPacks.map((p) => (
          <article key={p.id} className={`bf-card ${p.featured ? "bf-card--featured" : ""}`}>
            <h3 className="bf-card__name font-display">{p.name}</h3>
            <p className="bf-card__meta">{p.classes} classes</p>

            <div className="bf-card__price">
              <p className="bf-card__was">
                <span className="sr-only">Regular price </span>
                <s>{formatUsd(p.regular)}</s>
              </p>
              <p className="bf-card__now">
                <span className="sr-only">Black Friday price </span>
                {formatUsd(p.promo)}
              </p>
            </div>

            <p className="bf-card__note">
              {formatUsd(p.perClass)} per class
              <span className="bf-card__term"> · Expires {p.expires} after activation</span>
            </p>

            <MindbodyCheckoutLink
              type="pricing-link"
              itemId={p.pricingId}
              className={`bf-btn ${p.featured ? "bf-btn--solid" : "bf-btn--outline"}`}
            >
              {p.cta}
            </MindbodyCheckoutLink>
          </article>
        ))}
      </div>

      <p className="bf-terms">{blackFridayCopy.packTerms}</p>
    </section>
  );
}
