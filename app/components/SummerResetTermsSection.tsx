"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Reveal } from "./sections/Reveal";
import { summerResetCopy, summerResetEnabled } from "../lib/summerResetCopy";

export default function SummerResetTermsSection() {
  if (!summerResetEnabled) return null;

  const copy = summerResetCopy.terms;

  return (
    <section
      className="surface-secondary border-t border-taupe/25 px-6 py-16 lg:px-12 lg:py-20"
      aria-labelledby="summer-terms-heading"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Accordion type="single" collapsible>
            <AccordionItem value="summer-terms" className="border-none">
              <AccordionTrigger
                id="summer-terms-heading"
                className="py-4 text-xl text-foreground hover:text-primary sm:text-2xl hover:no-underline [&[data-state=open]]:text-primary"
              >
                {copy.heading}
              </AccordionTrigger>
              <AccordionContent className="text-muted">
                <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
                  {copy.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
