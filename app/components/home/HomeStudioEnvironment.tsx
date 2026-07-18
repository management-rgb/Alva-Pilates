"use client";

import Link from "next/link";
import { Reveal } from "../sections/Reveal";
import { RevealText } from "../sections/RevealText";
import { FullBleedImage } from "../editorial/FullBleedImage";
import { studioImagery } from "../../lib/studioImagery";

/** Full-bleed immersive photography moment with parallax */
export default function HomeStudioEnvironment() {
  return (
    <FullBleedImage
      src={studioImagery.heroStudio}
      alt="Inside the Alva Pilates studio — natural light, premium reformers, and warm neutral tones"
      height="lg"
      scrim="bottom"
      align="end"
    >
      <div>
        <Reveal>
          <p className="eyebrow text-paper/60">The studio</p>
        </Reveal>
        <RevealText
          as="h2"
          className="font-display mt-5 max-w-xl text-[clamp(2.25rem,4.2vw,3.75rem)] font-normal leading-[1] tracking-[-0.02em] text-balance text-paper"
          text="A space designed for focus."
        />
        <Reveal>
          <p className="mt-6 max-w-sm text-base leading-[1.75] text-paper/70">
            Light, quiet, and architectural — an environment that makes every
            session feel considered.
          </p>
        </Reveal>
        <Reveal>
          <Link
            href="/about"
            className="mt-8 inline-flex text-link text-paper border-paper/40 hover:border-paper underline-grow"
          >
            Explore the studio
          </Link>
        </Reveal>
      </div>
    </FullBleedImage>
  );
}
