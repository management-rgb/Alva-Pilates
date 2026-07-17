"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoundingMemberPricingStrip from "../components/FoundingMemberPricingStrip";
import IntroOfferCreditNote from "../components/IntroOfferCreditNote";
import FallbackPurchaseLink from "../components/summer-reset/FallbackPurchaseLink";
import { renderHealcodePricingLink } from "../lib/mindbodyHealcodeWidgets";
import { Reveal } from "../components/sections/Reveal";
import { useMindbodyHealcodeScript } from "../hooks/useMindbodyHealcodeScript";
import { scheduleScrollToSection } from "../lib/scrollToSection";
import {
  getIntroOffersForPricing,
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
    classes: "Unlimited classes",
    contract: "6-month contract",
    benefits:
      "20% off privates + 1 guest pass / month + early booking access + priority on the waitlist.",
    summerBenefits:
      "20% off privates + 2 guest passes / month during Summer Reset + early booking access + priority on the waitlist.",
    featured: true,
  },
];

function getMembershipDisplayBenefits(m: (typeof memberships)[number]) {
  if (summerResetEnabled && m.summerBenefits) return m.summerBenefits;
  return m.benefits;
}

const privateSessionWidgetServiceIds: Record<string, string> = {
  "Single Private": "100014",
};

const privatesNonMember = [
  {
    title: "Single Private",
    price: "$120",
    perSession: "60-minute session",
    validity: null as string | null,
    note: "One personalized 1:1 reformer session.",
    featured: false,
  },
  {
    title: "5-Pack Private",
    listPrice: "$575",
    price: "$500",
    perSession: "$100 / session",
    validity: "Valid 3 months",
    note: "Personalized sessions at a limited-time pack rate.",
    featured: true,
  },
  {
    title: "10-Pack Private",
    listPrice: "$1,100",
    price: "$950",
    perSession: "$95 / session",
    validity: "Valid 4 months",
    note: "Personalized sessions at a limited-time pack rate.",
    featured: false,
  },
];

