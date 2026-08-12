export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];

/** Static UI strings that are not editable in the admin dashboard. */
export const t = {
  es: {
    nav: {
      portfolio: "Portafolio",
      weddings: "Bodas reales",
      experience: "Experiencia",
      sanmiguel: "San Miguel",
      faq: "Preguntas",
      contact: "Contacto",
    },
    headerCta: "Consultar fecha",
    menu: "Menú",
    close: "Cerrar",
    openMenu: "Abrir menú",
    heroSecondary: "Ver portafolio",
    heroNote: "Disponibles para bodas destino en todo México.",
    pillars: ["Editorial", "Documental", "Atemporal"],
    steps: [
      {
        n: "01",
        title: "Conocernos",
        text: "Una llamada o un café para entender su boda, su ritmo y lo que más les importa conservar.",
      },
      {
        n: "02",
        title: "Planear",
        text: "Definimos tiempos, luz y recorridos junto a ustedes y su wedding planner para que el día fluya.",
      },
      {
        n: "03",
        title: "Vivir el día",
        text: "Fotografiamos con discreción. Ustedes celebran; nosotros nos ocupamos de las imágenes.",
      },
      {
        n: "04",
        title: "Revive la historia",
        text: "Una galería editada con cuidado y opciones de impresión para conservarla toda la vida.",
      },
    ],
    viewStory: "Ver historia",
    soon: "Próximamente",
    form: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email",
      phone: "WhatsApp / teléfono",
      date: "Fecha de boda",
      venue: "Venue / lugar",
      city: "Ciudad / destino",
      guests: "Número aproximado de invitados",
      eventType: "Tipo de evento",
      eventTypes: ["Boda", "Elopement", "Compromiso", "Pedida de matrimonio", "Otro"],
      source: "¿Cómo nos encontraron?",
      sources: ["Google", "Instagram", "Recomendación", "Wedding planner", "Venue", "Otro"],
      message: "Cuéntennos un poco sobre su boda",
      privacy: "Acepto el aviso de privacidad.",
      privacyLink: "Aviso de privacidad",
      submit: "Consultar disponibilidad",
      sending: "Enviando…",
      select: "Seleccionar",
      required: "Este campo es obligatorio",
      invalidEmail: "Ingresen un email válido",
      mustAccept: "Es necesario aceptar el aviso de privacidad",
      error: "No pudimos enviar su mensaje. Intenten de nuevo en un momento.",
      success: "Gracias. Hemos recibido su consulta.",
    },
    whatsapp: "WhatsApp",
    footerNav: "Navegación",
    footerContact: "Contacto",
    privacy: "Aviso de privacidad",
    rights: "Todos los derechos reservados.",
    backHome: "Volver al inicio",
    thanksTitle: "Gracias por escribirnos",
    thanksBody:
      "Hemos recibido su consulta y les responderemos personalmente en menos de 48 horas. Mientras tanto, pueden escribirnos por WhatsApp si prefieren una respuesta inmediata.",
    notFoundTitle: "Página no encontrada",
    notFoundBody: "La página que buscan no existe o fue movida.",
  },
  en: {
    nav: {
      portfolio: "Portfolio",
      weddings: "Real weddings",
      experience: "Experience",
      sanmiguel: "San Miguel",
      faq: "FAQ",
      contact: "Contact",
    },
    headerCta: "Check your date",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    heroSecondary: "View portfolio",
    heroNote: "Available for destination weddings throughout Mexico.",
    pillars: ["Editorial", "Documentary", "Timeless"],
    steps: [
      {
        n: "01",
        title: "Getting to know you",
        text: "A call or a coffee to understand your wedding, its rhythm and what matters most to you.",
      },
      {
        n: "02",
        title: "Planning",
        text: "We map timing, light and locations with you and your planner so the day flows.",
      },
      {
        n: "03",
        title: "The day itself",
        text: "We photograph discreetly. You celebrate; we take care of the images.",
      },
      {
        n: "04",
        title: "Relive the story",
        text: "A carefully edited gallery and print options to keep it for a lifetime.",
      },
    ],
    viewStory: "View story",
    soon: "Coming soon",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "WhatsApp / phone",
      date: "Wedding date",
      venue: "Venue",
      city: "City / destination",
      guests: "Approximate number of guests",
      eventType: "Event type",
      eventTypes: ["Wedding", "Elopement", "Engagement", "Proposal", "Other"],
      source: "How did you find us?",
      sources: ["Google", "Instagram", "Referral", "Wedding planner", "Venue", "Other"],
      message: "Tell us a little about your wedding",
      privacy: "I accept the privacy policy.",
      privacyLink: "Privacy policy",
      submit: "Check availability",
      sending: "Sending…",
      select: "Select",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      mustAccept: "You must accept the privacy policy",
      error: "We could not send your message. Please try again in a moment.",
      success: "Thank you. We have received your inquiry.",
    },
    whatsapp: "WhatsApp",
    footerNav: "Navigation",
    footerContact: "Contact",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    backHome: "Back home",
    thanksTitle: "Thank you for writing",
    thanksBody:
      "We have received your inquiry and will reply personally within 48 hours. In the meantime, you can reach us on WhatsApp if you prefer an immediate answer.",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you are looking for does not exist or has been moved.",
  },
} as const;

export const homePath = (locale: Locale) => (locale === "es" ? "/" : "/en");
export const thanksPath = (locale: Locale) => (locale === "es" ? "/gracias" : "/en/thank-you");
export const privacyPath = (locale: Locale) =>
  locale === "es" ? "/aviso-de-privacidad" : "/en/privacy";

export function whatsappHref(number: string, message: string) {
  const digits = (number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message || "")}`;
}
