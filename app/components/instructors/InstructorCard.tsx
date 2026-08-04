"use client";

import Link from "next/link";
import type { Instructor } from "@/app/types";
import InstructorPortrait from "./InstructorPortrait";

type InstructorCardProps = {
  instructor: Instructor;
};

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A3936] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F2]";

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const profileHref = `/instructors/${instructor.slug}`;
  const teaches = instructor.teaches?.filter(Boolean) ?? [];
  const quote = instructor.signatureLine?.trim();

  return (
    <article className="flex h-full flex-col text-left">
      <Link
        href={profileHref}
        className={`group/portrait block w-full cursor-pointer rounded-[14px] ${focusRing}`}
      >
        {/* Full width; ~9% shorter than 4:5 so type can share hierarchy */}
        <InstructorPortrait
          src={instructor.image}
          alt={`${instructor.name}, ${instructor.role} at Alva Pilates`}
          sizes="(max-width: 768px) 100vw, (max-width: 1240px) 46vw, 560px"
          aspectClassName="aspect-[4/4.55]"
          objectPosition="50% 18%"
          interactive
        />
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <h2 className="font-heading text-[1.4375rem] font-medium leading-[1.2] tracking-[-0.02em] lg:text-[1.5625rem]">
          <Link
            href={profileHref}
            className={`relative inline-block text-[#201F1C] transition-colors duration-300 ease-out after:absolute after:bottom-[-0.12em] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[rgba(32,31,28,0.4)] after:transition-transform after:duration-300 after:ease-out hover:text-[#141311] motion-safe:hover:after:scale-x-100 ${focusRing} rounded-sm`}
          >
            {instructor.name}
          </Link>
        </h2>

        <p className="mt-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.11em] text-[#2E2D2A]">
          {instructor.role}
        </p>

        <p className="mt-3.5 max-w-[26rem] line-clamp-3 min-h-[3.8125rem] text-[0.875rem] leading-[1.45] text-[#6D6C68]">
          {instructor.shortBio}
        </p>

        {quote ? (
          <p className="mt-5 min-h-[2.2rem] max-w-[24rem] font-serif-accent text-[1rem] italic leading-[1.4] tracking-[-0.01em] text-[#6D6C68]/85">
            <span aria-hidden>“</span>
            {quote.replace(/^["“]|["”]$/g, "")}
            <span aria-hidden>”</span>
          </p>
        ) : (
          <div className="mt-5 min-h-[2.2rem]" aria-hidden />
        )}

        <div className="mt-4">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#6D6C68]">
            Teaches
          </p>
          <p className="mt-1.5 min-h-[1.25rem] text-[0.875rem] font-medium leading-snug tracking-[0.01em] text-[#201F1C]">
            {teaches.length > 0 ? teaches.join(" · ") : "Reformer Pilates"}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-10 gap-y-3 pt-4">
          <Link
            href={profileHref}
            className={`group/cta inline-flex min-h-[2.75rem] items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#201F1C] transition-colors duration-300 ease-out hover:text-[#141311] ${focusRing} rounded-sm`}
          >
            View Profile
            <span
              aria-hidden
              className="inline-block transition-transform duration-[280ms] ease-out motion-safe:group-hover/cta:translate-x-[3.5px] motion-safe:group-focus-visible/cta:translate-x-[3.5px]"
            >
              →
            </span>
          </Link>
          <Link
            href="/book"
            className={`inline-flex min-h-[2.75rem] items-center text-[0.75rem] font-normal tracking-[0.02em] text-[#6D6C68] underline decoration-transparent underline-offset-[0.28em] transition-[color,text-decoration-color] duration-300 ease-out hover:text-[#3A3936] hover:decoration-[rgba(58,57,54,0.45)] ${focusRing} rounded-sm`}
          >
            View Schedule
          </Link>
        </div>
      </div>
    </article>
  );
}
