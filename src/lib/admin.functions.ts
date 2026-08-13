import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const TABLES = [
  "page_content",
  "portfolio_items",
  "weddings",
  "venues",
  "testimonials",
  "faqs",
  "site_settings",
  "inquiries",
] as const;

const tableSchema = z.enum(TABLES);
export type AdminTable = z.infer<typeof tableSchema>;

const ORDER_COLUMN: Record<AdminTable, string> = {
  page_content: "sort_order",
  portfolio_items: "sort_order",
  weddings: "sort_order",
  venues: "sort_order",
  testimonials: "sort_order",
  faqs: "sort_order",
  site_settings: "id",
  inquiries: "created_at",
};

export type Row = Record<string, string | number | boolean | null>;

export const adminIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("is_admin");
    return { isAdmin: data === true, userId: context.userId };
  });

export const adminList = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ table: tableSchema }).parse(data))
  .handler(async ({ data, context }): Promise<Row[]> => {
    const column = ORDER_COLUMN[data.table];
    const { data: rows, error } = await context.supabase
      .from(data.table)
      .select("*")
      .order(column, { ascending: data.table !== "inquiries" });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as Row[];
  });

export const adminSave = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ table: tableSchema, row: z.record(z.string(), z.unknown()) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const row = { ...data.row };
    const isUpdate = typeof row["id"] === "string" && row["id"] !== "";
    if (!isUpdate) delete row["id"];

    const query = isUpdate
      ? context.supabase.from(data.table).update(row as never).eq("id", row["id"] as string)
      : context.supabase.from(data.table).insert(row as never);

    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDelete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ table: tableSchema, id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Uploads an image to the private media bucket and returns a long-lived signed URL. */
export const adminUploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        fileName: z.string().min(1).max(160),
        contentType: z.string().min(1).max(80),
        dataBase64: z.string().min(1).max(12_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const bytes = Buffer.from(data.dataBase64, "base64");
    const safeName = data.fileName.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    const path = `${Date.now()}-${safeName}`;

    const { error } = await context.supabase.storage
      .from("media")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);

    const { data: signed, error: signError } = await context.supabase.storage
      .from("media")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (signError || !signed) throw new Error(signError?.message ?? "signing failed");

    return { url: signed.signedUrl, path };
  });
