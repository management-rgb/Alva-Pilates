"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import {
  scheduleScrollToSection,
  scrollToSection,
} from "../lib/scrollToSection";

type ScrollToSectionLinkProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  tabIndex?: number;
};

/**
 * Same-page: smooth scroll with fixed-header offset.
 * Other pages: navigate home, then scroll once the section is available.
 */
export default function ScrollToSectionLink({
  sectionId,
  children,
  className,
  tabIndex,
  "aria-label": ariaLabel,
}: ScrollToSectionLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onHome && document.getElementById(sectionId)) {
      scrollToSection(sectionId);
      return;
    }

    router.push(`/#${sectionId}`);
    scheduleScrollToSection(sectionId, 150);
    scheduleScrollToSection(sectionId, 450);
  };

  return (
    <Link
      href={`/#${sectionId}`}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {children}
    </Link>
  );
}
