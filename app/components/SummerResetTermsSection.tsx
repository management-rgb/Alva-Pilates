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
      className="py-12 lg:py-16 px-6 bg-background border-t border-charcoal/8"
      aria-labelledby="summer-terms-heading"
    >
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <Accordion type="single" collapsible>
            <AccordionItem value="summer-terms" className="border-none">
              <AccordionTrigger
                id="summer-terms-heading"
                className="text-xl sm:text-2xl py-4"
              >
                {copy.heading}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
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
