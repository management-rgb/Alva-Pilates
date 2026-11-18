import MindbodyCheckoutLink from "../MindbodyCheckoutLink";
import IntroOfferCreditNote from "../IntroOfferCreditNote";
import {
  summerResetMindbodyServiceIds,
} from "../../lib/summerResetCopy";

/** Mindbody pricing-link ID for the Single Class (same ID the site has always used). */
const SINGLE_CLASS_ID = "100002";

const offers = [
  {
    id: "unlimited-intro",
    eyebrow: "Featured · Best Value",
    name: "15-Day Unlimited Intro",
    price: "$99",
    perClass: "As low as $6.60 per class",
    details: ["One class per day · 15 days", "First-time clients only"],
    credit: true,
    cta: "Start Your Intro",
    itemId: summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro,
    featured: true,
  },
  {
    id: "three-class-intro",
    eyebrow: "Intro pack",
    name: "3-Class Intro",
    price: "$69",
    perClass: "$23 per class",
    details: ["3 classes · valid 30 days", "First-time clients only"],
    credit: true,
    cta: "Start Your Intro",
    itemId: summerResetMindbodyServiceIds.threeClassIntro,
  },
  {
    id: "single-class",
    eyebrow: "Drop in",
    name: "Single Class",
    price: "$39",
    perClass: "",
    details: ["Any reformer class", "All levels welcome"],
    credit: false,
    cta: "Book a Class",
    itemId: SINGLE_CLASS_ID,
  },
] as const;

export default function IntroOffers() {
  return (
    <section id="get-started" className="bf-section scroll-mt-32" aria-labelledby="intro-offers-heading">
      <div className="bf-section__head">
        <p className="bf-eyebrow bf-eyebrow--dark">Your first visit</p>
        <h2 id="intro-offers-heading" className="bf-section__title font-display">
          Experience Alva
        </h2>
      </div>

      <div className="bf-grid bf-grid--packs">
        {offers.map((o) => (
          <article key={o.id} className={`bf-card ${"featured" in o && o.featured ? "bf-card--featured" : ""}`}>
            <p className="bf-card__meta">{o.eyebrow}</p>
            <h3 className="bf-card__name font-display">{o.name}</h3>
            <div className="bf-card__price">
              <p className="bf-card__now">{o.price}</p>
            </div>
            <div className="bf-card__note">
              {o.perClass ? <span className="block">{o.perClass}</span> : null}
              <span className="bf-card__list">
                {o.details.map((d) => (
                  <span key={d} className="bf-card__term">
                    {d}
                  </span>
                ))}
              </span>
              {o.credit ? (
                <span className="bf-card__credit">
                  <IntroOfferCreditNote className="text-muted/80" />
                </span>
              ) : null}
            </div>
            <MindbodyCheckoutLink
              type="pricing-link"
              itemId={o.itemId}
              className={`bf-btn ${"featured" in o && o.featured ? "bf-btn--solid" : "bf-btn--outline"}`}
            >
              {o.cta}
            </MindbodyCheckoutLink>
          </article>
        ))}
      </div>
    </section>
  );
}
