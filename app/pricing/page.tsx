"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoundingMemberPricingStrip from "../components/FoundingMemberPricingStrip";
import SummerDeadlineBadge from "../components/summer-reset/SummerDeadlineBadge";
import SummerOfferCard from "../components/summer-reset/SummerOfferCard";
import SummerPriceDisplay from "../components/summer-reset/SummerPriceDisplay";
import OfferDetailList from "../components/summer-reset/OfferDetailList";
import FallbackPurchaseLink from "../components/summer-reset/FallbackPurchaseLink";
import { renderHealcodePricingLink } from "../lib/mindbodyHealcodeWidgets";
import { Reveal } from "../components/sections/Reveal";
import { useMindbodyHealcodeScript } from "../hooks/useMindbodyHealcodeScript";
import { scheduleScrollToSection } from "../lib/scrollToSection";
import {
  getIntroOffersForPricing,
  getPackOffersForPricing,
  type GroupClassOption,
} from "../lib/groupClassPricing";
import {
  summerResetEnabled,
  summerResetMindbodyServiceIds,
  summerResetOfferCards,
  summerResetPurchaseFallbacks,
} from "../lib/summerResetCopy";

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

function GroupClassOptionPrice({ item }: { item: GroupClassOption }) {
  if (item.listPrice) {
    return (
      <SummerPriceDisplay
        price={item.price}
        listPrice={item.listPrice}
        size="md"
        align="right"
      />
    );
  }
  return (
    <span className="font-heading text-lg sm:text-xl text-primary whitespace-nowrap px-3 py-1.5 rounded-full bg-primary/10">
      {item.price}
    </span>
  );
}

/** Mindbody pricing-link service IDs for Group Reformer class options */
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

/** Mindbody contract-link service IDs for membership tiers */
const membershipWidgetServiceIds: Record<string, string> = {
  Essential: "111",
  Core: "112",
  Elite: "109",
  Unlimited: "110",
};

const memberships = [
  {
    title: "Essential",
    price: "$119/mo",
    classes: "4 classes / month",
    contract: "3-month contract",
    benefits: "5% off additional packs & retail.",
    summerBenefits:
      "5% off additional packs & retail + 1 guest pass / month during Summer Reset.",
  },
  {
    title: "Core",
    price: "$219/mo",
    classes: "8 classes / month",
    contract: "3-month contract",
    benefits: "10% off privates & priority booking.",
    summerBenefits:
      "10% off privates & priority booking + 1 guest pass / month during Summer Reset.",
  },
  {
    title: "Elite",
    price: "$289/mo",
    classes: "12 classes / month",
    contract: "6-month contract",
    benefits: "15% off privates + 1 guest pass / month.",
    summerBenefits:
      "15% off privates + 2 guest passes / month during Summer Reset.",
  },
  {
    title: "Unlimited",
    price: "$399/mo",
    classes: "Unlimited — as many classes per day as you like",
    contract: "6-month contract",
    benefits:
      "20% off privates + 1 guest pass / month + early booking access + priority on the waitlist.",
    summerBenefits:
      "20% off privates + 2 guest passes / month during Summer Reset + early booking access + priority on the waitlist.",
    featured: true,
  },
];

function getMembershipDisplayBenefits(m: (typeof memberships)[number]) {
  if (summerResetEnabled && "summerBenefits" in m && m.summerBenefits) {
    return m.summerBenefits;
  }
  return m.benefits;
}

/** Mindbody pricing-link service IDs for Bring-a-Friend / guest options */
const guestOptionWidgetServiceIds: Record<string, string> = {
  "Member Guest Pass": "100012",
};

const guestOptions = [
  {
    title: "Member Guest Pass",
    price: "$20 / guest",
    detail: "Guest must attend with member. Limit 3 discounted visits per guest.",
  },
  {
    title: "Elite & Unlimited Members",
    price: "1 Free Guest Pass / month",
    detail: "Additional guests $20 each.",
  },
];

const summerGuestOptions = [
  {
    title: "Member Guest Pass",
    price: "$20 / guest",
    detail: "Guest must attend with member. Limit 3 discounted visits per guest.",
  },
  {
    title: "Elite & Unlimited Members",
    price: "2 Free Guest Passes / month",
    detail: "Summer Reset perk through August 15. Additional guests $20 each.",
  },
  {
    title: "Essential & Core Members",
    price: "1 Free Guest Pass / month",
    detail: "Summer Reset perk through August 15. Additional guests $20 each.",
  },
];

