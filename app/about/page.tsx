"use client";
import { title } from "@/components/primitives";
import { Accordion, AccordionItem, Card, Spacer } from "@nextui-org/react";

export default function AboutPage() {
  const default_text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="min-w-[700px]">
      <h1 className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
        About Us
      </h1>
      <Spacer y={4} />
        <Accordion>
          <AccordionItem key="1" aria-label="Our history" title="Our history">
            {default_text}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Our goal" title="Our goal">
            {default_text}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Our future" title="Our future">
            {default_text}
          </AccordionItem>
        </Accordion>
      
    </div>
  );
}
