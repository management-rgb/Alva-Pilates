"use client";

import { useRef, useState, type FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const steps = [
  {
    title: "Say hello",
    description:
      "Tell us a little about yourself below — it only takes a few minutes.",
  },
  {
    title: "We'll be in touch",
    description:
      "We read every application personally and will reach out to set up a time to chat.",
  },
  {
    title: "Come visit the studio",
    description:
      "Grab a coffee with us, see the space, and let's get to know each other.",
  },
  {
    title: "Move with us",
    description:
      "Teach us a short class so we can feel your style — then we'll welcome you to the Alva family.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

const labelClass =
  "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted";
const inputClass =
  "mt-2 w-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-charcoal";

export default function JoinTheTeamPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const resume = data.get("resume");

    if (resume instanceof File && resume.size > MAX_RESUME_BYTES) {
      setStatus("error");
      setError("Resume must be 4 MB or smaller.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/join-the-team", {
        method: "POST",
        body: data,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          result.error ?? "Something went wrong. Please try again.",
        );
      }
      formRef.current?.reset();
      setFileName("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-charcoal-soft px-6 pb-4 pt-24 text-paper lg:px-14 lg:pb-5 lg:pt-28">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[rgba(247,247,243,0.68)]">
              Careers
            </p>
            <h1 className="mt-2 font-display text-xl font-normal leading-tight tracking-[-0.02em] text-paper sm:text-2xl">
              Join the team
            </h1>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[rgba(247,247,243,0.68)] sm:text-sm">
              We&apos;re looking for passionate Pilates instructors who believe in
              intentional movement and genuine hospitality. We&apos;re not
              hiring for front desk or other studio roles at this time.
            </p>
          </Reveal>
        </div>
      </section>
      <div className="flow-out-of-dark !h-10 lg:!h-12" aria-hidden />

      {/* Apply */}
      <section
        id="apply"
        className="surface-paper px-6 pb-20 pt-6 lg:px-14 lg:pb-28 lg:pt-8"
      >
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 items-start gap-14 border-t border-border pt-12 lg:grid-cols-12 lg:gap-0 lg:pt-16">
            <Reveal className="lg:col-span-5 lg:pr-16 xl:pr-20">
              <div className="space-y-7">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe">
                  How it works
                </p>
                <h2 className="font-display text-4xl font-normal tracking-[-0.02em] text-balance text-charcoal lg:text-5xl">
                  Ready to move with us?
                </h2>
                <p className="text-base leading-[1.85] text-taupe lg:text-lg">
                  This page is for Pilates instructor applications only. We&apos;re
                  always happy to meet great instructors.
                </p>
              </div>
              <ol className="mt-10">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-10 last:pb-0"
                  >
                    {index < steps.length - 1 && (
                      <span
                        className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-border"
                        aria-hidden
                      />
                    )}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal font-heading text-sm text-charcoal">
                      {index + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="font-heading text-xl font-medium text-charcoal">
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-taupe sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-7">
              <div className="border border-border bg-card px-6 py-8 text-foreground sm:px-8 lg:px-10 lg:py-10">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe">
                  Apply
                </p>
                <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                  Tell us about you
                </h2>
                <p className="mt-4 max-w-md text-sm leading-[1.8] text-muted sm:text-base">
                  Share your details, resume, and certifications — we&apos;ll be in
                  touch if there&apos;s a fit as a Pilates instructor.
                </p>

                {status === "success" ? (
                  <div
                    role="status"
                    className="mt-8 border-t border-border pt-8"
                  >
                    <p className="font-heading text-2xl font-medium text-foreground">
                      Thank you for applying.
                    </p>
                    <p className="mt-3 text-sm leading-[1.8] text-muted sm:text-base">
                      We&apos;ve received your application and will reach out
                      soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-charcoal"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6 border-t border-border pt-8"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>First name</span>
                        <input
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className={inputClass}
                        />
                      </label>
                      <label className="block">
                        <span className={labelClass}>Last name</span>
                        <input
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className={inputClass}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className={labelClass}>Email</span>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                      />
                    </label>

                    <label className="block">
                      <span className={labelClass}>
                        Phone number (optional)
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputClass}
                      />
                    </label>

                    <div>
                      <span className={labelClass}>Resume</span>
                      <label className="mt-2 flex cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-background px-4 py-8 text-center transition-colors duration-200 hover:border-charcoal">
                        <span className="text-sm text-foreground">
                          {fileName || "Click to upload your resume"}
                        </span>
                        <span className="mt-1 text-xs text-muted">
                          PDF or Word · up to 4 MB
                        </span>
                        <input
                          name="resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(e) =>
                            setFileName(e.target.files?.[0]?.name ?? "")
                          }
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className={labelClass}>
                        Pilates certifications
                      </span>
                      <textarea
                        name="certifications"
                        rows={3}
                        placeholder="e.g. BASI Comprehensive, STOTT Reformer, CPR/First Aid"
                        className={inputClass}
                      />
                    </label>

                    {/* Honeypot for spam bots */}
                    <input
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="hidden"
                    />

                    {status === "error" && (
                      <p role="alert" className="text-sm text-red-700">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-charcoal px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-paper transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting"
                        ? "Sending…"
                        : "Submit application"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
