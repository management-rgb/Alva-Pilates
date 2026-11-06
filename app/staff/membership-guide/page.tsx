import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_COOKIE, STAFF_LOGIN, verifySessionToken } from "../../lib/staffAuth";
import StaffBar from "../StaffBar";
import Calculator from "./Calculator";
import CopyButton from "./CopyButton";
import Recommender from "./Recommender";
import SectionNav from "./SectionNav";
import {
  benefitsOfConsistency,
  considerations,
  faqs,
  frequencyDisclaimer,
  frequencyLevels,
  introOffers,
  openItems,
  playbookSteps,
  plans,
  policies,
  quickPitches,
  recommendations,
  scripts,
  tierContent,
  classPacks,
} from "./guideData";
import { commitmentTotal, money, perClass, termSavings, TERMS } from "./pricingMath";
import type { Plan } from "./types";
import { Bullets, Card, Eyebrow, ScriptBox, Section, SubHead, VerifyBadge, serif } from "./ui";

export const metadata: Metadata = {
  title: "Membership & Sales Guide",
  description: "Private front desk membership and sales guide for the Alva Pilates team.",
};

export const dynamic = "force-dynamic";

const NAV = [
  { id: "quick", label: "Quick reference" },
  { id: "why", label: "Why frequency matters" },
  { id: "memberships", label: "Memberships" },
  { id: "recommend", label: "Recommend a plan" },
  { id: "calculator", label: "Price calculator" },
  { id: "playbook", label: "Sales playbook" },
  { id: "scripts", label: "Scripts" },
  { id: "objections", label: "Objections & FAQ" },
  { id: "policies", label: "Policies" },
];

const main = plans.filter((p) => !p.comparisonOnly);
const planById = (id: string) => plans.find((p) => p.id === id)!;
const termsOf = (p: Plan) => TERMS.filter((t) => p.prices[t] !== undefined);
const lowestMonthly = (p: Plan) => Math.min(...termsOf(p).map((t) => p.prices[t]!));

