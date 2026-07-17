"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FoundingMemberSection from "./components/FoundingMemberSection";
import SummerResetHero from "./components/SummerResetHero";
import SummerResetFinalCtaSection from "./components/SummerResetFinalCtaSection";
import SummerResetTermsSection from "./components/SummerResetTermsSection";
import HomeBrandHero from "./components/home/HomeBrandHero";
import HomeClassesPreview from "./components/home/HomeClassesPreview";
import HomeMembershipBridge from "./components/home/HomeMembershipBridge";
import HomeStudioStory from "./components/home/HomeStudioStory";
import HomeVisitCommunity from "./components/home/HomeVisitCommunity";
import { Reveal } from "./components/sections/Reveal";
import { summerResetEnabled } from "./lib/summerResetCopy";

export default function HomePageClient() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-paragraph text-foreground selection:bg-primary/30">
      <Header />

      {summerResetEnabled ? <SummerResetHero /> : <HomeBrandHero />}

      <HomeStudioStory />
      {summerResetEnabled ? <HomeMembershipBridge /> : null}
      <HomeClassesPreview />
      <HomeVisitCommunity />

      {summerResetEnabled ? (
        <>
          <SummerResetFinalCtaSection />
          <SummerResetTermsSection />
        </>
      ) : (
        <>
          <FoundingMemberSection />
          <section className="surface-ivory px-6 py-36 text-center lg:px-12 lg:py-52">
            <div className="mx-auto max-w-[100rem]">
              <Reveal direction="up">
                <div className="mx-auto max-w-3xl">
                  <h2 className="font-heading text-5xl font-medium leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    Ready to begin?
                  </h2>
                  <p className="mx-auto mt-8 max-w-xl text-base leading-[1.85] text-muted lg:text-lg">
                    Experience intentional movement, expert instruction, and a
                    studio designed to help you progress.
                  </p>
                  <Link
                    href="/pricing"
                    className="group mt-12 inline-flex h-14 min-h-14 items-center gap-2 rounded-full bg-charcoal px-10 text-sm font-medium tracking-wide text-on-dark shadow-button transition-all duration-500 hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    View pricing
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
