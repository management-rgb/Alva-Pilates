"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import SummerResetAnnouncementBar from "./SummerResetAnnouncementBar";
import FoundingMemberAnnouncementBar from "./FoundingMemberAnnouncementBar";
import { summerResetEnabled } from "../lib/summerResetCopy";
import MindbodyAccountLink from "./MindbodyAccountLink";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ${
        scrolled || isMenuOpen
          ? "header-scrolled border-b border-border/70 bg-background/94 text-foreground shadow-[0_12px_40px_-28px_rgba(36,33,31,0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/88"
          : "border-b border-transparent bg-gradient-to-b from-charcoal/50 to-transparent text-on-dark"
      }`}
    >
      <div className="mx-auto max-w-[120rem] px-6 lg:px-12">
        <div className="flex min-h-[88px] items-center justify-between lg:min-h-[112px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Link
            href="/"
            onClick={handleHomeClick}
            aria-label="Alva Pilates home"
            className="flex items-center justify-self-start transition-opacity duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src="/alva_logo_web.png"
              alt="Alva Pilates"
              width={120}
              height={48}
              priority
              className={`h-10 w-auto transition-[filter] duration-500 lg:h-12 ${
                scrolled || isMenuOpen ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex xl:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={link.path === "/" ? handleHomeClick : undefined}
                className={`px-4 py-3 font-paragraph text-[0.8125rem] tracking-[0.08em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:px-5 ${
                  isActive(link.path)
                    ? scrolled || isMenuOpen
                      ? "font-medium text-foreground"
                      : "font-medium text-on-dark"
                    : scrolled || isMenuOpen
                      ? "font-normal text-foreground/55 hover:text-foreground"
                      : "font-normal text-on-dark/70 hover:text-on-dark"
                }`}
              >
                {link.name}
                <span
                  className={`mt-1.5 block h-px w-full transition-colors duration-300 ${
                    isActive(link.path) ? "bg-primary" : "bg-transparent"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center justify-self-end gap-3.5 lg:flex">
            <MindbodyAccountLink className="inline-flex items-center" />
            <a
              href="/book"
              className={`inline-flex h-[3.25rem] items-center justify-center rounded-full px-9 font-paragraph text-[0.8125rem] font-medium tracking-[0.05em] shadow-button transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                scrolled
                  ? "bg-charcoal text-on-dark hover:bg-primary hover:text-primary-foreground"
                  : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Book a Class
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`rounded-full p-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden ${
              isMenuOpen || scrolled
                ? "text-foreground hover:bg-secondary"
                : "text-on-dark hover:bg-on-dark/10"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
        <div className="mx-auto max-w-[120rem] border-t border-border px-6 pb-8 pt-5 lg:hidden lg:px-12">
          <nav className="header-mobile-nav flex flex-col gap-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  if (link.path === "/") handleHomeClick(e);
                  setIsMenuOpen(false);
                }}
                className={`rounded-2xl px-4 py-3.5 font-paragraph text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive(link.path)
                    ? "bg-secondary font-medium text-foreground"
                    : "font-normal text-foreground/60 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-6">
              <MindbodyAccountLink className="flex w-full justify-center" />
              <a
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-charcoal px-8 text-center font-paragraph text-sm font-medium tracking-wide text-on-dark transition-all duration-300 hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
