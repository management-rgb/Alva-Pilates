"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Instructors", path: "/instructors" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-paragraph text-sm transition-colors ${
                  isActive(link.path)
                    ? "text-charcoal font-medium"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="font-paragraph text-sm bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book a Class
            </Link>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? "text-charcoal font-medium"
                    : "text-charcoal/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setIsMenuOpen(false)}
              className="font-paragraph text-sm bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Book a Class
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

