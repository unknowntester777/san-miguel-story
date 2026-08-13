import type { AdminTable } from "@/lib/admin.functions";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "image" | "date";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  half?: boolean;
}

export interface TableDef {
  table: AdminTable;
  label: string;
  titleField: string;
  subtitleField?: string;
  singleton?: boolean;
  readOnly?: boolean;
  fields: FieldDef[];
}

const bilingual = (base: string, label: string, type: FieldType = "text"): FieldDef[] => [
  { name: `${base}_es`, label: `${label} (ES)`, type, half: type !== "textarea" },
  { name: `${base}_en`, label: `${label} (EN)`, type, half: type !== "textarea" },
];

export const TABLE_DEFS: TableDef[] = [
  {
    table: "inquiries",
    label: "Consultas",
    titleField: "first_name",
    subtitleField: "email",
    readOnly: true,
    fields: [
      { name: "status", label: "Estatus", type: "text", half: true },
      { name: "notes", label: "Notas internas", type: "textarea" },
      { name: "read", label: "Leída", type: "boolean", half: true },
    ],
  },
  {
    table: "page_content",
    label: "Secciones del sitio",
    titleField: "section_key",
    subtitleField: "heading_es",
    fields: [
      { name: "section_key", label: "Clave de sección", type: "text", half: true },
      { name: "sort_order", label: "Orden", type: "number", half: true },
      ...bilingual("eyebrow", "Etiqueta"),
      ...bilingual("heading", "Título"),
      ...bilingual("body", "Texto", "textarea"),
      ...bilingual("button_label", "Botón"),
      { name: "button_url", label: "URL del botón", type: "text", half: true },
      { name: "image_url", label: "Imagen", type: "image" },
      ...bilingual("image_alt", "Texto alternativo"),
      { name: "visible", label: "Visible", type: "boolean", half: true },
    ],
  },
  {
    table: "portfolio_items",
    label: "Portafolio",
    titleField: "title",
    subtitleField: "location",
    fields: [
      { name: "title", label: "Título", type: "text", half: true },
      { name: "location", label: "Lugar", type: "text", half: true },
      { name: "image_url", label: "Imagen", type: "image" },
      ...bilingual("alt", "Texto alternativo"),
      { name: "sort_order", label: "Orden", type: "number", half: true },
      { name: "active", label: "Activa", type: "boolean", half: true },
    ],
  },
  {
    table: "weddings",
    label: "Bodas reales",
    titleField: "couple_names",
    subtitleField: "venue",
    fields: [
      { name: "couple_names", label: "Pareja", type: "text", half: true },
      { name: "slug", label: "Slug", type: "text", half: true },
      { name: "venue", label: "Venue", type: "text", half: true },
      { name: "location", label: "Ubicación", type: "text", half: true },
      { name: "category", label: "Categoría", type: "text", half: true },
      { name: "wedding_date", label: "Fecha", type: "date", half: true },
      { name: "cover_image_url", label: "Portada", type: "image" },
      ...bilingual("excerpt", "Resumen", "textarea"),
      { name: "sort_order", label: "Orden", type: "number", half: true },
      { name: "published", label: "Publicada", type: "boolean", half: true },
    ],
  },
  {
    table: "venues",
    label: "Venues",
    titleField: "name",
    subtitleField: "location",
    fields: [
      { name: "name", label: "Nombre", type: "text", half: true },
      { name: "slug", label: "Slug", type: "text", half: true },
      { name: "location", label: "Ubicación", type: "text", half: true },
      { name: "cover_image_url", label: "Imagen", type: "image" },
      ...bilingual("description", "Descripción", "textarea"),
      { name: "sort_order", label: "Orden", type: "number", half: true },
      { name: "published", label: "Publicado", type: "boolean", half: true },
    ],
  },
  {
    table: "testimonials",
    label: "Testimonios",
    titleField: "couple_name",
    subtitleField: "venue",
    fields: [
      { name: "couple_name", label: "Pareja", type: "text", half: true },
      { name: "venue", label: "Venue", type: "text", half: true },
      { name: "year", label: "Año", type: "number", half: true },
      ...bilingual("quote", "Testimonio", "textarea"),
      { name: "sort_order", label: "Orden", type: "number", half: true },
      { name: "visible", label: "Visible", type: "boolean", half: true },
    ],
  },
  {
    table: "faqs",
    label: "Preguntas frecuentes",
    titleField: "question_es",
    fields: [
      ...bilingual("question", "Pregunta"),
      ...bilingual("answer", "Respuesta", "textarea"),
      { name: "sort_order", label: "Orden", type: "number", half: true },
      { name: "visible", label: "Visible", type: "boolean", half: true },
    ],
  },
  {
    table: "site_settings",
    label: "Ajustes del sitio",
    titleField: "brand_name",
    singleton: true,
    fields: [
      { name: "brand_name", label: "Marca", type: "text", half: true },
      { name: "business_location", label: "Ubicación", type: "text", half: true },
      { name: "email", label: "Email", type: "text", half: true },
      { name: "phone", label: "Teléfono", type: "text", half: true },
      { name: "whatsapp_number", label: "WhatsApp", type: "text", half: true },
      { name: "instagram_url", label: "Instagram", type: "text", half: true },
      { name: "facebook_url", label: "Facebook", type: "text", half: true },
      ...bilingual("whatsapp_message", "Mensaje WhatsApp", "textarea"),
      ...bilingual("footer_text", "Texto del pie", "textarea"),
      ...bilingual("seo_title", "SEO título"),
      ...bilingual("seo_description", "SEO descripción", "textarea"),
    ],
  },
];
