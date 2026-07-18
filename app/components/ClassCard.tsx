"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Classes } from "../types";
import { cn } from "../lib/utils";

type ClassCardProps = {
  classItem: Classes;
  index?: number;
  /** grid = vertical card; feature = large horizontal editorial card */
  variant?: "grid" | "feature";
  /** Alternate image side for feature rows */
  imageSide?: "left" | "right";
  priority?: boolean;
  className?: string;
};

function meta(classItem: Classes) {
  const level = classItem.difficultyLevel.split("•")[0].trim();
  return { level };
}

export function ClassCard({
  classItem,
  index = 0,
  variant = "grid",
  imageSide = "left",
  priority = false,
  className,
}: ClassCardProps) {
  const { level } = meta(classItem);
  const href = `/classes/${classItem._id}`;

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className={cn(
          "card-lift group grid items-stretch overflow-hidden border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal lg:grid-cols-2",
          className
        )}
      >
        <div
          className={cn(
            "relative min-h-[300px] overflow-hidden bg-secondary sm:min-h-[380px] lg:min-h-[440px]",
            imageSide === "right" ? "lg:order-2" : ""
          )}
        >
          <Image
            src={classItem.classImage}
            alt={classItem.className.trim()}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="img-desaturate object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
          <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            {level}
            <span className="mx-2 text-muted/50" aria-hidden>
              ·
            </span>
            {classItem.durationMinutes} min
          </p>
          <h3 className="mt-4 font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-foreground">
            {classItem.className.trim()}
          </h3>
          {classItem.bodyFocus ? (
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-muted">
              {classItem.bodyFocus}
            </p>
          ) : null}
          <p className="mt-5 max-w-md text-sm leading-[1.75] text-muted sm:text-base">
            {classItem.description.split("\n")[0]}
          </p>
          <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            <span className="underline-grow">Explore this class</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal",
        className
      )}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-secondary">
        <Image
          src={classItem.classImage}
          alt={classItem.className.trim()}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="img-desaturate object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-[var(--radius-sm)] bg-[rgba(17,17,17,0.72)] px-2 py-0.5 text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-paper backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.625rem] uppercase tracking-[0.12em] text-muted">
          {level}
          <span className="mx-2 text-muted/50" aria-hidden>
            ·
          </span>
          {classItem.durationMinutes} min
        </p>
        <h3 className="mt-2 font-heading text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
          {classItem.className.trim()}
        </h3>
        {classItem.bodyFocus ? (
          <p className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-muted">
            {classItem.bodyFocus}
          </p>
        ) : null}
        <p className="mt-3 line-clamp-2 text-sm leading-[1.65] text-muted">
          {classItem.description.split("\n")[0]}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-foreground">
          <span className="underline-grow">Learn more</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