/** Mindbody pricing-link service IDs for Private Reformer Sessions (non-member) */
const privateSessionWidgetServiceIds: Record<string, string> = {
  "Single Private": "100014",
};

const privatesNonMember = [
  { title: "Single Private", price: "$120", validity: "—", note: "60-minute personalized session." },
  { title: "5-Pack Private", price: "$575", validity: "3 months", note: "$115 per session." },
  { title: "10-Pack Private", price: "$1,100", validity: "4 months", note: "$110 per session." },
];

const memberPrivateRates = [
  { tier: "Essential (5%)", single: "$114", fivePack: "$545", tenPack: "$1,045" },
  { tier: "Core (10%)", single: "$108", fivePack: "$520", tenPack: "$990" },
  { tier: "Elite (15%)", single: "$102", fivePack: "$490", tenPack: "$935" },
  { tier: "Unlimited (20%)", single: "$96", fivePack: "$460", tenPack: "$880" },
];

const privateEvents = [
  {
    title: "Private Group Class (up to 10 people)",
    price: "$350 / session",
    detail: "50-minute custom reformer class with instructor & exclusive studio use.",
  },
  {
    title: "Extended Private Event (90 min)",
    price: "$500 / session",
    detail: "Includes class + guided stretch or wellness experience.",
  },
  {
    title: "Corporate / Wellness Series",
    price: "From $1,200",
    detail: "Multi-session customized program for companies or retreats.",
  },
];

