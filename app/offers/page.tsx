import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SummerResetPromoCard from "../components/SummerResetPromoCard";
import {
  summerResetCopy,
  summerResetDeadlineLabel,
  summerResetEnabled,
  summerResetOfferCards,
  summerResetSeo,
} from "../lib/summerResetCopy";

export const metadata: Metadata = {
  title: summerResetEnabled
    ? "Summer Reset Offers | Alva Pilates"
    : summerResetSeo.title,
  description:
    "Limited-time Summer Reset reformer Pilates offers at Alva Pilates in Valencia — 15-Day Unlimited Intro, 3-Class Intro, and 20% off class packs.",
  robots: summerResetEnabled ? { index: true, follow: true } : { index: false },
};

export default function OffersPage() {
  const unlimited = summerResetOfferCards.unlimitedIntro;
  const threeClass = summerResetOfferCards.threeClassIntro;
  const packs = summerResetOfferCards.classPackSale;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-stone border-b border-[var(--border)] px-6 pb-10 pt-32 text-charcoal lg:px-14 lg:pb-12 lg:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#C6AA83]">
            {summerResetCopy.hero.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal tracking-[-0.02em] text-[#201F1C] lg:mt-3.5 lg:text-5xl">
            {summerResetCopy.offers.heading}
          </h1>
          <p className="mx-auto mt-2.5 max-w-[600px] text-base leading-[1.6] text-[#6D6C68] lg:mt-3 lg:text-lg">
            {summerResetCopy.offers.subheading} {summerResetDeadlineLabel}.
          </p>
        </div>
      </section>

      <main className="surface-paper border-b border-border px-6 py-14 lg:px-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SummerResetPromoCard
              ctaHref="/pricing#summer-reset"
              secondaryHref="/pricing#class-packs"
            />
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-normal tracking-[-0.02em] text-[#201F1C] lg:text-4xl">
              Promotion details
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.65] text-[#6D6C68]">
              {summerResetCopy.hero.body}
            </p>

            <ul className="mt-10 space-y-8">
              <li className="border-t border-[var(--border)] pt-8">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#6d6c68]">
                  {unlimited.badge}
                </p>
                <h3 className="mt-2 font-heading text-xl font-medium text-[#201F1C]">
                  {unlimited.title}
                </h3>
                <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-[#201F1C]">
                  {unlimited.price}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#6D6C68]">
                  {unlimited.description}
                </p>
                <ul className="mt-4 space-y-1.5 text-[0.875rem] text-[#6D6C68]">
                  {unlimited.details.map((line) => (
                    <li key={line}>· {line}</li>
                  ))}
                </ul>
              </li>

              <li className="border-t border-[var(--border)] pt-8">
                <h3 className="font-heading text-xl font-medium text-[#201F1C]">
                  {threeClass.title}
                </h3>
                <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-[#201F1C]">
                  {threeClass.price}
                  <span className="ml-3 text-base font-normal text-[#6D6C68] line-through">
                    {threeClass.listPrice?.replace("Regularly ", "")}
                  </span>
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#6D6C68]">
                  {threeClass.description}
                </p>
              </li>

              <li className="border-t border-[var(--border)] pt-8">
                <h3 className="font-heading text-xl font-medium text-[#201F1C]">
                  {packs.title}
                </h3>
                <p className="mt-1 font-heading text-3xl font-semibold tracking-tight text-[#201F1C]">
                  {packs.mainOffer}
                </p>
                <ul className="mt-4 space-y-2 text-[0.9375rem] text-[#6D6C68]">
                  {packs.packs.map((pack) => (
                    <li key={pack.label} className="flex flex-wrap gap-x-3 gap-y-1">
                      <span className="font-medium text-[#201F1C]">
                        {pack.label}
                      </span>
                      <span className="line-through opacity-70">
                        {pack.listPrice}
                      </span>
                      <span>{pack.salePrice}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/pricing#summer-reset"
                className="group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[10px] bg-[var(--dark)] px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-paper transition-[background-color] duration-300 ease-out hover:bg-[#4a453f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark)] focus-visible:ring-offset-2"
              >
                View offers &amp; buy
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                href="/book"
                className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-[10px] border border-[rgba(32,31,28,0.24)] bg-transparent px-8 text-[0.8125rem] font-medium tracking-[0.02em] text-[#201F1C] transition-colors duration-300 hover:border-[#201F1C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark)] focus-visible:ring-offset-2"
              >
                Book a class
              </Link>
            </div>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-[#6D6C68]">
              Purchase on our{" "}
              <Link
                href="/pricing#summer-reset"
                className="underline decoration-[rgba(32,31,28,0.28)] underline-offset-4 transition-colors hover:text-[#201F1C]"
              >
                pricing page
              </Link>{" "}
              or reserve a spot on the{" "}
              <Link
                href="/book"
                className="underline decoration-[rgba(32,31,28,0.28)] underline-offset-4 transition-colors hover:text-[#201F1C]"
              >
                schedule
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
