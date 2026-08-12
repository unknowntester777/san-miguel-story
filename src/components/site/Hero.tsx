import heroFallback from "@/assets/hero-san-miguel-wedding.jpg";
import { t, type Locale } from "@/lib/i18n";
import { pick, type PageSection } from "@/lib/content";

interface HeroProps {
  section?: PageSection;
  locale: Locale;
}

export function Hero({ section, locale }: HeroProps) {
  const copy = t[locale];
  const image = section?.image_url || heroFallback;
  const alt =
    pick(section, "image_alt", locale) ||
    (locale === "es"
      ? "Pareja de novios caminando por una calle empedrada de San Miguel de Allende al atardecer"
      : "Bride and groom walking a cobblestone street in San Miguel de Allende at sunset");

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden md:min-h-[92svh]">
      <img
        src={image}
        alt={alt}
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/25 to-ink/25"
      />

      <div className="container-editorial relative pb-14 pt-32 md:pb-20">
        <div className="max-w-3xl text-primary-foreground">
          <p className="eyebrow !text-primary-foreground/75">{pick(section, "eyebrow", locale)}</p>
          <h1 className="display-1 mt-6 text-balance">{pick(section, "heading", locale)}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {pick(section, "body", locale)}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={section?.button_url || "#contacto"}
              className="bg-primary-foreground px-7 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-champagne"
            >
              {pick(section, "button_label", locale)}
            </a>
            <a
              href="#portafolio"
              className="border border-primary-foreground/60 px-7 py-4 text-center text-[0.72rem] font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {copy.heroSecondary}
            </a>
          </div>

          <p className="mt-8 text-xs tracking-wide text-primary-foreground/65">{copy.heroNote}</p>
        </div>
      </div>
    </section>
  );
}
