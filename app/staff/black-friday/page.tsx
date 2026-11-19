import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STAFF_COOKIE, STAFF_LOGIN, verifySessionToken } from "../../lib/staffAuth";
import StaffBar from "../StaffBar";
import SavingsCalculator from "./SavingsCalculator";
import {
  INTRO_REDEMPTION_DAYS,
  SALE_ENDS_LABEL,
  TERMS,
  isSaleEnded,
  comparisonTable,
  faqs,
  intros,
  offers,
  packRows,
  usd,
  type Comparison,
  type IntroId,
} from "./bfStaffData";

export const metadata: Metadata = {
  title: "Black Friday Staff Guide",
  description: "Private Black Friday pricing and Intro Credit comparison for the Alva Pilates team.",
};

export const dynamic = "force-dynamic";

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" } as const;

const th = "whitespace-nowrap px-3 py-2.5 text-left text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--bf-muted)]";
const thR = `${th} !text-right`;
const td = "whitespace-nowrap px-3 py-3 text-sm tabular-nums";
const tdR = `${td} text-right`;

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-[var(--bf-line)] py-10 sm:py-12">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--bf-muted)]">{eyebrow}</p>
      <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight" style={serif}>
        {title}
      </h2>
      {lead ? <div className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--bf-muted)]">{lead}</div> : null}
      <div className="mt-6 flex flex-col gap-5">{children}</div>
    </section>
  );
}

/** Horizontally scrollable on phones; the first column stays readable. */
function TableWrap({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto rounded-2xl border border-[var(--bf-line)] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bf-burgundy)]"
    >
      <table className="w-full min-w-[34rem] border-collapse">{children}</table>
    </div>
  );
}

