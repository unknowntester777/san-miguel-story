import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";
import { siteContentQuery } from "@/lib/content";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/gracias")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Gracias por su consulta | Fotógrafos Bodas San Miguel de Allende" },
      { name: "description", content: "Hemos recibido su consulta de fotografía de boda." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gracias por su consulta" },
      { property: "og:description", content: "Hemos recibido su consulta de fotografía de boda." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/gracias" }],
  }),
  component: () => (
    <SimplePage locale="es" eyebrow="Consulta enviada" title={t.es.thanksTitle}>
      <p>{t.es.thanksBody}</p>
    </SimplePage>
  ),
});
