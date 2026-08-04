"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import InstructorCard from "../components/instructors/InstructorCard";
import { getAllInstructors } from "../lib/data";

export default function InstructorsPage() {
  const instructors = getAllInstructors();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-foreground">
      <Header />

      <section className="bg-[#ECE9E3] px-6 pb-10 pt-40 text-charcoal lg:px-10 lg:pb-12 lg:pt-44">
        <div className="mx-auto max-w-[1220px]">
          <Reveal>
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#6D6C68]">
                Our Instructors
              </p>
              <h1 className="font-display text-[2.5rem] font-normal tracking-[-0.02em] text-balance text-[#201F1C] sm:text-[2.75rem] lg:text-[3.25rem]">
                Meet the team behind every class.
              </h1>
              <p className="mx-auto max-w-xl text-[0.9375rem] leading-[1.7] text-[#6D6C68] lg:text-base">
                Each instructor brings a distinct teaching style while sharing
                the same commitment to thoughtful movement, precision, and
                personal attention.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F7F5F2] px-6 pb-20 pt-11 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid auto-rows-fr grid-cols-1 gap-x-16 gap-y-8 border-t border-[rgba(32,31,28,0.12)] pt-11 md:grid-cols-2 md:gap-x-[4.25rem] md:gap-y-9 lg:gap-x-20 lg:gap-y-10 lg:pt-12">
            {instructors.map((instructor, index) => (
              <Reveal
                key={instructor.slug}
                className="h-full"
                delay={Math.min(index * 0.04, 0.16)}
              >
                <InstructorCard instructor={instructor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ECE9E3] px-6 py-16 text-charcoal lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1220px]">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-[2rem] font-normal tracking-[-0.02em] text-balance text-[#201F1C] sm:text-4xl lg:text-[2.75rem]">
                Find the Instructor Who Moves You
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-[1.7] text-[#6D6C68] lg:text-base">
                Explore the schedule and choose the class, energy, and teaching
                style that feel right for you.
              </p>
              <Link href="/book" className="btn-primary mx-auto mt-8">
                View Class Schedule
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
