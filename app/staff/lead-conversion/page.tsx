import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_COOKIE, STAFF_LOGIN, verifySessionToken } from "../../lib/staffAuth";
import StaffBar from "../StaffBar";
import SectionNav from "../membership-guide/SectionNav";
import Recommender from "../membership-guide/Recommender";
import { Bullets, Card, Eyebrow, ScriptBox, Section, VerifyBadge, serif } from "../membership-guide/ui";
import { introOffers, plans, recommendations, tierContent } from "../membership-guide/guideData";
import { money, TERMS } from "../membership-guide/pricingMath";
import Checklist from "./Checklist";
import {
  dailyChecklist,
  expectations,
  objections,
  quickRef,
  scenarios,
  scripts,
  stageList,
  stages,
} from "./leadData";

export const metadata: Metadata = {
  title: "Lead Conversion Playbook",
  description: "Private front desk playbook: from first hello to membership.",
};

export const dynamic = "force-dynamic";

const NAV = [
  { id: "journey", label: "Overview" },
  { id: "lead", label: "New lead" },
  { id: "first", label: "First visit" },
  { id: "second", label: "Second visit" },
  { id: "third", label: "Third visit" },
  { id: "plan", label: "Pick a plan" },
  { id: "objections", label: "Objections" },
  { id: "daily", label: "Daily checklist" },
  { id: "scripts", label: "Scripts" },
  { id: "training", label: "Training" },
];

const main = plans.filter((p) => !p.comparisonOnly);
const benefitMap = Object.fromEntries(Object.entries(tierContent).map(([k, v]) => [k, v.benefits]));
const scriptById = (id: string) => scripts.find((s) => s.id === id)!;

/** Loud, can't-miss reminder used at the top, in Stage 1 and in the daily checklist. */
function LeadCheckAlert({ size = "lg" }: { size?: "lg" | "sm" }) {
  const big = size === "lg";
  return (
    <div role="note" className="rounded-2xl bg-[var(--sg-ink)] px-5 py-5 text-white sm:px-7 sm:py-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--sg-primary)]">Must do every shift</p>
      <p
        className={`mt-2 font-extrabold leading-tight ${big ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"}`}
      >
        CHECK LEAD MANAGEMENT IN MINDBODY SEVERAL TIMES DURING YOUR SHIFT.
      </p>
      <p className={`mt-2 font-bold text-[var(--sg-primary)] ${big ? "text-lg sm:text-xl" : "text-base"}`}>
        Mindbody → Marketing → Lead Management
      </p>
      <p className="mt-3 text-sm font-semibold sm:text-base">
        Don&apos;t contact ClassPass leads for now.
      </p>
    </div>
  );
}

