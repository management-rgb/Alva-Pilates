"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroOfferCreditNote from "../components/IntroOfferCreditNote";
import FallbackPurchaseLink from "../components/summer-reset/FallbackPurchaseLink";
import { Reveal } from "../components/sections/Reveal";
import { useMindbodyHealcodeScript } from "../hooks/useMindbodyHealcodeScript";
import { scheduleScrollToSection } from "../lib/scrollToSection";
import {
  foundingMemberCopy,
  foundingMemberOfferCards,
} from "../lib/foundingMemberCopy";
import {
  getPackOffersForPricing,
  standardGroupClassOptions,
  type GroupClassOption,
} from "../lib/groupClassPricing";
import {
  summerResetEnabled,
  summerResetMindbodyServiceIds,
  summerResetOfferCards,
  summerResetPurchaseFallbacks,
  summerResetSectionId,
} from "../lib/summerResetCopy";

/* ---------------------------------------------------------------------------
   Mindbody Healcode — unchanged integration. Service IDs, widget markup, and
   the full-card purchase overlay pattern are preserved exactly.
--------------------------------------------------------------------------- */

function renderHealcodeWidget(
  type: "contract-link" | "pricing-link",
  serviceId: string
) {
  const linkClass =
    type === "contract-link"
      ? "healcode-contract-text-link"
      : "healcode-pricing-option-text-link";

  const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="${linkClass}" data-site-id="129106" data-mb-site-id="5747916" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="${type}" data-inner-html="Buy Now"></healcode-widget>`;

  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: widgetHtml }}
    />
  );
}

/** Full-card purchase overlay: Mindbody widget, or a fallback route link. */
function BuyOverlay({
  type = "pricing-link",
  serviceId,
  fallbackHref,
  fallbackLabel,
}: {
  type?: "contract-link" | "pricing-link";
  serviceId?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
}) {
  return (
    <div className="pricing-card-full-buy-overlay">
      {serviceId ? (
        renderHealcodeWidget(type, serviceId)
      ) : fallbackHref ? (
        <FallbackPurchaseLink
          href={fallbackHref}
          label={fallbackLabel ?? "Purchase"}
        />
      ) : null}
    </div>
  );
}

const groupClassWidgetServiceIds: Record<string, string> = {
  "Single Class": "100002",
  "New Client Intro Offer": "100003",
  "3-Class Intro": "100003",
  "5-Class Pack": "100004",
  "10-Class Pack": "100005",
  "20-Class Pack": "100006",
};

function getGroupClassServiceId(title: string): string | undefined {
  if (title === "15-Day Unlimited Intro") {
    return summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro ?? undefined;
  }
  return groupClassWidgetServiceIds[title];
}

const membershipWidgetServiceIds: Record<string, string> = {
  Essential: "111",
  Core: "112",
};

type MembershipOption = {
  title: string;
  price: string;
  listPrice?: string;
  classes: string;
  contract: string;
  tagline: string;
  benefits: string;
  summerBenefits?: string;
  featured?: boolean;
  founding?: boolean;
  serviceId?: string;
};

const memberships: MembershipOption[] = [
  {
    title: "Essential",
    price: "$119",
    classes: "4 classes / month",
    contract: "3-month contract",
    tagline: "A gentle, steady rhythm.",
    benefits: "5% off additional packs & retail.",
    summerBenefits:
      "5% off additional packs & retail + 1 guest pass / month during Summer Reset.",
  },
  {
    title: "Core",
    price: "$219",
    classes: "8 classes / month",
    contract: "3-month contract",
    tagline: "For a consistent weekly practice.",
    benefits: "10% off privates & priority booking.",
    summerBenefits:
      "10% off privates & priority booking + 1 guest pass / month during Summer Reset.",
  },
  ...foundingMemberOfferCards.map((offer) => ({
    title: offer.title,
    price: offer.price.replace(/\/mo$/, ""),
    listPrice: offer.listPrice.replace(/\/mo$/, ""),
    classes: offer.classes,
    contract: offer.contract,
    tagline: "Founding member rate — limited availability.",
    benefits: offer.benefits,
    summerBenefits: offer.summerBenefits,
    featured: offer.featured,
    founding: true,
    serviceId: offer.serviceId,
  })),
];

function getMembershipDisplayBenefits(m: MembershipOption) {
  if (summerResetEnabled && m.summerBenefits) return m.summerBenefits;
  return m.benefits;
}

function benefitBullets(text: string): string[] {
  return text
    .split(/\s*\+\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}

const privateSessionWidgetServiceIds: Record<string, string> = {
  "Single Private": "100014",
};

type PrivateOption = {
  title: string;
  price: string;
  listPrice?: string;
  perSession: string;
  validity: string | null;
  note: string;
  featured: boolean;
};

const privatesNonMember: PrivateOption[] = [
  {
    title: "Single Private",
    price: "$120",
    perSession: "$120 / session",
    validity: "60-minute session",
    note: "One personalized 1:1 reformer session.",
    featured: false,
  },
  {
    title: "3-Pack Private",
    listPrice: "$360",
    price: "$320",
    perSession: "$106.67 / session",
    validity: "Valid 2 months",
    note: "Personalized 1:1 sessions at a limited-time pack rate.",
    featured: false,
  },
  {
    title: "5-Pack Private",
    listPrice: "$575",
    price: "$500",
    perSession: "$100 / session",
    validity: "Valid 3 months",
    note: "Personalized 1:1 sessions at a limited-time pack rate.",
    featured: true,
  },
  {
    title: "10-Pack Private",
    listPrice: "$1,100",
    price: "$950",
    perSession: "$95 / session",
    validity: "Valid 4 months",
    note: "Personalized 1:1 sessions at a limited-time pack rate.",
    featured: false,
  },
];

const privateEvents = [
  {
    title: "Private Group Class",
    subtitle: "Up to 10 guests",
    price: "$350",
    unit: "/ session",
    detail:
      "50-minute custom reformer class with an instructor and exclusive studio use.",
  },
  {
    title: "Extended Private Event",
    subtitle: "90 minutes",
    price: "$500",
    unit: "/ session",
    detail: "Includes class plus a guided stretch or wellness experience.",
  },
  {
    title: "Corporate / Wellness Series",
    subtitle: "Multi-session",
    price: "From $1,200",
    unit: "",
    detail: "A customized program for companies, teams, or retreats.",
  },
];

function extractPerClass(note: string): string | null {
  const match = note.match(/(\$[\d.]+)\s+per class/i);
  return match ? `${match[1]} / class` : null;
}

/* ---------------------------------------------------------------------------
   Presentational building blocks
--------------------------------------------------------------------------- */

function SectionHead({
  label,
  title,
  children,
  id,
  center = false,
  as = "h2",
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const Heading = as;
  return (
    <div className={`lp-head ${center ? "lp-head--center" : ""}`}>
      {label ? <p className="lp-eyebrow">{label}</p> : null}
      <Heading
        id={id}
        className={`lp-title ${id ? "scroll-mt-40" : ""}`}
      >
        {title}
      </Heading>
      {children ? <p className="lp-lead">{children}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   1. YOUR FIRST VISIT
--------------------------------------------------------------------------- */

function FirstVisit() {
  const unlimited = summerResetOfferCards.unlimitedIntro;
  const threeClass = summerResetOfferCards.threeClassIntro;
  const unlimitedServiceId =
    summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro;
  const threeClassServiceId = summerResetMindbodyServiceIds.threeClassIntro;

  // Non-promo fallbacks — first-time intro from standard catalog.
  const standardIntro = standardGroupClassOptions.find(
    (o) => o.title === "New Client Intro Offer"
  );

  return (
    <section
      id="get-started"
      className="lp-section lp-bg-sand scroll-mt-40 pt-36 lg:pt-44"
    >
      <div className="lp-inner lp-stack">
        <Reveal>
          <SectionHead label="Your First Visit" title="Experience Alva" center>
            Choose the perfect way to begin your Pilates journey.
          </SectionHead>
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-3">
            {/* Featured — 15-Day Unlimited */}
            <div
              id="summer-offer-unlimited"
              className="lp-card lp-card--feature pricing-card-full-buy scroll-mt-40"
            >
              <div className="lp-card__top">
                <p className="lp-card__eyebrow">Featured</p>
                <span className="lp-badge">Best Value</span>
              </div>
              <h3 className="lp-name">
                {summerResetEnabled ? unlimited.title : "15-Day Unlimited Intro"}
              </h3>
              <div className="lp-price-row">
                <span className="lp-price lp-price--sm">
                  {summerResetEnabled ? unlimited.price : "$99"}
                </span>
                <span className="lp-was">$149</span>
              </div>
              <div className="lp-divider" />
              <ul className="lp-list">
                <li>One class per day · 15 days</li>
                <li>First-time clients only</li>
              </ul>
              <div style={{ marginTop: "0.75rem" }}>
                <IntroOfferCreditNote className="lp-note" />
              </div>
              <div className="lp-foot">
                <span className="lp-cta">Start Your Intro</span>
              </div>
              <BuyOverlay
                serviceId={unlimitedServiceId}
                fallbackHref={
                  summerResetPurchaseFallbacks.fifteenDayUnlimitedIntro
                }
                fallbackLabel="Start Your Intro — 15-Day Unlimited Intro"
              />
            </div>

            {/* Secondary — 3-Class Intro */}
            <div
              id="summer-offer-intro"
              className="lp-card lp-card--tint pricing-card-full-buy scroll-mt-40"
            >
              <div className="lp-card__top">
                <p className="lp-card__eyebrow">Intro pack</p>
              </div>
              <h3 className="lp-name">
                {summerResetEnabled
                  ? threeClass.title
                  : standardIntro?.title ?? "3-Class Intro"}
              </h3>
              <div className="lp-price-row">
                <span className="lp-price lp-price--sm">
                  {summerResetEnabled ? threeClass.price : "$89"}
                </span>
                {summerResetEnabled ? (
                  <span className="lp-was">$89</span>
                ) : null}
              </div>
              <div className="lp-divider" />
              <ul className="lp-list">
                <li>3 classes · valid 30 days</li>
                <li>First-time clients only</li>
              </ul>
              <div style={{ marginTop: "0.75rem" }}>
                <IntroOfferCreditNote className="lp-note" />
              </div>
              <div className="lp-foot">
                <span className="lp-cta lp-cta--ghost">Start Your Intro</span>
              </div>
              <BuyOverlay
                serviceId={threeClassServiceId}
                fallbackHref={summerResetPurchaseFallbacks.threeClassIntro}
                fallbackLabel="Start Your Intro — 3-Class Intro"
              />
            </div>

            {/* Drop-in — Single Class */}
            <div className="lp-card pricing-card-full-buy">
              <div className="lp-card__top">
                <p className="lp-card__eyebrow">Drop in</p>
              </div>
              <h3 className="lp-name">Single Class</h3>
              <div className="lp-price-row">
                <span className="lp-price lp-price--sm">$39</span>
              </div>
              <div className="lp-divider" />
              <ul className="lp-list">
                <li>Any reformer class</li>
                <li>All levels welcome</li>
              </ul>
              <div className="lp-foot">
                <span className="lp-cta">Book a Class</span>
              </div>
              <BuyOverlay serviceId={getGroupClassServiceId("Single Class")} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   3. MEMBERSHIPS — premium pricing cards
--------------------------------------------------------------------------- */

function MembershipCard({ m }: { m: MembershipOption }) {
  const contractId = m.serviceId ?? membershipWidgetServiceIds[m.title];
  const featured = Boolean(m.featured);
  const tint = Boolean(m.founding && !featured);
  const benefits = benefitBullets(getMembershipDisplayBenefits(m));

  return (
    <div
      className={`lp-card ${
        featured ? "lp-card--feature" : tint ? "lp-card--tint" : ""
      } ${contractId ? "pricing-card-full-buy" : ""}`}
    >
      <div className="lp-card__top">
        <p className="lp-card__eyebrow">
          {m.founding ? "Founding" : "Membership"}
        </p>
        {featured ? <span className="lp-badge">Best Value</span> : null}
      </div>
      <h3 className="lp-name">{m.title}</h3>
      <div className="lp-price-row">
        <span className="lp-price lp-price--sm">{m.price}</span>
        <span className="lp-unit">/mo</span>
        {m.listPrice ? <span className="lp-was">{m.listPrice}</span> : null}
      </div>
      <p className="lp-desc">{m.tagline}</p>
      <div className="lp-divider" />
      <ul className="lp-list">
        <li>{m.classes}</li>
        <li>{m.contract}</li>
        {benefits.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="lp-foot">
        <span className={`lp-cta ${featured ? "" : "lp-cta--ghost"}`}>
          Join {m.title}
        </span>
      </div>
      {contractId ? (
        <BuyOverlay type="contract-link" serviceId={contractId} />
      ) : null}
    </div>
  );
}

function Memberships() {
  return (
    <section id="memberships" className="lp-section lp-bg-ivory scroll-mt-40">
      <span id="founding-pricing" className="block scroll-mt-40" aria-hidden />
      <div className="lp-inner lp-inner--wide lp-stack">
        <Reveal>
          <SectionHead
            label={foundingMemberCopy.badge}
            title="Memberships"
            id="founding-pricing-heading"
          >
            {foundingMemberCopy.pricingStripBody} Auto-renews monthly.
            {summerResetEnabled
              ? " Apply your intro credit when you join within 15 days after your intro expires."
              : " Pause or cancel with 14-day notice."}
          </SectionHead>
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-4">
            {memberships.map((m) => (
              <MembershipCard key={m.title} m={m} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   5. CLASS PACKS — staggered premium cards
--------------------------------------------------------------------------- */

function PackCard({
  item,
  featured = false,
}: {
  item: GroupClassOption;
  featured?: boolean;
}) {
  const serviceId = getGroupClassServiceId(item.title);
  const perClass = extractPerClass(item.note);

  return (
    <div
      className={`lp-card ${featured ? "lp-card--feature" : ""} ${
        serviceId ? "pricing-card-full-buy" : ""
      }`}
    >
      <div className="lp-card__top">
        <p className="lp-card__eyebrow">Class pack</p>
        {featured ? <span className="lp-badge">Best Value</span> : null}
      </div>
      <h3 className="lp-name">{item.title}</h3>
      <div className="lp-price-row">
        <span className="lp-price lp-price--sm">{item.price}</span>
        {item.listPrice ? <span className="lp-was">{item.listPrice}</span> : null}
      </div>
      <div className="lp-divider" />
      <ul className="lp-list">
        <li>{perClass ?? "Flexible per-class rate"}</li>
        <li>Valid {item.validity}</li>
        <li>Non-member rate</li>
      </ul>
      <div className="lp-foot">
        {serviceId ? (
          <span className="lp-cta">Purchase Pack</span>
        ) : (
          <a href="/contact" className="lp-cta lp-cta--ghost">
            Inquire
          </a>
        )}
      </div>
      {serviceId ? <BuyOverlay serviceId={serviceId} /> : null}
    </div>
  );
}

function ClassPacks() {
  const packOffers = getPackOffersForPricing();

  return (
    <section
      id="group-packages"
      className="lp-section lp-bg-sand scroll-mt-40"
    >
      <div className="lp-inner lp-stack">
        <Reveal>
          <SectionHead
            label={summerResetEnabled ? "Summer class pack sale" : "Class packs"}
            title={
              summerResetEnabled ? "Flexibility, elevated" : "Class packs"
            }
            id="summer-offer-packs"
          >
            {summerResetEnabled
              ? "20% off 5, 10, and 20-class packs through August 15 — buy in advance and move on your own schedule."
              : "Flexible packs for drop-in frequency or a regular, unhurried practice."}
          </SectionHead>
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-3 lp-stagger">
            {packOffers.map((item) => (
              <PackCard
                key={item.title}
                item={item}
                featured={item.title === "20-Class Pack"}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   6. PRIVATE TRAINING — editorial split, luxury service cards
--------------------------------------------------------------------------- */

function PrivateCard({ item }: { item: PrivateOption }) {
  const serviceId = privateSessionWidgetServiceIds[item.title];

  return (
    <div
      className={`lp-card lp-card--glass ${
        serviceId ? "pricing-card-full-buy" : ""
      }`}
    >
      <div className="lp-card__top">
        <p className="lp-card__eyebrow">Private training</p>
        {item.featured ? <span className="lp-badge">Best Value</span> : null}
      </div>
      <h3 className="lp-name">{item.title}</h3>
      <div className="lp-price-row">
        <span className="lp-price lp-price--sm">{item.price}</span>
        {item.listPrice ? <span className="lp-was">{item.listPrice}</span> : null}
      </div>
      <div className="lp-divider" />
      <ul className="lp-list">
        <li>{item.perSession}</li>
        {item.validity ? <li>{item.validity}</li> : null}
        <li>Personalized 1:1 programming</li>
      </ul>
      <div className="lp-foot">
        {serviceId ? (
          <span className="lp-cta">Book Private Training</span>
        ) : (
          <a href="/contact" className="lp-cta">
            Inquire
          </a>
        )}
      </div>
      {serviceId ? <BuyOverlay serviceId={serviceId} /> : null}
    </div>
  );
}

function PrivateTraining() {
  return (
    <>
      <div className="lp-fade-to-char" aria-hidden />
      <section
        id="private-training"
        className="lp-section lp-bg-char scroll-mt-40"
      >
        <div className="lp-inner lp-inner--wide lp-stack">
          <Reveal>
            <SectionHead label="Private training" title="One-on-one, by design">
              Focused, personalized coaching on the reformer. Mon–Fri
              11 AM–4 PM, weekends by appointment.
            </SectionHead>
          </Reveal>

          <Reveal stagger>
            <div className="lp-grid-4">
              {privatesNonMember.map((item) => (
                <PrivateCard key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <div className="lp-fade-from-char" aria-hidden />
    </>
  );
}

/* ---------------------------------------------------------------------------
   Private events — studio rentals
--------------------------------------------------------------------------- */

function PrivateEvents() {
  return (
    <section className="lp-section lp-bg-stone">
      <div className="lp-inner lp-stack">
        <Reveal>
          <SectionHead
            label="Studio rentals"
            title="Private events & experiences"
            center
          >
            Host your next gathering in our Valencia studio.
          </SectionHead>
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-3">
            {privateEvents.map((item) => (
              <div key={item.title} className="lp-card">
                <div className="lp-card__top">
                  <p className="lp-card__eyebrow">{item.subtitle}</p>
                </div>
                <h3 className="lp-name">{item.title}</h3>
                <div className="lp-price-row">
                  <span className="lp-price lp-price--sm">{item.price}</span>
                  {item.unit ? <span className="lp-unit">{item.unit}</span> : null}
                </div>
                <div className="lp-divider" />
                <p className="lp-desc">{item.detail}</p>
                <div className="lp-foot">
                  <a href="/contact" className="lp-cta lp-cta--ghost">
                    Inquire to book
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Final CTA
--------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <>
      <div className="lp-fade-to-char" aria-hidden />
      <section className="lp-section lp-bg-char text-center">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <p className="lp-eyebrow">Begin</p>
            <h2 className="lp-title" style={{ marginTop: "1rem" }}>
              Book your first class
            </h2>
            <p
              className="lp-lead"
              style={{ margin: "1.25rem auto 0", textAlign: "center" }}
            >
              Reserve your spot and experience intentional movement in a
              considered Valencia studio.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a href="/book" className="btn-primary min-w-[11rem]">
                Book a Class
              </a>
              <Link href="/contact" className="btn-ghost-on-dark min-w-[11rem]">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   PAGE
--------------------------------------------------------------------------- */

export default function PricingPage() {
  useMindbodyHealcodeScript();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    scheduleScrollToSection(hash, 80);
    scheduleScrollToSection(hash, 300);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--lp-ivory)] text-foreground">
      <Header />

      <span
        id={summerResetSectionId}
        aria-hidden
        className="block scroll-mt-40"
      />
      {/* Anchor for the homepage hero "View Summer Offers" CTA */}
      <span id="summer-reset" aria-hidden className="block scroll-mt-40" />
      <FirstVisit />
      <Memberships />
      {/* Anchor for the homepage hero "20% off class packs" row */}
      <span id="class-packs" aria-hidden className="block scroll-mt-40" />
      <ClassPacks />
      <PrivateTraining />
      <PrivateEvents />
      <FinalCta />

      <Footer />
    </div>
  );
}
