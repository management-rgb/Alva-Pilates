"use client";

import { Fragment, createElement } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Mode = "hero" | "heading";
type Tag = "h1" | "h2" | "h3" | "p" | "span";

type RevealTextProps = {
  /** Plain text — split into words for the staggered reveal */
  text: string;
  as?: Tag;
  className?: string;
  /** hero = cinematic mask reveal · heading = subtle rise + blur */
  mode?: Mode;
  delay?: number;
  id?: string;
};

/** Premium "easeOutExpo"-style curve — calm, no overshoot */
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Editorial heading reveal. Words rise into place with a soft stagger.
 * hero mode adds an overflow mask so the words emerge from behind an
 * invisible surface. Respects prefers-reduced-motion.
 */
export function RevealText({
  text,
  as = "h2",
  className = "",
  mode = "heading",
  delay = 0,
  id,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const isHero = mode === "hero";

  if (reduceMotion) {
    return createElement(as, { id, className }, text);
  }

  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isHero ? 0.14 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = {
    hidden: {
      opacity: 0,
      y: isHero ? "108%" : 20,
      filter: `blur(${isHero ? 5 : 4}px)`,
    },
    show: {
      opacity: 1,
      y: isHero ? "0%" : 0,
      filter: "blur(0px)",
      transition: { duration: isHero ? 1.3 : 0.9, ease: EASE },
    },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span
            aria-hidden
            className={
              isHero
                ? "inline-block overflow-hidden align-bottom [padding-block:0.06em_0.15em] [margin-block:-0.06em_-0.15em]"
                : "inline-block"
            }
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
