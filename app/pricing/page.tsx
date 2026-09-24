"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroOfferCreditNote from "../components/IntroOfferCreditNote";
import FallbackPurchaseLink from "../components/summer-reset/FallbackPurchaseLink";
import { Reveal } from "../components/sections/Reveal";
import { useMindbodyHealcodeScript } from "../hooks/useMindbodyHealcodeScript";
import {
  scheduleScrollToSection,
  scrollToSection,
} from "../lib/scrollToSection";
import { foundingMemberCopy } from "../lib/foundingMemberCopy";
import {
  getPackOffersForPricing,
  type GroupClassOption,
} from "../lib/groupClassPricing";
import {
  formatCommitmentTerm,
  formatMonthlyPrice,
  formatPerClassPrice,
  getDefaultCommitment,
  getPerClassPrice,
  getTierBenefits,
  membershipTiers,
  type MembershipCommitment,
  type MembershipTier,
} from "../lib/membershipPricing";
import {
  summerResetMindbodyServiceIds,
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

const privateSessionWidgetServiceIds: Record<string, string> = {
  "Single Private": "100014",
  "3-Pack Private": "100040",
  "5-Pack Private": "100015",
  "10-Pack Private": "100016",
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
  return match ? `${match[1]} per class` : null;
}

/** Unlimited has no per-class figure: the rate assumes a class every day. */
function perClassLabel(tier: MembershipTier, option: MembershipCommitment) {
  if (tier.classesPerMonth === null) return null;
  return `${formatPerClassPrice(getPerClassPrice(tier, option))} per class`;
}

/** Lowest per-class rate across memberships, excluding Unlimited. */
function lowestMembershipPerClass(): number {
  return Math.min(
    ...membershipTiers
      .filter((tier) => tier.classesPerMonth !== null)
      .flatMap((tier) =>
        tier.commitments.map((option) => getPerClassPrice(tier, option))
      )
  );
}

/** Sticky section nav targets, in page order. */
const pricingSections = [
  { id: "get-started", label: "New clients" },
  { id: "memberships", label: "Memberships" },
  { id: "group-packages", label: "Class packs" },
  { id: "private-training", label: "Private training" },
  { id: "private-events", label: "Events" },
];

/** Sections below the nav's last item — not in the nav. */
const pricingSectionsAfterNav = ["compare-memberships", "pricing-faq"];

/** In-page jump that accounts for the fixed header + sticky section nav. */
function jumpToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  // preventDefault also tells the global Lenis hash handler (fixed 8rem
  // offset) to skip this click.
  event.preventDefault();
  scrollToSection(id);
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
   INTRO — "Where do you fit?" chooser
--------------------------------------------------------------------------- */

function PricingIntro() {
  return (
    <section className="lp-section lp-section--intro lp-bg-ivory">
      <div className="lp-inner">
        <Reveal>
          <SectionHead
            as="h1"
            title="Find the right way to practice"
            center
          >
            Start with an intro, commit with a membership, or keep it flexible
            with a class pack.
          </SectionHead>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   STICKY SECTION NAV
--------------------------------------------------------------------------- */

function PricingSubnav() {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const [fade, setFade] = useState({ start: false, end: false });

  // Stick directly under the fixed header, whose height changes on scroll.
  useEffect(() => {
    const nav = navRef.current;
    const header = document.querySelector("header");
    if (!nav || !header) return;

    const sync = () =>
      nav.style.setProperty(
        "--lp-subnav-top",
        `${header.getBoundingClientRect().height}px`
      );
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Track the section under the nav, and whether the nav is stuck.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navRef.current;
      const header = document.querySelector("header");
      if (!nav) return;
      const navRect = nav.getBoundingClientRect();
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      setStuck(window.scrollY > 0 && navRect.top <= headerBottom + 1);

      // Generous line so a section counts as active right after a jump lands.
      const line = navRect.bottom + 64;
      let current: string | null = null;
      // Sections after the nav's last item clear the highlight.
      for (const id of [
        ...pricingSections.map((section) => section.id),
        ...pricingSectionsAfterNav,
      ]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(
        pricingSectionsAfterNav.includes(current ?? "") ? null : current
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Edge fades hint that the track scrolls sideways (small screens).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const sync = () =>
      setFade({
        start: list.scrollLeft > 1,
        end: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      });
    sync();
    list.addEventListener("scroll", sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, []);

  // Keep the active label visible on narrow screens (horizontal scroll only).
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const link = list.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!link) return;
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

  return (
    <nav
      ref={navRef}
      className={`lp-subnav ${stuck ? "lp-subnav--stuck" : ""}`}
      aria-label="Pricing sections"
      data-sticky-subnav
    >
      <div className="lp-subnav__track">
        <ul
          ref={listRef}
          className={`lp-subnav__list ${
            fade.start ? "lp-subnav__list--fade-start" : ""
          } ${fade.end ? "lp-subnav__list--fade-end" : ""}`}
        >
          {pricingSections.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  data-section={id}
                  className={`lp-subnav__link ${
                    active ? "lp-subnav__link--active" : ""
                  }`}
                  aria-current={active ? "true" : undefined}
                  onClick={(event) => jumpToSection(event, id)}
                >
                  {active ? (
                    <motion.span
                      layoutId="lp-subnav-underline"
                      className="lp-subnav__underline"
                      aria-hidden
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 38 }
                      }
                    />
                  ) : null}
                  <span className="lp-subnav__label">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   1. YOUR FIRST VISIT
--------------------------------------------------------------------------- */

function FirstVisit() {
  const unlimitedServiceId =
    summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro;
  const threeClassServiceId = summerResetMindbodyServiceIds.threeClassIntro;

  return (
    <section
      id="get-started"
      className="lp-section lp-section--after-subnav lp-bg-sand scroll-mt-40"
    >
      <div className="lp-inner lp-stack">
        <Reveal>
          <SectionHead label="Your first visit" title="Experience Alva" center />
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-3">
            {/* Featured — 15-Day Unlimited */}
            <div
              id="summer-offer-unlimited"
              className="lp-card lp-card--tint pricing-card-full-buy scroll-mt-40"
            >
              <div className="lp-card__top">
                <p className="lp-card__eyebrow">Featured</p>
                <span className="lp-badge">Best Value</span>
              </div>
              <h3 className="lp-name">15-Day Unlimited Intro</h3>
              <div className="lp-price-row">
                <span className="lp-price lp-price--sm">$99</span>
              </div>
              <p className="lp-per-class">As low as $6.60 per class</p>
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
              className="lp-card pricing-card-full-buy scroll-mt-40"
            >
              <div className="lp-card__top">
                <p className="lp-card__eyebrow">Intro pack</p>
              </div>
              <h3 className="lp-name">3-Class Intro</h3>
              <div className="lp-price-row">
                <span className="lp-price lp-price--sm">$69</span>
              </div>
              <p className="lp-per-class">$23 per class</p>
              <div className="lp-divider" />
              <ul className="lp-list">
                <li>3 classes · valid 30 days</li>
                <li>First-time clients only</li>
              </ul>
              <div style={{ marginTop: "0.75rem" }}>
                <IntroOfferCreditNote className="lp-note" />
              </div>
              <div className="lp-foot">
                <span className="lp-cta">Start Your Intro</span>
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
   3. MEMBERSHIPS — editorial cards; 12-month default with term selection
--------------------------------------------------------------------------- */

function MembershipBuyControl({
  ctaLabel,
  option,
}: {
  ctaLabel: string;
  option: MembershipCommitment;
}) {
  const hasPurchase = Boolean(option.serviceId || option.purchaseUrl);

  return (
    <div
      className={`lp-foot lp-foot--buy ${
        hasPurchase ? "pricing-card-cta-buy" : ""
      }`}
    >
      {hasPurchase ? (
        <span className="lp-cta">{ctaLabel}</span>
      ) : (
        <a href="/contact" className="lp-cta">
          {ctaLabel}
        </a>
      )}
      {option.serviceId ? (
        <div className="pricing-card-cta-buy-overlay" key={option.id}>
          {renderHealcodeWidget("contract-link", option.serviceId)}
        </div>
      ) : option.purchaseUrl ? (
        <div className="pricing-card-cta-buy-overlay" key={option.id}>
          <FallbackPurchaseLink
            href={option.purchaseUrl}
            label={`${ctaLabel} — ${option.months}-month`}
          />
        </div>
      ) : null}
    </div>
  );
}

function CommitmentToggle({
  tier,
  selectedId,
  onSelect,
}: {
  tier: MembershipTier;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const options = tier.commitments;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = options.findIndex((o) => o.id === selectedId);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % options.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      nextIndex = options.length - 1;
    } else {
      return;
    }

    const nextId = options[nextIndex].id;
    onSelect(nextId);
    event.currentTarget
      .querySelector<HTMLButtonElement>(`[data-commit-id="${nextId}"]`)
      ?.focus();
  }

  return (
    <div
      className="lp-commit-toggle"
      role="radiogroup"
      aria-label={`${tier.name} commitment length`}
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            data-commit-id={option.id}
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            className={`lp-commit-option ${
              isSelected ? "lp-commit-option--selected" : ""
            }`}
            onClick={() => onSelect(option.id)}
          >
            <span className="lp-commit-option__term">
              {formatCommitmentTerm(option.months)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MembershipCard({ tier }: { tier: MembershipTier }) {
  const hasChoices = tier.commitments.length > 1;
  const defaultOption = getDefaultCommitment(tier);
  const [selectedId, setSelectedId] = useState(defaultOption.id);
  const [priceKey, setPriceKey] = useState(0);

  const selected =
    tier.commitments.find((c) => c.id === selectedId) ?? defaultOption;
  const perClass = perClassLabel(tier, selected);

  function selectCommitment(id: string) {
    if (id === selectedId) return;
    setSelectedId(id);
    setPriceKey((k) => k + 1);
  }

  return (
    <div
      className={`lp-card lp-card--membership ${
        tier.tint ? "lp-card--tint" : ""
      }`}
    >
      <div className="lp-card__top">
        <p className="lp-card__eyebrow">Membership</p>
        {tier.badge ? <span className="lp-badge">{tier.badge}</span> : null}
      </div>
      <h3 className="lp-name">{tier.name}</h3>
      <p className="lp-membership-classes">{tier.frequency}</p>
      {hasChoices ? (
        <CommitmentToggle
          tier={tier}
          selectedId={selected.id}
          onSelect={selectCommitment}
        />
      ) : null}
      <div className="lp-price-row">
        <span key={priceKey} className="lp-price lp-price--sm lp-price--fade">
          {formatMonthlyPrice(selected.monthlyPrice)}
        </span>
        {tier.regularPrice ? (
          <span className="lp-was">
            <span className="sr-only">Regular price </span>
            {formatMonthlyPrice(tier.regularPrice)}
          </span>
        ) : null}
        <span className="lp-unit">/month</span>
      </div>
      <p className="lp-commit-line" aria-live="polite">
        {/* The term tab already states the commitment; keep it for screen
            readers so toggling still announces the selected contract. */}
        <span className={hasChoices ? "sr-only" : undefined}>
          {selected.commitmentLabel}
        </span>
        {perClass ? (
          <span className="lp-per-class lp-per-class--inline">{perClass}</span>
        ) : null}
      </p>
      <p className="lp-desc">{tier.description}</p>
      <div className="lp-divider" />

      <ul className="lp-list">
        {getTierBenefits(tier).map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <MembershipBuyControl ctaLabel={tier.ctaLabel} option={selected} />
    </div>
  );
}

function Memberships() {
  return (
    <section id="memberships" className="lp-section lp-bg-ivory scroll-mt-40">
      <span id="founding-pricing" className="block scroll-mt-40" aria-hidden />
      <div className="lp-inner lp-inner--wide lp-stack">
        <Reveal>
          <SectionHead title="Memberships" id="founding-pricing-heading">
            {foundingMemberCopy.pricingStripBody} Auto-renews monthly. Pause or
            cancel with 14-day notice.
          </SectionHead>
        </Reveal>

        <Reveal stagger>
          <div className="lp-grid-4 lp-grid-4--memberships">
            {membershipTiers.map((tier) => (
              <MembershipCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NotIncluded() {
  return (
    <span className="lp-compare__none">
      <span aria-hidden>—</span>
      <span className="sr-only">Not included</span>
    </span>
  );
}

function fromPrice(values: number[], format: (n: number) => string) {
  const low = Math.min(...values);
  return values.length > 1 ? `From ${format(low)}` : format(low);
}

const compareRows: {
  label: string;
  cell: (tier: MembershipTier) => ReactNode;
}[] = [
  {
    label: "Classes per month",
    cell: (tier) => tier.classesPerMonth ?? "Unlimited",
  },
  {
    label: "Monthly price",
    cell: (tier) =>
      fromPrice(
        tier.commitments.map((c) => c.monthlyPrice),
        formatMonthlyPrice
      ),
  },
  {
    label: "Price per class",
    cell: (tier) => {
      const price = fromPrice(
        tier.commitments.map((c) => getPerClassPrice(tier, c)),
        formatPerClassPrice
      );
      return tier.classesPerMonth === null
        ? `${price.replace("From", "As low as")} at 1 a day`
        : price;
    },
  },
  {
    label: "Commitment",
    cell: (tier) =>
      `${[...tier.commitments]
        .map((c) => c.months)
        .sort((a, b) => a - b)
        .join(" or ")} months`,
  },
  {
    label: "Off private training",
    cell: (tier) =>
      tier.perks.privatesDiscount ? (
        `${tier.perks.privatesDiscount}%`
      ) : (
        <NotIncluded />
      ),
  },
  {
    label: "Off extra packs & retail",
    cell: (tier) =>
      tier.perks.packsRetailDiscount ? (
        `${tier.perks.packsRetailDiscount}%`
      ) : (
        <NotIncluded />
      ),
  },
  {
    label: "Guest passes",
    cell: (tier) =>
      tier.perks.guestPassesPerMonth ? (
        `${tier.perks.guestPassesPerMonth} / month`
      ) : (
        <NotIncluded />
      ),
  },
  {
    label: "Booking",
    cell: (tier) =>
      tier.perks.booking === "early" ? (
        "Early access"
      ) : tier.perks.booking === "priority" ? (
        "Priority"
      ) : (
        <NotIncluded />
      ),
  },
  {
    label: "Waitlist priority",
    cell: (tier) =>
      tier.perks.waitlistPriority ? (
        <span className="lp-compare__yes">
          <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">Included</span>
        </span>
      ) : (
        <NotIncluded />
      ),
  },
];

function MembershipCompare() {
  return (
    <section
      id="compare-memberships"
      className="lp-section lp-bg-ivory scroll-mt-40"
    >
      <div className="lp-inner lp-inner--wide lp-stack">
        <Reveal>
          <SectionHead title="Compare all memberships" center>
            Every membership side by side.
          </SectionHead>
        </Reveal>

        <Reveal>
          <div className="lp-compare">
            <div className="lp-compare__scroll">
              <table className="lp-compare__table">
                <caption className="sr-only">Membership comparison</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Feature</span>
                    </th>
                    {membershipTiers.map((tier) => (
                      <th key={tier.id} scope="col">
                        <span className="lp-compare__tier">{tier.name}</span>
                        {tier.badge ? (
                          <span className="lp-compare__badge">{tier.badge}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {membershipTiers.map((tier) => (
                        <td key={tier.id}>{row.cell(tier)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      className={`lp-card ${featured ? "lp-card--tint" : ""} ${
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
      {perClass ? <p className="lp-per-class">{perClass}</p> : null}
      <div className="lp-divider" />
      <ul className="lp-list">
        <li>Valid {item.validity} from first class</li>
        <li>No commitment</li>
        <li>Non-member rate</li>
      </ul>
      <div className="lp-foot">
        {serviceId ? (
          <span className="lp-cta">Purchase Pack</span>
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
            label="Class packs"
            title="Class packs"
            id="summer-offer-packs"
          >
            Flexible packs for drop-in frequency or a regular, unhurried
            practice.
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
      {item.title !== "Single Private" ? (
        <p className="lp-per-class">
          {item.perSession.replace(" / ", " per ")}
        </p>
      ) : null}
      <div className="lp-divider" />
      <ul className="lp-list">
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
              Focused, personalized coaching on the reformer. Mon–Fri 11 AM–4
              PM, weekends by appointment.
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
    <section
      id="private-events"
      className="lp-section lp-bg-stone scroll-mt-40"
    >
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
                  <a href="/contact" className="lp-cta">
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
   Pricing FAQ — answers mirror the studio policies in app/data/faq.json
--------------------------------------------------------------------------- */

function PricingFaq() {
  const packOffers = getPackOffersForPricing();
  const packValidity = packOffers
    .map((item) => `${item.validity} (${item.title.replace(" Pack", "")})`)
    .join(", ");

  const faqs: { q: string; a: ReactNode }[] = [
    {
      q: "Which intro offer should I choose?",
      a: "Both are for first-time clients. The 15-Day Unlimited Intro ($99) gives you one class a day for 15 days — best if you can come often. The 3-Class Intro ($69) gives you three classes over 30 days — a lighter way to try the studio.",
    },
    {
      q: "Membership or class pack — which is better for me?",
      a: `If you'll come at least once a week, a membership gives you the lowest price per class — as low as ${formatPerClassPrice(
        lowestMembershipPerClass()
      )}. Class packs suit a changing schedule: no commitment, and you use them at your own pace before they expire.`,
    },
    {
      q: "Is there a commitment on memberships?",
      a: "Yes. Essential has a 6-month commitment; Core, Elite and Unlimited are available with a 6- or 12-month commitment, and 12 months gives you the lower monthly rate. Memberships are billed automatically each month.",
    },
    {
      q: "Can I pause my membership?",
      a: "Yes — for up to 30 days per commitment period, with at least 14 days' written notice. Monthly payments continue during a pause, and the paused time is added to the end of your commitment so you don't lose any.",
    },
    {
      q: "How do I cancel my membership?",
      a: "Give at least 14 days' written notice. Cancelling before your commitment period ends requires paying the remaining balance of your membership agreement.",
    },
    {
      q: "Do class packs expire?",
      a: `Packs activate on your first class and are valid for ${packValidity}.`,
    },
    {
      q: "What if I need to cancel a class?",
      a: "Cancel at least 12 hours before class at no charge. Late cancellations are $15 (pack credits are returned). A no-show is $25 on a membership; on a class pack the credit is forfeited.",
    },
    {
      q: "Are purchases refundable?",
      a: "All purchases are final. Class packs, memberships and private sessions are non-refundable and non-transferable.",
    },
  ];

  return (
    <section id="pricing-faq" className="lp-section lp-bg-stone scroll-mt-40">
      <div className="lp-inner lp-stack">
        <Reveal>
          <SectionHead label="Good to know" title="Pricing questions" center />
        </Reveal>

        <div className="lp-faq">
          {faqs.map(({ q, a }) => (
            <details key={q} className="lp-faq__item">
              <summary className="lp-faq__q">
                <span>{q}</span>
                <ChevronDown
                  className="lp-faq__chevron h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </summary>
              <p className="lp-faq__a">{a}</p>
            </details>
          ))}
          <p className="lp-faq__more">
            Full details in our{" "}
            <Link href="/faq#policies">studio policies</Link>.
          </p>
        </div>
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
      <span id="summer-reset" aria-hidden className="block scroll-mt-40" />
      <PricingIntro />
      <PricingSubnav />
      <FirstVisit />
      <Memberships />
      <span id="class-packs" aria-hidden className="block scroll-mt-40" />
      <ClassPacks />
      <PrivateTraining />
      <PrivateEvents />
      <MembershipCompare />
      <PricingFaq />
      <FinalCta />

      <Footer />
    </div>
  );
}
