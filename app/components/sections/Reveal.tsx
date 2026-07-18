"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Stagger direct children on reveal */
  stagger?: boolean;
  /** Floating image mask reveal (clip-path) */
  mask?: boolean;
};

/** Soft, eased "focus-in" — matches the luxury art direction */
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

function directionOffset(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case "up":
      return { y: 26 };
    case "down":
      return { y: -26 };
    case "left":
      return { x: 30 };
    case "right":
      return { x: -30 };
    default:
      return {};
  }
}

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
  mask = false,
}: RevealProps) => {
  const reduceMotion = useReducedMotion();

  // Respect reduced-motion: render content with no animation.
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (mask) {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }

  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: { staggerChildren: 0.13, delayChildren: delay },
      },
    };
    const item: Variants = {
      hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: EASE },
      },
    };

    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {Children.map(children, (child) =>
          isValidElement(child) ? (
            <motion.div variants={item}>{child}</motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }

  const offset = directionOffset(direction);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.25, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};
