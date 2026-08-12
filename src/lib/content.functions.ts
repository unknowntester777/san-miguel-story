import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type PageSection = Database["public"]["Tables"]["page_content"]["Row"];
export type PortfolioItem = Database["public"]["Tables"]["portfolio_items"]["Row"];
export type Wedding = Database["public"]["Tables"]["weddings"]["Row"];
export type Venue = Database["public"]["Tables"]["venues"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Faq = Database["public"]["Tables"]["faqs"]["Row"];

export interface SiteContent {
  settings: SiteSettings | null;
  sections: Record<string, PageSection>;
  portfolio: PortfolioItem[];
  weddings: Wedding[];
  venues: Venue[];
  testimonials: Testimonial[];
  faqs: Faq[];
}

/** Public, read-only snapshot of every piece of editable homepage content. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContent> => {
    const supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const [settings, sections, portfolio, weddings, venues, testimonials, faqs] = await Promise.all([
      supabase.from("site_settings").select("*").maybeSingle(),
      supabase.from("page_content").select("*").order("sort_order"),
      supabase
        .from("portfolio_items")
        .select("*")
        .eq("active", true)
        .order("sort_order"),
      supabase.from("weddings").select("*").eq("published", true).order("sort_order"),
      supabase.from("venues").select("*").eq("published", true).order("sort_order"),
      supabase.from("testimonials").select("*").eq("visible", true).order("sort_order"),
      supabase.from("faqs").select("*").eq("visible", true).order("sort_order"),
    ]);

    const sectionMap: Record<string, PageSection> = {};
    for (const section of sections.data ?? []) sectionMap[section.section_key] = section;

    return {
      settings: settings.data ?? null,
      sections: sectionMap,
      portfolio: portfolio.data ?? [],
      weddings: weddings.data ?? [],
      venues: venues.data ?? [],
      testimonials: testimonials.data ?? [],
      faqs: faqs.data ?? [],
    };
  },
);
