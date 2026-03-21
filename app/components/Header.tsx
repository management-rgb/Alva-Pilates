"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import FoundingMemberAnnouncementBar from "./FoundingMemberAnnouncementBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  /** Next.js does not remount `/` when already on home — scroll to top on logo / Home. */
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-8 pt-4 lg:pt-6">
        <div className="flex items-center justify-between pb-4 lg:pb-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleHomeClick}
            aria-label="Alva Pilates home"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/alva_logo_web.png"
              alt="Alva Pilates"
              width={100}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={link.path === "/" ? handleHomeClick : undefined}
                className={`font-paragraph text-sm transition-colors ${
                  isActive(link.path)
                    ? "text-charcoal font-medium"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/book"
              className="font-paragraph text-sm bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book a Class
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-charcoal p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <FoundingMemberAnnouncementBar />

      <div className="max-w-[120rem] mx-auto px-6 lg:px-8 pb-3">
        {isMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-4 animate-fade-in border-t border-primary/10 pt-4 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  if (link.path === "/") handleHomeClick(e);
                  setIsMenuOpen(false);
                }}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? "text-charcoal font-medium"
                    : "text-charcoal/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/book"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Book a Class
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

