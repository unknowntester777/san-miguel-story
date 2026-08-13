import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { localized, type PortfolioItem } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Asymmetric editorial composition: each index maps to a deliberate grid cell. */
const SPANS = [
  "aspect-[4/5] md:aspect-auto md:col-span-7 md:row-span-4",
  "aspect-[4/5] md:aspect-auto md:col-span-5 md:row-span-4",
  "aspect-[4/5] md:aspect-auto md:col-span-5 md:row-span-3",
  "aspect-[4/5] md:aspect-auto md:col-span-7 md:row-span-3",
  "aspect-[4/5] md:aspect-auto md:col-span-7 md:row-span-4",
  "aspect-[4/5] md:aspect-auto md:col-span-5 md:row-span-4",
  "aspect-[4/5] md:aspect-auto md:col-span-4 md:row-span-3",
  "aspect-[4/5] md:aspect-auto md:col-span-8 md:row-span-3",
];

export function EditorialGallery({
  items,
  locale,
}: {
  items: PortfolioItem[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  if (items.length === 0) return null;
  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[8.5rem] md:gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={cn(
              "hover-zoom group relative w-full bg-secondary sm:col-span-1",
              SPANS[index % SPANS.length],
            )}
          >
            <img
              src={item.image_url}
              alt={localized(item, "alt", locale) || item.title || ""}
              loading="lazy"
              decoding="async"
              className="img-cover absolute inset-0"
            />
            {item.title ? (
              <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm text-primary-foreground">{item.title}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground/75">
                  {item.location}
                </span>
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={localized(active, "alt", locale) || active.title || ""}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-primary-foreground/80 hover:text-primary-foreground"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Anterior"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 flex h-12 w-12 items-center justify-center text-primary-foreground/70 hover:text-primary-foreground md:left-6"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={1.2} />
          </button>
          <figure className="max-h-[86svh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={active.image_url}
              alt={localized(active, "alt", locale) || active.title || ""}
              className="max-h-[78svh] w-auto object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs tracking-wide text-primary-foreground/70">
              <span>{active.title}</span>
              <span className="uppercase tracking-[0.16em]">{active.location}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-2 flex h-12 w-12 items-center justify-center text-primary-foreground/70 hover:text-primary-foreground md:right-6"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={1.2} />
          </button>
        </div>
      ) : null}
    </>
  );
}
