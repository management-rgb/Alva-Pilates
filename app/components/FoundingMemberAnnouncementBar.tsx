"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { foundingMemberCopy } from "../lib/foundingMemberCopy";

export default function FoundingMemberAnnouncementBar() {
  const pathname = usePathname();

  const href =
    pathname === "/"
      ? "/pricing#founding-pricing"
      : pathname.startsWith("/pricing")
        ? "#founding-pricing"
        : "/pricing#founding-pricing";

  return (
    <div className="border-t border-border/60 bg-secondary/80">
      <div className="mx-auto flex max-w-[120rem] flex-col items-center justify-center gap-1 px-6 py-2.5 text-center sm:flex-row sm:gap-3 sm:py-3 lg:px-12">
        <p className="text-[0.6875rem] tracking-[0.04em] text-muted sm:text-[0.8125rem]">
          {foundingMemberCopy.headerFoundingEyebrow}
          <span className="mx-2 text-border" aria-hidden>
            ·
          </span>
          {foundingMemberCopy.barLine}
        </p>
        <Link
          href={href}
          className="text-[0.6875rem] font-medium tracking-[0.06em] text-foreground/80 transition-colors duration-300 hover:text-charcoal sm:text-[0.8125rem]"
        >
          {foundingMemberCopy.barCta}
        </Link>
      </div>
    </div>
  );
}