const privateEvents = [
  {
    title: "Private Group Class (up to 10 people)",
    price: "$350 / session",
    detail:
      "50-minute custom reformer class with instructor & exclusive studio use.",
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

const section = "px-6 py-32 lg:px-14 lg:py-44";
const sectionInner = "mx-auto max-w-[72rem] xl:max-w-[80rem]";
const sectionHead = "max-w-xl space-y-5";
const eyebrow =
  "text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-primary";
const sectionTitle =
  "font-heading text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl";
const sectionBody = "text-[0.9375rem] leading-[1.85] text-muted sm:text-base";
const cardGrid = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7";
const cardTitle =
  "font-heading text-[1.375rem] font-medium leading-snug tracking-tight text-foreground";
const cardPrice =
  "font-heading text-[1.75rem] font-medium leading-none tabular-nums tracking-tight text-foreground";
const cardMeta = "text-[0.8125rem] leading-relaxed text-muted";
const cardCopy = "text-[0.8125rem] leading-[1.7] text-muted";

function benefitBullets(text: string): string[] {
  return text
    .split(/\s*\+\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function SectionHeader({
  label,
  title,
  children,
  id,
  as = "h2",
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Heading = as;
  return (
    <div className={sectionHead}>
      {label ? <p className={eyebrow}>{label}</p> : null}
      <Heading id={id} className={sectionTitle}>
        {title}
      </Heading>
      {children ? <p className={sectionBody}>{children}</p> : null}
    </div>
  );
}

function CardAction({ children }: { children: ReactNode }) {
  return (
    <p className="mt-auto pt-10 text-[0.8125rem] font-medium tracking-[0.02em] text-muted transition-colors duration-300 group-hover:text-foreground">
      {children}
      <span
        aria-hidden
        className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </p>
  );
}

function GroupClassOptionPrice({ item }: { item: GroupClassOption }) {
  if (item.listPrice) {
    return (
      <div className="flex items-baseline gap-2.5">
        <p className={cardPrice}>{item.price}</p>
        <p className="text-sm text-muted line-through">{item.listPrice}</p>
      </div>
    );
  }
  return <p className={cardPrice}>{item.price}</p>;
}

function PackCard({
  item,
  delay = 0,
  action = "Purchase",
  featured = false,
}: {
  item: GroupClassOption;
  delay?: number;
  action?: string;
  featured?: boolean;
}) {
  const serviceId = getGroupClassServiceId(item.title);
  return (
    <Reveal delay={delay}>
      <div
        className={`pricing-offer group ${
          serviceId ? "pricing-card-full-buy cursor-pointer" : ""
        } ${featured ? "pricing-offer-featured" : ""}`}
      >
        <div
          className={`relative z-0 flex h-full min-h-0 flex-col ${
            serviceId ? "pointer-events-none select-none" : ""
          }`}
        >
          <h3 className={cardTitle}>{item.title}</h3>
          <div className="mt-6">
            <GroupClassOptionPrice item={item} />
          </div>
          <p className={`mt-3 ${cardMeta}`}>
            {item.validity !== "—" ? `Valid ${item.validity}` : "Single class"}
          </p>
          <p className={`mt-6 ${cardCopy}`}>{item.note}</p>
          {serviceId ? <CardAction>{action}</CardAction> : null}
        </div>
        {serviceId ? (
          <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
            {renderHealcodeWidget("pricing-link", serviceId)}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function PrivateCard({
  item,
  delay = 0,
}: {
  item: (typeof privatesNonMember)[number];
  delay?: number;
}) {
  const serviceId = privateSessionWidgetServiceIds[item.title];
  const isPromo = Boolean(item.listPrice);
  return (
    <Reveal delay={delay}>
      <div
        className={`pricing-offer group ${
          serviceId ? "pricing-card-full-buy cursor-pointer" : ""
        } ${item.featured ? "pricing-offer-featured" : ""}`}
      >
        <div
          className={`relative z-0 flex h-full min-h-0 flex-col ${
            serviceId ? "pointer-events-none select-none" : ""
          }`}
        >
          <h3 className={cardTitle}>{item.title}</h3>
          <div className="mt-6 flex items-baseline gap-2.5">
            <p className={cardPrice}>{item.price}</p>
            {isPromo ? (
              <p className="text-sm text-muted line-through">{item.listPrice}</p>
            ) : null}
          </div>
          <p className={`mt-3 ${cardMeta}`}>
            {item.perSession}
            {item.validity ? (
              <>
                <span className="text-border"> · </span>
                {item.validity}
              </>
            ) : null}
          </p>
          <p className={`mt-6 ${cardCopy}`}>{item.note}</p>
          <CardAction>
            {serviceId ? "Book Private Training" : "Inquire to book"}
          </CardAction>
        </div>
        {serviceId ? (
          <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
            {renderHealcodeWidget("pricing-link", serviceId)}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

const standardPackOffers = standardGroupClassOptions.filter((item) =>
  item.title.includes("Pack")
);

export default function PricingPage() {
  useMindbodyHealcodeScript();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    scheduleScrollToSection(hash, 80);
    scheduleScrollToSection(hash, 300);
  }, []);

  const introOffers = getIntroOffersForPricing();
  const packOffers = getPackOffersForPricing();
  const dropInOffer = introOffers.find((o) => o.title === "Single Class");

  const summerUnlimited = summerResetOfferCards.unlimitedIntro;
  const summerThreeClass = summerResetOfferCards.threeClassIntro;
  const unlimitedServiceId =
    summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro;
  const threeClassServiceId = summerResetMindbodyServiceIds.threeClassIntro;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Summer Reset */}
      {summerResetEnabled ? (
        <section
          id={summerResetSectionId}
          className={`surface-secondary scroll-mt-40 ${section} pt-40 lg:pt-48`}
        >
          <div className={`${sectionInner} space-y-24`}>
            <Reveal>
              <SectionHeader
                label="Limited time · Ends August 15"
                title="Summer Reset"
                id="get-started"
                as="h1"
              >
                New-client intro offers, 20% off class packs, and private
                training promotions.
              </SectionHeader>
            </Reveal>

            <div className="space-y-10">
              <Reveal>
                <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  New client intro offers
                </h3>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-3`}>
                <Reveal>
                  <div className="pricing-offer pricing-offer-featured pricing-card-full-buy group cursor-pointer">
                    <div className="relative z-0 flex h-full min-h-0 flex-col pointer-events-none select-none">
                      <h3 className={cardTitle}>{summerUnlimited.title}</h3>
                      <p className={`mt-6 ${cardPrice}`}>
                        {summerUnlimited.price}
                      </p>
                      <p className={`mt-3 ${cardMeta}`}>
                        1 class per day · 15 days · first-time clients
                      </p>
                      <p className={`mt-6 ${cardCopy}`}>
                        {summerUnlimited.description}
                      </p>
                      <div className="mt-5">
                        <IntroOfferCreditNote />
                      </div>
                      <CardAction>Start Your Intro</CardAction>
                    </div>
                    <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                      {unlimitedServiceId ? (
                        renderHealcodePricingLink(
                          unlimitedServiceId,
                          "Start Your Intro"
                        )
                      ) : (
                        <FallbackPurchaseLink
                          href={
                            summerResetPurchaseFallbacks.fifteenDayUnlimitedIntro
                          }
                          label={`Start Your Intro — ${summerUnlimited.title}`}
                        />
                      )}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <div className="pricing-offer pricing-card-full-buy group cursor-pointer">
                    <div className="relative z-0 flex h-full min-h-0 flex-col pointer-events-none select-none">
                      <h3 className={cardTitle}>{summerThreeClass.title}</h3>
                      <div className="mt-6 flex items-baseline gap-2.5">
                        <p className={cardPrice}>{summerThreeClass.price}</p>
                        <p className="text-sm text-muted line-through">$89</p>
                      </div>
                      <p className={`mt-3 ${cardMeta}`}>
                        3 classes · 30 days · first-time clients
                      </p>
                      <p className={`mt-6 ${cardCopy}`}>
                        {summerThreeClass.description}
                      </p>
                      <div className="mt-5">
                        <IntroOfferCreditNote />
                      </div>
                      <CardAction>Start Your Intro</CardAction>
                    </div>
                    <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                      {threeClassServiceId ? (
                        renderHealcodePricingLink(
                          threeClassServiceId,
                          "Start Your Intro"
                        )
                      ) : (
                        <FallbackPurchaseLink
                          href={summerResetPurchaseFallbacks.threeClassIntro}
                          label={`Start Your Intro — ${summerThreeClass.title}`}
                        />
                      )}
                    </div>
                  </div>
                </Reveal>

                {dropInOffer ? (
                  <PackCard
                    item={dropInOffer}
                    delay={0.1}
                    action="Book a Class"
                  />
                ) : null}
              </div>
            </div>

            <div id="group-packages" className="scroll-mt-40 space-y-10">
              <Reveal>
                <div className="max-w-xl space-y-3">
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    Summer class pack sale
                  </h3>
                  <p className={sectionBody}>
                    20% off 5, 10, and 20-class packs through August 15.
                  </p>
                </div>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-3`}>
                {packOffers.map((item, idx) => (
                  <PackCard key={item.title} item={item} delay={idx * 0.04} />
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <Reveal>
                <div className="max-w-xl space-y-3">
                  <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    Private training promotion
                  </h3>
                  <p className={sectionBody}>
                    Limited-time private pack rates. Mon–Fri 11 AM–4 PM ·
                    weekends by appointment.
                  </p>
                </div>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-3`}>
                {privatesNonMember.map((item, idx) => (
                  <PrivateCard key={item.title} item={item} delay={idx * 0.04} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className={`${section} pt-40 lg:pt-48`}>
            <div className={`${sectionInner} text-center`}>
              <Reveal>
                <SectionHeader
                  label="Pricing"
                  title="Pricing & Memberships"
                  as="h1"
                >
                  Choose the option that fits your practice — packs,
                  memberships, privates, and events.
                </SectionHeader>
              </Reveal>
            </div>
          </section>

          <FoundingMemberPricingStrip />

          <section
            id="get-started"
            className={`surface-secondary scroll-mt-40 ${section}`}
          >
            <div className={`${sectionInner} space-y-12`}>
              <Reveal>
                <SectionHeader label="Get started" title="New client intro">
                  Start with a single class or our introductory pack.
                </SectionHeader>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-2`}>
                {introOffers.map((item, idx) => (
                  <PackCard
                    key={item.title}
                    item={item}
                    delay={idx * 0.04}
                    action={
                      item.title === "New Client Intro Offer"
                        ? "Start Your Intro"
                        : "Book a Class"
                    }
                    featured={item.title === "New Client Intro Offer"}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            id="group-packages"
            className={`scroll-mt-40 ${section}`}
          >
            <div className={`${sectionInner} space-y-12`}>
              <Reveal>
                <SectionHeader
                  label="Class packs"
                  title="Non-member packages"
                >
                  Flexible packs for drop-in frequency or regular practice.
                </SectionHeader>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-2 xl:grid-cols-3`}>
                {packOffers.map((item, idx) => (
                  <PackCard key={item.title} item={item} delay={idx * 0.04} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Founding memberships */}
      {summerResetEnabled ? (
        <FoundingMemberPricingStrip />
      ) : null}

      {/* Standard memberships */}
      <section
        id="memberships"
        className={`surface-ivory scroll-mt-40 ${section}`}
      >
        <div className={`${sectionInner} space-y-12`}>
          <Reveal>
            <SectionHeader
              label="Year-round"
              title={
                summerResetEnabled
                  ? "Continue with a membership"
                  : "Memberships"
              }
            >
              {summerResetEnabled
                ? "Auto-renews monthly. Apply your intro credit when you join within 15 days after your intro expires."
                : "Auto-renews monthly. Pause or cancel with 14-day notice."}
            </SectionHeader>
          </Reveal>

          <div className={`${cardGrid} lg:grid-cols-4`}>
            {memberships.map((m, idx) => {
              const contractId = membershipWidgetServiceIds[m.title];
              const bullets = benefitBullets(getMembershipDisplayBenefits(m));
              return (
                <Reveal key={m.title} delay={idx * 0.04}>
                  <div
                    className={`pricing-offer group ${
                      contractId ? "pricing-card-full-buy cursor-pointer" : ""
                    } ${m.featured ? "pricing-offer-featured" : ""}`}
                  >
                    <div
                      className={`relative z-0 flex h-full min-h-0 flex-col ${
                        contractId ? "pointer-events-none select-none" : ""
                      }`}
                    >
                      <h3 className={cardTitle}>{m.title}</h3>
                      <p className={`mt-6 ${cardPrice}`}>{m.price}</p>
                      <p className={`mt-3 ${cardMeta}`}>
                        {m.classes}
                        <span className="text-border"> · </span>
                        {m.contract}
                      </p>
                      <ul className="mt-6 space-y-2">
                        {bullets.map((bullet) => (
                          <li key={bullet} className={cardCopy}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {contractId ? (
                        <CardAction>Join Membership</CardAction>
                      ) : (
                        <p className={`mt-auto pt-10 ${cardMeta}`}>
                          Monthly auto-renew
                        </p>
                      )}
                    </div>
                    {contractId ? (
                      <div className="absolute inset-0 z-10 pricing-card-full-buy-overlay">
                        {renderHealcodeWidget("contract-link", contractId)}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standard year-round pricing */}
      {summerResetEnabled ? (
        <section
          id="standard-pricing"
          className={`surface-secondary scroll-mt-40 ${section}`}
        >
          <div className={`${sectionInner} space-y-16`}>
            <Reveal>
              <SectionHeader title="Standard pricing">
                Year-round rates for class packs, drop-in, and private training.
              </SectionHeader>
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  Class packs & drop-in
                </h3>
              </Reveal>
              <div className={`${cardGrid} lg:grid-cols-2 xl:grid-cols-4`}>
                {standardPackOffers.map((item, idx) => (
                  <PackCard key={item.title} item={item} delay={idx * 0.04} />
                ))}
                {dropInOffer ? (
                  <PackCard
                    item={dropInOffer}
                    delay={0.12}
                    action="Book a Class"
                  />
                ) : null}
              </div>
            </div>

            <div className="space-y-8">
              <Reveal>
                <h3 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  Private training
                </h3>
              </Reveal>
              <div className={`${cardGrid} max-w-sm lg:grid-cols-1`}>
                <PrivateCard item={privatesNonMember[0]} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={`surface-secondary ${section}`}>
          <div className={`${sectionInner} space-y-12`}>
            <Reveal>
              <SectionHeader
                label="Private training"
                title="Personalized coaching"
              >
                Privates available Mon–Fri 11 AM–4 PM · weekends by appointment.
              </SectionHeader>
            </Reveal>
            <div className={`${cardGrid} lg:grid-cols-3`}>
              {privatesNonMember.map((item, idx) => (
                <PrivateCard key={item.title} item={item} delay={idx * 0.04} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Private events */}
      <section className={section}>
        <div className={`${sectionInner} space-y-12`}>
          <Reveal>
            <SectionHeader
              label="Studio rentals"
              title="Private events & wellness experiences"
            >
              Host your next gathering in our elevated Valencia studio.
            </SectionHeader>
          </Reveal>
          <div className={`${cardGrid} lg:grid-cols-3`}>
            {privateEvents.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.04}>
                <div className="pricing-offer group">
                  <h3 className={cardTitle}>{item.title}</h3>
                  <p className={`mt-6 ${cardPrice}`}>{item.price}</p>
                  <p className={`mt-6 ${cardCopy}`}>{item.detail}</p>
                  <CardAction>Inquire to book</CardAction>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-espresso px-6 py-32 lg:px-14 lg:py-44">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <h2 className="font-heading text-[2.5rem] font-medium leading-[1.05] tracking-tight text-on-dark sm:text-5xl">
              Book your first class
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-[1.8] text-muted-dark sm:text-base">
              Reserve your spot and experience intentional movement in a calm,
              elevated studio.
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

      <Footer />
    </div>
  );
}
