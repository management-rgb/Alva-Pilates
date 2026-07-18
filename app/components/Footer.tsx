import Link from "next/link";
import { Instagram } from "lucide-react";
import { STUDIO_INSTAGRAM_URL } from "../lib/socialLinks";

const APP_STORE_URL = "https://apps.apple.com/us/app/alva-pilates/id6755688496";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fitnessmobileapps.formaluxecollective43021&hl=en_US";

export default function Footer() {
  return (
    <footer className="surface-dark text-paper">
      {/* Soft fade from the light section above into the charcoal footer */}
      <div className="flow-into-dark" aria-hidden />
      <div className="mx-auto max-w-[120rem] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-16">
          <div className="lg:col-span-4 lg:pr-8">
            <h3 className="font-heading text-2xl font-medium tracking-[-0.03em] text-paper lg:text-3xl">
              Alva Pilates
            </h3>
            <p className="mt-5 max-w-sm font-paragraph text-sm leading-[1.75] text-[rgba(245,245,242,0.55)] lg:text-[0.9375rem]">
              A boutique reformer studio in Valencia — intentional movement,
              expert instruction, and a considered space to progress.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-6 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[rgba(245,245,242,0.45)]">
              Visit
            </h4>
            <div className="space-y-5 font-paragraph text-sm leading-relaxed text-paper">
              <p>
                23840 Copper Hill Drive
                <br />
                Valencia, CA 91354
              </p>
              <div className="space-y-1.5 text-[rgba(245,245,242,0.55)]">
                <p>Mon – Sat · 7:00 AM – 7:00 PM</p>
                <p>Sun · 9:00 AM – 12:00 PM</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-6 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[rgba(245,245,242,0.45)]">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
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
                  className="font-paragraph text-sm tracking-[0.02em] text-paper/80 transition-opacity duration-200 hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-6 font-paragraph text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[rgba(245,245,242,0.45)]">
              Download the App
            </h4>
            <div className="flex flex-row flex-wrap items-center gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-paper"
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
                className="inline-flex h-10 items-center justify-center overflow-hidden transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-paper"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-[58px] w-auto max-w-none object-contain"
                />
              </a>
            </div>
            <p className="mt-5 max-w-xs font-paragraph text-xs leading-relaxed text-[rgba(245,245,242,0.45)]">
              Book classes, manage memberships, and stay connected — wherever
              you are.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-[rgba(245,245,242,0.12)] pt-8 md:flex-row">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:gap-8 md:text-left">
            <p className="font-paragraph text-xs tracking-[0.04em] text-[rgba(245,245,242,0.4)]">
              © {new Date().getFullYear()} Alva Pilates. All rights reserved.
            </p>
            <Link
              href="/faq#policies"
              className="font-paragraph text-xs tracking-[0.04em] text-paper/70 transition-opacity hover:opacity-100"
            >
              Policies
            </Link>
            <Link
              href="/terms"
              className="font-paragraph text-xs tracking-[0.04em] text-paper/70 transition-opacity hover:opacity-100"
            >
              Terms &amp; Conditions
            </Link>
          </div>
          <a
            href={STUDIO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(245,245,242,0.5)] transition-opacity duration-200 hover:opacity-100"
            aria-label="Alva Pilates on Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