function OfferTable({ term }: { term: 6 | 12 }) {
  const rows = offers[term];
  return (
    <TableWrap label={`${term}-month Black Friday savings`}>
      <thead className="border-b border-[var(--bf-line)] bg-[var(--bf-stone)]/40">
        <tr>
          <th className={th}>Membership</th>
          <th className={thR}>Regular monthly</th>
          <th className={thR}>Promo monthly</th>
          <th className={thR}>Savings / payment</th>
          <th className={thR}>Total savings</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--bf-line)]">
        {rows.map((o) => (
          <tr key={o.tier}>
            <th scope="row" className={`${td} text-left font-semibold`}>{o.name}</th>
            <td className={tdR}>{usd(o.regularCents)}</td>
            <td className={tdR}>{usd(o.promoCents)}</td>
            <td className={tdR}>{usd(o.savingsPerPaymentCents)}</td>
            <td className={`${tdR} font-semibold text-[var(--bf-burgundy)]`}>{usd(o.totalSavingsCents)}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

function ComparisonTable({ intro }: { intro: IntroId }) {
  const rows: Comparison[] = comparisonTable(intro);
  const credit = usd(intros[intro].creditCents);
  return (
    <TableWrap label={`Black Friday versus ${credit} Intro Credit`}>
      <thead className="border-b border-[var(--bf-line)] bg-[var(--bf-stone)]/40">
        <tr>
          <th className={th}>Membership</th>
          <th className={th}>Term</th>
          <th className={thR}>Black Friday savings</th>
          <th className={thR}>Intro Credit savings</th>
          <th className={th}>Best deal</th>
          <th className={thR}>Extra savings</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--bf-line)]">
        {rows.map((r) => {
          const bf = r.winner === "blackfriday";
          const label = r.winner === "tie" ? "Equal" : bf ? "Black Friday" : "Intro Credit";
          return (
            <tr key={`${r.offer.tier}-${r.offer.term}`} className={r.winner === "intro" ? "bg-[#f3e6d4]" : ""}>
              <th scope="row" className={`${td} text-left font-semibold`}>{r.offer.name}</th>
              <td className={td}>{r.offer.term} months</td>
              <td className={`${tdR} ${bf ? "font-semibold text-[var(--bf-burgundy)]" : ""}`}>{usd(r.bfSavingsCents)}</td>
              <td className={`${tdR} ${r.winner === "intro" ? "font-semibold text-[var(--bf-burgundy)]" : ""}`}>{usd(r.introSavingsCents)}</td>
              <td className={td}>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    bf ? "bg-[var(--bf-burgundy)] text-white" : r.winner === "intro" ? "bg-[#8a5a12] text-white" : "bg-[var(--bf-stone)]"
                  }`}
                >
                  {label}
                </span>
              </td>
              <td className={`${tdR} font-semibold`}>{usd(r.differenceCents)}</td>
            </tr>
          );
        })}
      </tbody>
    </TableWrap>
  );
}

export default async function BlackFridayStaffPage() {
  // Defense in depth: the middleware gates this route, and so does the page itself.
  if (!(await verifySessionToken((await cookies()).get(STAFF_COOKIE)?.value))) {
    redirect(STAFF_LOGIN);
  }

  const ended = isSaleEnded();

  // The takeaway is derived from the data, so it can't drift from the tables above.
  const intro99Wins = comparisonTable("intro99").filter((r) => r.winner === "intro");
  const takeaway =
    intro99Wins.length === 0
      ? "Black Friday gives greater or equal total savings than the $99 Intro Credit for every eligible membership."
      : `The $99 Intro Credit beats Black Friday only for ${intro99Wins
          .map((r) => `the ${r.offer.term}-month ${r.offer.name} membership`)
          .join(" and ")}. For all other eligible memberships, Black Friday provides greater total savings.`;

  return (
    <div
      className="min-h-dvh bg-[var(--bf-ivory)] text-[var(--bf-ink)]"
      style={
        {
          "--bf-ivory": "#F4EFE4",
          "--bf-burgundy": "#6D2639",
          "--bf-stone": "#D8CFC4",
          "--bf-ink": "#2b2523",
          "--bf-muted": "#5f564f",
          "--bf-line": "rgba(43, 37, 35, 0.14)",
        } as CSSProperties
      }
    >
      <StaffBar current="/staff/black-friday" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="pb-6 pt-10 lg:pt-14">
          <span className="inline-flex items-center rounded-full border border-[var(--bf-burgundy)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--bf-burgundy)]">
            Staff Reference Only
          </span>
          <h1 className="mt-4 text-[clamp(2.4rem,5.4vw,3.8rem)] leading-[1.05]" style={serif}>
            Black Friday Deals &amp; Intro Credit Comparison
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--bf-muted)]">
            Compare options and recommend whichever saves the client the most. Sale ends {SALE_ENDS_LABEL}. For internal
            use only — please don&apos;t share or screenshot outside the team.
          </p>
          {ended ? (
            <p className="mt-4 rounded-xl border border-[#c9a45f] bg-[#fbf3e1] px-4 py-3 text-sm font-semibold text-[#6b4f12]">
              The sale window has ended. Do not offer these promotions without management approval.
            </p>
          ) : null}
        </header>

        <main className="min-w-0">
          <Section
            id="calculator"
            eyebrow="Savings calculator"
            title="Pick the best deal in seconds"
            lead="Choose the membership, commitment and the client's Intro Credit. The recommendation compares total savings."
          >
            <SavingsCalculator />
          </Section>

          <Section
            id="black-friday"
            eyebrow="Black Friday promotion"
            title="20% off the first payments"
            lead="The promotional rate applies only during the discounted payment period. Later payments return to the regular monthly rate. Essential ($119 for 4 classes/month) is excluded from Black Friday membership discounts and from Intro Credit redemption."
          >
            {TERMS.map((term) => (
              <div key={term} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl" style={serif}>
                    {term}-month memberships
                  </h3>
                  <p className="text-sm text-[var(--bf-muted)]">
                    20% off the first <strong>{offers[term][0].paymentsWord.toUpperCase()}</strong> monthly payments · code{" "}
                    <code className="rounded bg-[var(--bf-stone)] px-1.5 py-0.5 font-mono text-[0.85rem] font-semibold text-[var(--bf-burgundy)]">
                      {offers[term][0].code}
                    </code>
                  </p>
                </div>
                <OfferTable term={term} />
              </div>
            ))}
          </Section>

          <Section
            id="intro-credit"
            eyebrow="Intro Credit"
            title="How Intro Credit works"
          >
            <ul className="grid gap-3 sm:grid-cols-2">
              {(["intro69", "intro99"] as const).map((id) => (
                <li key={id} className="rounded-2xl border border-[var(--bf-line)] bg-white px-5 py-4">
                  <p className="text-lg font-semibold">{intros[id].name}</p>
                  <p className="mt-0.5 text-sm text-[var(--bf-muted)]">
                    {usd(intros[id].creditCents)} credit toward the first eligible membership payment.
                  </p>
                </li>
              ))}
            </ul>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--bf-muted)]">
              <li>The credit applies to the <strong>first</strong> membership payment only, not every month.</li>
              <li>
                Eligibility is limited to the redemption window after the intro expires (currently{" "}
                {INTRO_REDEMPTION_DAYS} days). Verify the client&apos;s expiration date and eligibility in Mindbody.
              </li>
              <li>Intro Credit does not stack with Black Friday. Exceptions need management approval.</li>
            </ul>
          </Section>

          <Section
            id="compare-69"
            eyebrow="Comparison"
            title="Black Friday vs. $69 Intro Credit"
            lead="Total promotional savings, not just the first payment."
          >
            <ComparisonTable intro="intro69" />
          </Section>

          <Section id="compare-99" eyebrow="Comparison" title="Black Friday vs. $99 Intro Credit">
            <ComparisonTable intro="intro99" />
            <div className="rounded-xl border border-[var(--bf-burgundy)]/40 bg-white px-4 py-3 text-sm leading-relaxed">
              <strong className="text-[var(--bf-burgundy)]">Critical staff takeaway:</strong> {takeaway}
            </div>
          </Section>

          <Section
            id="packs"
            eyebrow="Class packs"
            title="Black Friday class pack pricing"
            lead="20% off class packs during the sale. No promo code is needed. Existing pack expiration terms are unchanged."
          >
            <TableWrap label="Black Friday class pack pricing">
              <thead className="border-b border-[var(--bf-line)] bg-[var(--bf-stone)]/40">
                <tr>
                  <th className={th}>Package</th>
                  <th className={thR}>Regular price</th>
                  <th className={thR}>Sale price</th>
                  <th className={thR}>Savings</th>
                  <th className={th}>Expires after</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--bf-line)]">
                {packRows.map((p) => (
                  <tr key={p.classes}>
                    <th scope="row" className={`${td} text-left font-semibold`}>{p.classes} Classes</th>
                    <td className={tdR}>{usd(p.regularCents)}</td>
                    <td className={`${tdR} font-semibold text-[var(--bf-burgundy)]`}>{usd(p.saleCents)}</td>
                    <td className={tdR}>{usd(p.savingsCents)}</td>
                    <td className={td}>{p.expires}</td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--bf-muted)]">
              <li>Intro Credit applies to memberships only, never to class packs.</li>
              <li>
                Gift cards are also 20% off during the sale, subject to the currently configured Mindbody promotion and
                eligible gift card products.
              </li>
            </ul>
          </Section>

          <Section id="faq" eyebrow="Talking points" title="Staff FAQs">
            <div className="divide-y divide-[var(--bf-line)] rounded-2xl border border-[var(--bf-line)] bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group px-5 py-4">
                  <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-[var(--bf-burgundy)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--bf-muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>
        </main>

        <div className="pb-16" />
      </div>
    </div>
  );
}
