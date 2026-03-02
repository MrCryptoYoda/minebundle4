import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS } from '@/data/pricingData';

export function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {FAQS.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 rounded-lg px-4">
            <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline hover:text-brand-orange py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
