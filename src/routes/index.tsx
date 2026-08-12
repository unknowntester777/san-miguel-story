import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { siteContentQuery } from "@/lib/content";

const title = "Fotógrafos de Bodas en San Miguel de Allende | Fotografía Editorial";
const description =
  "Fotografía de bodas editorial y documental en San Miguel de Allende. Bodas destino en haciendas, capillas y azoteas del centro histórico. Consulten disponibilidad.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "es-MX", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          additionalType: "https://schema.org/ProfessionalService",
          name: "Fotógrafos Bodas San Miguel de Allende",
          description,
          url: "https://fotografosbodas.com.mx/",
          image: "https://fotografosbodas.com.mx/images/boda-destino-san-miguel-de-allende.jpg",
          areaServed: ["San Miguel de Allende", "Guanajuato", "México"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "San Miguel de Allende",
            addressRegion: "Guanajuato",
            addressCountry: "MX",
          },
          priceRange: "$$$",
          knowsLanguage: ["es-MX", "en"],
        }),
      },
    ],
  }),
  component: () => <HomePage locale="es" />,
});
