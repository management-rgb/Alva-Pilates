"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SummerResetAnnouncementBar from "./SummerResetAnnouncementBar";
import FoundingMemberAnnouncementBar from "./FoundingMemberAnnouncementBar";
import { summerResetEnabled } from "../lib/summerResetCopy";
import MindbodyAccountLink from "./MindbodyAccountLink";

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
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

  const drawerVariants: Variants = {
    hidden: { x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: reduceMotion ? 0.25 : 0.45, ease: MENU_EASE },
    },
    exit: {
      x: reduceMotion ? 0 : "100%",
      opacity: reduceMotion ? 0 : 1,
      transition: { duration: 0.4, ease: MENU_EASE },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.26,
        staggerChildren: reduceMotion ? 0 : 0.045,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: MENU_EASE },
    },
  };

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
  // viewport. A solid opaque espresso background lets the header row read as a
  // seamless continuation of the drawer below it.
  const headerSurface = isMenuOpen
    ? "border-b border-transparent bg-[#40362F] text-paper"
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
                isMenuOpen
                  ? "h-10 lg:h-10"
                  : scrolled
                    ? "h-7 lg:h-[1.9rem]"
                    : "h-8 lg:h-9"
              } ${
                isMenuOpen
                  ? "brightness-0 invert"
                  : scrolled
                    ? "brightness-0"
                    : "brightness-0 invert"
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
            className={`group rounded-[var(--radius-sm)] p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal lg:hidden ${
              isMenuOpen
                ? "text-paper"
                : scrolled
                  ? "text-foreground"
                  : "text-paper"
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
          >
            {isMenuOpen ? (
              <X
                size={22}
                strokeWidth={1.5}
                className="transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90 group-hover:opacity-70"
              />
            ) : (
              <Menu size={22} className="transition-opacity duration-300 group-hover:opacity-70" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? null : summerResetEnabled ? (
        <SummerResetAnnouncementBar />
      ) : (
        <FoundingMemberAnnouncementBar />
      )}

      <AnimatePresence>
        {isMenuOpen ? (
          <div className="lg:hidden" key="mobile-menu">
            <motion.div
              className="fixed inset-0 z-40 bg-[rgba(28,21,16,0.5)] backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: MENU_EASE }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden
            />

            <motion.div
              id={menuId}
              ref={menuRef}
              className="fixed inset-y-0 right-0 z-40 flex w-[86%] max-w-[420px] flex-col overflow-hidden text-[#F2ECE4] shadow-[-30px_0_80px_-44px_rgba(20,14,9,0.7)]"
              style={{
                background:
                  "radial-gradient(circle at 70% 25%, rgba(212,186,150,0.08), transparent 45%), radial-gradient(circle at 20% 85%, rgba(198,170,131,0.06), transparent 40%), linear-gradient(180deg, #40362F 0%, #382F29 45%, #312923 100%)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Architectural atmosphere — all layers stay ~≤4% so they read as
                  ambient light and material rather than decoration. Fades in a
                  beat after the drawer settles ("background lighting appears"). */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.2,
                  duration: 0.9,
                  ease: MENU_EASE,
                }}
                aria-hidden
              >
                {/* Blurred LED arch silhouette anchored bottom-right */}
                <div className="absolute -right-16 bottom-[-8%] h-[62%] w-[85%] opacity-[0.04] blur-2xl">
                  <div className="h-full w-full rounded-t-full bg-[#F2ECE4]" />
                </div>
                {/* Circular mirror glow — soft light pool, upper area */}
                <div className="absolute right-[-18%] top-[8%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,186,150,0.10)_0%,transparent_70%)] blur-xl" />
                {/* Soft plaster texture + film grain */}
                <div className="grain-overlay !opacity-[0.03]" />
              </motion.div>

              <motion.nav
                className="relative flex flex-1 flex-col overflow-y-auto px-8 pb-8 pt-28 [@media(max-height:720px)]:pt-20"
                aria-label="Primary"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.p
                  variants={itemVariants}
                  className="mb-7 font-paragraph text-[11px] font-medium uppercase tracking-[0.28em] text-[rgba(242,236,228,0.55)]"
                >
                  Navigation
                </motion.p>

                <ul className="flex flex-col gap-1.5 [@media(max-height:720px)]:gap-0.5">
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <motion.li key={link.path} variants={itemVariants}>
                        <Link
                          href={link.path}
                          onClick={(e) => {
                            if (link.path === "/") handleHomeClick(e);
                            setIsMenuOpen(false);
                          }}
                          className="group relative flex items-center gap-3 py-2.5 pl-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1B187]/60 [@media(max-height:720px)]:py-2"
                        >
                          {active ? (
                            <motion.span
                              className="absolute left-0 top-1/2 h-[2.15rem] w-[2px] origin-center -translate-y-1/2 rounded-full bg-[#D1B187]"
                              initial={{
                                scaleY: reduceMotion ? 1 : 0,
                                opacity: reduceMotion ? 1 : 0,
                              }}
                              animate={{ scaleY: 1, opacity: 1 }}
                              transition={{
                                delay: reduceMotion ? 0 : 0.5,
                                duration: 0.6,
                                ease: MENU_EASE,
                              }}
                              aria-hidden
                            />
                          ) : null}
                          <span
                            className={`inline-block font-display text-[3rem] font-normal leading-[0.95] tracking-[-0.02em] transition-[transform,color,letter-spacing] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-1 group-hover:tracking-[-0.005em] sm:text-[3.25rem] [@media(max-height:720px)]:text-[2.625rem] ${
                              active
                                ? "text-[#F2ECE4]"
                                : "text-[rgba(242,236,228,0.62)] group-hover:text-[#F2ECE4]"
                            }`}
                          >
                            {link.name}
                          </span>
                          <ArrowUpRight
                            size={22}
                            strokeWidth={1.5}
                            className="shrink-0 -translate-x-1.5 text-[#D1B187] opacity-0 transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              {/* Fixed action area — darker integrated espresso panel, last in */}
              <motion.div
                className="mobile-menu-actions relative flex-none border-t border-[rgba(242,236,228,0.06)] bg-[rgba(38,31,26,0.6)] px-8 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-9 backdrop-blur-xl [@media(max-height:720px)]:pt-6"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.64,
                  duration: 0.5,
                  ease: MENU_EASE,
                }}
              >
                <MindbodyAccountLink className="block w-full" />
                <a
                  href="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="group mt-4 inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[#F5F1EC] px-6 font-paragraph text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-[#312923] shadow-[0_10px_28px_-18px_rgba(20,14,9,0.6)] transition-[filter] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1B187]"
                >
                  Book a Class
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
