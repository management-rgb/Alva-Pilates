import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllClasses } from "../lib/data";
import { summerResetOfferCards } from "../lib/summerResetCopy";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "../data/reviews";

export const metadata: Metadata = {
  title: "Reformer Pilates in Santa Clarita, CA",
  description:
    "Boutique reformer Pilates in Valencia, Santa Clarita. Small-group classes for every level, rated 5.0 on Google. Easy to reach from Saugus, Newhall, Canyon Country, Stevenson Ranch, and Castaic.",
  alternates: { canonical: "/pilates-santa-clarita" },
};

const nearby = ["Valencia", "Saugus", "Newhall", "Canyon Country", "Stevenson Ranch", "Castaic"];

const reasons = [
  {
    title: "Small classes, real attention",
    description:
      "Intimate reformer classes mean your instructor sees your form and offers modifications when you need them.",
  },
  {
    title: "Beginner-friendly",
    description:
      "No Pilates experience needed. Alva Foundation teaches the reformer from the ground up, and every class has options for your level.",
  },
  {
    title: `${GOOGLE_RATING} stars on Google`,
    description: `Rated ${GOOGLE_RATING} from ${GOOGLE_REVIEW_COUNT} reviews by clients across the Santa Clarita Valley.`,
  },
  {
    title: "Easy to get to",
    description:
      "Off Copper Hill Drive in Valencia with ample parking, so you can arrive relaxed and on time.",
  },
];

const labelClass = "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe";

export default function SantaClaritaPage() {
  const classes = getAllClasses();
  const intro = summerResetOfferCards.unlimitedIntro;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-charcoal-soft px-6 pb-4 pt-24 text-paper lg:px-14 lg:pb-5 lg:pt-28">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[rgba(247,247,243,0.68)]">
              Santa Clarita, CA
            </p>
            <h1 className="mt-2 font-display text-xl font-normal leading-tight tracking-[-0.02em] text-paper sm:text-2xl">
              Reformer Pilates in Santa Clarita
            </h1>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[rgba(247,247,243,0.68)] sm:text-sm">
              A boutique reformer studio in Valencia, in the heart of the Santa
              Clarita Valley.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="flow-out-of-dark !h-10 lg:!h-12" aria-hidden />

      {/* Intro */}
      <section className="surface-paper px-6 pb-16 pt-6 lg:px-14 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-3xl border-t border-border pt-10 lg:pt-14">
          <Reveal>
            <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
              Your Santa Clarita reformer studio
            </h2>
            <div className="mt-6 space-y-5 text-base leading-[1.85] text-muted lg:text-lg">
              <p>
                Alva Pilates is a boutique reformer Pilates studio at 23840
                Copper Hill Drive in Valencia. We welcome clients from across
                the Santa Clarita Valley for small-group classes built around
                strength, precision, and proper form.
              </p>
              <p>
                Whether you&apos;re brand new to the reformer, returning after an
                injury, or looking for a more challenging practice, there&apos;s a
                class for you.
              </p>
            </div>
            <p className={`mt-8 ${labelClass}`}>Clients join us from</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {nearby.map((area) => (
                <li
                  key={area}
                  className="border border-border px-3 py-1.5 text-sm text-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why Alva */}
      <section className="surface-stone px-6 py-16 text-charcoal lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>Why Alva</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal tracking-[-0.02em] text-balance lg:text-5xl">
              Why Santa Clarita chooses Alva
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 0.06}>
                <div className="h-full border-b border-[var(--border)] py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
                  <h3 className="font-heading text-xl font-medium">{reason.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-taupe">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link mt-8"
          >
            Read our Google reviews
          </a>
        </div>
      </section>

      {/* Classes */}
      <section className="surface-paper px-6 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>Classes</p>
            <h2 className="mt-4 font-display text-4xl font-normal tracking-[-0.02em] text-foreground lg:text-5xl">
              Reformer classes for every level
            </h2>
          </Reveal>
          <ul className="mt-10 border-t border-border">
            {classes.map((c) => (
              <li key={c._id} className="border-b border-border">
                <Link
                  href={`/classes/${c._id}`}
                  className="group grid grid-cols-1 gap-1 py-6 sm:grid-cols-12 sm:items-center sm:gap-6"
                >
                  <span className="font-heading text-2xl font-medium text-foreground sm:col-span-5">
                    {c.className.trim()}
                  </span>
                  <span className="text-sm text-muted sm:col-span-6">
                    {c.levelText} · 50 minutes
                  </span>
                  <span className="hidden text-right text-foreground transition-transform group-hover:translate-x-1 sm:col-span-1 sm:block" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit + CTA */}
      <section className="surface-stone px-6 py-16 text-charcoal lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className={labelClass}>Visit</p>
            <h2 className="mt-4 font-display text-4xl font-normal tracking-[-0.02em] lg:text-5xl">
              Find us in Valencia
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal">
              23840 Copper Hill Drive
              <br />
              Valencia, CA 91354
            </p>
            <p className="mt-2 text-sm text-taupe">Ample parking available</p>
            <div className="mt-6 space-y-1 text-base text-charcoal">
              <p>Monday – Friday · 8:00 AM – 7:00 PM</p>
              <p>Saturday – Sunday · 9:00 AM – 12:00 PM</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-6"
            >
              Get directions
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border border-border bg-card px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <p className={labelClass}>New clients</p>
              <p className="mt-4 font-heading text-6xl font-semibold tracking-[-0.04em] text-foreground">
                {intro.price}
              </p>
              <p className="mt-2 text-base text-muted">15 days of unlimited reformer classes</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/pricing#get-started" className="btn-primary">
                  Start your intro
                </Link>
                <Link href="/book" className="text-link self-center">
                  View the schedule
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
