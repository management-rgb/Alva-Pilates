"use client";

import Link from "next/link";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";
import { SplitImage } from "../editorial/SplitImage";
import { studioImagery } from "../../lib/studioImagery";

/** Private training teaser — editorial split on soft charcoal */
export default function HomePrivateTeaser() {
  return (
    <SplitImage
      src={studioImagery.privateTraining}
      alt="Private reformer training session at Alva Pilates"
      imageSide="right"
      surface="surface-charcoal-soft"
      objectPosition="center"
      animateText={false}
    >
      <div className="space-y-6">
        <Reveal>
          <p className="eyebrow text-[rgba(245,245,242,0.5)]">
            Private training
          </p>
        </Reveal>
        <RevealText
          as="h2"
          className="editorial-h2 text-balance text-paper"
          text="Personalized. Focused. Results."
        />
        <Reveal>
          <p className="max-w-md text-base leading-[1.75] text-[rgba(245,245,242,0.62)]">
            One-to-one reformer sessions with expert coaching, programmed
            entirely around your goals — available weekdays and by appointment
            on weekends.
          </p>
        </Reveal>
        <Reveal>
          <Link
            href="/pricing#private-training"
            className="btn-primary group mt-2"
          >
            View Private Training
          </Link>
        </Reveal>
      </div>
    </SplitImage>
  );
}
