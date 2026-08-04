"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { Instructor } from "@/app/types";
import InstructorPortrait from "./InstructorPortrait";

type InstructorProfileProps = {
  instructor: Instructor;
};

type ScheduleSession = {
  name: string;
  time: string;
};

/** Parse "Alva Foundation · 9:00 AM, Alva Progress · 5:30 PM" into sessions. */
function parseSessions(classes: string): ScheduleSession[] {
  return classes
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [rawName, rawTime] = part.split("·").map((s) => s.trim());
      return {
        name: rawName || part,
        time: rawTime || "",
      };
    });
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#6D6C68]">
      {children}
    </h2>
  );
}

export default function InstructorProfile({
  instructor,
}: InstructorProfileProps) {
  const firstName = instructor.name.split(" ")[0] ?? instructor.name;

  return (
    <section className="bg-[#F7F5F2] px-6 pb-20 pt-36 lg:px-10 lg:pb-28 lg:pt-44">
      <div className="mx-auto max-w-[1240px]">
        <Link
          href="/instructors"
          className="inline-flex items-center gap-1.5 text-sm text-[#6D6C68] transition-colors duration-300 hover:text-[#201F1C] focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#3A3936] focus-visible:ring-offset-2"
        >
          <span aria-hidden>←</span>
          Meet All Instructors
        </Link>

        <div className="mt-10 grid grid-cols-1 items-start gap-12 border-t border-[rgba(32,31,28,0.12)] pt-12 lg:mt-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-x-20 lg:gap-y-0 lg:pt-14 xl:gap-x-24">
          {/* Portrait — sticky on desktop only */}
          <div className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none lg:sticky lg:top-[calc(var(--header-height)+1.75rem)]">
            <InstructorPortrait
              src={instructor.image}
              alt={`${instructor.name}, ${instructor.role} at Alva Pilates`}
              priority
              sizes="(max-width: 1024px) 352px, 434px"
            />
          </div>

          {/* Details */}
          <div className="min-w-0 space-y-12 lg:space-y-14">
            <header>
              <h1 className="font-display text-[2.25rem] font-normal leading-[1.1] tracking-[-0.02em] text-[#201F1C] sm:text-5xl lg:text-[3.25rem]">
                {instructor.name}
              </h1>
              <p className="mt-3 text-[0.9375rem] text-[#6D6C68]">
                {instructor.role}
              </p>
            </header>

            <section aria-labelledby={`about-${instructor.slug}`}>
              <SectionLabel>
                <span id={`about-${instructor.slug}`}>About {firstName}</span>
              </SectionLabel>
              <div className="mt-5 max-w-[46.5rem] space-y-5">
                {instructor.fullBio.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={`bio-${instructor.slug}-${idx}`}
                    className="text-[1.0625rem] leading-[1.85] text-[#6D6C68]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section aria-labelledby={`philosophy-${instructor.slug}`}>
              <SectionLabel>
                <span id={`philosophy-${instructor.slug}`}>
                  Teaching Philosophy
                </span>
              </SectionLabel>
              <p className="mt-5 max-w-[46.5rem] text-[1.0625rem] leading-[1.85] text-[#201F1C]">
                {instructor.teachingStyle}
              </p>
            </section>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              <section aria-labelledby={`certs-${instructor.slug}`}>
                <SectionLabel>
                  <span id={`certs-${instructor.slug}`}>Certifications</span>
                </SectionLabel>
                <ul className="mt-5 space-y-3">
                  {instructor.certifications.map((item) => (
                    <li
                      key={item}
                      className="text-[0.9375rem] leading-relaxed text-[#201F1C]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby={`specs-${instructor.slug}`}>
                <SectionLabel>
                  <span id={`specs-${instructor.slug}`}>Specialties</span>
                </SectionLabel>
                <ul className="mt-5 space-y-3">
                  {instructor.specialties.map((item) => (
                    <li
                      key={item}
                      className="text-[0.9375rem] leading-relaxed text-[#201F1C]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section aria-labelledby={`schedule-${instructor.slug}`}>
              <SectionLabel>
                <span id={`schedule-${instructor.slug}`}>Weekly Schedule</span>
              </SectionLabel>
              <ul className="mt-5 max-w-[46.5rem] border-t border-[rgba(32,31,28,0.12)]">
                {instructor.schedule.map((entry) => {
                  const sessions = parseSessions(entry.classes);
                  return (
                    <li
                      key={`${instructor.slug}-${entry.day}`}
                      className="grid grid-cols-1 gap-2 border-b border-[rgba(32,31,28,0.12)] py-4 sm:grid-cols-[7.5rem_1fr] sm:items-start sm:gap-6 sm:py-[1.125rem]"
                    >
                      <span className="text-sm font-medium text-[#201F1C]">
                        {entry.day}
                      </span>
                      <div className="space-y-2 sm:text-right">
                        {sessions.map((session) => (
                          <div
                            key={`${entry.day}-${session.name}-${session.time}`}
                            className="flex flex-wrap items-baseline gap-x-2 sm:justify-end"
                          >
                            <span className="text-[0.9375rem] text-[#201F1C]">
                              {session.name}
                            </span>
                            {session.time ? (
                              <span className="text-[0.875rem] text-[#6D6C68]">
                                {session.time}
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/book"
                className="group/schedule mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-[0.02em] text-[#6D6C68] transition-colors duration-500 hover:text-[#201F1C] focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#3A3936] focus-visible:ring-offset-2"
              >
                View full class schedule
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-out motion-safe:group-hover/schedule:translate-x-[3px]"
                >
                  →
                </span>
              </Link>
            </section>

            <div className="flex flex-col gap-4 border-t border-[rgba(32,31,28,0.12)] pt-8 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="/book"
                className="btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A3936] focus-visible:ring-offset-2"
              >
                View Classes
              </a>
              <Link
                href="/instructors"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-[0.02em] text-[#201F1C] transition-colors duration-500 hover:text-[#141311] focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#3A3936] focus-visible:ring-offset-2"
              >
                Meet All Instructors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
