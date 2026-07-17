"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyProspectsWidget from "../components/MindbodyProspectsWidget";
import { Reveal } from "../components/sections/Reveal";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-secondary border-b border-border px-6 pb-20 pt-36 lg:px-14 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 items-start gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-0 lg:pt-14">
            {/* Form first — primary action */}
            <Reveal className="order-1 lg:order-2 lg:col-span-7 lg:border-l lg:border-border lg:pl-16 xl:pl-20">
              <div className="border border-border bg-card px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                <div className="mb-8 flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                  <span className="text-muted">01</span>
                  <span className="h-px w-10 bg-border" aria-hidden />
                  <p className="text-primary">Contact</p>
                </div>
                <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                  Send a message
                </h1>
                <p className="mt-4 max-w-md text-sm leading-[1.8] text-muted sm:text-base">
                  Reach out with questions about classes, memberships, or
                  visiting the studio.
                </p>
                <div className="mt-8 border-t border-border pt-8">
                  <MindbodyProspectsWidget />
                </div>
              </div>
            </Reveal>

            {/* Studio details — secondary column */}
            <Reveal
              delay={0.06}
              className="order-2 lg:order-1 lg:col-span-5 lg:pr-16 xl:pr-20"
            >
              <div className="space-y-10">
                <div>
                  <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                    <span className="text-muted">02</span>
                    <span className="h-px w-10 bg-border" aria-hidden />
                    <p className="text-primary">Visit</p>
                  </div>
                  <h2 className="mt-5 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                    Studio details
                  </h2>
                </div>

                <div className="border-t border-border">
                  <div className="border-b border-border py-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                      Location
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-foreground">
                      23840 Copper Hill Drive
                      <br />
                      Valencia, CA 91354
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Ample parking available
                    </p>
                  </div>
                  <div className="border-b border-border py-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                      Hours
                    </p>
                    <div className="mt-3 space-y-1 text-base text-foreground">
                      <p>Monday – Saturday · 7:00 AM – 7:00 PM</p>
                      <p>Sunday · 9:00 AM – 12:00 PM</p>
                    </div>
                  </div>
                  <div className="border-b border-border py-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                      Email
                    </p>
                    <a
                      href="mailto:info@formaluxecollective.com"
                      className="mt-3 inline-block text-base text-foreground transition-colors hover:text-primary"
                    >
                      info@formaluxecollective.com
                    </a>
                  </div>
                  <div className="border-b border-border py-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                      Phone
                    </p>
                    <a
                      href="tel:+16619777898"
                      className="mt-3 inline-block text-base text-foreground transition-colors hover:text-primary"
                    >
                      (661) 977-7898
                    </a>
                  </div>
                </div>

                <a href="/book" className="btn-primary">
                  Book a class
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface-ivory border-b border-border px-0 pb-0 pt-0">
        <div className="h-[420px] w-full overflow-hidden lg:h-[560px]">
          <iframe
            src="https://www.google.com/maps?q=23840+Copper+Hill+Drive,+Valencia,+CA+91354&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Alva Pilates Location"
          />
        </div>
        <div className="px-6 py-10 text-center lg:px-14">
          <a
            href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-primary"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
