import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Staff Membership Guide | Alva Pilates",
  description:
    "Internal membership pricing and enrollment reference for the Alva Pilates reception team.",
  robots: { index: false, follow: false },
};

type PriceOption = {
  label: string;
  price: string;
  commitment: string;
  existingOnly?: boolean;
  /** Visually stronger panel — used for recommended 12-month options. */
  featured?: boolean;
  /** Big savings amount shown first, e.g. "$240". */
  savingsAmount?: string;
  /** Short supporting line under the amount. */
  savingsLabel?: string;
  /** Muted rate label when there is no savings callout. */
  rateLabel?: string;
};

type MembershipTier = {
  name: string;
  allowance: string;
  options: PriceOption[];
  termLabel?: string;
};

const memberships: MembershipTier[] = [
  {
    name: "Essential",
    allowance: "4 Classes Per Month",
    termLabel: "Only Available Term",
    options: [
      {
        label: "Standard",
        price: "$119",
        commitment: "6-Month Commitment",
      },
    ],
  },
  {
    name: "Core",
    allowance: "8 Classes Per Month",
    options: [
      {
        label: "Primary Option",
        price: "$199",
        commitment: "12-Month Commitment",
        featured: true,
        savingsAmount: "$240",
        savingsLabel: "total savings",
      },
      {
        label: "Flexible Option",
        price: "$209",
        commitment: "6-Month Commitment",
        savingsAmount: "$60",
        savingsLabel: "total savings",
      },
    ],
  },
  {
    name: "Elite",
    allowance: "12 Classes Per Month",
    options: [
      {
        label: "Primary Option",
        price: "$249",
        commitment: "12-Month Commitment",
        featured: true,
        savingsAmount: "$240",
        savingsLabel: "total savings",
      },
      {
        label: "Flexible Option",
        price: "$269",
        commitment: "6-Month Commitment",
        rateLabel: "Flexible rate",
      },
    ],
  },
  {
    name: "Unlimited",
    allowance: "1 Class Per Day",
    options: [
      {
        label: "Primary Option",
        price: "$329",
        commitment: "12-Month Commitment",
        featured: true,
        savingsAmount: "$240",
        savingsLabel: "total savings",
      },
      {
        label: "Flexible Option",
        price: "$349",
        commitment: "6-Month Commitment",
        rateLabel: "Flexible rate",
      },
    ],
  },
];

const guidelines = [
  "Essential is only available with a 6-month commitment.",
  "For Core, Elite, and Unlimited, present the 12-month option first.",
  "Offer the 6-month option when a client wants more flexibility.",
  "Founding members keep their existing founding pricing.",
  "Do not change an existing member’s commitment without their approval.",
  "Confirm the selected commitment before completing the sale in Mindbody.",
  "Clearly explain the monthly price, commitment length, and billing date.",
];

function SavingsCallout({
  amount,
  label,
  featured = false,
}: {
  amount: string;
  label: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`mt-4 rounded-xl bg-[var(--lp-sand)] text-center ${
        featured ? "px-4 py-4" : "px-3.5 py-3"
      }`}
    >
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
        Save
      </p>
      <p
        className={`mt-1.5 font-heading font-medium leading-none tracking-[-0.04em] text-[var(--lp-char)] ${
          featured
            ? "text-[clamp(2rem,3.2vw,2.5rem)]"
            : "text-[clamp(1.45rem,2.4vw,1.75rem)]"
        }`}
      >
        {amount}
      </p>
      <p className="mt-1.5 text-[0.78rem] text-[var(--text-secondary)]">
        {label}
      </p>
    </div>
  );
}

