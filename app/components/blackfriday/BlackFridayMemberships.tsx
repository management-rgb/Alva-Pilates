"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import PromoCode from "./PromoCode";
import { useBlackFridayActive } from "./useBlackFridayActive";
import {
  blackFridayCopy,
  blackFridayIds,
  blackFridayMemberships,
  blackFridayTerms,
  formatUsd,
  PHONE_DISPLAY,
  PHONE_TEL_HREF,
  STUDIO_SMS_HREF,
  type BlackFridayTerm,
} from "../../lib/blackFridayCampaign";

const TERMS: BlackFridayTerm[] = [6, 12];

export default function BlackFridayMemberships() {
  const active = useBlackFridayActive();
  const [term, setTerm] = useState<BlackFridayTerm>(6);
  const tabRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  if (!active) return null;

  const offers = blackFridayMemberships[term];

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
      className="bf-compact scroll-mt-32"
      aria-labelledby="bf-memberships-heading"
    >
      <div className="bf-compact__head">
        <h2 id="bf-memberships-heading" className="bf-compact__title font-display">
          {blackFridayCopy.memberships.heading}
        </h2>
        <p className="bf-compact__sub">
          Black Friday · 20% off your first {blackFridayTerms[term].promoPayments} payments, then regular rate.
        </p>
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

      <div role="tabpanel" id={`bf-panel-${term}`} aria-labelledby={`bf-tab-${term}`} className="bf-rows">
        {offers.map((o) => (
          <article key={o.id} className="bf-row">
            <div className="bf-row__plan">
              <h3 className="bf-row__name font-display">{o.name}</h3>
              <p className="bf-row__meta">{o.classesLabel}</p>
            </div>
            <p className="bf-row__price">
              <s>
                <span className="sr-only">Regular price </span>
                {formatUsd(o.regularMonthly)}
              </s>
              <span className="bf-row__now">
                <span className="sr-only">Black Friday price </span>
                {formatUsd(o.promoMonthly)}
                <span className="bf-row__per">/mo</span>
              </span>
            </p>
            <PromoCode code={o.code} />
          </article>
        ))}
      </div>

      <p className="bf-compact__help">
        Enter the code at checkout. Need help? <a href={STUDIO_SMS_HREF}>Text</a> or{" "}
        <a href={PHONE_TEL_HREF}>call {PHONE_DISPLAY}</a>.
      </p>
      <details className="bf-compact__terms">
        <summary>Offer terms</summary>
        <p>{blackFridayCopy.terms}</p>
      </details>
    </section>
  );
}
