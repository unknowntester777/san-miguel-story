import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";
import { siteContentQuery } from "@/lib/content";

const title = "Privacy Policy | San Miguel de Allende Wedding Photographers";
const description =
  "How we handle the personal data submitted through our wedding photography contact form.";

export const Route = createFileRoute("/en/privacy")({
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
      { rel: "canonical", href: "/en/privacy" },
      { rel: "alternate", hrefLang: "es-MX", href: "/aviso-de-privacidad" },
    ],
  }),
  component: () => (
    <SimplePage locale="en" eyebrow="Legal" title="Privacy policy">
      <p>
        The personal data you share through our contact form (name, email, phone, event date and
        location) is used solely to answer your inquiry, prepare a photography proposal and follow
        up on your wedding.
      </p>
      <p>
        We never sell, rent or share your information with third parties unrelated to delivering the
        service. Data is stored securely and kept only as long as needed to serve your request and
        meet contractual or tax obligations.
      </p>
      <p>
        You may request access, correction or deletion of your data, or withdraw your consent, by
        writing to the contact email published on this site. We respond within 20 business days.
      </p>
      <p>
        This site uses only the technical cookies required for it to function. Any change to this
        policy will be published on this page.
      </p>
    </SimplePage>
  ),
});
