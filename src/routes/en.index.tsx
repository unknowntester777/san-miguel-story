import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { siteContentQuery } from "@/lib/content";

const title = "San Miguel de Allende Wedding Photographers | Editorial Photography";
const description =
  "Editorial and documentary wedding photography in San Miguel de Allende. Destination weddings at haciendas, chapels and rooftops in the historic center. Check your date.";

export const Route = createFileRoute("/en/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/en" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/en" },
      { rel: "alternate", hrefLang: "es-MX", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
  component: () => <HomePage locale="en" />,
});
