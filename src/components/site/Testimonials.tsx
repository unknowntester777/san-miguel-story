import { localized, type Testimonial } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function Testimonials({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: Locale;
}) {
  if (items.length === 0) return null;
  const visible = items.slice(0, 3);

  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
      {visible.map((item) => (
        <figure
          key={item.id}
          className="w-[82%] shrink-0 snap-start border-t border-border pt-8 md:w-auto"
        >
          <blockquote className="font-serif text-xl font-light leading-snug md:text-2xl">
            “{localized(item, "quote", locale)}”
          </blockquote>
          <figcaption className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            {item.couple_name}
            {item.venue ? <span className="block normal-case tracking-normal text-muted-foreground/80">{item.venue}{item.year ? ` · ${item.year}` : ""}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
