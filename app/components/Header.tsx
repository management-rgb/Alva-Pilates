"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SummerResetAnnouncementBar from "./SummerResetAnnouncementBar";
import FoundingMemberAnnouncementBar from "./FoundingMemberAnnouncementBar";
import { summerResetEnabled } from "../lib/summerResetCopy";
import MindbodyAccountLink from "./MindbodyAccountLink";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Stable, deterministic id (single Header per page) — avoids a useId()
  // SSR/client tree-offset that produced an aria-controls hydration mismatch.
  const menuId = "alva-primary-mobile-menu";
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const overHero = !scrolled && !isMenuOpen && pathname !== "/pricing";

  // When the menu is open we deliberately avoid backdrop-blur: a backdrop-filter
  // turns the header into a containing block for its fixed children, which would
  // clamp the fixed mobile menu to the (short) header box instead of the
  // viewport. A solid opaque background keeps the overlay full-height.
  const headerSurface = isMenuOpen
    ? "header-scrolled border-b border-[var(--border)] bg-[var(--background)] text-foreground shadow-[0_1px_0_0_rgba(32,31,28,0.04),0_10px_30px_-24px_rgba(32,31,28,0.5)]"
    : scrolled
      ? "header-scrolled border-b border-[var(--border)] bg-[var(--background)]/85 text-foreground shadow-[0_1px_0_0_rgba(32,31,28,0.04),0_10px_30px_-24px_rgba(32,31,28,0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--background)]/78"
      : "border-b border-transparent bg-gradient-to-b from-[rgba(34,25,17,0.6)] to-transparent text-paper";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${headerSurface}`}
    >
      <div className="mx-auto max-w-[120rem] px-5 lg:px-10">
        <div
          className={`flex items-center justify-between transition-[min-height] duration-500 ease-out lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center ${
            scrolled
              ? "min-h-[3.5rem] lg:min-h-[3.9rem]"
              : "min-h-[4.25rem] lg:min-h-[4.75rem]"
          }`}
        >
          <Link
            href="/"
            onClick={handleHomeClick}
            aria-label="Alva Pilates home"
            className="flex items-center justify-self-start transition-opacity duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
          >
            <Image
              src="/alva_logo_web.png"
              alt="Alva Pilates"
              width={100}
              height={40}
              priority
              className={`w-auto transition-[filter,height] duration-500 ease-out ${
                scrolled ? "h-7 lg:h-[1.9rem]" : "h-8 lg:h-9"
              } ${
                scrolled || isMenuOpen ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={link.path === "/" ? handleHomeClick : undefined}
                  className={`px-3 py-2 font-paragraph text-[0.75rem] tracking-[0.1em] uppercase transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal xl:px-4 ${
                    active
                      ? overHero
                        ? "font-medium text-paper"
                        : "font-medium text-foreground"
                      : overHero
                        ? "font-normal text-paper/70 hover:text-paper"
                        : "font-normal text-muted hover:text-foreground"
                  }`}
                >
                  {link.name}
                  <span
                    className={`mx-auto mt-1 block h-px w-4 transition-colors ${
                      active
                        ? overHero
                          ? "bg-paper"
                          : "bg-foreground"
                        : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center justify-self-end gap-3 lg:flex">
            <MindbodyAccountLink className="inline-flex items-center" />
            <a
              href="/book"
              className={`inline-flex h-[2.75rem] items-center justify-center rounded-[var(--radius-sm)] px-6 font-paragraph text-[0.75rem] font-medium uppercase tracking-[0.08em] transition-[transform,box-shadow,filter,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_12px_26px_-16px_rgba(20,19,17,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                scrolled
                  ? "bg-[var(--dark)] text-paper"
                  : "bg-paper text-[var(--dark)]"
              }`}
            >
              Book a Class
            </a>
          </div>

          <button
            ref={toggleRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-[var(--radius-sm)] p-2 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal lg:hidden ${
              isMenuOpen || scrolled
                ? "text-foreground hover:opacity-70"
                : "text-paper hover:opacity-70"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {summerResetEnabled ? (
        <SummerResetAnnouncementBar />
      ) : (
        <FoundingMemberAnnouncementBar />
      )}

      {isMenuOpen ? (
        <div
          id={menuId}
          ref={menuRef}
          className="fixed inset-0 top-[4.25rem] z-40 flex flex-col bg-[var(--background)] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="header-mobile-nav flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8 pt-6 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  if (link.path === "/") handleHomeClick(e);
                  setIsMenuOpen(false);
                }}
                className={`border-b border-[var(--border)] px-1 py-4 font-paragraph text-2xl font-medium tracking-[-0.02em] transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <MindbodyAccountLink className="flex w-full justify-center" />
              <a
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary inline-flex h-12 w-full items-center justify-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
              >
                Book a Class
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
