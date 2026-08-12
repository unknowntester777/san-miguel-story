import { useSuspenseQuery } from "@tanstack/react-query";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { SectionHeading } from "./SectionHeading";
import { EditorialGallery } from "./EditorialGallery";
import { WeddingCard } from "./WeddingCard";
import { VenueCard } from "./VenueCard";
import { Testimonials } from "./Testimonials";
import { FaqAccordion } from "./FaqAccordion";
import { InquiryForm } from "./InquiryForm";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { siteContentQuery, pick } from "@/lib/content";
import { t, whatsappHref, type Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const { data } = useSuspenseQuery(siteContentQuery);
  const copy = t[locale];
  const s = data.sections;
  const settings = data.settings;
  const wa = whatsappHref(
    settings?.whatsapp_number ?? "",
    (locale === "en" ? settings?.whatsapp_message_en : settings?.whatsapp_message_es) ?? "",
  );

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} settings={settings} />
      <main>
        <Hero section={s.hero} locale={locale} />

        {/* Manifesto */}
        <section className="section-y">
          <div className="container-editorial grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <div>
              <p className="eyebrow">{pick(s.intro, "eyebrow", locale)}</p>
              <div className="mt-8 flex gap-8">
                {copy.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="display-2 text-balance">{pick(s.intro, "heading", locale)}</h2>
              <p className="lead mt-7">{pick(s.intro, "body", locale)}</p>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portafolio" className="scroll-mt-24 border-t border-border section-y">
          <div className="container-editorial">
            <SectionHeading
              eyebrow={pick(s.portfolio, "eyebrow", locale)}
              heading={pick(s.portfolio, "heading", locale)}
              body={pick(s.portfolio, "body", locale)}
            />
            <div className="mt-14">
              <EditorialGallery items={data.portfolio} locale={locale} />
            </div>
          </div>
        </section>

        {/* Real weddings */}
        {data.weddings.length > 0 ? (
          <section id="bodas" className="scroll-mt-24 bg-secondary/50 section-y">
            <div className="container-editorial">
              <SectionHeading
                eyebrow={pick(s.weddings, "eyebrow", locale)}
                heading={pick(s.weddings, "heading", locale)}
                body={pick(s.weddings, "body", locale)}
              />
              <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {data.weddings.slice(0, 3).map((wedding) => (
                  <WeddingCard key={wedding.id} wedding={wedding} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Experience */}
        <section id="experiencia" className="scroll-mt-24 section-y">
          <div className="container-editorial">
            <SectionHeading
              eyebrow={pick(s.experience, "eyebrow", locale)}
              heading={pick(s.experience, "heading", locale)}
              body={pick(s.experience, "body", locale)}
            />
            <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
              {copy.steps.map((step) => (
                <li key={step.n} className="border-t border-border pt-6">
                  <span className="text-[0.68rem] tracking-[0.2em] text-muted-foreground">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-light">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* San Miguel de Allende */}
        <section id="san-miguel" className="scroll-mt-24 border-t border-border section-y">
          <div className="container-editorial">
            <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
              <div className="relative aspect-[4/5] bg-secondary">
                {s.sanmiguel?.image_url ? (
                  <img
                    src={s.sanmiguel.image_url}
                    alt={pick(s.sanmiguel, "image_alt", locale)}
                    loading="lazy"
                    decoding="async"
                    className="img-cover absolute inset-0"
                  />
                ) : null}
              </div>
              <div>
                <SectionHeading
                  eyebrow={pick(s.sanmiguel, "eyebrow", locale)}
                  heading={pick(s.sanmiguel, "heading", locale)}
                  body={pick(s.sanmiguel, "body", locale)}
                />
              </div>
            </div>

            {data.venues.length > 0 ? (
              <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
                {data.venues.slice(0, 6).map((venue) => (
                  <VenueCard key={venue.id} venue={venue} locale={locale} />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Testimonials */}
        {data.testimonials.length > 0 ? (
          <section className="bg-ink text-primary-foreground section-y">
            <div className="container-editorial">
              <p className="eyebrow !text-primary-foreground/50">
                {pick(s.testimonials, "eyebrow", locale)}
              </p>
              <h2 className="display-2 mt-5 max-w-xl">{pick(s.testimonials, "heading", locale)}</h2>
              <div className="mt-14 [&_*]:border-primary-foreground/15 [&_figcaption]:text-primary-foreground/60">
                <Testimonials items={data.testimonials} locale={locale} />
              </div>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {data.faqs.length > 0 ? (
          <section id="preguntas" className="scroll-mt-24 section-y">
            <div className="container-editorial grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <SectionHeading
                eyebrow={pick(s.faq, "eyebrow", locale)}
                heading={pick(s.faq, "heading", locale)}
              />
              <FaqAccordion items={data.faqs} locale={locale} />
            </div>
          </section>
        ) : null}

        {/* Contact */}
        <section id="contacto" className="scroll-mt-24 border-t border-border section-y">
          <div className="container-editorial grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div>
              <SectionHeading
                eyebrow={pick(s.contact, "eyebrow", locale)}
                heading={pick(s.contact, "heading", locale)}
                body={pick(s.contact, "body", locale)}
              />
              <div className="mt-10 space-y-3 text-sm">
                {settings?.email ? (
                  <p>
                    <a href={`mailto:${settings.email}`} className="link-underline">
                      {settings.email}
                    </a>
                  </p>
                ) : null}
                {settings?.whatsapp_number ? (
                  <p>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {copy.whatsapp}
                    </a>
                  </p>
                ) : null}
                <p className="text-muted-foreground">{settings?.business_location}</p>
              </div>
            </div>
            <InquiryForm locale={locale} />
          </div>
        </section>
      </main>

      <Footer settings={settings} locale={locale} />
      <WhatsAppFloat settings={settings} locale={locale} />
    </div>
  );
}
