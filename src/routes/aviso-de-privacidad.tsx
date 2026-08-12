import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";
import { siteContentQuery } from "@/lib/content";

const title = "Aviso de Privacidad | Fotógrafos Bodas San Miguel de Allende";
const description =
  "Aviso de privacidad sobre el tratamiento de datos personales recabados a través del formulario de contacto.";

export const Route = createFileRoute("/aviso-de-privacidad")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/aviso-de-privacidad" },
      { rel: "alternate", hrefLang: "en", href: "/en/privacy" },
    ],
  }),
  component: () => (
    <SimplePage locale="es" eyebrow="Legal" title="Aviso de privacidad">
      <p>
        Los datos personales que nos comparten a través del formulario de contacto (nombre, correo
        electrónico, teléfono, fecha y lugar del evento) se utilizan únicamente para responder su
        consulta, preparar una propuesta de servicios fotográficos y dar seguimiento a su boda.
      </p>
      <p>
        No vendemos, rentamos ni compartimos su información con terceros ajenos a la prestación del
        servicio. Los datos se almacenan de forma segura y se conservan solo por el tiempo necesario
        para atender su solicitud y cumplir obligaciones fiscales o contractuales.
      </p>
      <p>
        Pueden ejercer sus derechos de acceso, rectificación, cancelación u oposición (ARCO), así
        como revocar su consentimiento, escribiéndonos al correo de contacto publicado en este
        sitio. Atenderemos su solicitud en un plazo máximo de 20 días hábiles.
      </p>
      <p>
        Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento. Cualquier
        cambio a este aviso se publicará en esta misma página.
      </p>
    </SimplePage>
  ),
});
