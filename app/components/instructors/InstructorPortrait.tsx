"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

type InstructorPortraitProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** Scales + slight brighten on parent `group/portrait` hover */
  interactive?: boolean;
  aspectClassName?: string;
  /**
   * Shared art direction for headroom / eye line across all instructor photos.
   * Default favors upper-third faces in a 4:5 frame.
   */
  objectPosition?: string;
};

/**
 * Shared editorial portrait — light border, ~14px radius, cover crop.
 * Falls back to a warm stone field if the image fails to load.
 */
export default function InstructorPortrait({
  src,
  alt,
  priority = false,
  sizes,
  className,
  interactive = false,
  aspectClassName = "aspect-[4/5]",
  objectPosition = "50% 18%",
}: InstructorPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#ECE9E3]",
        aspectClassName,
        "rounded-[14px] border border-[rgba(32,31,28,0.12)]",
        className
      )}
    >
      {failed ? (
        <div
          className="absolute inset-0 bg-[#ECE9E3]"
          role="img"
          aria-label={alt || "Instructor portrait"}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition }}
          className={cn(
            "object-cover",
            interactive &&
              "origin-center transition-[transform,filter] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/portrait:scale-[1.018] motion-safe:group-hover/portrait:brightness-[1.02]"
          )}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
