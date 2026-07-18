"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FoundingMemberSection from "./components/FoundingMemberSection";
import SummerResetHero from "./components/SummerResetHero";
import SummerResetFinalCtaSection from "./components/SummerResetFinalCtaSection";
import HomeBrandHero from "./components/home/HomeBrandHero";
import HomeClassesPreview from "./components/home/HomeClassesPreview";
import HomeStudioStory from "./components/home/HomeStudioStory";
import HomeStudioEnvironment from "./components/home/HomeStudioEnvironment";
import HomeEditorialQuote from "./components/home/HomeEditorialQuote";
import HomeOfferBridge from "./components/home/HomeOfferBridge";
import HomePrivateTeaser from "./components/home/HomePrivateTeaser";
import HomeVisitCommunity from "./components/home/HomeVisitCommunity";
import { Reveal } from "./components/sections/Reveal";
import { RevealText } from "./components/sections/RevealText";
import { summerResetEnabled } from "./lib/summerResetCopy";

export default function HomePageClient() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-paragraph text-foreground selection:bg-secondary">
      <Header />

      {summerResetEnabled ? <SummerResetHero /> : <HomeBrandHero />}

      <FoundingMemberSection />
      {/* Charcoal → light gradient bridge */}
      <div className="flow-out-of-dark" aria-hidden />

      <HomeStudioStory />

      {/* Why Alva → How you'll experience Alva */}
      <HomeClassesPreview />

      <HomeEditorialQuote />
      <HomeStudioEnvironment />
      <HomeOfferBridge />

      {/* Light → charcoal gradient bridge */}
      <div className="flow-into-dark" aria-hidden />
      <HomePrivateTeaser />
      {/* Charcoal → light gradient bridge */}
      <div className="flow-out-of-dark" aria-hidden />

      <HomeVisitCommunity />

      {summerResetEnabled ? (
        <SummerResetFinalCtaSection />
      ) : (
        <section className="surface-stone lighting-top px-5 py-28 text-center text-foreground lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[100rem]">
            <div className="mx-auto max-w-2xl">
              <RevealText
                as="h2"
                className="editorial-h1 text-balance text-foreground"
                text="Ready to begin?"
              />
              <Reveal>
                <p className="mx-auto mt-6 max-w-lg text-base leading-[1.75] text-muted">
                  Experience intentional movement, expert instruction, and a
                  studio designed to help you progress.
                </p>
              </Reveal>
              <Reveal>
                <Link
                  href="/pricing"
                  className="btn-primary group mt-10 inline-flex"
                >
                  View pricing
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
