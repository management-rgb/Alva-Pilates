import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Front Desk Playbook",
  description: "Internal front desk playbook for the Alva Pilates team.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const sections = [
  { id: "key-rules", num: "★", label: "Key rules" },
  { id: "bonus", num: "1", label: "Bonus ★" },
  { id: "habits", num: "•", label: "Daily habits" },
  { id: "overview", num: "2", label: "Grow the community" },
  { id: "new-clients", num: "3", label: "New clients" },
  { id: "intros", num: "4", label: "Intros to members" },
  { id: "renewals", num: "5", label: "Renewals ★" },
  { id: "former", num: "6", label: "Former clients" },
  { id: "offers", num: "7", label: "Offers & limits" },
  { id: "records", num: "8", label: "Notes & results" },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
      {children}
    </p>
  );
}

function Section({
  id,
  num,
  title,
  lead,
  children,
  tinted = false,
}: {
  id: string;
  num: string;
  title: string;
  lead: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-32 border-t border-[var(--lp-line)] px-6 py-14 lg:px-10 lg:py-20 ${
        tinted
          ? "bg-gradient-to-b from-[var(--lp-ivory)] via-[var(--lp-stone)] to-[var(--lp-ivory)]"
          : ""
      }`}
    >
      <div className="mx-auto max-w-[64rem]">
        <Eyebrow>Section {num}</Eyebrow>
        <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--text-secondary)]">
          {lead}
        </p>
        <div className="mt-10 flex flex-col gap-10">{children}</div>
      </div>
    </section>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
      {children}
    </h3>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] p-5 shadow-[0_1px_2px_rgba(23,23,23,0.03)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.97rem] leading-[1.7] text-foreground">{children}</p>
  );
}

/** Numbered step list. */
function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="flex gap-4 rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] px-5 py-4"
        >
          <span className="font-heading text-lg font-medium tabular-nums text-[var(--text-secondary)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="pt-0.5 text-[0.95rem] leading-relaxed text-foreground">
            <strong className="font-semibold">{item.title}</strong> {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** "Say this" script box. */
function Script({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <figure className="rounded-[1.25rem] border-l-4 border-[var(--lp-char)] bg-[var(--lp-sand)] px-5 py-4">
      {label ? (
        <figcaption className="mb-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          {label}
        </figcaption>
      ) : null}
      <blockquote className="text-[0.97rem] italic leading-[1.7] text-foreground">
        {children}
      </blockquote>
    </figure>
  );
}

function Note({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-[1.25rem] border px-5 py-4 ${
        tone === "warn"
          ? "border-[var(--lp-line-strong)] bg-[var(--surface-muted)]"
          : "border-[var(--lp-line)] bg-[var(--surface)]"
      }`}
    >
      <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        {title}
      </p>
      <div className="mt-2 text-[0.95rem] leading-[1.7] text-foreground">
        {children}
      </div>
    </div>
  );
}

/**
 * Responsive two- or three-column table: a real table on wider screens,
 * stacked cards on phones.
 */
function Table({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] md:block">
        <table className="w-full border-collapse text-left text-[0.93rem]">
          <thead>
            <tr className="bg-[var(--lp-char)] text-[var(--lp-light)]">
              {head.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-[var(--lp-line)] align-top odd:bg-[var(--surface)] even:bg-[var(--lp-ivory)]"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-3.5 leading-relaxed ${
                      j === 0
                        ? "w-[30%] font-semibold text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] px-5 py-4"
          >
            {row.map((cell, j) => (
              <div key={j} className={j === 0 ? "" : "mt-2.5"}>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  {head[j]}
                </p>
                <div
                  className={`mt-0.5 text-[0.93rem] leading-relaxed text-foreground ${
                    j === 0 ? "font-semibold" : ""
                  }`}
                >
                  {cell}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] px-5 py-4 text-[0.95rem] leading-relaxed"
        >
          <span
            aria-hidden
            className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-[var(--lp-char)]"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[0.97rem] leading-[1.7] text-foreground"
        >
          <span
            aria-hidden
            className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lp-char)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** High-visibility callout for the rules that matter most. */
function Important({
  title = "Important",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] bg-[var(--lp-char)] px-5 py-5 text-[var(--lp-light)] shadow-[0_6px_20px_rgba(23,23,23,0.12)] sm:px-6">
      <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--lp-light)]/70">
        <span aria-hidden className="text-base leading-none">★</span>
        {title}
      </p>
      <div className="mt-2 text-[1rem] leading-[1.7]">{children}</div>
    </div>
  );
}

/** Practical suggestion added on top of the written policy. */
function Tip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-[var(--lp-line-strong)] bg-[var(--surface)] px-5 py-4">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        Tip · {title}
      </p>
      <div className="mt-2 text-[0.95rem] leading-[1.7] text-foreground">
        {children}
      </div>
    </div>
  );
}

/** Collapsed-by-default detail so the page stays scannable. */
function Fold({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] open:shadow-[0_1px_2px_rgba(23,23,23,0.04)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="text-[0.95rem] font-semibold text-foreground">
          {title}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          <span className="group-open:hidden">More</span>
          <span className="hidden group-open:inline">Less</span>
          <span
            aria-hidden
            className="text-base leading-none transition-transform group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <div className="flex flex-col gap-4 border-t border-[var(--lp-line)] px-5 py-5">
        {children}
      </div>
    </details>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--lp-char)] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--lp-light)]">
      {children}
    </span>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className="rounded-full border border-[var(--lp-line-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-[0.85rem] font-medium">
            {s}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden className="text-[var(--text-secondary)]">
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const plans = [
  { routine: "1× weekly", name: "Essential", classes: "4 classes", price: "$119", term: "6 months" },
  {
    routine: "2× weekly",
    name: "Core",
    classes: "8 classes",
    price: "$199 / $209",
    term: "12 / 6 months",
  },
  {
    routine: "3× weekly",
    name: "Elite",
    classes: "12 classes",
    price: "$249 / $269",
    term: "12 / 6 months",
  },
  {
    routine: "4×+ weekly",
    name: "Unlimited",
    classes: "1 per day",
    price: "$329 / $349",
    term: "12 / 6 months",
  },
];

