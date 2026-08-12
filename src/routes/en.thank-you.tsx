import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";
import { siteContentQuery } from "@/lib/content";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/en/thank-you")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: "Thank you | San Miguel de Allende Wedding Photographers" },
      { name: "description", content: "We have received your wedding photography inquiry." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Thank you for your inquiry" },
      { property: "og:description", content: "We have received your wedding photography inquiry." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/en/thank-you" }],
  }),
  component: () => (
    <SimplePage locale="en" eyebrow="Inquiry sent" title={t.en.thanksTitle}>
      <p>{t.en.thanksBody}</p>
    </SimplePage>
  ),
});
