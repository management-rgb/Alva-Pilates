"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MindbodyRegistrationWidget from "../components/MindbodyRegistrationWidget";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="surface-stone border-b border-[var(--border)] px-6 pb-12 pt-40 text-charcoal lg:px-10 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-taupe">
            Sign Up
          </p>
          <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-charcoal lg:text-5xl">
            Register for Classes
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-taupe lg:text-lg">
            Create your account and complete your registration.
          </p>
        </div>
      </section>
      <main className="surface-paper border-b border-border px-6 pb-24 pt-12 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="border border-border bg-card p-4 lg:p-6">
            <MindbodyRegistrationWidget />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
