"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyBrandedWidget from "../components/MindbodyBrandedWidget";
import BlackFridayMemberships from "../components/blackfriday/BlackFridayMemberships";
import BlackFridayClassPacks from "../components/blackfriday/BlackFridayClassPacks";
import GiftCards from "../components/blackfriday/GiftCards";
import IntroOffers from "../components/blackfriday/IntroOffers";
import { useHashRealign } from "../components/blackfriday/useHashRealign";
import { blackFridayIds } from "../lib/blackFridayCampaign";

const BF_HASHES = ["get-started", "gift-cards", blackFridayIds.membershipsSection, blackFridayIds.packsSection] as const;

export default function PricingPage() {
  useHashRealign(BF_HASHES);
  return (
    <div className="min-h-screen bg-[var(--lp-ivory)] text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-[112rem] px-4 pb-20 pt-28 sm:px-6 lg:px-10 lg:pt-32">
        <IntroOffers />
        <BlackFridayMemberships />
        <MindbodyBrandedWidget widgetType="Pricing" widgetId="706724e71a" />
        <div className="mt-16">
          <BlackFridayClassPacks />
        </div>
        <GiftCards />
      </main>

      <Footer />
    </div>
  );
}
