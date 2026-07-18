"use client";

import Image from "next/image";
import { useParallax } from "../../hooks/useParallax";
import { cn } from "../../lib/utils";

type ImageBleedProps = {
  src: string;
  alt: string;
  /** Cropped band height */
  height?: "xs" | "sm" | "md";
  objectPosition?: string;
  parallax?: boolean;
  className?: string;
};

const heightClass = {
  xs: "h-[38svh] max-h-[360px] min-h-[240px]",
  sm: "h-[48svh] max-h-[480px] min-h-[300px]",
  md: "h-[60svh] max-h-[620px] min-h-[360px]",
} as const;

/**
 * Cropped lifestyle image used as a transition between sections.
 * The crop + gentle parallax is the visual break — no text.
 */
export function ImageBleed({
  src,
  alt,
  height = "sm",
  objectPosition = "center",
  parallax = true,
  className,
}: ImageBleedProps) {
  const { ref, offset } = useParallax<HTMLDivElement>({
    strength: 50,
    disabled: !parallax,
  });

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[var(--surface-muted)]",
        heightClass[height],
        className
      )}
    >
      <div
        ref={ref}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: parallax ? `translate3d(0, ${offset}px, 0)` : undefined,
          top: parallax ? "-10%" : 0,
          bottom: parallax ? "-10%" : 0,
          height: parallax ? "auto" : "100%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={88}
          sizes="100vw"
          className="img-desaturate object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
