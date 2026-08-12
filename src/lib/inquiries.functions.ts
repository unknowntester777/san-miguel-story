import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const inquirySchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  wedding_date: z.string().trim().max(20).optional().default(""),
  venue: z.string().trim().max(160).optional().default(""),
  city: z.string().trim().max(160).optional().default(""),
  guest_count: z.string().trim().max(20).optional().default(""),
  event_type: z.string().trim().max(60).optional().default(""),
  source: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  locale: z.enum(["es", "en"]).default("es"),
});

export type InquiryInput = z.input<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { error } = await supabase.from("inquiries").insert({
      first_name: data.first_name,
      last_name: data.last_name || null,
      email: data.email,
      phone: data.phone || null,
      wedding_date: data.wedding_date || null,
      venue: data.venue || null,
      city: data.city || null,
      guest_count: data.guest_count ? Number(data.guest_count) || null : null,
      event_type: data.event_type || null,
      source: data.source || null,
      message: data.message || null,
      locale: data.locale,
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });
