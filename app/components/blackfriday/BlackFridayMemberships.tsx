"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import PromoCode from "./PromoCode";
import HelpLinks from "./HelpLinks";
import { useBlackFridayActive } from "./useBlackFridayActive";
import {
  blackFridayCopy,
  blackFridayIds,
  blackFridayMemberships,
  blackFridayTerms,
  formatUsd,
  type BlackFridayTerm,
} from "../../lib/blackFridayCampaign";

const TERMS: BlackFridayTerm[] = [6, 12];

export default function BlackFridayMemberships() {
  const active = useBlackFridayActive();
  const [term, setTerm] = useState<BlackFridayTerm>(6);
  const tabRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  if (!active) return null;

  const offers = blackFridayMemberships[term];
  const { promoPayments, code } = blackFridayTerms[term];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = term === 6 ? 12 : 6;
    setTerm(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id={blackFridayIds.membershipsSection}
      className="bf-section scroll-mt-32"
      aria-labelledby="bf-memberships-heading"
    >
      <div className="bf-section__head">
        <p className="bf-eyebrow bf-eyebrow--dark">Black Friday · Memberships</p>
        <h2 id="bf-memberships-heading" className="bf-section__title font-display">
          {blackFridayCopy.memberships.heading}
        </h2>
        <p className="bf-section__body">{blackFridayCopy.memberships.body}</p>
      </div>

      <div className="bf-tabs" role="tablist" aria-label="Membership commitment" onKeyDown={onKey}>
        {TERMS.map((t) => (
          <button
            key={t}
            ref={(el) => {
              tabRefs.current[t] = el;
            }}
            type="button"
            role="tab"
            id={`bf-tab-${t}`}
            aria-selected={term === t}
            aria-controls={`bf-panel-${t}`}
            tabIndex={term === t ? 0 : -1}
            onClick={() => setTerm(t)}
            className="bf-tab"
          >
            {blackFridayTerms[t].tabLabel}
          </button>
        ))}
      </div>

      <p className="bf-section__sub">
        20% off your first {promoPayments} monthly payments · code <strong>{code}</strong>
      </p>

      <div
        role="tabpanel"
        id={`bf-panel-${term}`}
        aria-labelledby={`bf-tab-${term}`}
        className="bf-grid"
      >
        {offers.map((o) => (
          <article key={o.id} className="bf-card">
            <h3 className="bf-card__name font-display">{o.name}</h3>
            <p className="bf-card__meta">{o.classesLabel}</p>

            <div className="bf-card__price">
              <p className="bf-card__was">
                <span className="sr-only">Regular price </span>
                <s>{formatUsd(o.regularMonthly)}</s>
                <span className="sr-only"> per month</span>
              </p>
              <p className="bf-card__now">
                <span className="sr-only">Black Friday price </span>
                {formatUsd(o.promoMonthly)}
                <span className="bf-card__per">/ month</span>
              </p>
            </div>

            <p className="bf-card__note">
              20% off your first {o.promoPayments} payments, then {formatUsd(o.regularMonthly)}/month.
              <span className="bf-card__term"> {o.term}-month commitment.</span>
            </p>

            <PromoCode code={o.code} />

          </article>
        ))}
      </div>

      <p className="bf-fine">{blackFridayCopy.memberships.resume}</p>
      <p className="bf-redeem">{blackFridayCopy.redeem}</p>
      <HelpLinks />
      <p className="bf-terms">{blackFridayCopy.terms}</p>
    </section>
  );
}
