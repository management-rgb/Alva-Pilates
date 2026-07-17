"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllInstructors } from "../lib/data";

export default function InstructorsPage() {
  const instructors = getAllInstructors();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-ivory px-6 pb-12 pt-40 lg:px-14 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-[100rem]">
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <div className="flex items-center justify-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
                <span className="text-muted">01</span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <p className="text-primary">The team</p>
              </div>
              <h1 className="font-heading text-5xl font-medium tracking-tight text-foreground lg:text-6xl">
                Meet our instructors
              </h1>
              <p className="text-base leading-relaxed text-muted lg:text-lg">
                Certified coaches who bring expertise, care, and personalized
                attention to every class.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-ivory border-b border-border px-6 pb-28 lg:px-14 lg:pb-40">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 gap-x-14 gap-y-16 border-t border-border pt-12 md:grid-cols-2 lg:grid-cols-3 lg:pt-16">
            {instructors.map((instructor, index) => (
              <Reveal key={instructor._id} delay={index * 0.08}>
                <Link
                  href={`/instructors/${instructor._id}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <Image
                      src={instructor.profilePicture}
                      alt={instructor.fullName}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                    <span className="text-[0.625rem] tracking-[0.1em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-heading text-2xl font-medium text-foreground">
                    {instructor.fullName}
                  </h2>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {instructor.specialties}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {instructor.shortBio}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    View profile
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