const bonusRows = [
  ["Essential / 6 months", "$119", "$14.88"],
  ["Core / 12 months", "$199", "$24.88"],
  ["Core / 6 months", "$209", "$26.13"],
  ["Elite / 12 months", "$249", "$31.13"],
  ["Elite / 6 months", "$269", "$33.63"],
  ["Unlimited / 12 months", "$329", "$41.13"],
  ["Unlimited / 6 months", "$349", "$43.63"],
];

const scoreboard = [
  ["Real conversations", "75", "Client answered or replied. Track unanswered attempts separately."],
  [
    "Outreach class bookings",
    "60",
    "Each booking once. Separate new/lapsed/intro clients from existing members; track attendance too.",
  ],
  ["Paid intro purchases", "30", "Each actual paid intro purchase once."],
  [
    "New paid memberships",
    "9",
    "First payment cleared. Identify reactivations separately. Track renewals and cancellation-save sales separately; bonus rules are in Section 1.",
  ],
  [
    "Renewals at full price vs. discounted",
    "Track",
    "Count every completed renewal, then how many used 50% off or a free first month. Owners review the discounted share each month; most renewals should close at full price.",
  ],
  [
    "Confirmed member saves",
    "6",
    "Documented intent/risk, intervention, then active at 30 days. Absence alone is not a save.",
  ],
  [
    "Lapsed clients returned",
    "8",
    "Non-member absent 31+ days attends again. Booking alone is not a return.",
  ],
  ["Referral guest intros", "6", "Paid intro with referring member recorded."],
  [
    "Class #2 booked before leaving",
    "80%",
    "First-time attendees leaving with their next class booked ÷ all first-time attendees.",
  ],
  [
    "Fast lead response",
    "80%",
    "Within 30 minutes during staffed hours; everyone within 24 hours.",
  ],
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

/**
 * Internal front desk playbook — not linked from site nav, footer, or sitemap,
 * and noindex. Accessible only via direct URL for staff bookmarks.
 */
export default function FrontDeskPage() {
  return (
    <div className="staff-guide min-h-screen bg-[var(--lp-ivory)] text-foreground">
      <Header />

      <main>
        {/* Hero */}
        <section className="px-6 pb-12 pt-36 lg:px-10 lg:pb-16 lg:pt-44">
          <div className="mx-auto max-w-[64rem]">
            <div className="flex flex-wrap items-center gap-3">
              <Pill>Internal use only</Pill>
              <Pill>October 2026</Pill>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,4.6vw,3.9rem)] font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              Front Desk Playbook
            </h1>
            <p className="mt-4 max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-[var(--text-secondary)]">
              How we welcome new clients, help members renew, and bring former
              clients back. Private staff offers — do not share this page with
              clients.
            </p>
          </div>
        </section>

        {/* Sticky section nav */}
        <nav
          aria-label="Playbook sections"
          className="sticky top-[var(--header-height)] z-30 border-y border-[var(--lp-line)] bg-[var(--lp-ivory)]/95 backdrop-blur"
        >
          <div className="mx-auto max-w-[64rem] overflow-x-auto px-6 py-3 lg:px-10">
            <ul className="flex w-max gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--lp-line-strong)] bg-[var(--surface)] px-3.5 py-2 text-[0.8rem] font-medium text-foreground transition hover:bg-[var(--lp-char)] hover:text-[var(--lp-light)]"
                  >
                    <span className="tabular-nums text-[var(--text-secondary)]">
                      {s.num}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Key rules */}
        <section
          id="key-rules"
          className="scroll-mt-32 px-6 py-14 lg:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[64rem]">
            <Eyebrow>Start here</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              The rules that matter most
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--text-secondary)]">
              If you only remember one page, make it this one.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                ["15–30 min", "to reply to a new inquiry (staffed hours)"],
                ["24 hours", "the longest any inquiry waits"],
                ["1 owner", "per client, always"],
                ["1 offer", "per purchase. Never stack"],
                ["1 free OR $25", "single per client per 90 days"],
                ["Class #2", "booked before they leave"],
              ].map(([big, small]) => (
                <div
                  key={big}
                  className="rounded-[1.25rem] border border-[var(--lp-line-strong)] bg-[var(--surface)] px-4 py-5 text-center"
                >
                  <p className="font-heading text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
                    {big}
                  </p>
                  <p className="mt-2 text-[0.8rem] leading-snug text-[var(--text-secondary)]">
                    {small}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Note title="Your top 3 offers">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    ["$25 single class", "New lead or lapsed client not ready for an intro"],
                    ["50% off first month", "Unsure member renewing for 6 or 12 months, after a real concern"],
                    ["1–3 free restart classes", "Terminated former member coming back"],
                  ].map(([name, when]) => (
                    <div
                      key={name}
                      className="rounded-xl bg-[var(--lp-sand)] px-4 py-3.5"
                    >
                      <p className="font-heading text-lg font-medium leading-tight">
                        {name}
                      </p>
                      <p className="mt-1.5 text-[0.85rem] leading-snug text-[var(--text-secondary)]">
                        {when}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[var(--text-secondary)]">
                  Also common: next class for $29 after a single class. Everything
                  else is in the offers section. Never stack: one offer per
                  purchase.
                </p>
              </Note>

              <Important title="Golden rules">
                <ol className="flex flex-col gap-2.5">
                  {[
                    "Every client leaves with one next step: a booked class, a decision, or an agreed follow-up date.",
                    "Never make cancellation depend on accepting an offer or another sales conversation.",
                    "One discretionary incentive per purchase. No stacking.",
                    "Check offer history before you promise anything. Offers are shared across all staff.",
                    "Respect a clear no and any stop request. Honor preferred channels.",
                    "Anything outside the written rules goes to Jacob or Sam. Never promise it yourself.",
                    "Record every contact in the Notes section of the client’s Mindbody profile: stage, concern, offer, next date, your name.",
                    "Renewals are a top priority. Check the expiring-contracts list every shift and never let a contract lapse without a conversation.",
                  ].map((rule, i) => (
                    <li key={rule} className="flex gap-3">
                      <span className="font-heading tabular-nums text-[var(--lp-light)]/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </Important>

              <Note tone="warn" title="Before you offer anything, ask yourself">
                <ol className="list-decimal pl-5">
                  <li>Has this client already had a free or $25 single in the last 90 days?</li>
                  <li>Have they already received a discretionary offer on this purchase?</li>
                  <li>Did I contact them too recently (one call + one text per month for lapsed clients)?</li>
                  <li>Is the $800 monthly incentive tally close to the cap?</li>
                </ol>
                <p className="mt-2 text-[var(--text-secondary)]">
                  If the answer to any is “yes” or “not sure”, ask Jacob or Sam
                  first.
                </p>
              </Note>
            </div>
          </div>
        </section>

        {/* 8 */}
        <Section
          id="bonus"
          num="1"
          title="Know your bonus"
          lead="October trial: a one-time commission of 12.5% of the qualifying plan’s regular monthly price, paid once per sale. One employee per sale."
          tinted
        >
          <Card>
            <P>
              <strong>A completed renewal or cancellation save counts.</strong>{" "}
              If a client wants to terminate and you sell them a new contract or
              renewal, that qualifies. Renewing an expired or expiring contract
              through your documented sales conversation qualifies too.
            </P>
          </Card>

          <div className="flex flex-col gap-4">
            <Sub>Bonus per qualifying sale</Sub>
            <Table
              head={["Plan / commitment", "Monthly price", "Bonus"]}
              rows={bonusRows.map(([plan, price, bonus]) => [
                plan,
                price,
                <span key="b" className="font-heading text-lg font-medium">
                  {bonus}
                </span>,
              ])}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Sub>Qualifying sales</Sub>
              <Bullets
                items={[
                  "New recurring Essential, Core, Elite or Unlimited memberships, including intro/pack clients who join.",
                  "Former members fully inactive for 60+ days (one count per client per 90 days).",
                  "Actively sold renewals or cancellation-save contracts. The 60-day inactivity requirement does not apply to these.",
                ]}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Sub>Do not count</Sub>
              <Bullets
                items={[
                  "Automatic renewals without a documented sales conversation.",
                  "Simply keeping an unchanged contract; plan changes alone.",
                  "Holds/pauses restarting; unpaid enrollments.",
                  "Fully free/comped memberships; staff/family accounts.",
                  "Sales refunded or charged back before payday.",
                ]}
              />
              <P>
                Count each qualifying contract once. A renewal that is also a
                cancellation save earns one bonus.
              </P>
            </div>
          </div>

          <Fold title="Who earns it and how it is calculated">
            <Bullets
              items={[
                <>
                  The employee who <strong>completes enrollment in Mindbody</strong>{" "}
                  earns it: selects the plan, takes payment or applies eligible
                  credit/offer, and finalizes enrollment. No splitting.
                </>,
                "Use the regular monthly plan price; eligible intro credit or a first-month renewal offer does not lower the bonus amount.",
                <>
                  <strong>Online purchases go to a shared team pool.</strong>{" "}
                  When a client buys online, 10% of the purchase goes into a
                  pool shared by everyone on the team, paid out every 2 months. It is a
                  one-time share of the first purchase, not recurring. No
                  individual bonus is paid on online purchases.
                </>,
                "Handoffs remain part of the job; recognize follow-through in weekly shout-outs.",
              ]}
            />
          </Fold>

          <div className="flex flex-col gap-4">
            <Sub>Payment and free-first-month renewals</Sub>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Payment
                </p>
                <p className="mt-2 font-heading text-2xl font-medium tracking-[-0.02em]">
                  First payment must clear by Oct 31
                </p>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--text-secondary)]">
                  Eligible bonuses are paid on the first regular payroll after
                  month-end. A bonus already paid is not taken back during this
                  trial.
                </p>
              </Card>
            </div>
            <Note tone="warn" title="Free first month">
              The sale qualifies by type, but bonus payment waits for the first
              paid membership payment to clear. If that occurs after October 31,
              log it as pending; Jacob or Sam must confirm its treatment under
              any continued bonus program.{" "}
              <strong>Do not promise an October payout for it.</strong>
            </Note>
          </div>

          <Fold title="Keep a clear bonus log">
            <Card>
              <p className="font-mono text-[0.8rem] leading-relaxed text-[var(--text-secondary)]">
                Date | client initials | sale type | plan / term | regular
                monthly price | offer | first paid payment date | bonus |
                employee
              </p>
              <p className="mt-3 text-[0.93rem] text-foreground">
                Team total: $________. Track new, renewal, save and
                reactivation separately.
              </p>
            </Card>
            <P>
              Each employee receives the updated one-page bonus agreement and
              signs a receipt before participating. Review the trial together in
              November, including 30-day client outcomes, and decide whether to
              keep, change or stop it.
            </P>
          </Fold>
        </Section>
        {/* Daily habits */}
        <section
          id="habits"
          className="scroll-mt-32 border-t border-[var(--lp-line)] px-6 py-14 lg:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[64rem]">
            <Eyebrow>Every shift</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              7 habits that grow the studio
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                ["Book the next class before they leave.", "Class #2 on the calendar at checkout. Every time."],
                ["Check the “gone quiet” list.", "Members with no visit in 14 days get a warm text: “We miss you.” Cheaper than saving a renewal later."],
                ["Fill quiet classes.", "Invite someone from your lead list to an open spot. Max one invite per person per week."],
                ["Ask at the happy moment.", "After a client’s 3rd–4th class or a renewal, ask for a Google review and for a friend to bring."],
                ["Log why people say no.", "One word in the profile note: price, schedule, location or unsure."],
                ["Hold a 10-minute weekly huddle.", "Review the scoreboard, one real client conversation and one lost lead."],
                ["Keep Mindbody clean.", "Stage, concern, offer, next date, your name in the profile notes. Jacob or Sam spot-check weekly."],
              ].map(([title, body], i) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] px-5 py-4"
                >
                  <span className="font-heading text-lg font-medium tabular-nums text-[var(--text-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-0.5 text-[0.95rem] leading-relaxed text-foreground">
                    <strong className="font-semibold">{title}</strong>{" "}
                    <span className="text-[var(--text-secondary)]">{body}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 1 */}
        <Section
          id="overview"
          num="2"
          title="Grow the client community"
          lead="Three priorities: welcome new clients, renew unsure members, and bring former members back."
        >
          <Important title="The goal of every conversation">
            Every interested client leaves with one next step: a booked class,
            a decision, or an agreed follow-up date.
          </Important>

          <div className="flex flex-col gap-4">
            <Sub>Start each shift with three client lists</Sub>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <p className="font-heading text-xl font-medium">New clients</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  New inquiries, unused intros and intro clients ready for a
                  membership.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">Renewals</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Expiring/expired contracts and members unsure about
                  continuing.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">
                  Former members
                </p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Terminated accounts and past clients ready to restart.
                </p>
              </Card>
            </div>
            <P>
              Check due follow-ups and build a shared list of about{" "}
              <strong>10 priority clients</strong> across these groups. Check
              history first and give each client <strong>one staff owner</strong>.
            </P>
          </div>

          <div className="flex flex-col gap-4">
            <Sub>During the shift: make the next step easy</Sub>
            <Table
              head={["When this happens", "Your next move"]}
              rows={[
                [
                  "A new inquiry arrives",
                  "Contact within 15–30 minutes during staffed hours. Outside staffed hours: contact at the next opening, within 24 hours. Ask goals and availability; offer two real class times.",
                ],
                [
                  "A first-time client checks in",
                  "Welcome them by name, confirm their booking and help them understand what happens next. Refer class or movement questions to the instructor.",
                ],
                [
                  "A first-time client finishes",
                  "Ask how class felt. Book Class #2 before they leave. For the $99 intro, book their next two visits.",
                ],
                [
                  "A client is ready to decide",
                  "Recommend one plan that fits their routine. Explain price, commitment and billing, then ask clearly for the decision.",
                ],
                [
                  "A client is undecided",
                  "Identify the concern, use one eligible offer if helpful, and agree on the next contact date. Record it.",
                ],
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Sub>Close: nothing important gets lost</Sub>
            <Checklist
              items={[
                "New leads checked and due follow-ups handled",
                "Intro clients rebooked; results and offers logged",
                "Next actions, dates and staff owners assigned",
                "Tomorrow’s quieter classes reviewed",
                "Unfinished work and owner requests handed to a named person",
              ]}
            />
          </div>
        </Section>

        {/* 2 */}
        <Section
          id="new-clients"
          num="3"
          title="Bring in new clients"
          lead="Move from inquiry to first class, then from a good first experience to a realistic routine."
          tinted
        >
          <div className="flex flex-col gap-4">
            <Sub>Work the leads you already have</Sub>
            <Steps
              items={[
                {
                  title: "Respond quickly.",
                  body: "Contact new inquiries within 15–30 minutes during staffed hours; at the next opening otherwise, within 24 hours. Call first and leave a voice message if unanswered, then follow up with a short text the next day.",
                },
                {
                  title: "Learn their goal.",
                  body: "Ask whether they have tried reformer Pilates, what they want to work on and which days suit them.",
                },
                {
                  title: "Recommend one paid intro.",
                  body: "Explain what is included and its validity. Offer two actual class times.",
                },
                {
                  title: "Book and confirm.",
                  body: "Complete the purchase and first booking. Tell them what to expect and where to find studio arrival information.",
                },
                {
                  title: "Agree on follow-up.",
                  body: "If they are not ready, identify the concern and record a specific next date.",
                },
              ]}
            />
            <Script label="Call">
              “Hi [Name], it is [Staff] at Alva. I saw your inquiry. What are
              you hoping to work on, and which days suit you? I recommend
              [intro/class]. Would [time 1] or [time 2] work?”
            </Script>
            <Script label="Follow-up text (day after the voice message)">
              “Hi [Name], it is [Staff] at Alva. I just called about your
              Pilates inquiry. Would you like help choosing your first class? We
              have [time 1] or [time 2].”
            </Script>
          </div>

          <Tip title="Voice message that gets calls back">
            Keep it under 20 seconds: “Hi [Name], it’s [Staff] from Alva
            Pilates, calling about your inquiry. I’d love to help you pick a
            first class. Call or text me back at [number]. Talk soon!” Smile
            while you speak; it comes through in your voice.
          </Tip>

          <div className="flex flex-col gap-4">
            <Sub>Turn a first visit into a second visit</Sub>
            <Table
              head={["Client stage", "Your next action"]}
              rows={[
                [
                  "Purchased intro; 0 visits",
                  "Call and book Class #1. A never-used intro can receive one 30-day extension.",
                ],
                [
                  "After Class #1",
                  "Ask how it felt. Book Class #2 before they leave. For the $99 intro, book the next two visits.",
                ],
                [
                  "After Class #2 / day 7–9 of $99 intro",
                  "Ask how often they can realistically attend. Recommend one plan and ask whether they would like to join (see Section 4).",
                ],
                [
                  "Took a single class",
                  "After class, ask: “Would you like to book another class?” Offer a discounted next class for $29 (regular $39), book it before they leave, and log it. One per client per 60 days. See Section 7.",
                ],
                [
                  "Intro completed; no membership",
                  "Ask what is holding them back. Solve the concern, use one eligible offer if helpful, and agree on a decision or follow-up date.",
                ],
                [
                  "Not ready for an intro",
                  "A $25 single or one free class may help if eligible. Check the rules in Section 7 before offering.",
                ],
              ]}
            />
          </div>

          <Fold title="Create more first-visit opportunities">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <p className="font-heading text-xl font-medium">Referrals</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Invite interested members to bring a friend and offer to help
                  the friend book a paid intro. Record the referring member; do
                  not promise an unlisted referral reward.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">Events</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Give each guest list one staff owner and follow the confirmed
                  event schedule.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">Quiet classes</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Choose up to two classes tomorrow with 3 or fewer bookings;
                  invite suitable clients to actual times. Use existing credits
                  first, maximum one fill invitation per person per week, and
                  never displace a paid booking.
                </p>
              </Card>
            </div>
          </Fold>

          <div className="flex flex-col gap-4">
            <Sub>Follow up without pressure</Sub>
            <Flow
              steps={[
                "Day 0: Call, leave a voice message",
                "Next day: Follow up with a text",
                "Day 3: Call or text again if still unanswered",
                "Then nurture",
              ]}
            />
            <Bullets
              items={[
                "If they don’t pick up, always leave a short, friendly voice message with your name, that you’re calling about their inquiry, and a callback number.",
                "Honor agreed dates, preferred channels and stop requests.",
                "Check campaign history and avoid automated promotions and personal sales outreach on the same day.",
                "One client has one staff owner; remove duplicates and opt-outs.",
              ]}
            />
          </div>
        </Section>

        {/* 3 */}
        <Section
          id="intros"
          num="4"
          title="Turn intros into members"
          lead="Listen first. Recommend one option. Ask clearly. Agree on the next step."
        >
          <Card>
            <P>
              Ask: <em>“What are you hoping to work on?”</em> and{" "}
              <em>“How often could you realistically come?”</em> Then
              recommend the plan that fits their schedule and budget.
            </P>
          </Card>

          <div className="flex flex-col gap-4">
            <Sub>Plans</Sub>
            <Table
              head={["Routine / plan", "Classes", "Monthly price", "Commitment"]}
              rows={plans.map((p) => [
                `${p.routine} · ${p.name}`,
                p.classes,
                p.price,
                p.term,
              ])}
            />
            <Note title="First-time intros">
              <strong>$69</strong> for 3 classes / 30 days, or{" "}
              <strong>$99</strong> for 15 days / one class daily. Paid intro
              credit applies to Core, Elite or Unlimited within the recorded
              deadline; <strong>not Essential</strong>.
              <br />
              <span className="text-[var(--text-secondary)]">
                Example: $199 Core − $99 intro credit = $100 first-month
                balance; later months $199.
              </span>
            </Note>
          </div>

          <Fold title="Short scripts you can use">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Script label="New lead">
                “Have you tried reformer Pilates before? What are you hoping to
                work on, and which days suit you? I recommend [class]. Would
                [time 1] or [time 2] work?”
              </Script>
              <Script label="After a single class">
                “How did that feel? Would you like to book another class? I can
                offer you your next class for $29 instead of $39 if you book
                today. Would [time 1]
                or [time 2] work?”
              </Script>
              <Script label="After Class #1">
                “How did that feel? Let’s book your next visit. Would [time 1]
                or [time 2] work better?”
              </Script>
              <Script label="After Class #2 / day 7–9 of the $99 intro">
                “How have the sessions felt? How often could you realistically
                come? Based on that, [plan] fits. Would you like me to help you
                join?”
              </Script>
              <Script label="Price concern">
                “Is the monthly budget the main concern, or is there something
                else you’re unsure about?” — Address the actual concern; use one
                eligible incentive if helpful.
              </Script>
              <Script label="Needs time">
                “Of course. What would help you decide? When would you like me
                to check back?” — Record the agreed date.
              </Script>
              <Script label="Lapsed client">
                “Hi [Name], it’s [Staff] at Alva. I thought of you because you
                enjoyed [class]. Would you like help finding a time to come
                back?”
              </Script>
            </div>
          </Fold>

          <Tip title="Quick answers to common hesitations">
            <ul className="flex flex-col gap-1.5">
              <li><strong>“It’s too expensive.”</strong> Ask: budget, or not sure it’s right? Match the plan to how often they can actually come.</li>
              <li><strong>“I can’t fit it in my schedule.”</strong> Offer two real class times and a lower-frequency plan, not a discount.</li>
              <li><strong>“I’m not sure it works for me.”</strong> Point to the next class and the instructor. Book Class #2 so they can feel the difference.</li>
              <li><strong>“I need to think about it.”</strong> Agree on a check-in date and write it down.</li>
            </ul>
          </Tip>

          <Note title="Before checkout">
            Confirm the plan, included classes, monthly price, contract length,
            start date, billing schedule, eligible credit/offer and applicable
            cancellation/no-show terms. Explain the regular price after any
            first-month offer. Complete enrollment in Mindbody and help book the
            next class.
          </Note>
        </Section>

        {/* 4 */}
        <Section
          id="renewals"
          num="5"
          title="Help unsure members renew"
          lead="Find out what is making them hesitate, then offer a plan and next step that fit."
          tinted
        >
          <Important title="Renewals are a top priority">
            Every member whose contract is expiring or has expired should hear
            from us personally. Check the list at the start of every shift, work
            it first, and never let a contract end without a real conversation.
            Renewed contracts keep our community strong and count toward your
            bonus (Section 1).
          </Important>

          <div className="flex flex-col gap-4">
            <Sub>Your renewal toolkit in Mindbody</Sub>
            <Steps
              items={[
                {
                  title: "Build the renewal list.",
                  body: "Use Mindbody Lead Management and your contract reports to pull members whose contracts are expiring soon, have just expired, or who have gone quiet. Add each one to the shared follow-up list with one staff owner.",
                },
                {
                  title: "Prioritize.",
                  body: "Work the soonest expiration dates first, then members who said they are unsure, then expired contracts. Check attendance and prior offers in their record before you reach out.",
                },
                {
                  title: "Reach out personally.",
                  body: "Call first and leave a voice message if unanswered, then follow up with a text the next day (same rhythm as Section 3). Offer two real class times or a quick chat at their next visit.",
                },
                {
                  title: "Support with Marketing Suite.",
                  body: "Use Marketing Suite for renewal reminders and win-back messages, but check campaign history first and avoid an automated promotion and a personal sales message on the same day.",
                },
                {
                  title: "Close and log it.",
                  body: "Complete the renewal in Mindbody yourself, explain billing, book the next class, and update the lead status and add a note in the Notes section of their client profile so the next shift sees the result.",
                },
              ]}
            />
            <Tip title="Suggested renewal rhythm">
              Start the conversation early rather than at the last minute: a
              friendly check-in about 30 days before the contract ends, a
              follow-up at 14 days, and a final personal touch in the last week.
              Ask Jacob or Sam if they want specific timing set as policy.
            </Tip>
          </div>
          <Fold title="When a contract is expiring or has expired">
            <Steps
              items={[
                {
                  title: "Check the record.",
                  body: "Confirm the contract status, current plan, attendance, prior offers and billing details.",
                },
                {
                  title: "Ask what fits now.",
                  body: "“Your contract [ends on / ended on] [date]. Would you like help choosing your next plan? How often would you like to come?”",
                },
                {
                  title: "Recommend a suitable renewal.",
                  body: "Start with the regular price and explain the commitment.",
                },
                {
                  title: "Resolve the concern.",
                  body: "Use an eligible first-month offer when it helps them commit.",
                },
                {
                  title: "Confirm and record.",
                  body: "Complete the renewal, explain future billing and book their next class.",
                },
              ]}
            />
          </Fold>

          <div className="flex flex-col gap-4">
            <Sub>When they are unsure or want to cancel</Sub>
            <Script label="Start with">
              “What is making you unsure about continuing?”
            </Script>
            <Script label="For a cancellation request">
              “Thank you for telling us. May I ask what changed?”
            </Script>
            <P>Listen before proposing a solution.</P>
            <Bullets
              items={[
                <>
                  <strong>Scheduling concern:</strong> help find suitable times.
                </>,
                <>
                  <strong>Budget or attendance concern:</strong> discuss a
                  suitable plan; tier changes and holds follow existing policy.
                </>,
                "If they want to continue under a new contract, offer an eligible renewal.",
              ]}
            />
            <Important title="Never do this">
              Do not make a cancellation depend on accepting an offer or having
              another sales conversation.
            </Important>
            <Note tone="warn" title="If they decline">
              Promptly process or escalate their cancellation under the
              agreement. <strong>Do not</strong> make cancellation dependent on
              accepting an offer or having another sales conversation.
            </Note>
            <Script label="If they need time">
              “What would help you decide? Would [day/time] work for a
              check-in?” — Record the concern and agreed date. A discount helps
              with price; it does not fix a schedule that cannot work.
            </Script>
          </div>

          <div className="flex flex-col gap-4">
            <Sub>First-month offers: 6- or 12-month renewals</Sub>
            <Important title="Full price first. Discount last.">
              Always present the renewal at the regular price first. Offer a
              discount only after the member shares a real concern, never
              up front and never because they asked what deals exist. Start
              with 50% off; the free first month is for selected cases only.
              Record the concern and the reason every time. We track how many
              renewals use a discount.
            </Important>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Standard
                </p>
                <p className="mt-2 font-heading text-3xl font-medium tracking-[-0.03em]">
                  50% off
                </p>
                <p className="mt-1 text-[0.93rem] text-[var(--text-secondary)]">
                  the first month
                </p>
              </Card>
              <Card>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Selected cases
                </p>
                <p className="mt-2 font-heading text-3xl font-medium tracking-[-0.03em]">
                  First month free
                </p>
                <p className="mt-1 text-[0.93rem] text-[var(--text-secondary)]">
                  to secure the renewal
                </p>
              </Card>
            </div>
            <Bullets
              items={[
                "Use one offer based on the client’s concern and record the reason.",
                "These offers apply to 6- or 12-month renewals, including renewals after a cancellation request.",
                "Only the first month changes. The remaining months are charged at the plan’s regular monthly price.",
                "Explain the full contract length, start date and billing schedule before they agree.",
                "A first-month renewal offer is the discretionary incentive for that purchase; do not add another.",
              ]}
            />
            <Note title="Examples">
              Core / 12 months: <strong>$99.50</strong> in month 1 with 50% off,
              then $199 per month.
              <br />
              Core / 6 months: <strong>$104.50</strong> in month 1 with 50% off,
              then $209 per month.
              <br />
              Free first month: month 1 is $0 and the regular price applies from
              month 2.
            </Note>
            <Script label="Say it clearly">
              “For a [6-/12-month] renewal, I can offer [50% off / a free] first
              month. Month 1 is [$amount]; from month 2 it is [$regular price]
              per month. The commitment is [term] months. Would you like to
              renew?”
            </Script>
            <Note title="Then log it">
              Record: contract status, client concern, selected plan and term,
              reason for offer, first-month price, regular price, start date,
              first paid billing date, employee and next booking. Completed
              qualifying renewals and cancellation saves count toward the bonus
              (Section 1).
            </Note>
          </div>
        </Section>

        {/* 5 */}
        <Section
          id="former"
          num="6"
          title="Bring former clients back"
          lead="Start with terminated accounts. Understand why they left and make restarting easy."
        >
          <Script label="Reach out">
            “Hi [Name], it is [Staff] at Alva. We would love to help you get
            back on track. How have you been? I can offer [1–3] complimentary
            reformer classes to help you restart. Would [time 1] or [time 2]
            work for your first visit?”
          </Script>

          <div className="flex flex-col gap-4">
            <Flow
              steps={[
                "Check history",
                "Ask what changed",
                "Offer 1–3 classes",
                "Book first visit",
                "Check in after",
                "Recommend a membership",
              ]}
            />
            <P>
              Use the number of classes that fits their restart needs; no
              purchase required. <strong>Do not</strong> start by asking them to
              commit to another contract.
            </P>
          </div>

          <Fold title="After they book: help them rebuild a routine">
            <Bullets
              items={[
                "Confirm the first visit. After they attend, ask how it felt and help book the next complimentary visit if one remains.",
                "Keep the agreed number of classes visible in Mindbody so all staff know what is available.",
                "Address the reason they left before recommending a new membership. When ready, recommend one plan that fits their current schedule and budget.",
              ]}
            />
            <Script label="After the return visit">
              “How did it feel to be back? What would make it easier to come
              regularly?”
            </Script>
          </Fold>

          <div className="flex flex-col gap-4">
            <Sub>Choose the right return path</Sub>
            <Table
              head={["Client situation", "What to do"]}
              rows={[
                [
                  "Contract terminated",
                  "Offer 1–3 complimentary reformer classes. Record granted/used classes; confirm expiry and any repeat-use terms with Jacob or Sam. No purchase required.",
                ],
                [
                  "Non-member away 31–60 days",
                  "Personal check-in. Use a free/$25 single if useful and eligible.",
                ],
                [
                  "Non-member away 61–90 days",
                  "Ask what changed. An eligible $49 comeback 3-pack can help.",
                ],
                [
                  "90+ days away / old registration",
                  "Marketing nurture first; contact recent responders and valued past clients personally. Terminated contracts may use the 1–3-class restart offer.",
                ],
                [
                  "Pack credits remaining",
                  "Use their existing credits first. Text the actual remaining credits and expiry, then book a specific class.",
                ],
                [
                  "Active member absent 14+ days",
                  "Help them use their existing membership. Solve scheduling first; do not treat them as a terminated account.",
                ],
              ]}
            />
          </div>

          <Fold title="Follow up, then record the next step">
            <Bullets
              items={[
                "Cold/lapsed outreach: one call and one text per month, at least 7 days between separate contact sequences. A call plus unanswered-call text is one sequence.",
                "Agreed follow-ups and active intro conversations are exceptions.",
                "Honor stop requests and preferred channels; avoid automated and personal promotions on the same day.",
              ]}
            />
            <Note title="Record">
              Why they left, what would help now, classes granted and used,
              accepted booking, employee and next follow-up. The return classes
              alone do not earn a membership bonus; a qualifying completed
              contract can (Section 1).
            </Note>
          </Fold>
        </Section>

        {/* 6 */}
        <Section
          id="offers"
          num="7"
          title="Offers and limits"
          lead="Check eligibility, history and the shared budget before promising an offer."
          tinted
        >
          <div className="flex flex-col gap-4">
            <Sub>Offers</Sub>
            <Table
              head={["Offer", "Use it when / conditions"]}
              rows={[
                [
                  "$25 single reformer class",
                  "Interested new client not ready for an intro, or lapsed non-member. One class; valid 14 days. No purchase credit.",
                ],
                [
                  "One free reformer class",
                  "First-visit hesitation, lapsed-client restart or minor studio-caused issue. Valid 14 days; no purchase required; no purchase credit.",
                ],
                [
                  "$49 comeback 3-pack",
                  "Non-member away 61–90 days. Valid 14 days. Credit $49 toward Core/Elite/Unlimited if joining within that window. One comeback pass per client during October.",
                ],
                [
                  "Discounted next class",
                  "Client who took a single class. Ask if they want another and offer the next class for $29 (regular $39), booked before they leave. One per client per 60 days, across all staff. Uses $10 of the monthly incentive tally. Counts as your one discretionary incentive; no purchase credit. Log it like any other offer.",
                ],
                [
                  "One joining incentive",
                  "After a real objection: 2 bonus classes, grip socks OR $15 retail credit. Bonus classes should fit the plan; not useful for Unlimited.",
                ],
                [
                  "Member retention help",
                  "Two bonus classes this month when useful. Help find a suitable class/time. Holds and tier changes follow existing policy.",
                ],
                [
                  "Unused intro extension",
                  "Intro purchased, never attended: one 30-day extension. Book the first visit.",
                ],
                [
                  "Pack buyer joining",
                  "Keep remaining pack classes valid for 60 days; do not shorten a later existing expiry. Record the expiry in Mindbody.",
                ],
                [
                  "Former-member restart",
                  "Terminated contract: 1–3 complimentary reformer classes. Record granted/used classes and follow-up. Confirm expiry or repeat-use terms with Jacob or Sam.",
                ],
                [
                  "6-/12-month renewal",
                  "50% off the first month, or in selected cases the first month free. See Section 5.",
                ],
              ]}
            />
          </div>

          <Important title="Check before you promise">
            One free OR one $25 single per client per 90 days, across all staff.
            One discretionary incentive per purchase. Never credit the same
            payment twice.
          </Important>

          <div className="flex flex-col gap-4">
            <Sub>Limits: check before you promise</Sub>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <p className="font-heading text-xl font-medium">
                  Contact limits
                </p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  Cold/lapsed outreach is one call and one text per month; at
                  least 7 days between separate sequences. A call plus
                  unanswered-call text is one sequence. Agreed follow-ups are
                  exceptions. Respect a clear no.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">
                  Single classes
                </p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  <strong className="text-foreground">
                    One free OR one $25 single per client per 90 days
                  </strong>
                  , across all staff. The 1–3-class former-member restart is
                  separate; do not add a free/$25 single to it. A new 90-day
                  window is not automatic entitlement. Service recovery is one
                  replacement per studio-caused incident; repeated issues go to
                  an owner. No routine free member visits or private sessions.
                </p>
              </Card>
              <Card>
                <p className="font-heading text-xl font-medium">No stacking</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-[var(--text-secondary)]">
                  <strong className="text-foreground">
                    One discretionary incentive per purchase.
                  </strong>{" "}
                  A trial single may precede one joining incentive. Standard
                  eligible intro credit may accompany one joining incentive
                  within the original credit window. Never credit the same
                  payment twice. Free/$25 singles have no credit. A
                  former-member restart may precede one eligible membership
                  incentive when they rejoin. The single-class 90-day limit does
                  not apply to the restart offer, joining incentives or the
                  comeback pass.
                </p>
              </Card>
            </div>
          </div>

          <Fold title="Record the offer and check the $800 tally">
            <P>
              Log product, date, reason, expiry, employee, next action and
              accepted booking.
            </P>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  $25 single uses
                </p>
                <p className="mt-2 font-heading text-3xl font-medium tracking-[-0.03em]">
                  $14
                </p>
                <p className="mt-1 text-[0.85rem] text-[var(--text-secondary)]">
                  of the monthly incentive tally
                </p>
              </Card>
              <Card>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Free single uses
                </p>
                <p className="mt-2 font-heading text-3xl font-medium tracking-[-0.03em]">
                  $39
                </p>
                <p className="mt-1 text-[0.85rem] text-[var(--text-secondary)]">
                  of the monthly incentive tally
                </p>
              </Card>
            </div>
            <Bullets
              items={[
                "These are tracking values, not cash costs.",
                "Jacob or Sam define other values, including renewal offers and the 1–3-class restart. Confirm the restart expiry and any repeat use with them before promising those terms.",
                "At the cap, ask before offering more.",
                "Keep offers personal; do not advertise in bulk. Explain normal cancellation/no-show rules.",
              ]}
            />
          </Fold>

          <Note tone="warn" title="Send exceptions to Jacob or Sam">
            Approval is needed for: custom rates; discounts/free months outside
            the renewal rules in Section 5; discounted/free standard packs or
            private sessions; discounted intros; refunds; fee waivers; cash
            credits; repeat freebies beyond approved offers; deadline
            exceptions; and changes to signed commitments or hold policies.
            <div className="mt-3">
              <Script label="Say">
                “I’ll send the details to Jacob or Sam and arrange a follow-up.”
              </Script>
            </div>
          </Note>
        </Section>

        {/* 7 */}
        <Section
          id="records"
          num="8"
          title="Record and follow through"
          lead="Mindbody is the client record. Use the Notes section on the client’s profile, and the shared follow-up list tells the next shift what is due."
        >
          <div className="flex flex-col gap-4">
            <Sub>One short note in the client’s profile after every contact</Sub>
            <Card>
              <p className="font-mono text-[0.8rem] leading-relaxed text-[var(--text-secondary)]">
                Stage | result / concern | offer and expiry | next action/date |
                employee
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <p className="rounded-xl bg-[var(--lp-sand)] px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground">
                  INTRO ACTIVE | Enjoys Sculpt; wants 2x/week; Core discussed;
                  no incentive | Call Oct 12 at 11 AM | [Staff]
                </p>
                <p className="rounded-xl bg-[var(--lp-sand)] px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground">
                  RENEWAL | Contract expires Oct 20; budget concern; Core / 12
                  months; 50% off month 1 | Follow up Oct 10 at 2 PM | [Staff]
                </p>
              </div>
            </Card>
            <Bullets
              items={[
                "Use Mindbody tasks if available; otherwise use a shared due-date list linked to client records.",
                "One employee owns follow-through; the next shift may act on a clear handoff.",
                "Keep offer history visible across all staff.",
                "For an owner request, record the client’s question, relevant facts, requested decision and promised follow-up.",
              ]}
            />
          </div>

          <Fold title="October team scoreboard">
            <Table
              head={["Measure", "Goal", "Count it this way"]}
              rows={scoreboard.map(([m, g, c]) => [
                m,
                <span key="g" className="font-heading text-lg font-medium">
                  {g}
                </span>,
                c,
              ])}
            />
            <Note title="Counting rules">
              An intro followed by a membership counts once in each category.
              Count collected revenue once, net of refunds; include only the
              actual membership balance after credit. A bonus-eligible
              cancellation-save sale and a confirmed 30-day member save are
              different measures. A single contract earns only one bonus.
            </Note>
          </Fold>

          <Tip title="Make notes easy for the next shift">
            Use the Notes section on the client’s Mindbody profile. Write notes so someone who has never met the client can pick up
            where you left off. Include the date you promised to follow up, and
            set a Mindbody task for it immediately, before you move on.
          </Tip>

          <Fold title="Review together, then improve one thing">
            <Bullets
              items={[
                "Weekly: review results and one real client conversation. What worked? What stopped a booking or sale? What should we try next?",
                "Give each event guest list one owner and follow the confirmed event schedule.",
                "October goals are provisional; owners review them at mid-month. Review late-October 30-day outcomes in November.",
              ]}
            />
          </Fold>
        </Section>

      </main>

      <Footer />
    </div>
  );
}
