"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

/**
 * Section navigation. Desktop: sticky left rail. Mobile: sticky horizontal pill bar.
 * Highlights the section currently in view.
 */
export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill visible in the mobile bar.
  useEffect(() => {
    document
      .querySelector<HTMLElement>(`[data-pill="${active}"]`)
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  const linkBase =
    "whitespace-nowrap text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sg-ink)]";

  return (
    <>
      {/* Mobile / tablet */}
      <nav
        aria-label="Guide sections"
        className="sticky top-14 z-30 -mx-4 border-b border-[var(--sg-line)] bg-[var(--sg-ivory)]/95 px-4 backdrop-blur lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-pill={item.id}
                aria-current={active === item.id ? "true" : undefined}
                className={`${linkBase} inline-flex h-9 items-center rounded-full px-3.5 ${
                  active === item.id
                    ? "bg-[var(--sg-ink)] font-semibold text-white"
                    : "border border-[var(--sg-line)] bg-white text-[var(--sg-ink)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop */}
      <nav aria-label="Guide sections" className="sticky top-20 hidden self-start lg:block">
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--sg-muted)]">
          On this page
        </p>
        <ul className="flex flex-col border-l border-[var(--sg-line)]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`${linkBase} -ml-px block border-l-2 py-1.5 pl-4 pr-2 ${
                  active === item.id
                    ? "border-[var(--sg-ink)] font-semibold text-[var(--sg-ink)]"
                    : "border-transparent text-[var(--sg-muted)] hover:text-[var(--sg-ink)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
