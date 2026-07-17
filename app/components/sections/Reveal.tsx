"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const show = () => element.classList.add("is-visible");
          if (delay > 0) {
            setTimeout(show, delay * 1000);
          } else {
            show();
          }
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(18px)";
      case "down":
        return "translateY(-18px)";
      case "left":
        return "translateX(18px)";
      case "right":
        return "translateX(-18px)";
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${className}`}
      style={
        {
          "--reveal-transform": getTransform(),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
