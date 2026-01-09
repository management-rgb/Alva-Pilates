import Link from "next/link";
import { MapPin, Clock, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-charcoal">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">
              Alva Pilates
            </h3>
            <p className="font-paragraph text-sm text-charcoal/80 leading-relaxed">
              Elevate your movement through intentional practice, expert
              instruction, and a serene studio environment.
            </p>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="font-heading text-xl font-semibold text-charcoal mb-4">
              Visit Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-primary mt-1 flex-shrink-0"
                />
                <p className="font-paragraph text-sm text-charcoal/80">
                  23840 Copper Hill Drive
                  <br />
                  Valencia, CA 91354
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-1 flex-shrink-0" />
                <div className="font-paragraph text-sm text-charcoal/80">
                  <p>Mon - Fri: 6:00 AM - 8:00 PM</p>
                  <p>Sat - Sun: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-semibold text-charcoal mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/classes"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                Classes
              </Link>
              <Link
                href="/pricing"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                Pricing & Memberships
              </Link>
              <Link
                href="/instructors"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                Instructors
              </Link>
              <Link
                href="/contact"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="font-paragraph text-sm text-charcoal/80 hover:text-charcoal transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-paragraph text-sm text-charcoal/70">
            © {new Date().getFullYear()} Alva Pilates. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/70 hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

