"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { foundingMemberCopy } from "../lib/foundingMemberCopy";

function MarqueeSegment({
  href,
  duplicate = false,
}: {
  href: string;
  duplicate?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 sm:gap-3 shrink-0 mr-5 sm:mr-7"
      aria-hidden={duplicate ? true : undefined}
    >
      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-primary whitespace-nowrap drop-shadow-[0_0_12px_rgba(139,115,85,0.45)]">
        {foundingMemberCopy.headerFoundingEyebrow}
      </span>
      <span className="text-primary/70 select-none" aria-hidden>
        ·
      </span>
      <span className="font-paragraph text-[10px] sm:text-sm text-white font-medium whitespace-nowrap">
        {foundingMemberCopy.barLine}
      </span>
      <Link
        href={href}
        tabIndex={duplicate ? -1 : undefined}
        className="font-paragraph text-[10px] sm:text-sm text-primary font-bold underline-offset-[3px] decoration-2 decoration-primary/90 hover:decoration-white hover:text-white underline whitespace-nowrap shrink-0 transition-colors duration-200"
      >
        {foundingMemberCopy.barCta}
      </Link>
    </span>
  );
}

export default function FoundingMemberAnnouncementBar() {
  const pathname = usePathname();

  const href =
    pathname === "/"
      ? "/pricing#founding-pricing"
      : pathname.startsWith("/pricing")
        ? "#founding-pricing"
        : "/pricing#founding-pricing";

  return (
    <div className="w-full mt-2 lg:mt-2.5 border-t-2 border-primary bg-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="w-full min-h-0 overflow-hidden py-2 sm:py-2 pl-3 sm:pl-5 pr-3 sm:pr-5">
        <span className="sr-only">
          {foundingMemberCopy.headerFoundingEyebrow}. {foundingMemberCopy.barLine}{" "}
          {foundingMemberCopy.barCta} — visit the pricing page for details.
        </span>

        <div className="announcement-marquee-track">
          <MarqueeSegment href={href} />
          <MarqueeSegment href={href} duplicate />
          <MarqueeSegment href={href} duplicate />
        </div>
      </div>
    </div>
  );
}
