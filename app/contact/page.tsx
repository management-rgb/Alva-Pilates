"use client";

import type React from "react";
import Script from "next/script";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";

// Type declaration for healcode-widget (also in global.d.ts but needed here for TypeScript)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Contact & Location
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                We&apos;d love to hear from you. Visit us in Valencia or send us
                a message.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <Reveal direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-3xl lg:text-4xl font-bold text-charcoal mb-8">
                    Visit Us
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <MapPin size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                          Location
                        </h3>
                        <p className="font-paragraph text-base text-charcoal/80 leading-relaxed">
                          23840 Copper Hill Drive
                          <br />
                          Valencia, CA 91354
                        </p>
                        <p className="font-paragraph text-sm text-charcoal/60 mt-2">
                          Ample parking available
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Clock size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                          Studio Hours
                        </h3>
                        <div className="font-paragraph text-base text-charcoal/80 space-y-1">
                          <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                          <p>Saturday - Sunday: 8:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Mail size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                          Email
                        </h3>
                        <a
                          href="mailto:info@alvapilates.com"
                          className="font-paragraph text-base text-charcoal/80 hover:text-primary transition-colors"
                        >
                          info@alvapilates.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                        <Phone size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                          Phone
                        </h3>
                        <a
                          href="tel:+16615551234"
                          className="font-paragraph text-base text-charcoal/80 hover:text-primary transition-colors"
                        >
                          (661) 555-1234
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Widget */}
            <Reveal direction="left">
              <div className="bg-white p-6 lg:p-8 rounded-2xl border border-foreground/10 shadow-md max-w-xl mx-auto w-full">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-charcoal mb-6">
                  Contact Us
                </h2>
                <div className="bg-white">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - healcode-widget is a custom element loaded via script */}
                  <healcode-widget
                    data-type="prospects"
                    data-widget-partner="object"
                    data-widget-id="7061777e71a"
                    data-widget-version="0"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px] bg-charcoal/10">
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
          </Reveal>
        </div>
      </section>

      {/* Directions CTA */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="bg-charcoal text-white rounded-2xl p-8 lg:p-16 text-center">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
                Get Directions
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                We&apos;re conveniently located at 23840 Copper Hill Drive in Valencia, 
                Santa Clarita with easy access and ample parking.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
              >
                Open in Google Maps
                <MapPin size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

