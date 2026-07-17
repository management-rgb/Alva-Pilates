"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyRegistrationWidget from "../components/MindbodyRegistrationWidget";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-charcoal text-charcoal">
      <Header />
      <main className="surface-espresso luxury-dark-scope border-b border-on-dark/15 pt-40 pb-24 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
        <div className="space-y-3 mb-8 text-center">
          <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
            <span className="text-muted">01</span>
            <span className="h-px w-10 bg-border" aria-hidden />
            <p className="text-primary">Sign Up</p>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold tracking-tight text-charcoal">
            Register for Classes
          </h1>
          <p className="font-paragraph text-base lg:text-lg text-muted max-w-3xl mx-auto">
            Create your account and complete your registration.
          </p>
        </div>

        <div className="surface-glass-light border-y border-border p-4 text-charcoal lg:p-6">
          <MindbodyRegistrationWidget />
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
