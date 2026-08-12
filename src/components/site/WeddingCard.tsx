import { localized, type Wedding } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";

export function WeddingCard({ wedding, locale }: { wedding: Wedding; locale: Locale }) {
  const copy = t[locale];
  return (
    <article className="group">
      <div className="hover-zoom relative aspect-[4/5] bg-secondary">
        {wedding.cover_image_url ? (
          <img
            src={wedding.cover_image_url}
            alt={`${wedding.couple_names} — ${wedding.location ?? ""}`}
            loading="lazy"
            decoding="async"
            className="img-cover absolute inset-0"
          />
        ) : null}
      </div>
      <div className="pt-6">
        {wedding.category ? <p className="eyebrow">{wedding.category}</p> : null}
        <h3 className="display-3 mt-3">{wedding.couple_names}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {[wedding.venue, wedding.location].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {localized(wedding, "excerpt", locale)}
        </p>
        <span className="mt-5 inline-block text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
          {copy.soon}
        </span>
      </div>
    </article>
  );
}
