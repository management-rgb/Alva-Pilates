import type { ReactNode } from "react";
import CopyButton from "./CopyButton";

export const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" } as const;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--sg-muted)]">
      {children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-[var(--sg-line)] py-12 lg:scroll-mt-20 lg:py-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-tight text-[var(--sg-ink)]" style={serif}>
        {title}
      </h2>
      {lead ? <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--sg-muted)]">{lead}</p> : null}
      <div className="mt-8 flex flex-col gap-8">{children}</div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--sg-line)] bg-white p-5 sm:p-6 ${className}`}>{children}</div>
  );
}

export function SubHead({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sg-muted)]">{children}</h3>
  );
}

export function VerifyBadge({ children = "Verify" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#c9a45f] bg-[#fbf3e1] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#6b4f12]">
      {children}
    </span>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[0.95rem] leading-relaxed text-[var(--sg-ink)]">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-[var(--sg-ink)]" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** "Say this" script with a copy button. */
export function ScriptBox({ label, text, hint }: { label: string; text: string; hint?: string }) {
  return (
    <figure className="rounded-xl border-l-4 border-[var(--sg-primary)] bg-[var(--sg-ivory)] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <figcaption>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sg-muted)]">{label}</span>
          {hint ? <span className="mt-0.5 block text-xs text-[var(--sg-muted)]">{hint}</span> : null}
        </figcaption>
        <CopyButton text={text} />
      </div>
      <blockquote className="mt-3 text-[0.95rem] italic leading-relaxed text-[var(--sg-ink)]">
        &ldquo;{text}&rdquo;
      </blockquote>
    </figure>
  );
}
