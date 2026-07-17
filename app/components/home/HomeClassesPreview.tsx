"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../sections/Reveal";
import { getAllClasses } from "../../lib/data";

export default function HomeClassesPreview() {
  const classes = getAllClasses();

  return (
    <section className="surface-secondary border-b border-border px-6 py-28 lg:px-14 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-10 border-b border-border pb-14 sm:flex-row sm:items-end lg:mb-20 lg:pb-16">
            <div className="max-w-3xl space-y-7">
              <div className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                <span className="text-muted">03</span>
                <span className="h-px w-10 bg-border" aria-hidden />
                <p className="text-primary">Find your practice</p>
              </div>
              <h2 className="font-heading text-5xl font-medium leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Classes designed to move you forward.
              </h2>
              <p className="max-w-xl text-base leading-[1.85] text-muted lg:text-lg">
                From foundations to advanced reformer — expert-led sessions
                sized for real attention and lasting progress.
              </p>
            </div>
            <Link
              href="/classes"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium tracking-[0.04em] text-foreground transition-colors duration-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Explore all classes
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="border-t border-border">
            {classes.map((classItem, index) => (
              <li key={classItem._id}>
                <Link
                  href={`/classes/${classItem._id}`}
                  className="group grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-b border-border py-7 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid-cols-[3rem_minmax(0,1fr)_12rem_3rem] sm:gap-6 sm:py-8"
                >
                  <span className="text-[0.625rem] tracking-[0.1em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl lg:text-[2.125rem]">
                    {classItem.className.trim()}
                  </span>
                  <span className="col-start-2 text-[0.6875rem] tracking-[0.06em] text-muted sm:col-start-auto sm:border-l sm:border-border sm:pl-6 sm:text-xs">
                    {classItem.difficultyLevel.split("•")[0].trim()}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="hidden justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