export default function PricingPage() {
  useMindbodyHealcodeScript();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    scheduleScrollToSection(hash, 80);
    scheduleScrollToSection(hash, 300);
  }, []);

  const introTopOffers = getIntroOffersForPricing();
  const remainingGroupOffers = getPackOffersForPricing();

  const summerUnlimited = summerResetOfferCards.unlimitedIntro;
  const summerThreeClass = summerResetOfferCards.threeClassIntro;
  const singleClassOffer = introTopOffers.find((o) => o.title === "Single Class");
  const unlimitedServiceId = summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro;
  const threeClassServiceId = summerResetMindbodyServiceIds.threeClassIntro;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {!summerResetEnabled && (
        <>
          {/* Hero Section */}
          <section className="pt-40 pb-16 px-6 lg:px-8">
            <div className="max-w-[100rem] mx-auto">
              <Reveal>
                <div className="text-center space-y-6">
                  <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                    Pricing & Memberships
                  </h1>
                  <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                    Choose the option that fits your practice—packs, memberships, privates, and events.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <FoundingMemberPricingStrip />
        </>
      )}

      {/* Top Intro Offers */}
      <section
        id="get-started"
        className={`px-6 lg:px-8 scroll-mt-40 ${
          summerResetEnabled ? "pt-36 sm:pt-40 pb-12 lg:pb-14" : "py-16"
        }`}
      >
        <div className="max-w-[100rem] mx-auto space-y-5 lg:space-y-6">
          <Reveal>
            <div className="flex flex-col gap-3 max-w-3xl">
              {summerResetEnabled ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                      Get Started
                    </p>
                    <SummerDeadlineBadge />
                  </div>
                  <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
                    Summer Intro Offers
                  </h1>
                  <p className="font-paragraph text-sm sm:text-base text-charcoal/70 leading-relaxed">
                    New-client summer pricing · exclusive intro rates through August 15
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                    Get Started
                  </p>
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                    Single Class & Intro Offer
                  </h2>
                </>
              )}
            </div>
          </Reveal>

          {summerResetEnabled ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              <Reveal delay={0.05} className="h-full">
                <SummerOfferCard
                  featured
                  compact
                  badge={summerUnlimited.badge}
                  title={summerUnlimited.title}
                  price={summerUnlimited.price}
                  description={summerUnlimited.description}
                  cta={summerUnlimited.cta}
                  showIntroCredit
                  ariaLabel={`${summerUnlimited.title}, ${summerUnlimited.price}. ${summerUnlimited.cta}`}
                  overlay={
                    unlimitedServiceId ? (
                      renderHealcodePricingLink(
                        unlimitedServiceId,
                        summerUnlimited.cta
                      )
                    ) : (
                      <FallbackPurchaseLink
                        href={summerResetPurchaseFallbacks.fifteenDayUnlimitedIntro}
                        label={`${summerUnlimited.cta} — ${summerUnlimited.title}`}
                      />
                    )
                  }
                />
              </Reveal>

              <Reveal delay={0.1} className="h-full">
                <SummerOfferCard
                  compact
                  title={summerThreeClass.title}
                  price={summerThreeClass.price}
                  listPrice="$89"
                  description={summerThreeClass.description}
                  cta={summerThreeClass.cta}
                  showIntroCredit
                  ariaLabel={`${summerThreeClass.title}, ${summerThreeClass.price}. ${summerThreeClass.cta}`}
                  overlay={
                    threeClassServiceId ? (
                      renderHealcodePricingLink(
                        threeClassServiceId,
                        summerThreeClass.cta
                      )
                    ) : (
                      <FallbackPurchaseLink
                        href={summerResetPurchaseFallbacks.threeClassIntro}
                        label={`${summerThreeClass.cta} — ${summerThreeClass.title}`}
                      />
                    )
                  }
                />
              </Reveal>

              {singleClassOffer && (
                <Reveal delay={0.15} className="h-full">
                  <SummerOfferCard
                    compact
                    title={singleClassOffer.title}
                    price={singleClassOffer.price}
                    description={singleClassOffer.note}
                    details={[
                      "All levels welcome",
                      "Join any reformer group class",
                      "Advance reservation required",
                    ]}
                    cta="Buy Now"
                    ariaLabel={`${singleClassOffer.title}, ${singleClassOffer.price}. Buy Now`}
                    overlay={renderHealcodeWidget(
                      "pricing-link",
                      groupClassWidgetServiceIds["Single Class"]
                    )}
                  />
                </Reveal>
              )}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {introTopOffers.map((item, idx) => {
              const serviceId = getGroupClassServiceId(item.title);
              return (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 h-full flex flex-col p-6 ${
                      serviceId ? "pricing-card-full-buy cursor-pointer" : ""
                    }`}
                  >
                    <div
                      className={`relative z-0 flex flex-col gap-4 h-full min-h-0 ${
                        serviceId ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                      {item.badge && (
                        <span className="inline-flex self-start text-[10px] font-bold uppercase tracking-[0.18em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          {item.badge}
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-3 pt-2">
                        <div className="space-y-1">
                          <h3 className="font-heading text-2xl font-semibold text-charcoal">
                            {item.title}
                          </h3>
                          <p className="font-paragraph text-xs uppercase tracking-[0.16em] text-charcoal/50">
                            {item.validity}
                          </p>
                        </div>
                        <GroupClassOptionPrice item={item} />
                      </div>
                      <div className="h-px bg-foreground/5" />
                      <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                        {item.note}
                      </p>
                      {serviceId && (
                        <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                          Buy Now
                        </p>
                      )}
                    </div>
                    {serviceId && (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("pricing-link", serviceId)}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* Group Reformer Classes */}
      <section
        id="group-packages"
        className={`px-6 lg:px-8 scroll-mt-40 ${
          summerResetEnabled ? "py-12 lg:py-14 bg-secondary/25" : "py-16"
        }`}
      >
        <div className="max-w-[100rem] mx-auto space-y-5 lg:space-y-6">
          <Reveal>
            <div className="flex flex-col gap-3 max-w-3xl">
              {summerResetEnabled ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                      Class Packs
                    </p>
                    <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      20% Off
                    </span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
                    Summer Class Pack Sale
                  </h2>
                  <p className="font-paragraph text-sm sm:text-base text-charcoal/70 leading-relaxed">
                    20% off 5, 10, and 20-class packs · ends August 15
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                    Group Reformer Classes
                  </p>
                  <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                    Non-Member Packages
                  </h2>
                </>
              )}
            </div>
          </Reveal>

          {summerResetEnabled ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingGroupOffers.map((item, idx) => {
                const serviceId = getGroupClassServiceId(item.title);
                return (
                  <Reveal key={item.title} delay={idx * 0.05}>
                    <div
                      className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 h-full flex flex-col p-6 ${
                        serviceId ? "pricing-card-full-buy cursor-pointer" : ""
                      }`}
                    >
                      <div
                        className={`relative z-0 flex flex-col gap-4 h-full min-h-0 ${
                          serviceId ? "pointer-events-none select-none" : ""
                        }`}
                      >
                        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="flex items-start justify-between gap-3 pt-2">
                          <div className="space-y-1 min-w-0">
                            <span className="inline-flex text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                              20% Off
                            </span>
                            <h3 className="font-heading text-2xl font-semibold text-charcoal">
                              {item.title}
                            </h3>
                            <p className="font-paragraph text-xs uppercase tracking-[0.16em] text-charcoal/50">
                              Valid {item.validity}
                            </p>
                          </div>
                          <GroupClassOptionPrice item={item} />
                        </div>
                        <div className="h-px bg-foreground/5" />
                        <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                          {item.note}
                        </p>
                        {item.details && item.details.length > 0 && (
                          <OfferDetailList items={item.details} />
                        )}
                        {serviceId && (
                          <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                            Buy Now
                          </p>
                        )}
                      </div>
                      {serviceId && (
                        <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                          {renderHealcodeWidget("pricing-link", serviceId)}
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingGroupOffers.map((item, idx) => {
              const serviceId = getGroupClassServiceId(item.title);
              return (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 h-full flex flex-col p-6 ${
                      serviceId ? "pricing-card-full-buy cursor-pointer" : ""
                    }`}
                  >
                    <div
                      className={`relative z-0 flex flex-col gap-4 h-full min-h-0 ${
                        serviceId ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                      <div className="flex items-start justify-between gap-3 pt-2">
                        <div className="space-y-1">
                          <h3 className="font-heading text-2xl font-semibold text-charcoal">
                            {item.title}
                          </h3>
                          <p className="font-paragraph text-xs uppercase tracking-[0.16em] text-charcoal/50">
                            {item.validity}
                          </p>
                        </div>
                        <GroupClassOptionPrice item={item} />
                      </div>
                      <div className="h-px bg-foreground/5" />
                      <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                        {item.note}
                      </p>
                      {serviceId && (
                        <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                          Buy Now
                        </p>
                      )}
                    </div>
                    {serviceId && (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("pricing-link", serviceId)}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {summerResetEnabled && <FoundingMemberPricingStrip />}

      {/* Memberships */}
      <section
        id="memberships"
        className={`px-6 lg:px-8 bg-secondary/60 scroll-mt-40 ${
          summerResetEnabled ? "py-12 lg:py-14" : "py-16"
        }`}
      >
        <div className="max-w-[100rem] mx-auto space-y-5 lg:space-y-6">
          <Reveal>
            <div className="flex flex-col gap-3 max-w-3xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Memberships
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
                {summerResetEnabled
                  ? "Continue with a Membership"
                  : "Memberships"}
              </h2>
              <p className="font-paragraph text-sm sm:text-base text-charcoal/70 leading-relaxed">
                {summerResetEnabled
                  ? "Auto-renews monthly · apply your intro purchase credit when you join within 15 days after your intro expires."
                  : "Auto-renews monthly · pause or cancel with 14-day notice."}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberships.map((m, idx) => {
              const contractId = membershipWidgetServiceIds[m.title];
              return (
                <Reveal key={m.title} delay={idx * 0.05}>
                  <div
                    className={`relative rounded-3xl p-6 h-full border shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden ${
                      contractId ? "pricing-card-full-buy cursor-pointer" : ""
                    } ${
                      m.featured
                        ? "bg-gradient-to-br from-primary/10 via-white to-primary/5 border-primary/30"
                        : "bg-white border-foreground/10"
                    }`}
                  >
                    <div
                      className={`relative z-0 flex flex-col gap-4 h-full min-h-0 ${
                        contractId ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-1 ${
                          m.featured ? "bg-primary" : "bg-primary/20"
                        }`}
                      />
                      <div className="flex items-start justify-between gap-3 pt-2">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-heading text-2xl font-semibold text-charcoal">
                            {m.title}
                          </h3>
                          <p className="font-paragraph text-sm text-charcoal/70">
                            {m.classes}
                          </p>
                          <p className="font-paragraph text-xs text-charcoal/55 mt-0.5">
                            {m.contract}
                          </p>
                        </div>
                        <span className="font-heading text-base text-primary whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
                          {m.price}
                        </span>
                      </div>
                      <div className="h-px bg-foreground/5" />
                      <div className="flex items-start gap-2">
                        <Check size={18} className="text-primary mt-1" />
                        <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                          {getMembershipDisplayBenefits(m)}
                        </p>
                      </div>
                      {contractId ? (
                        <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                          Buy Now
                        </p>
                      ) : (
                        <div className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mt-auto pt-2">
                          Monthly Auto-Renew
                        </div>
                      )}
                    </div>
                    {contractId && (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("contract-link", contractId)}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Private sessions */}
      <section className="py-16 px-6 lg:px-8 bg-secondary/60">
        <div className="max-w-[100rem] mx-auto space-y-10">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Private Reformer Sessions (1:1)
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Personalized coaching for faster progress.
              </h2>
              <p className="font-paragraph text-base text-charcoal/70">
                Privates available Mon–Fri 11 AM–4 PM · Weekends by appointment.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privatesNonMember.map((item, idx) => {
              const serviceId = privateSessionWidgetServiceIds[item.title];
              return (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div
                    className={`bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col ${
                      serviceId
                        ? "relative pricing-card-full-buy cursor-pointer"
                        : "gap-3"
                    }`}
                  >
                    <div
                      className={
                        serviceId
                          ? "relative z-0 flex flex-col gap-3 pointer-events-none select-none h-full min-h-0"
                          : "flex flex-col gap-3"
                      }
                    >
                      <div className="flex items-start justify-between pt-1">
                        <h3 className="font-heading text-xl font-semibold text-charcoal">
                          {item.title}
                        </h3>
                        <span className="font-heading text-base text-primary px-3 py-1 rounded-full bg-primary/10">
                          {item.price}
                        </span>
                      </div>
                      <div className="h-px bg-foreground/5" />
                      <p className="font-paragraph text-sm text-charcoal/70">
                        Validity: {item.validity}
                      </p>
                      <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                        {item.note}
                      </p>
                      {serviceId && (
                        <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                          Buy Now
                        </p>
                      )}
                    </div>
                    {serviceId && (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("pricing-link", serviceId)}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bring a friend */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Bring-a-Friend Program
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal">
                Train together, save together.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(summerResetEnabled ? summerGuestOptions : guestOptions).map((item, idx) => {
              const serviceId = guestOptionWidgetServiceIds[item.title];
              return (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div
                    className={`bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col ${
                      serviceId
                        ? "relative pricing-card-full-buy cursor-pointer"
                        : "gap-3"
                    }`}
                  >
                    <div
                      className={
                        serviceId
                          ? "relative z-0 flex flex-col gap-3 pointer-events-none select-none h-full min-h-0"
                          : "flex flex-col gap-3"
                      }
                    >
                      <div className="flex items-center justify-between pt-1">
                        <h3 className="font-heading text-xl font-semibold text-charcoal">
                          {item.title}
                        </h3>
                        <span className="font-heading text-base text-primary px-3 py-1 rounded-full bg-primary/10">
                          {item.price}
                        </span>
                      </div>
                      <div className="h-px bg-foreground/5" />
                      <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                        {item.detail}
                      </p>
                      {serviceId && (
                        <p className="font-paragraph text-xs uppercase tracking-[0.14em] text-primary font-semibold mt-auto pt-2">
                          Buy Now
                        </p>
                      )}
                    </div>
                    {serviceId && (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("pricing-link", serviceId)}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Private events */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-6">
          <Reveal>
            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Private Events & Studio Rentals
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                Host your next wellness experience with us.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privateEvents.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="bg-white rounded-3xl p-6 border border-foreground/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all h-full flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <h3 className="font-heading text-xl font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <span className="font-heading text-base text-primary whitespace-nowrap px-3 py-1 rounded-full bg-primary/10">
                      {item.price}
                    </span>
                  </div>
                  <div className="h-px bg-foreground/5" />
                  <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="bg-charcoal text-white rounded-3xl p-8 lg:p-16 text-center space-y-6 shadow-lg">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold">
                Ready to get started?
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Book your spot or reach out for a custom plan. We’re here to help you move with intention.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/book"
                  className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2 justify-center"
                >
                  Book a Class
                </a>
                <Link
                  href="/contact"
                  className="font-paragraph text-base bg-white text-charcoal px-8 py-4 rounded-lg hover:bg-white/90 transition-all inline-flex items-center gap-2 justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

