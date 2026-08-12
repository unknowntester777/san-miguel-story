import { MessageCircle } from "lucide-react";
import { t, whatsappHref, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/content";

export function WhatsAppFloat({
  settings,
  locale,
}: {
  settings: SiteSettings | null;
  locale: Locale;
}) {
  if (!settings?.whatsapp_number) return null;
  const href = whatsappHref(
    settings.whatsapp_number,
    (locale === "en" ? settings.whatsapp_message_en : settings.whatsapp_message_es) ?? "",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t[locale].whatsapp}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-ink/90 text-primary-foreground shadow-sm backdrop-blur transition-colors hover:bg-ink md:bottom-7 md:right-7 md:h-11 md:w-11"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
    </a>
  );
}