function MembershipCard({ tier }: { tier: MembershipTier }) {
  return (
    <article className="staff-card flex h-full flex-col gap-4 rounded-[1.5rem] border border-[var(--lp-line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(23,23,23,0.03)] sm:p-7 lg:p-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Membership
        </p>
        {tier.termLabel ? (
          <span className="inline-flex items-center rounded-full bg-[var(--lp-char)] px-2.5 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--lp-light)]">
            {tier.termLabel}
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="font-heading text-[clamp(1.4rem,2vw,1.9rem)] font-medium leading-tight tracking-[-0.02em] text-foreground">
          {tier.name}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
          {tier.allowance}
        </p>
      </div>

      <div className="h-px bg-[var(--lp-line)]" />

      <div className="flex flex-1 flex-col gap-3">
        {tier.options.map((option) => {
          const key = `${tier.name}-${option.price}-${option.commitment}`;

          if (option.existingOnly) {
            return (
              <div
                key={key}
                className="rounded-2xl border border-dashed border-[rgba(32,31,28,0.22)] bg-[var(--surface-muted)] px-4 py-4"
              >
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Existing Members Only
                </p>
                <p className="mt-2 font-heading text-[clamp(1.65rem,2.6vw,2.1rem)] font-medium leading-none tracking-[-0.04em] text-[var(--text-secondary)]">
                  {option.price}
                  <span className="ml-1.5 text-sm font-medium tracking-normal text-[var(--text-secondary)]">
                    /month
                  </span>
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {option.commitment}
                </p>
                {option.rateLabel ? (
                  <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    {option.rateLabel}
                  </p>
                ) : null}
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  Not available to new clients. For members already enrolled in
                  this plan only.
                </p>
              </div>
            );
          }

          return (
            <div
              key={key}
              className={
                option.featured
                  ? "rounded-2xl border border-[var(--lp-line-strong)] bg-gradient-to-b from-white to-[var(--lp-stone)] px-4 py-5 shadow-[0_2px_8px_rgba(23,23,23,0.04)]"
                  : "rounded-2xl border border-[var(--lp-line)] bg-[var(--lp-ivory)] px-4 py-4"
              }
            >
              {tier.options.length > 1 ? (
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  {option.label}
                </p>
              ) : null}
              <p
                className={`font-heading font-medium leading-none tracking-[-0.045em] text-foreground ${
                  tier.options.length > 1 ? "mt-2" : ""
                } ${
                  option.featured
                    ? "text-[clamp(2.15rem,3.4vw,2.85rem)]"
                    : "text-[clamp(2rem,3.2vw,2.6rem)]"
                }`}
              >
                {option.price}
                <span className="ml-1.5 text-[0.95rem] font-medium tracking-normal text-[var(--text-secondary)]">
                  /month
                </span>
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {option.commitment}
              </p>
              {option.savingsAmount && option.savingsLabel ? (
                <SavingsCallout
                  amount={option.savingsAmount}
                  label={option.savingsLabel}
                  featured={option.featured}
                />
              ) : option.rateLabel ? (
                <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  {option.rateLabel}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}

/**
 * Internal reception reference — not linked from site nav, footer, or sitemap.
 * Accessible only via direct URL for staff bookmarks.
 */
export default function StaffMembershipGuidePage() {
  return (
    <div className="staff-guide min-h-screen bg-[var(--lp-ivory)] text-foreground">
      <Header />

      <main>
        <section className="border-b border-[var(--lp-line)] px-6 pb-12 pt-36 lg:px-10 lg:pb-16 lg:pt-44">
          <div className="mx-auto max-w-[84rem]">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Internal Use Only
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.9rem)] font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              Staff Membership Guide
            </h1>
            <p className="mt-4 max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-[var(--text-secondary)]">
              Membership pricing and enrollment reference for the Alva Pilates
              reception team.
            </p>
          </div>
        </section>

        <section className="px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[84rem]">
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Membership Pricing
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
                Current membership options
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {memberships.map((tier) => (
                <MembershipCard key={tier.name} tier={tier} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--lp-line)] bg-gradient-to-b from-[var(--lp-ivory)] via-[var(--lp-stone)] to-[var(--lp-ivory)] px-6 py-14 lg:px-10 lg:pb-24 lg:py-20">
          <div className="mx-auto max-w-[84rem]">
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                Staff Guidelines
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
                How to Present Memberships
              </h2>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {guidelines.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-[1.25rem] border border-[var(--lp-line)] bg-[var(--surface)] px-5 py-5 shadow-[0_1px_2px_rgba(23,23,23,0.03)]"
                >
                  <span className="font-heading text-lg font-medium tabular-nums tracking-tight text-[var(--text-secondary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-0.5 text-[0.95rem] leading-relaxed text-foreground">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