export default async function MembershipGuidePage() {
  // Defense in depth: the middleware gates this route, and so does the page itself.
  if (!(await verifySessionToken((await cookies()).get(STAFF_COOKIE)?.value))) {
    redirect(STAFF_LOGIN);
  }

  const benefitMap = Object.fromEntries(Object.entries(tierContent).map(([k, v]) => [k, v.benefits]));
  const whyUpgrade = Object.fromEntries(Object.entries(tierContent).map(([k, v]) => [k, v.whyUpgrade]));

  const presets = [
    { label: "Essential → Core", from: "essential-3", to: "core-3" },
    { label: "Core → Elite (6-mo)", from: "core-6", to: "elite-6" },
    { label: "Elite → Unlimited (6-mo)", from: "elite-6", to: "unlimited-6" },
    { label: "Core → Elite (12-mo)", from: "core-12", to: "elite-12" },
    { label: "Elite → Unlimited (12-mo)", from: "elite-12", to: "unlimited-12" },
  ];

  const perkRows: { label: string; cell: (p: Plan) => string }[] = [
    { label: "Classes per month", cell: (p) => (p.classesPerMonth === null ? "Up to 1 per day" : String(p.classesPerMonth)) },
    { label: "Guest passes", cell: (p) => `${p.guestPassesPerMonth} per month` },
    { label: "Off privates", cell: (p) => `${p.privatesDiscount}%` },
    { label: "Off extra packs & retail", cell: (p) => `${p.packsRetailDiscount}%` },
    { label: "Booking", cell: (p) => (p.booking === "early" ? "Early access" : p.booking === "priority" ? "Priority" : "Standard") },
    { label: "Waitlist priority", cell: (p) => (p.waitlistPriority ? "Yes" : "—") },
  ];

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
      <StaffBar current="/staff/membership-guide" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-6 pt-10 lg:pt-14">
          <Eyebrow>Front desk handbook</Eyebrow>
          <h1 className="mt-2 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05]" style={serif}>
            Membership &amp; Sales Guide
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--sg-muted)]">
            Everything you need to explain our memberships, recommend the right plan, and help clients join before they leave the studio.
            For internal use — please don&apos;t share or screenshot outside the team.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          <SectionNav items={NAV} />

          <main className="min-w-0">
            {/* ---------------- Quick reference ---------------- */}
            <Section
              id="quick"
              eyebrow="Quick sales reference"
              title="Find the right answer in seconds"
              lead="Ask: “How many times a week would you like to come?” Then match the plan."
            >
              <div className="rounded-xl border border-[var(--sg-primary)] bg-[var(--sg-secondary)]/50 px-4 py-3 text-sm font-medium">
                All memberships are billed monthly — not as a single upfront payment.
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {main.map((p) => {
                  const t = tierContent[p.id as "core" | "elite" | "unlimited"];
                  return (
                    <Card key={p.id} className="flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-2xl" style={serif}>{p.name}</h3>
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--sg-primary)] px-2.5 py-1 text-xs font-semibold">
                          {t.frequencyChip}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-[var(--sg-muted)]">{t.headline}</p>
                      <dl className="mt-4 space-y-1.5 text-sm">
                        {termsOf(p).map((term) => (
                          <div key={term} className="flex justify-between gap-3">
                            <dt className="text-[var(--sg-muted)]">{term}-month</dt>
                            <dd className="font-semibold">{money(p.prices[term]!)}/mo</dd>
                          </div>
                        ))}
                        <div className="flex justify-between gap-3 border-t border-[var(--sg-line)] pt-1.5">
                          <dt className="text-[var(--sg-muted)]">Classes</dt>
                          <dd className="font-semibold">{p.classesPerMonth ?? "Up to 1/day"}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-[var(--sg-muted)]">Per class</dt>
                          <dd className="font-semibold">
                            {p.classesPerMonth === null ? "as low as " : ""}
                            {money(perClass(Math.min(...termsOf(p).map((x) => p.prices[x]!)), p))}–
                            {money(perClass(Math.max(...termsOf(p).map((x) => p.prices[x]!)), p))}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-4 flex-1 text-[0.95rem] italic leading-relaxed">
                        &ldquo;{quickPitches[p.id as "core" | "elite" | "unlimited"]}&rdquo;
                      </p>
                      <div className="mt-3">
                        <CopyButton text={quickPitches[p.id as "core" | "elite" | "unlimited"]} label="Copy pitch" />
                      </div>
                    </Card>
                  );
                })}
              </div>
              <p className="text-sm text-[var(--sg-muted)]">
                Once a week? Start the conversation with Essential ({money(planById("essential").prices[3]!)}/mo, 4 classes) and show how Core builds consistency.
                Unlimited per-class pricing assumes 1 class per day.
              </p>
            </Section>

            {/* ---------------- Why frequency matters ---------------- */}
            <Section
              id="why"
              eyebrow="Understanding the value"
              title="Why practicing more often matters"
              lead="Consistent reformer Pilates gives clients more chances to learn, refine and build on what they practice. Use these ideas to explain value honestly — without promising specific results."
            >
              <div>
                <SubHead>What consistent reformer Pilates supports</SubHead>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {benefitsOfConsistency.map((b) => (
                    <Card key={b.title} className="!p-4">
                      <h4 className="font-semibold">{b.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--sg-muted)]">{b.body}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <SubHead>What each weekly frequency offers</SubHead>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {frequencyLevels.map((f) => (
                    <Card key={f.id} className="!p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-semibold">{f.label}</h4>
                        <span className="text-xs font-semibold text-[var(--sg-muted)]">{f.plan}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed">{f.summary}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <FrequencyVisual />

              <div className="rounded-xl border border-[#c9a45f] bg-[#fbf3e1] px-4 py-3 text-sm leading-relaxed text-[#4d3a0d]">
                <strong>Keep it honest. </strong>
                {frequencyDisclaimer}
              </div>
            </Section>

            {/* ---------------- Memberships ---------------- */}
            <Section
              id="memberships"
              eyebrow="Membership details"
              title="Core, Elite and Unlimited"
              lead="Prices are monthly rates. Every membership is billed monthly and has a minimum commitment; a longer commitment lowers the monthly rate."
            >
              <Card className="overflow-x-auto !p-0">
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <caption className="sr-only">Monthly price by commitment length</caption>
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
                            {p.prices[t] !== undefined ? (
                              <>
                                <span className="font-semibold">{money(p.prices[t]!)}</span>
                                <span className="block text-xs text-[var(--sg-muted)]">
                                  {p.classesPerMonth === null ? "as low as " : ""}
                                  {money(perClass(p.prices[t]!, p))}/class
                                </span>
                              </>
                            ) : (
                              <span className="text-[var(--sg-muted)]">N/A</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <div>
                <SubHead>What a longer commitment saves</SubHead>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {main.map((p) => {
                    const ts = termsOf(p);
                    const shortest = ts[0];
                    const rows = ts
                      .filter((t) => t > shortest)
                      .map((t) => ({ t, s: termSavings(p, shortest, t)! }));
                    const between =
                      ts.length === 3 ? { s: termSavings(p, 6, 12)! } : null;
                    return (
                      <Card key={p.id} className="!p-4">
                        <h4 className="font-semibold">{p.name}</h4>
                        <ul className="mt-2 space-y-1.5 text-sm">
                          {rows.map(({ t, s }) => (
                            <li key={t}>
                              {t} months vs {shortest}: <strong>{money(s.perMonth)}/mo less</strong> ({money(s.perYear)} per year)
                            </li>
                          ))}
                          {between && ts.includes(6) ? (
                            <li>
                              12 months vs 6: <strong>{money(between.s.perMonth)}/mo less</strong> ({money(between.s.perYear)} per year)
                            </li>
                          ) : null}
                        </ul>
                        <p className="mt-2 text-xs text-[var(--sg-muted)]">
                          Total over the longest commitment: {money(commitmentTotal({ price: p.prices[ts[ts.length - 1]]!, term: ts[ts.length - 1] }))}, billed monthly.
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div>
                <SubHead>Member perks at a glance</SubHead>
                <Card className="mt-3 overflow-x-auto !p-0">
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <caption className="sr-only">Perks by membership</caption>
                    <thead className="bg-[var(--sg-ivory)] text-xs uppercase tracking-[0.12em] text-[var(--sg-muted)]">
                      <tr>
                        <th scope="col" className="px-4 py-3">&nbsp;</th>
                        {main.map((p) => (
                          <th key={p.id} scope="col" className="px-4 py-3">{p.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {perkRows.map((r) => (
                        <tr key={r.label} className="border-t border-[var(--sg-line)]">
                          <th scope="row" className="px-4 py-3 font-medium text-[var(--sg-muted)]">{r.label}</th>
                          {main.map((p) => (
                            <td key={p.id} className="px-4 py-3">{r.cell(p)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--sg-muted)]">
                  <VerifyBadge /> Discounts, booking access and waitlist priority match the public pricing page; confirm they still apply before quoting.
                </p>
              </div>

              <div>
                <SubHead>Also worth mentioning</SubHead>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <Card className="!p-4">
                    <h4 className="font-semibold">Membership vs. class packs</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--sg-muted)]">
                      Non-member rates:{" "}
                      {classPacks.map((c) => `${c.label} ${money(c.price)} (${money(c.price / c.classes)}/class)`).join(" · ")}.
                      Core, Elite and Unlimited all come in lower per class, and members save on additional packs, privates and retail.
                    </p>
                  </Card>
                  <Card className="!p-4">
                    <h4 className="font-semibold">Intro offers → membership</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--sg-muted)]">
                      {introOffers.threeClass.name} ({money(introOffers.threeClass.price)}) and {introOffers.unlimited15.name} ({money(introOffers.unlimited15.price)}).{" "}
                      {introOffers.creditNote}
                    </p>
                  </Card>
                </div>
              </div>

              {(["core", "elite", "unlimited"] as const).map((id) => {
                const p = planById(id);
                const t = tierContent[id];
                return (
                  <article key={id} id={`tier-${id}`} className="scroll-mt-20 rounded-2xl border border-[var(--sg-line)] bg-white p-5 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Eyebrow>{p.positioning}</Eyebrow>
                        <h3 className="mt-1 text-4xl" style={serif}>
                          {p.name}
                          <span className="ml-3 text-xl text-[var(--sg-muted)]">
                            {p.classesPerMonth ? `${p.classesPerMonth} classes per month` : "Up to 1 class per day"}
                          </span>
                        </h3>
                      </div>
                      <span className="rounded-full bg-[var(--sg-primary)] px-3 py-1.5 text-sm font-semibold">
                        From {money(lowestMonthly(p))}/mo
                      </span>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                      <div>
                        <SubHead>Ideal for</SubHead>
                        <div className="mt-3"><Bullets items={t.idealFor} /></div>
                      </div>
                      <div>
                        <SubHead>Benefits</SubHead>
                        <div className="mt-3"><Bullets items={t.benefits} /></div>
                      </div>
                    </div>

                    {t.note ? (
                      <p className="mt-5 rounded-xl bg-[var(--sg-secondary)]/60 px-4 py-3 text-sm leading-relaxed">
                        <strong>Remember: </strong>{t.note}
                      </p>
                    ) : null}

                    <div className="mt-6">
                      <ScriptBox label={t.script.label} text={t.script.text} />
                    </div>
                  </article>
                );
              })}
            </Section>

            {/* ---------------- Recommender ---------------- */}
            <Section
              id="recommend"
              eyebrow="Interactive tool"
              title="Recommend a membership"
              lead="Ask the client how often they'd ideally attend, then adjust for goals, budget, schedule and recovery."
            >
              <Recommender
                plans={plans}
                recommendations={recommendations}
                considerations={considerations}
                benefits={benefitMap}
              />
            </Section>

            {/* ---------------- Calculator ---------------- */}
            <Section
              id="calculator"
              eyebrow="Interactive tool"
              title="Pricing & upgrade calculator"
              lead="Compare any two plans — monthly payment, classes, price per class and commitment. The summary only claims what the numbers support."
            >
              <Calculator plans={plans} presets={presets} whyUpgrade={whyUpgrade} />
            </Section>

            {/* ---------------- Playbook ---------------- */}
            <Section
              id="playbook"
              eyebrow="Sales playbook"
              title="From first class to membership"
              lead="Follow these six steps after class. The goal is to help interested clients join in person, at the desk, rather than sending them away to buy online."
            >
              <ol className="flex flex-col gap-3">
                {playbookSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-[var(--sg-line)] bg-white p-4 sm:p-5">
                    <span className="text-2xl tabular-nums text-[var(--sg-muted)]" style={serif}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{s.title}</h3>
                      <div className="mt-2 flex items-start justify-between gap-3 rounded-xl bg-[var(--sg-ivory)] p-3">
                        <p className="text-[0.95rem] italic leading-relaxed">&ldquo;{s.say}&rdquo;</p>
                        <CopyButton text={s.say} label="Copy" />
                      </div>
                      <p className="mt-2 text-sm text-[var(--sg-muted)]">{s.tip}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-[var(--sg-muted)]">
                Tone check: warm, natural, confident and helpful — never pushy. Explain the benefit before the price, and recommend one plan.
              </p>
            </Section>

            {/* ---------------- Scripts ---------------- */}
            <Section
              id="scripts"
              eyebrow="Ready-to-use scripts"
              title="Scripts for every situation"
              lead="Adapt the wording to sound like you. Fill in the blanks (___) with the client's details."
            >
              <div className="grid gap-4">
                {scripts.map((s) => (
                  <ScriptBox key={s.id} label={s.title} hint={s.when} text={s.text} />
                ))}
              </div>
              <ScriptBox
                label="Closing in person"
                hint="Use after they've chosen a plan."
                text={playbookSteps[5].say}
              />
              <p className="text-xs text-[var(--sg-muted)]">
                Dollar figures inside scripts are written out by hand: Essential $119 → Core $219 (3-month), Core $209 → Elite $269 (6-month), Elite $269 → Unlimited $349 (6-month). If pricing changes, update them in guideData.ts too.
              </p>
            </Section>

            {/* ---------------- FAQ ---------------- */}
            <Section
              id="objections"
              eyebrow="Common questions"
              title="Objections & suggested responses"
              lead="Practical, conversational answers. Anything marked Verify is not confirmed in studio policy — check before promising it."
            >
              <div className="flex flex-col gap-2.5">
                {faqs.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-[var(--sg-line)] bg-white open:bg-white">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sg-ink)] [&::-webkit-details-marker]:hidden">
                      <span className="flex flex-wrap items-center gap-2">
                        {f.q}
                        {f.verify ? <VerifyBadge /> : null}
                      </span>
                      <span aria-hidden className="text-xl leading-none text-[var(--sg-muted)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-[0.95rem] leading-relaxed">{f.a}</p>
                      {f.verify ? (
                        <p className="mt-3 rounded-lg bg-[#fbf3e1] px-3 py-2 text-sm text-[#4d3a0d]">
                          <strong>Verify: </strong>{f.verify}
                        </p>
                      ) : null}
                      <div className="mt-3"><CopyButton text={f.a} label="Copy answer" /></div>
                    </div>
                  </details>
                ))}
              </div>
            </Section>

            {/* ---------------- Policies ---------------- */}
            <Section
              id="policies"
              eyebrow="Reference"
              title="Membership policies"
              lead="Quote these as written. Don't add benefits, discounts or policies that aren't listed."
            >
              <dl className="grid gap-3 md:grid-cols-2">
                {policies.map((p) => (
                  <Card key={p.title} className="!p-4">
                    <dt className="flex flex-wrap items-center gap-2 font-semibold">
                      {p.title}
                      {p.verify ? <VerifyBadge /> : null}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[var(--sg-muted)]">{p.detail}</dd>
                  </Card>
                ))}
              </dl>

              <div className="rounded-2xl border border-[#c9a45f] bg-[#fbf3e1] p-5">
                <h3 className="font-semibold text-[#4d3a0d]">Open items for the studio owner to confirm</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#4d3a0d]">
                  {openItems.map((o) => (
                    <li key={o}>• {o}</li>
                  ))}
                </ul>
              </div>
            </Section>

            <p className="border-t border-[var(--sg-line)] py-8 text-xs text-[var(--sg-muted)]">
              Alva Pilates internal staff resource. Not for customers. Prices and policies are maintained in one place — ask the studio owner to update them.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

/** Illustrative week strips + monthly session bars. Not a result claim. */
function FrequencyVisual() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const patterns: Record<string, number[]> = {
    once: [2],
    twice: [1, 3],
    three: [0, 2, 4],
    four: [0, 1, 3, 4],
  };
  const max = 16;
  return (
    <div>
      <SubHead>Why two or three planned sessions can beat one</SubHead>
      <Card className="mt-3">
        <p className="text-sm leading-relaxed text-[var(--sg-muted)]">
          Illustrative only — not a promise of results. More frequent sessions mean more chances to practice a movement while it&apos;s still fresh, so technique and confidence have more opportunities to build between classes.
        </p>
        <ul className="mt-5 space-y-4">
          {frequencyLevels.map((f) => {
            const pattern = patterns[f.id];
            return (
              <li key={f.id} className="grid items-center gap-x-4 gap-y-2 sm:grid-cols-[11rem_1fr]">
                <div>
                  <p className="text-sm font-semibold">{f.label}</p>
                  <p className="text-xs text-[var(--sg-muted)]">{f.gap}</p>
                </div>
                <div>
                  <div className="flex gap-1.5" role="img" aria-label={`Example week: classes on ${pattern.map((d) => days[d]).join(", ")}`}>
                    {days.map((d, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          pattern.includes(i)
                            ? "bg-[var(--sg-ink)] text-white"
                            : "border border-[var(--sg-line)] bg-[var(--sg-ivory)] text-[var(--sg-muted)]"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--sg-secondary)]/60">
                      <div className="h-full rounded-full bg-[var(--sg-primary)]" style={{ width: `${(f.sessions / max) * 100}%` }} />
                    </div>
                    <span className="w-24 shrink-0 text-xs font-medium text-[var(--sg-muted)]">{f.sessionsLabel}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 grid gap-3 border-t border-[var(--sg-line)] pt-4 text-sm leading-relaxed sm:grid-cols-3">
          <p><strong>Reinforce:</strong> a second class soon after the first revisits the same cues before they fade.</p>
          <p><strong>Progress:</strong> more sessions give room to build strength gradually rather than starting over each week.</p>
          <p><strong>Vary:</strong> two or three sessions allow a mix of strength, mobility and gentler work.</p>
        </div>
      </Card>
    </div>
  );
}
