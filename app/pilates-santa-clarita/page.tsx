import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllClasses } from "../lib/data";
import { summerResetOfferCards } from "../lib/summerResetCopy";
import { STUDIO_HOURS_DISPLAY } from "../lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "../data/reviews";

export const metadata: Metadata = {
  title: "Reformer Pilates in Santa Clarita, CA",
  description:
    "Boutique reformer Pilates studio in Valencia, serving Santa Clarita. Small-group classes for every level and a 15-day unlimited intro for new clients.",
  alternates: { canonical: "/pilates-santa-clarita" },
};

/** First-visit facts come from the existing FAQ (Getting Started) and the booking page. */
const firstVisit = [
  {
    title: "Arrive 10–15 minutes early",
    description:
      "For your first class, arrive 10–15 minutes early to complete paperwork and get oriented to the studio.",
  },
  {
    title: "Wear grip socks",
    description:
      "Grip socks are required for all classes and are available for purchase at the studio.",
  },
  {
    title: "No experience needed",
    description:
      "Beginners are welcome. New to the reformer? Start with Alva Foundation, or ask us which class suits you best.",
  },
  {
    title: "Settle in",
    description:
      "Your instructor will help you set up your reformer and explain the springs and straps before class begins.",
  },
  {
    title: "Move at your level",
    description:
      "Classes run 50 minutes. Your instructor guides each exercise and offers modifications, so you can work at your own pace.",
  },
  {
    title: "Book online",
    description:
      "Choose a class on the schedule and reserve your spot. Questions first? Get in touch and we’ll help.",
  },
];

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

const beginnerOptions = [
  {
    title: "Alva Foundation",
    description:
      "Our Level 1 class and the best place to start. It teaches alignment, breath, and core control on the reformer, with no prior experience required.",
  },
  {
    title: "Alva Sculpt",
    description:
      "An all-levels, full-body class. Your instructor offers modifications and progressions throughout, so beginners can join once they feel ready.",
  },
  {
    title: "Private sessions",
    description:
      "Prefer one-on-one guidance first, or working around an injury? A private session lets your instructor tailor the work to you.",
  },
];

const pricingHighlights = [
  { title: "Single class", price: "$39", note: "Any reformer class, all levels." },
  {
    title: "3-Class Intro",
    price: "$69",
    note: "First-time clients, valid 30 days.",
  },
  {
    title: "5-Class Pack",
    price: "$179",
    note: "$35.80 per class, valid 2 months.",
  },
  {
    title: "10-Class Pack",
    price: "$339",
    note: "$33.90 per class, valid 3 months.",
  },
];

const labelClass = "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe";

export default function SantaClaritaPage() {
  const classes = getAllClasses();
  const intro = summerResetOfferCards.unlimitedIntro;
  const foundation = classes.find((c) => c.className.trim() === "Alva Foundation");

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
        <div className="mx-auto grid max-w-[100rem] grid-cols-1 items-center gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <Reveal className="lg:col-span-6 lg:pr-6">
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
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="img-editorial relative min-h-[320px] sm:min-h-[420px] lg:min-h-[480px]">
              <Image
                src="/hero-reformer.jpg"
                alt="Client holding a side plank on a reformer in the Alva Pilates studio"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-desaturate object-cover"
              />
            </div>
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

      {/* Beginner options */}
      <section className="surface-paper px-6 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>Beginners</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
              Where to start if you&apos;re new to reformer Pilates
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 border-t border-border md:grid-cols-3">
            {beginnerOptions.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full border-b border-border py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                  <h3 className="font-heading text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-base text-muted">
            Not sure which fits you?{" "}
            <Link href="/contact" className="text-link">
              Ask the front desk
            </Link>{" "}
            and we&apos;ll point you to the right first class.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Our team is experienced, certified in comprehensive reformer
            instruction, and trained to guide every level with care.{" "}
            <Link href="/instructors" className="text-link">
              Meet the instructors
            </Link>
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="surface-paper px-6 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>Pricing</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
              Simple class pricing
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              New clients can start with the {intro.title} for {intro.price}.
              Memberships bring the per-class rate down further.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {pricingHighlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full border-b border-border py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0">
                  <h3 className="font-heading text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 font-heading text-4xl font-semibold tracking-[-0.03em]">
                    {item.price}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-base">
            <Link href="/pricing" className="text-link">
              See memberships and all pricing
            </Link>
          </p>
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
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-muted">
            <Link href="/classes" className="text-link">
              Compare all classes
            </Link>
            <Link href="/book" className="text-link">
              Open the class schedule
            </Link>
          </p>
        </div>
      </section>

      {/* First visit */}
      <section className="surface-stone px-6 py-16 text-charcoal lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className={labelClass}>First visit</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal tracking-[-0.02em] text-balance lg:text-5xl">
              What to expect at your first class
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {firstVisit.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="h-full border-b border-[var(--border)] py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
                  <h3 className="font-heading text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-taupe">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
            {foundation ? (
              <Link href={`/classes/${foundation._id}`} className="text-link">
                About Alva Foundation
              </Link>
            ) : null}
            <Link href="/faq" className="text-link">
              More first-class questions
            </Link>
          </p>
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
              Find us in Tesoro Village, on the corner of the plaza at 23840
              Copper Hill Drive.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              23840 Copper Hill Drive
              <br />
              Valencia, CA 91354
            </p>
            <h3 className="mt-8 font-heading text-xl font-medium">Parking</h3>
            <p className="mt-2 text-base leading-relaxed text-charcoal">
              Ample parking is available at Tesoro Village, steps from the
              studio entrance, so you can arrive relaxed and on time.
            </p>
            <h3 className="mt-8 font-heading text-xl font-medium">Hours</h3>
            <div className="mt-2 space-y-1 text-base text-charcoal">
              <p>
                Monday – Friday · {STUDIO_HOURS_DISPLAY.weekdays.join(" & ")}
              </p>
              <p>Saturday – Sunday · {STUDIO_HOURS_DISPLAY.weekends}</p>
            </div>
            <h3 className="mt-8 font-heading text-xl font-medium">Directions</h3>
            <p className="mt-2 text-base leading-relaxed text-charcoal">
              We&apos;re on Copper Hill Drive in Valencia, in the Tesoro Village
              plaza. Open the map for turn-by-turn directions from wherever you
              are in the Santa Clarita Valley.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-6"
            >
              Get directions
            </a>
            <p className="mt-4 text-sm text-taupe">
              Questions before you visit?{" "}
              <Link href="/contact" className="text-link">
                Contact the studio
              </Link>
            </p>
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
              <p className="mt-5 text-sm text-muted">
                <Link href="/pricing" className="text-link">
                  See all pricing and intro options
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
