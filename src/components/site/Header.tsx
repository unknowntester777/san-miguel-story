import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { t, whatsappHref, homePath, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/content";

const SECTIONS = [
  { id: "portafolio", key: "portfolio" },
  { id: "bodas", key: "weddings" },
  { id: "experiencia", key: "experience" },
  { id: "san-miguel", key: "sanmiguel" },
  { id: "preguntas", key: "faq" },
  { id: "contacto", key: "contact" },
] as const;

interface HeaderProps {
  locale: Locale;
  settings: SiteSettings | null;
}

export function Header({ locale, settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const copy = t[locale];
  const brand = settings?.brand_name ?? "FOTÓGRAFOS BODAS";
  const wa = whatsappHref(
    settings?.whatsapp_number ?? "",
    (locale === "en" ? settings?.whatsapp_message_en : settings?.whatsapp_message_es) ?? "",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = scrolled
    ? "text-foreground/75 hover:text-foreground"
    : "text-primary-foreground/85 hover:text-primary-foreground";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "border-b border-border bg-background/92 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to={homePath(locale)}
          className={cn(
            "font-sans text-[0.7rem] font-medium tracking-[0.28em] transition-colors md:text-xs",
            scrolled ? "text-foreground" : "text-primary-foreground",
          )}
        >
          {brand}
        </Link>

        <nav aria-label={copy.menu} className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "link-underline link-underline-hover text-[0.8rem] tracking-wide transition-colors",
                navLinkClass,
              )}
            >
              {copy.nav[s.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitch locale={locale} scrolled={scrolled} />
          <a
            href="#contacto"
            className={cn(
              "border px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors",
              scrolled
                ? "border-foreground bg-foreground text-primary-foreground hover:bg-transparent hover:text-foreground"
                : "border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground hover:text-foreground",
            )}
          >
            {copy.headerCta}
          </a>
        </div>

        <button
          type="button"
          aria-label={copy.openMenu}
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className={cn(
            "-mr-2 flex h-11 w-11 items-center justify-center lg:hidden",
            scrolled ? "text-foreground" : "text-primary-foreground",
          )}
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="container-editorial flex h-16 items-center justify-between">
            <span className="font-sans text-[0.7rem] font-medium tracking-[0.28em]">{brand}</span>
            <button
              type="button"
              aria-label={copy.close}
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            aria-label={copy.menu}
            className="container-editorial flex flex-1 flex-col justify-center gap-1 pb-16"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="display-3 border-b border-border py-4"
              >
                {copy.nav[s.key]}
              </a>
            ))}

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="bg-foreground px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground"
              >
                {copy.headerCta}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border px-6 py-4 text-xs font-medium uppercase tracking-[0.16em]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                {copy.whatsapp}
              </a>
              <div className="pt-3">
                <LocaleSwitch locale={locale} scrolled />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LocaleSwitch({ locale, scrolled }: { locale: Locale; scrolled: boolean }) {
  const base = scrolled ? "text-foreground" : "text-primary-foreground";
  const dim = scrolled ? "text-muted-foreground" : "text-primary-foreground/55";
  return (
    <div className={cn("flex items-center gap-1.5 text-[0.72rem] tracking-[0.14em]", base)}>
      <Link to="/" className={locale === "es" ? base : dim} aria-current={locale === "es"}>
        ES
      </Link>
      <span className={dim}>|</span>
      <Link to="/en" className={locale === "en" ? base : dim} aria-current={locale === "en"}>
        EN
      </Link>
    </div>
  );
}
