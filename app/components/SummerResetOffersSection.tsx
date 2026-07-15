"use client";

import { Reveal } from "./sections/Reveal";
import { useMindbodyHealcodeScript } from "../hooks/useMindbodyHealcodeScript";
import { renderHealcodePricingLink } from "../lib/mindbodyHealcodeWidgets";
import SummerDeadlineBadge from "./summer-reset/SummerDeadlineBadge";
import SummerOfferCard from "./summer-reset/SummerOfferCard";
import SummerPacksRow from "./summer-reset/SummerPacksRow";
import FallbackPurchaseLink from "./summer-reset/FallbackPurchaseLink";
import {
  summerResetCopy,
  summerResetEnabled,
  summerResetMindbodyServiceIds,
  summerResetOfferAnchors,
  summerResetOfferCards,
  summerResetPurchaseFallbacks,
  summerResetSectionId,
} from "../lib/summerResetCopy";

export default function SummerResetOffersSection() {
  useMindbodyHealcodeScript();

  if (!summerResetEnabled) return null;

  const unlimited = summerResetOfferCards.unlimitedIntro;
  const threeClass = summerResetOfferCards.threeClassIntro;
  const packs = summerResetOfferCards.classPackSale;

  const unlimitedServiceId = summerResetMindbodyServiceIds.fifteenDayUnlimitedIntro;
  const threeClassServiceId = summerResetMindbodyServiceIds.threeClassIntro;

  return (
    <section
      id={summerResetSectionId}
      className="relative py-24 lg:py-32 px-6 scroll-mt-40 overflow-hidden bg-background"
      aria-labelledby="summer-offers-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/35 via-background to-secondary/15 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto relative z-10 space-y-12 lg:space-y-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center">
              <SummerDeadlineBadge />
            </div>
            <h2
              id="summer-offers-heading"
              className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal"
            >
              {summerResetCopy.offers.heading}
            </h2>
            <p className="font-paragraph text-base lg:text-lg text-charcoal/70 leading-relaxed">
              {summerResetCopy.offers.subheading}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <Reveal delay={0.05} className="lg:col-span-7 h-full">
            <div
              id={summerResetOfferAnchors.unlimitedIntro}
              className="scroll-mt-40 h-full"
            >
              <SummerOfferCard
                featured
                badge={unlimited.badge}
                title={unlimited.title}
                price={unlimited.price}
                description={unlimited.description}
                details={unlimited.details}
                cta={unlimited.cta}
                showIntroCredit
                imageSrc="/intentional-movement.jpg"
                imageAlt="Bright pilates studio with reformers and natural light"
                ariaLabel={`${unlimited.title}, ${unlimited.price}. ${unlimited.cta}`}
                overlay={
                  unlimitedServiceId ? (
                    renderHealcodePricingLink(unlimitedServiceId, unlimited.cta)
                  ) : (
                    <FallbackPurchaseLink
                      href={summerResetPurchaseFallbacks.fifteenDayUnlimitedIntro}
                      label={`${unlimited.cta} — ${unlimited.title}`}
                    />
                  )
                }
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 h-full">
            <div
              id={summerResetOfferAnchors.threeClassIntro}
              className="scroll-mt-40 h-full"
            >
              <SummerOfferCard
                title={threeClass.title}
                price={threeClass.price}
                listPrice="$89"
                description={threeClass.description}
                details={threeClass.details}
                cta={threeClass.cta}
                showIntroCredit
                priceSize="lg"
                ariaLabel={`${threeClass.title}, ${threeClass.price}. ${threeClass.cta}`}
                overlay={
                  threeClassServiceId ? (
                    renderHealcodePricingLink(threeClassServiceId, threeClass.cta)
                  ) : (
                    <FallbackPurchaseLink
                      href={summerResetPurchaseFallbacks.threeClassIntro}
                      label={`${threeClass.cta} — ${threeClass.title}`}
                    />
                  )
                }
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-12">
            <div
              id={summerResetOfferAnchors.classPackSale}
              className="scroll-mt-40"
            >
              <SummerPacksRow
                ariaLabel={`${packs.title}, ${packs.mainOffer}. ${packs.cta}`}
                overlay={
                  <FallbackPurchaseLink
                    href={summerResetPurchaseFallbacks.classPacks}
                    label={`${packs.cta} — view class packs`}
                  />
                }
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
