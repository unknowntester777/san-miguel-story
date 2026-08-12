import { Link } from "@tanstack/react-router";
import { t, whatsappHref, privacyPath, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/content";

const SECTIONS = [
  { id: "portafolio", key: "portfolio" },
  { id: "bodas", key: "weddings" },
  { id: "san-miguel", key: "sanmiguel" },
  { id: "contacto", key: "contact" },
] as const;

export function Footer({
  settings,
  locale,
}: {
  settings: SiteSettings | null;
  locale: Locale;
}) {
  const copy = t[locale];
  const brand = settings?.brand_name ?? "FOTÓGRAFOS BODAS";
  const wa = whatsappHref(
    settings?.whatsapp_number ?? "",
    (locale === "en" ? settings?.whatsapp_message_en : settings?.whatsapp_message_es) ?? "",
  );

  return (
    <footer className="bg-ink text-primary-foreground">
      <div className="container-editorial grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <p className="text-[0.7rem] font-medium tracking-[0.28em]">{brand}</p>
          <p className="mt-4 text-sm text-primary-foreground/65">
            {locale === "es" ? "Fotografía de bodas" : "Wedding photography"}
            <br />
            {settings?.business_location ?? "San Miguel de Allende · México"}
          </p>
          <p className="mt-6 max-w-xs text-sm text-primary-foreground/50">
            {(locale === "en" ? settings?.footer_text_en : settings?.footer_text_es) ?? ""}
          </p>
        </div>

        <nav aria-label={copy.footerNav}>
          <p className="eyebrow !text-primary-foreground/45">{copy.footerNav}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {copy.nav[s.key]}
                </a>
              </li>
            ))}
            <li>
              <Link
                to={privacyPath(locale)}
                className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                {copy.privacy}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow !text-primary-foreground/45">{copy.footerContact}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {settings?.email ? (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {settings.email}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
              >
                {copy.whatsapp}
              </a>
            </li>
            {settings?.instagram_url ? (
              <li>
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  Instagram
                </a>
              </li>
            ) : null}
            {settings?.facebook_url ? (
              <li>
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  Facebook
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/12">
        <div className="container-editorial flex flex-col gap-2 py-6 text-[0.7rem] tracking-wide text-primary-foreground/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand}. {copy.rights}
          </p>
          <p>fotografosbodas.com.mx</p>
        </div>
      </div>
    </footer>
  );
}