export default async function LeadConversionPage() {
  if (!(await verifySessionToken((await cookies()).get(STAFF_COOKIE)?.value))) redirect(STAFF_LOGIN);

  return (
    <div
      className="min-h-dvh bg-[var(--sg-ivory)] text-[var(--sg-ink)]"
      style={
        {
          "--sg-primary": "#CFC2B0",
          "--sg-secondary": "#D8CFC4",
          "--sg-ivory": "#FAF8F4",
          "--sg-ink": "#2f2e2b",
          "--sg-muted": "#625f58",
          "--sg-line": "rgba(47, 46, 43, 0.14)",
        } as CSSProperties
      }
    >
      <StaffBar current="/staff/lead-conversion" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-6 pt-10 lg:pt-14">
          <Eyebrow>Front desk playbook</Eyebrow>
          <h1 className="mt-2 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05]" style={serif}>
            From First Hello to Membership
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--sg-muted)]">
            Your step-by-step guide to welcoming new clients, building relationships, and helping them find the right
            Alva membership.
          </p>
        </div>

        <div className="pb-2">
          <LeadCheckAlert />
        </div>

        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <SectionNav items={NAV} />

          <main className="min-w-0">
            {/* ---------- Overview ---------- */}
            <Section id="journey" eyebrow="The journey" title="Four stages">
              <p className="max-w-2xl text-[1.05rem] leading-relaxed" style={serif}>
                Every new client deserves a personal welcome, a thoughtful recommendation, and a clear next step.
              </p>

              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {stageList.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex h-full flex-col rounded-2xl border border-[var(--sg-line)] bg-white p-4 transition-colors hover:bg-[var(--sg-secondary)]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sg-ink)]"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sg-muted)]">
                        Stage {i + 1}
                      </span>
                      <span className="mt-1 text-2xl" style={serif}>
                        {s.label}
                      </span>
                      <span className="mt-1 text-sm font-medium">{s.goal}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <Card className="overflow-x-auto !p-0">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Quick reference</caption>
                  <thead className="bg-[var(--sg-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--sg-muted)]">
                    <tr>
                      <th scope="col" className="px-4 py-3">Client stage</th>
                      <th scope="col" className="px-4 py-3">Your action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quickRef.map(([a, b]) => (
                      <tr key={a} className="border-t border-[var(--sg-line)]">
                        <th scope="row" className="px-4 py-3 font-semibold">{a}</th>
                        <td className="px-4 py-3">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <p className="rounded-xl border border-[var(--sg-primary)] bg-[var(--sg-secondary)]/50 px-4 py-3 text-sm leading-relaxed">
                <strong>Our target is a membership by the third visit.</strong> It&apos;s a coaching goal, not a
                guarantee and never a reason to pressure anyone or promise results.
              </p>
            </Section>

            {/* ---------- Stages ---------- */}
            {stages.map((stage, i) => (
              <Section
                key={stage.id}
                id={stage.id}
                eyebrow={`Stage ${i + 1} · ${stageList[i].goal}`}
                title={stage.title}
                lead={stage.goal}
              >
                {stage.id === "lead" ? <LeadCheckAlert size="sm" /> : null}

                {stage.id === "lead" ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    <Card className="!p-4">
                      <h3 className="font-semibold">{introOffers.threeClass.name} — {money(introOffers.threeClass.price)}</h3>
                      <p className="mt-1 text-sm text-[var(--sg-muted)]">
                        Three classes, valid 30 days. A slower introduction.
                      </p>
                    </Card>
                    <Card className="!p-4">
                      <h3 className="font-semibold">{introOffers.unlimited15.name} — {money(introOffers.unlimited15.price)}</h3>
                      <p className="mt-1 text-sm text-[var(--sg-muted)]">
                        Up to one class a day for 15 days. For exploring and building a routine fast.
                      </p>
                    </Card>
                  </div>
                ) : null}

                <div className="grid gap-3 md:grid-cols-2">
                  {stage.groups.map((g) => (
                    <Card key={g.heading} className={`!p-5 ${stage.groups.length === 3 && g.heading === "To enroll" ? "md:col-span-2" : ""}`}>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sg-muted)]">
                        {g.heading}
                      </h3>
                      <div className="mt-3">
                        <Bullets items={g.steps} />
                      </div>
                    </Card>
                  ))}
                </div>

                {stage.id === "second" ? (
                  <p className="text-sm text-[var(--sg-muted)]">
                    Intro credit: an eligible intro purchase may be credited toward the first month of a qualifying
                    Core or higher membership if they join within 15 days after the intro expires.{" "}
                    <VerifyBadge>Verify eligibility first</VerifyBadge>
                  </p>
                ) : null}

                <div className="grid gap-4">
                  {stage.scriptIds.map((id) => (
                    <ScriptBox key={id} label={scriptById(id).title} text={scriptById(id).text} />
                  ))}
                </div>

                <Checklist title={`${stage.title} checklist`} items={stage.checklist} />

                <p className="text-sm">
                  <strong>Stage complete: </strong>
                  <span className="text-[var(--sg-muted)]">{stage.done}</span>
                </p>
              </Section>
            ))}

            {/* ---------- Plan picker + pricing ---------- */}
            <Section
              id="plan"
              eyebrow="Second & third visit"
              title="Pick the right plan"
              lead="Ask how often they'd realistically come. Recommend one plan."
            >
              <Recommender
                plans={plans}
                recommendations={recommendations}
                considerations={[]}
                benefits={benefitMap}
              />

              <Card className="overflow-x-auto !p-0">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <caption className="sr-only">Monthly price by commitment</caption>
                  <thead className="bg-[var(--sg-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--sg-muted)]">
                    <tr>
                      <th scope="col" className="px-4 py-3">Membership</th>
                      {TERMS.map((t) => (
                        <th key={t} scope="col" className="px-4 py-3">{t} months</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {main.map((p) => (
                      <tr key={p.id} className="border-t border-[var(--sg-line)]">
                        <th scope="row" className="px-4 py-3 font-semibold">
                          {p.name}
                          <span className="block text-xs font-normal text-[var(--sg-muted)]">
                            {p.classesPerMonth ? `${p.classesPerMonth} classes/month` : "Up to 1 class/day"}
                          </span>
                        </th>
                        {TERMS.map((t) => (
                          <td key={t} className="px-4 py-3">
                            {p.prices[t] !== undefined ? `${money(p.prices[t]!)}/mo` : "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <p className="text-sm text-[var(--sg-muted)]">
                Monthly rates with a minimum commitment, billed monthly, not upfront. More on benefits, the calculator
                and policies in the{" "}
                <Link href="/staff/membership-guide" className="font-semibold text-[var(--sg-ink)] underline">
                  membership guide
                </Link>
                .
              </p>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sg-muted)]">
                  Why consistency matters
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sg-muted)]">
                  Regular practice can support core strength, endurance, balance, flexibility, mobility, body
                  awareness and confidence. Progress varies, and more frequent exercise needs enough recovery.
                </p>
                <Card className="mt-3 overflow-x-auto !p-0">
                  <table className="w-full min-w-[26rem] text-left text-sm">
                    <caption className="sr-only">Weekly frequency and main benefit</caption>
                    <tbody>
                      {[
                        ["1× weekly", "Establish a routine"],
                        ["2× weekly", "Reinforce technique and consistency"],
                        ["3× weekly", "More opportunities for strength and skill development"],
                        ["4×+ weekly", "Flexible, varied practice with appropriate recovery"],
                      ].map(([f, b], i) => (
                        <tr key={f} className={i ? "border-t border-[var(--sg-line)]" : ""}>
                          <th scope="row" className="px-4 py-3 font-semibold">{f}</th>
                          <td className="px-4 py-3">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
                <p className="mt-2 text-xs text-[var(--sg-muted)]">
                  More in{" "}
                  <Link href="/staff/membership-guide#why" className="underline">
                    Why frequency matters
                  </Link>{" "}
                  in the membership guide.
                </p>
              </div>
            </Section>

            {/* ---------- Objections ---------- */}
            <Section id="objections" eyebrow="When they hesitate" title="Handling objections" lead="Answer the real concern. Never pressure.">
              <div className="flex flex-col gap-2.5">
                {objections.map((o) => (
                  <details key={o.q} className="group rounded-2xl border border-[var(--sg-line)] bg-white">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sg-ink)] [&::-webkit-details-marker]:hidden">
                      {o.q}
                      <span aria-hidden className="text-xl leading-none text-[var(--sg-muted)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="space-y-3 px-5 pb-5 text-[0.95rem] leading-relaxed">
                      <p><strong>Understand: </strong>{o.understand}</p>
                      <ScriptBox label="Say" text={o.say} />
                      <p><strong>Avoid: </strong>{o.avoid}</p>
                      <p><strong>Next step: </strong>{o.next}</p>
                    </div>
                  </details>
                ))}
              </div>
            </Section>

            {/* ---------- Daily ---------- */}
            <Section
              id="daily"
              eyebrow="Every shift"
              title="Daily conversion checklist"
              lead="A practice aid. Ticks aren't saved anywhere and don't update Mindbody."
            >
              <LeadCheckAlert size="sm" />
              <div className="grid gap-4 lg:grid-cols-3">
                <Checklist title="Start of shift" items={dailyChecklist.start} />
                <Checklist title="During the shift" items={dailyChecklist.during} />
                <Checklist title="Before you leave" items={dailyChecklist.end} />
              </div>
              <p className="text-sm text-[var(--sg-muted)]">
                Also check every upcoming class in advance in Mindbody.
              </p>
            </Section>

            {/* ---------- Scripts ---------- */}
            <Section id="scripts" eyebrow="What should I say?" title="Quick scripts" lead="Tap Copy, then make it your own. Fill in the [brackets].">
              <div className="grid gap-4">
                {scripts
                  .filter((s) => !["second-core", "second-elite", "second-unlimited"].includes(s.id))
                  .map((s) => (
                    <ScriptBox key={s.id} label={s.title} text={s.text} />
                  ))}
              </div>
            </Section>

            {/* ---------- Training ---------- */}
            <Section id="training" eyebrow="For new team members" title="Practice scenarios" lead="Read each one aloud with a teammate.">
              <div className="flex flex-col gap-2.5">
                {scenarios.map((s) => (
                  <details key={s.title} className="group rounded-2xl border border-[var(--sg-line)] bg-white">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sg-ink)] [&::-webkit-details-marker]:hidden">
                      {s.title}
                      <span aria-hidden className="text-xl leading-none text-[var(--sg-muted)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="space-y-3 px-5 pb-5 text-[0.95rem] leading-relaxed">
                      <p><strong>Situation: </strong>{s.situation}</p>
                      <p><strong>What to do: </strong>{s.action}</p>
                      <ScriptBox label="Example" text={s.example.replace(/^“|”$/g, "")} />
                      <p><strong>Good outcome: </strong>{s.outcome}</p>
                      <p><strong>Common mistakes: </strong>{s.mistakes}</p>
                    </div>
                  </details>
                ))}
              </div>

              <Card>
                <h3 className="font-semibold">What we expect from every shift</h3>
                <div className="mt-3">
                  <Bullets items={expectations} />
                </div>
                <p className="mt-3 text-xs text-[var(--sg-muted)]">
                  Conversion by the third visit is a coaching goal, not a guarantee.
                </p>
              </Card>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}
