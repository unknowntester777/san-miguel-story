import { queryOptions } from "@tanstack/react-query";
import { getSiteContent, type PageSection, type SiteContent } from "./content.functions";
import type { Locale } from "./i18n";

export type {
  SiteContent,
  SiteSettings,
  PageSection,
  PortfolioItem,
  Wedding,
  Venue,
  Testimonial,
  Faq,
} from "./content.functions";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

type Field = "eyebrow" | "heading" | "body" | "button_label" | "image_alt";

/** Picks the localized value of a bilingual section field, falling back to Spanish. */
export function pick(
  section: PageSection | undefined,
  field: Field,
  locale: Locale,
): string {
  if (!section) return "";
  const localized = section[`${field}_${locale}` as keyof PageSection] as string | null;
  const fallback = section[`${field}_es` as keyof PageSection] as string | null;
  return (localized || fallback || "") as string;
}

export function localized<T extends Record<string, unknown>>(
  row: T | undefined | null,
  field: string,
  locale: Locale,
): string {
  if (!row) return "";
  return ((row[`${field}_${locale}`] as string) || (row[`${field}_es`] as string) || "") as string;
}

export const isVisible = (content: SiteContent, key: string) =>
  content.sections[key]?.visible !== false;
