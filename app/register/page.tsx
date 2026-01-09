"use client";

import type React from "react";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-charcoal">
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
      />
      <Header />
      <main className="pt-28 pb-24 px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="space-y-3 mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
            Sign Up
          </p>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
            Register for Classes
          </h1>
          <p className="font-paragraph text-base lg:text-lg text-charcoal/70 max-w-3xl mx-auto">
            Create your account and complete your registration.
          </p>
        </div>

        <div className="bg-white border border-[#E5E0DA] rounded-2xl shadow-lg p-4 lg:p-6">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore - healcode-widget is a custom element loaded via script */}
          <healcode-widget
            data-type="registrations"
            data-widget-partner="object"
            data-widget-id="70164909e71a"
            data-widget-version="0"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

