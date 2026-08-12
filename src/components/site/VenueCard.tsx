import { localized, type Venue } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export function VenueCard({ venue, locale }: { venue: Venue; locale: Locale }) {
  return (
    <article className="group">
      <div className="hover-zoom relative aspect-[3/2] bg-secondary">
        {venue.cover_image_url ? (
          <img
            src={venue.cover_image_url}
            alt={`${venue.name}, ${venue.location ?? ""}`}
            loading="lazy"
            decoding="async"
            className="img-cover absolute inset-0"
          />
        ) : null}
      </div>
      <h3 className="mt-5 font-serif text-xl font-light">{venue.name}</h3>
      {venue.location ? (
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {venue.location}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {localized(venue, "description", locale)}
      </p>
    </article>
  );
}
