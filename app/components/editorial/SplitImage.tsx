"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "../sections/Reveal";
import { cn } from "../../lib/utils";

type SplitImageProps = {
  src: string;
  alt: string;
  children: ReactNode;
  /** Image on the left or right (desktop) */
  imageSide?: "left" | "right";
  /** Image column emphasis */
  ratio?: "even" | "wide";
  /** Section background utility class */
  surface?: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  /** When false, the text column is rendered without its own reveal wrapper
      so children can manage their own (e.g. word-staggered headings). */
  animateText?: boolean;
};

export function SplitImage({
  src,
  alt,
  children,
  imageSide = "left",
  ratio = "wide",
  surface = "surface-paper",
  className,
  objectPosition = "center",
  priority = false,
  animateText = true,
}: SplitImageProps) {
  const imageCols =
    ratio === "wide"
      ? imageSide === "left"
        ? "lg:col-span-7"
        : "lg:col-span-7 lg:col-start-6"
      : "lg:col-span-6";
  const textCols =
    ratio === "wide"
      ? imageSide === "left"
        ? "lg:col-span-5"
        : "lg:col-span-5 lg:col-start-1 lg:row-start-1"
      : "lg:col-span-6";

  return (
    <section
      className={cn(surface, "px-5 py-20 lg:px-10 lg:py-28", className)}
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <Reveal
            direction={imageSide === "left" ? "right" : "left"}
            className={imageCols}
          >
            <div className="img-editorial relative min-h-[440px] sm:min-h-[560px] lg:min-h-[680px]">
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="img-desaturate object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                style={{ objectPosition }}
              />
            </div>
          </Reveal>

          {animateText ? (
            <Reveal className={cn(textCols, "flex flex-col justify-center")}>
              {children}
            </Reveal>
          ) : (
            <div className={cn(textCols, "flex flex-col justify-center")}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
