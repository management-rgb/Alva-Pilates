import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { Reveal } from "./sections/Reveal";
import { summerResetOfferCards } from "../lib/summerResetCopy";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "../data/reviews";
import { localAreas, type LocalArea } from "../lib/localAreas";
import { STUDIO_HOURS_DISPLAY } from "../lib/site";

const labelClass = "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354";

/** Shared layout for the neighborhood landing pages; copy comes from `localAreas`. */
export default function LocalAreaPage({ area }: { area: LocalArea }) {
  const intro = summerResetOfferCards.unlimitedIntro;
  const otherAreas = localAreas.filter((a) => a.slug !== area.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-charcoal-soft px-6 pb-4 pt-24 text-paper lg:px-14 lg:pb-5 lg:pt-28">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[rgba(247,247,243,0.68)]">
              {area.name}, CA
            </p>
            <h1 className="mt-2 font-display text-xl font-normal leading-tight tracking-[-0.02em] text-paper sm:text-2xl">
              {area.title}
            </h1>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[rgba(247,247,243,0.68)] sm:text-sm">
              {area.heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>
      <div className="flow-out-of-dark !h-10 lg:!h-12" aria-hidden />

      <section className="surface-paper px-6 pb-16 pt-6 lg:px-14 lg:pb-24 lg:pt-8">
        <div className="mx-auto max-w-[100rem] border-t border-border pt-10 lg:pt-14">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
              Reformer Pilates for {area.name}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-[1.85] text-muted lg:text-lg">
              {area.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 text-base text-muted">
              Rated {GOOGLE_RATING} stars from {GOOGLE_REVIEW_COUNT} Google reviews.{" "}
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Read our reviews
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-stone px-6 py-16 text-charcoal lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>Why Alva</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal tracking-[-0.02em] text-balance lg:text-5xl">
              What to expect
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 border-t border-[var(--border)] md:grid-cols-3">
            {area.fit.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full border-b border-[var(--border)] py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                  <h3 className="font-heading text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-taupe">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
            <Link href="/classes" className="text-link">
              Compare all classes
            </Link>
            <Link href="/faq" className="text-link">
              First-class questions
            </Link>
          </p>
        </div>
      </section>

      <section className="surface-stone px-6 py-16 text-charcoal lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className={labelClass}>Visit</p>
            <h2 className="mt-4 font-display text-4xl font-normal tracking-[-0.02em] lg:text-5xl">
              Getting here from {area.name}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal">
              {area.gettingHere}
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              23840 Copper Hill Drive
              <br />
              Valencia, CA 91354
            </p>
            <h3 className="mt-8 font-heading text-xl font-medium">Hours</h3>
            <div className="mt-2 space-y-1 text-base text-charcoal">
              <p>Monday – Friday · {STUDIO_HOURS_DISPLAY.weekdays.join(" & ")}</p>
              <p>Saturday – Sunday · {STUDIO_HOURS_DISPLAY.weekends}</p>
            </div>
            <a
              href={MAPS_URL}
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
              <p className="mt-2 text-base text-foreground">{intro.title}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                One class per day for 15 consecutive days. First-time clients only.
              </p>
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

      <section className="surface-paper px-6 py-12 lg:px-14">
        <div className="mx-auto max-w-[100rem]">
          <p className={labelClass}>Serving the Santa Clarita Valley</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base">
            <Link href="/pilates-santa-clarita" className="text-link">
              Santa Clarita
            </Link>
            {otherAreas.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className="text-link">
                {a.name}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
