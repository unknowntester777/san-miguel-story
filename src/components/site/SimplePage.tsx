import type { ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { siteContentQuery } from "@/lib/content";
import { t, homePath, type Locale } from "@/lib/i18n";

export function SimplePage({
  locale,
  eyebrow,
  title,
  children,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  const { data } = useSuspenseQuery(siteContentQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header locale={locale} settings={data.settings} />
      <main className="flex-1 pt-32 pb-24 md:pt-44">
        <div className="container-editorial max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h1 className="display-2">{title}</h1>
          <div className="prose-editorial mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {children}
          </div>
          <Link
            to={homePath(locale)}
            className="mt-12 inline-block border border-border px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-secondary"
          >
            {t[locale].backHome}
          </Link>
        </div>
      </main>
      <Footer settings={data.settings} locale={locale} />
    </div>
  );
}
