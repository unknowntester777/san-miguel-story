import { localized, type Faq } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({ items, locale }: { items: Faq[]; locale: Locale }) {
  if (items.length === 0) return null;
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="border-b border-border">
          <AccordionTrigger className="py-6 text-left font-serif text-lg font-light hover:no-underline md:text-xl">
            {localized(item, "question", locale)}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground md:text-base">
            {localized(item, "answer", locale)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
