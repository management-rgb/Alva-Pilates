"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "./sections/Reveal";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  reviews,
  type Review,
} from "../data/reviews";

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="flex gap-0.5 text-charcoal" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) setClamped(el.scrollHeight > el.clientHeight + 1);
  }, []);

  return (
    <figure className="flex w-[85%] shrink-0 snap-start flex-col border border-border bg-card p-6 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] lg:p-8">
      <Stars />
      <blockquote className="mt-5 flex-1">
        <p
          ref={textRef}
          className={`whitespace-pre-line text-base leading-[1.75] text-foreground ${
            expanded ? "" : "line-clamp-6"
          }`}
        >
          “{review.text}”
        </p>
        {clamped ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-link text-muted"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <span className="font-medium text-foreground">{review.name}</span>
        <span className="text-muted"> · Google review</span>
      </figcaption>
    </figure>
  );
}

/** Google reviews in a horizontally scrolling row, with arrow controls on larger screens. */
export default function GoogleReviews({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () =>
      setEdges({
        start: track.scrollLeft <= 1,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
      });
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrowClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-charcoal disabled:opacity-30 disabled:hover:border-border";

  return (
    <section className={`surface-paper px-5 py-16 lg:px-10 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between lg:pt-14">
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-taupe">
                Reviews
              </p>
              <h2 className="mt-4 font-display text-4xl font-normal tracking-[-0.02em] text-balance text-foreground lg:text-5xl">
                Loved by our community
              </h2>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                <span className="text-lg font-medium text-foreground">{GOOGLE_RATING}</span>
                <Stars size={16} />
                <span className="underline underline-offset-4">
                  {GOOGLE_REVIEW_COUNT} Google reviews
                </span>
              </a>
            </div>
            <div className="hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={edges.start}
                className={arrowClass}
                aria-label="Previous reviews"
              >
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={edges.end}
                className={arrowClass}
                aria-label="Next reviews"
              >
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 items-stretch gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:gap-6 lg:-mx-10 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
