"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useParallax } from "../../hooks/useParallax";
import { cn } from "../../lib/utils";

type FullBleedImageProps = {
  src: string;
  alt: string;
  children?: ReactNode;
  /** Vertical emphasis of the band */
  height?: "sm" | "md" | "lg" | "screen";
  /** Scrim direction for text legibility */
  scrim?: "bottom" | "left" | "center" | "none";
  align?: "end" | "center";
  parallax?: boolean;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
};

const heightClass = {
  sm: "min-h-[min(52svh,520px)]",
  md: "min-h-[min(68svh,760px)]",
  lg: "min-h-[min(86svh,940px)]",
  screen: "min-h-[min(100svh,1080px)]",
} as const;

const scrimClass = {
  bottom:
    "bg-[linear-gradient(180deg,rgba(17,17,17,0.15)_0%,rgba(17,17,17,0)_35%,rgba(17,17,17,0.68)_100%)]",
  left: "bg-[linear-gradient(90deg,rgba(17,17,17,0.6)_0%,rgba(17,17,17,0.2)_55%,transparent_100%)]",
  center: "bg-[rgba(17,17,17,0.4)]",
  none: "",
} as const;

export function FullBleedImage({
  src,
  alt,
  children,
  height = "md",
  scrim = "bottom",
  align = "end",
  parallax = true,
  priority = false,
  className,
  objectPosition = "center",
}: FullBleedImageProps) {
  const { ref, offset } = useParallax<HTMLDivElement>({
    strength: 70,
    disabled: !parallax,
  });

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-[var(--dark)]",
        heightClass[height],
        className
      )}
    >
      <div
        ref={ref}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: parallax ? `translate3d(0, ${offset}px, 0)` : undefined,
          top: parallax ? "-8%" : 0,
          bottom: parallax ? "-8%" : 0,
          height: parallax ? "auto" : "100%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="100vw"
          className="img-desaturate object-cover"
          style={{ objectPosition }}
        />
      </div>
      {scrim !== "none" ? (
        <div className={cn("absolute inset-0", scrimClass[scrim])} aria-hidden />
      ) : null}
      {children ? (
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full max-w-[100rem] px-5 lg:px-10",
            heightClass[height],
            align === "end" ? "items-end pb-14 lg:pb-20" : "items-center",
            "pt-28"
          )}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
