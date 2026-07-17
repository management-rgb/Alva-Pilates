import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";
import { STUDIO_INSTAGRAM_URL } from "../lib/socialLinks";

const APP_STORE_URL = "https://apps.apple.com/us/app/alva-pilates/id6755688496";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fitnessmobileapps.formaluxecollective43021&hl=en_US";

export default function Footer() {
  return (
    <footer className="surface-espresso border-t border-border/30 text-on-dark">
      <div className="mx-auto max-w-[120rem] px-6 py-24 lg:px-14 lg:py-32">
        <div className="flex flex-col gap-12 border-b border-border/25 pb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-primary">
              Valencia, California
            </p>
            <h2 className="mt-7 max-w-4xl font-heading text-5xl font-medium leading-[0.92] tracking-[-0.035em] text-on-dark sm:text-6xl lg:text-8xl">
              Move with intention.
            </h2>
          </div>
          <Link
            href="/book"
            className="group inline-flex h-14 shrink-0 items-center justify-center gap-2.5 self-start rounded-full bg-background px-10 text-sm font-medium tracking-[0.04em] text-foreground shadow-button transition-all duration-300 hover:bg-primary hover:text-primary-foreground lg:self-auto"
          >
            Reserve a class
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-20 pt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-20">
          <div className="lg:col-span-4 lg:pr-10">
            <h3 className="font-heading text-4xl font-medium tracking-tight text-on-dark lg:text-[3.25rem]">
              Alva Pilates
            </h3>
            <p className="mt-7 max-w-sm font-paragraph text-sm leading-[1.8] text-muted-dark lg:text-[0.9375rem]">
              A boutique reformer studio in Valencia — intentional movement,
              expert instruction, and a calm space to progress.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-7 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.22em] text-primary">
              Visit
            </h4>
            <div className="space-y-6 font-paragraph text-sm leading-relaxed text-muted-dark">
              <p>
                23840 Copper Hill Drive
                <br />
                Valencia, CA 91354
              </p>
              <div className="space-y-1.5">
                <p>Mon – Sat · 7:00 AM – 7:00 PM</p>
                <p>Sun · 9:00 AM – 12:00 PM</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-7 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.22em] text-primary">
              Explore
            </h4>
            <nav className="flex flex-col gap-3.5">
              {[
                { href: "/about", label: "About" },
                { href: "/classes", label: "Classes" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
                { href: "/faq", label: "FAQ" },
                { href: "/terms", label: "Terms" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-paragraph text-sm tracking-[0.02em] text-muted-dark transition-colors duration-300 hover:text-on-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-7 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.22em] text-primary">
              Download the App
            </h4>
            <div className="flex flex-row flex-wrap items-center gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center overflow-hidden transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-[58px] w-auto max-w-none object-contain"
                />
              </a>
            </div>
            <p className="mt-6 max-w-xs font-paragraph text-xs leading-relaxed text-muted-dark">
              Book classes, manage memberships, and stay connected — wherever
              you are.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-border/25 pt-10 md:flex-row">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:gap-8 md:text-left">
            <p className="font-paragraph text-xs tracking-[0.04em] text-muted-dark">
              © {new Date().getFullYear()} Alva Pilates. All rights reserved.
            </p>
            <Link
              href="/faq#policies"
              className="font-paragraph text-xs tracking-[0.04em] text-muted-dark transition-colors hover:text-on-dark"
            >
              Policies
            </Link>
            <Link
              href="/terms"
              className="font-paragraph text-xs tracking-[0.04em] text-muted-dark transition-colors hover:text-on-dark"
            >
              Terms &amp; Conditions
            </Link>
          </div>
          <a
            href={STUDIO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-dark transition-colors duration-300 hover:text-primary"
            aria-label="Alva Pilates on Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
