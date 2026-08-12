# San Miguel Story

MASTER BUILD PROMPT — fotografosbodas.com.mx

Build a complete, production-ready, extremely polished website for:

fotografosbodas.com.mx

This is a premium wedding photography lead-generation website focused primarily on:

San Miguel de Allende, Guanajuato, Mexico

The primary business objective is:

Generate qualified wedding photography inquiries through Google organic search, Google Images, direct traffic, and WhatsApp.

This is NOT a generic photographer template.

It must feel like a sophisticated destination-wedding photography brand combining:

Vogue Weddings editorial elegance

Apple-level simplicity

Airbnb-level UX clarity

Luxury hospitality aesthetics

Contemporary high-end photography portfolios

1. IMPORTANT IMPLEMENTATION RULE

Before modifying or generating anything, understand the complete specification.

Build the entire MVP coherently in one implementation.

DO NOT:

create unnecessary features

install unnecessary packages

create fake complex systems

create a blog engine

create ecommerce

create payment functionality

create client accounts

create booking calendars

create AI features

create complex animations

create features not explicitly requested

rebuild working components unnecessarily

duplicate components

create multiple different design systems

generate dozens of unnecessary placeholder pages

Keep the codebase simple, reusable, clean and maintainable.

The public website should initially consist primarily of:

Main landing page

Admin login

Admin dashboard

Privacy page

Thank-you page

404 page

Create the architecture so additional SEO pages can easily be added later without rebuilding the website.

2. TECHNOLOGY

Use the existing Lovable recommended React stack.

Use:

React

TypeScript

Tailwind CSS

reusable components

semantic HTML

responsive image handling

optimized routing

Lucide icons when icons are necessary

Do not add heavy animation libraries unless absolutely necessary.

Prefer CSS transitions and subtle native effects.

Use Lovable Cloud for:

admin authentication

database

image storage

persistent website content

If Lovable Cloud is not available in this project, structure the implementation so Supabase can provide the same functionality.

There should initially only be ONE administrator role.

Public users must never have access to admin data modification.

3. DESIGN DIRECTION

Create an editorial luxury aesthetic.

Overall visual mood:

romantic but not cheesy

sophisticated

editorial

timeless

modern

premium

warm

cinematic

destination wedding

architectural

San Miguel de Allende

Avoid typical wedding-template clichés.

DO NOT use:

pink gradients

hearts

rings as decorative icons

floral vectors

excessive cursive fonts

generic wedding clipart

excessive rounded cards

huge shadows

glassmorphism

excessive gradients

generic SaaS UI styling

The photography should dominate the visual experience.

4. COLOR SYSTEM

Use a restrained premium palette:

Background:
#F7F5F0 or similar warm ivory

Primary text:
#161616

Secondary text:
#66625D

Dark sections:
#161616

Light text:
#F8F6F1

Accent:
subtle warm beige / sand / muted champagne

Borders:
very subtle warm gray

Do not overuse accent colors.

5. TYPOGRAPHY

Use an elegant editorial serif for major headings and a clean modern sans-serif for UI/body copy.

Suggested visual direction:

Headings:
Cormorant Garamond / DM Serif Display / similar refined editorial serif

Body:
Inter / Manrope / similar clean sans-serif

Do not use more than two font families.

Typography must be extremely responsive.

Hero H1 should feel editorial rather than oversized SaaS typography.

6. GLOBAL LAYOUT

Use generous whitespace.

Desktop max content width approximately:

1200–1400px

Photography sections may intentionally extend wider.

Sections should breathe.

Avoid putting every section inside a card.

Use visual hierarchy through:

typography

photography

spacing

composition

instead of decorative UI.

7. HEADER

Create a premium sticky header.

Desktop:

LEFT:
Brand/logo text:
FOTÓGRAFOS BODAS

CENTER or RIGHT navigation:

Portfolio
Bodas reales
Experiencia
San Miguel
Preguntas
Contacto

Primary CTA:

Consultar fecha

Language control:

ES | EN

Header behavior:

At the top of the page:
transparent or integrated with hero depending on image contrast.

After scrolling:
warm ivory background
subtle border
slight backdrop effect

Do not create an enormous navigation.

8. MOBILE NAVIGATION

The mobile navigation is critical.

Create:

clean hamburger icon

full-height or elegant overlay menu

large readable navigation

clear close button

CTA button

ES / EN selector

WhatsApp shortcut

No horizontal overflow.

No broken menu positioning.

Mobile experience must feel intentionally designed, not merely responsive.

9. HERO SECTION

The hero is the most important visual component.

Use a full-width high-quality wedding photograph.

Preferred image direction:

A sophisticated destination wedding in San Miguel de Allende with architecture, warm light, elegant couple and editorial photography.

Add a subtle dark overlay ONLY if required for text readability.

Do not blur the image.

Hero content:

Eyebrow:

WEDDING PHOTOGRAPHY · SAN MIGUEL DE ALLENDE

H1:

Fotógrafos de bodas en San Miguel de Allende

Supporting copy:

Fotografía editorial y documental para bodas extraordinarias en San Miguel de Allende y destinos en México.

Primary button:

Consultar disponibilidad

Secondary button:

Ver portafolio

Small supporting text:

Available for destination weddings throughout Mexico.

The hero should occupy approximately 85–95vh on desktop.

Make mobile hero composition excellent.

10. INTRODUCTION

Create a clean editorial introduction immediately after the hero.

Small eyebrow:

OUR APPROACH

Main headline:

Imágenes que se sienten tan extraordinarias como el día que vivieron.

Paragraph explaining:

We photograph weddings with a balance of documentary authenticity and editorial direction, focusing on genuine emotion, architecture, atmosphere and the details that make each celebration unique.

Include:

Editorial
Documentary
Timeless

Keep this section elegant and restrained.

11. FEATURED PORTFOLIO

Create a visually impressive asymmetrical editorial gallery.

Approximately 6–8 images.

Mix:

horizontal

vertical

wide

intimate portraits

architecture

ceremony

reception

street photography

San Miguel streets

Avoid standard equal-sized Bootstrap grids.

Use sophisticated editorial composition.

Clicking an image may open a lightweight image viewer/lightbox.

The gallery must remain fast.

Section heading:

Historias de boda

CTA:

Explorar portafolio

12. SAN MIGUEL DE ALLENDE SEO SECTION

Create a beautiful SEO-rich section that feels editorial rather than stuffed with keywords.

Heading:

Wedding Photography in San Miguel de Allende

Copy should naturally explain why San Miguel de Allende is exceptional for destination weddings:

colonial architecture

cobblestone streets

warm evening light

rooftops

historic churches

haciendas

callejoneadas

destination weddings

Include photography.

Do NOT artificially repeat the same keyword.

This section is strategically important for organic search.

13. EXPERIENCE SECTION

Heading:

Más que fotografías. Una experiencia tranquila de principio a fin.

Create 4 steps:

01
Conocernos

02
Planear

03
Vivir el día

04
Revive la historia

Each with concise description.

The layout should look editorial, not like SaaS cards.

14. FEATURED WEDDINGS

Create 3 featured wedding stories.

Each should have:

large image

couple names

venue/location

category

short description

CTA

Example placeholders:

Megan & Alexander
San Miguel de Allende

Sofía & Daniel
Hacienda Wedding

Emily & James
Destination Wedding in Mexico

These are placeholders and MUST be editable in admin.

Do not build individual wedding pages yet unless routing architecture requires placeholders.

Cards can link to "#" or disabled destinations until real wedding stories are added.

Architecture should support individual pages later.

15. VENUES SECTION

Create a section:

Fotografiando los lugares más extraordinarios de San Miguel

Create editable venue items such as:

Rosewood San Miguel de Allende

Instituto Allende

Rancho Las Sabinas

Casa Adela

Hacienda weddings

These must be admin editable.

DO NOT state business affiliations.

DO NOT claim to be an official photographer of any venue.

This section should later be capable of linking to individual SEO venue pages.

16. TESTIMONIALS

Create an elegant testimonial section.

Maximum 3 visible testimonials.

Each:

quote

couple name

wedding location

Avoid carousel dependencies unless necessary.

Desktop may show 2–3.

Mobile may horizontally swipe.

Admin must be able to:

add testimonial

edit

delete

reorder

hide/show

17. ABOUT SECTION

Create an intimate, premium photography-led About section.

Heading:

Detrás de la cámara

Include:

portrait placeholder

short editorial biography

approach to photography

San Miguel connection

destination availability

CTA:

Conoce nuestra historia

All content editable in admin.

18. FAQ

Create an accordion.

Initial questions:

¿Con cuánto tiempo debemos reservar?

¿Viajan para bodas fuera de San Miguel de Allende?

¿Cuántas horas de cobertura ofrecen?

¿Entregan todas las fotografías editadas?

¿Ofrecen segundo fotógrafo?

¿Hacen sesiones de compromiso o Save the Date?

¿Cuándo recibiremos nuestras fotografías?

¿Trabajan con parejas internacionales?

Admin must allow:

add

edit

delete

reorder

enable/disable FAQ

FAQ markup should use semantic accessible HTML.

19. FINAL CTA

Create a visually powerful final section using photography.

Heading:

Cuéntennos dónde comienza su historia.

Text:

Si están planeando su boda en San Miguel de Allende o cualquier otro destino en México, nos encantará conocer sus planes.

Button:

Consultar nuestra disponibilidad

Secondary:

WhatsApp

20. CONTACT / LEAD FORM

Create a high-conversion inquiry form.

Fields:

Nombre *
Apellido

Email *

WhatsApp / teléfono *

Fecha de boda

Venue / lugar

Ciudad / destino

Número aproximado de invitados

Tipo de evento:

Boda

Elopement

Compromiso

Pedida de matrimonio

Otro

¿Cómo nos encontraron?

Google

Instagram

Recomendación

Wedding planner

Venue

Otro

Message:

Cuéntennos un poco sobre su boda

Checkbox:

I accept the privacy policy.

Submit CTA:

Consultar disponibilidad

After successful submission:

Store inquiry in database

Show success state

Redirect or provide link to /gracias

Do NOT lose form data on error

Prevent obvious spam using lightweight techniques.

Do not add complicated CAPTCHA unless required.

21. WHATSAPP

Create a floating WhatsApp button.

Desktop:
small, elegant and unobtrusive

Mobile:
very accessible

Phone number must NOT be hardcoded throughout components.

Create one centralized editable setting for WhatsApp number.

Message template editable from dashboard.

Default message:

Hola, encontré su página de fotografía de bodas y quisiera consultar disponibilidad para nuestra boda.

22. FOOTER

Elegant minimal footer.

Include:

FOTÓGRAFOS BODAS

Wedding Photography
San Miguel de Allende · México

Navigation

Instagram

WhatsApp

Email

Privacy Policy

Copyright with dynamic year

Text:

Available for destination weddings throughout Mexico.

Do not make the footer overly large.

23. BILINGUAL ARCHITECTURE

The website must support:

Spanish
English

Do not use machine translation in the frontend.

Store separate Spanish and English text fields where content is editable.

Use URL structure:

Spanish:
/

English:
/en

The language switcher must preserve the equivalent page when possible.

Use correct:

Include:

es-MX
en
x-default

The default primary market is Spanish/Mexico.

Do not automatically redirect users based on browser language.

24. ADMIN DASHBOARD

Create:

/admin

This must be extremely simple for a non-technical person.

Authentication required.

No public registration.

Only administrators can enter.

Dashboard design should be clean and utilitarian.

It does NOT need the elaborate luxury appearance of the public website.

The objective is ease of use.

Desktop sidebar:

Dashboard
Página principal
Portafolio
Bodas
Venues
Testimonios
FAQ
Contacto
SEO
Ajustes
Solicitudes

Mobile:
collapsible navigation.

25. ADMIN — HOMEPAGE EDITOR

Create easy editing controls for every homepage section.

For each section allow:

heading ES

heading EN

text ES

text EN

image

image alt ES

image alt EN

visibility toggle

Where appropriate:

button label

button URL

eyebrow

ordering

Do NOT create a complicated drag-and-drop website builder.

A simple form-based CMS is preferred.

26. ADMIN — MEDIA

Allow administrator to:

upload image

select existing image

replace image

delete image when safe

enter alt text

preview image

Images should use storage rather than base64 in the database.

Store metadata such as:

filename
alt_es
alt_en

Try to preserve optimized frontend delivery.

27. ADMIN — PORTFOLIO

Portfolio editor should support:

Add photo

Fields:

image

title

location

venue

category

alt ES

alt EN

display order

featured yes/no

active yes/no

Allow simple reordering through numeric order controls or lightweight drag-and-drop.

Do not overengineer.

28. ADMIN — FEATURED WEDDINGS

Allow CRUD:

Create
Read
Update
Delete

Fields:

Couple names

Slug

Date

Venue

Location

Cover image

Gallery

Excerpt ES

Excerpt EN

Story ES

Story EN

SEO title ES

SEO title EN

Meta description ES

Meta description EN

Featured

Published / Draft

Architecture should support wedding detail pages later even if initially only featured cards are displayed.

29. ADMIN — VENUES

Fields:

Venue name

Slug

Location

Cover image

Short description ES

Short description EN

SEO title ES

SEO title EN

Meta description ES

Meta description EN

Featured

Published

Future URL structure should support:

/lugares-para-bodas/[slug]

and

/en/wedding-venues/[slug]

Do not create lots of empty venue pages now.

Prepare the content model only.

30. ADMIN — TESTIMONIALS

Fields:

Couple name

Quote ES

Quote EN

Venue

Date/year

Display order

Visible

Easy CRUD interface.

31. ADMIN — FAQ

Fields:

Question ES

Answer ES

Question EN

Answer EN

Order

Visible

Easy CRUD interface.

32. ADMIN — GLOBAL SETTINGS

Create one settings page.

Editable:

Brand name

Logo

Favicon

Email

Phone

WhatsApp number

WhatsApp default message

Instagram URL

Facebook URL if used

Business location

Primary CTA text ES

Primary CTA text EN

Google Analytics ID placeholder

Google Search Console verification placeholder

Default social sharing image

Footer text

33. ADMIN — SEO

Create an understandable SEO editor.

For homepage:

SEO title ES

Meta description ES

SEO title EN

Meta description EN

Canonical

OG title

OG description

OG image

Allow future pages to use the same SEO content structure.

Show recommended character ranges visually but do not block saving.

Do NOT create fake SEO scoring algorithms.

34. LEADS DASHBOARD

Under:

/admin/solicitudes

Display submitted inquiries.

Table/list fields:

Date

Name

Wedding date

Venue

Email

WhatsApp

Status

Statuses:

Nuevo
Contactado
Seguimiento
Reservado
No disponible
Cerrado

Click inquiry to view full details.

Allow:

status update
internal notes
mark as read
delete

Do not build a full CRM.

This is only a lightweight lead inbox.

35. SEO — CRITICAL

This site is being built primarily to capture organic search traffic.

Implement technical SEO correctly from the beginning.

Homepage Spanish target:

Primary:
fotógrafos de bodas en San Miguel de Allende

Secondary:
fotógrafo de bodas San Miguel de Allende
fotografía de bodas San Miguel de Allende
fotógrafo para boda San Miguel
fotografía boda destino México

English:

Primary:
San Miguel de Allende wedding photographer

Secondary:
wedding photographer San Miguel de Allende
destination wedding photographer San Miguel de Allende
Mexico wedding photographer

Use keywords NATURALLY.

Do not keyword stuff.

36. DEFAULT SEO METADATA

Spanish homepage title:

Fotógrafos de Bodas en San Miguel de Allende | Fotógrafos Bodas

Spanish meta description:

Fotografía de bodas editorial y documental en San Miguel de Allende. Capturamos bodas destino, elopements y celebraciones extraordinarias en México.

English homepage title:

San Miguel de Allende Wedding Photographer | Fotógrafos Bodas

English meta description:

Editorial and documentary wedding photography in San Miguel de Allende, Mexico. Destination weddings, elopements and celebrations throughout Mexico.

All metadata must remain editable.

37. TECHNICAL SEO

Implement:

semantic HTML5

exactly one logical H1 per page

proper heading hierarchy

unique titles

unique descriptions

canonical tags

hreflang

OpenGraph metadata

Twitter/social metadata

robots.txt

sitemap.xml architecture

descriptive image alt attributes

crawlable internal navigation

clean URLs

no hash-based routing

accessible anchor elements

404 handling

Ensure public pages are indexable.

Ensure /admin is NOT indexable.

Add:

noindex, nofollow

to admin routes.

38. STRUCTURED DATA

Implement valid JSON-LD where appropriate.

Homepage:

ProfessionalService or LocalBusiness
Organization
WebSite

Include only fields for which actual data exists.

Do NOT invent:

ratings

reviews aggregate

prices

address

awards

Add BreadcrumbList when future inner pages exist.

FAQ structured data may be implemented semantically where appropriate.

39. IMAGE SEO

Photography is a major SEO asset.

Create image naming and metadata architecture.

Admin uploads should encourage descriptive filenames.

Examples:

san-miguel-de-allende-wedding-photographer.webp

boda-instituto-allende-san-miguel.webp

destination-wedding-san-miguel-de-allende.webp

All content images must support:

alt ES
alt EN

Do not repeat keywords unnaturally.

40. PERFORMANCE

The site must be extremely fast despite photography.

Prioritize:

optimized images

responsive image sizes

lazy loading below fold

preload only critical hero resource

avoid enormous original images being rendered unnecessarily

minimal JavaScript

minimal dependencies

code splitting where appropriate

no autoplay video

no enormous slider libraries

Do not lazy-load the primary LCP hero image.

Avoid layout shift.

Aim for excellent Core Web Vitals.

41. MOBILE FIRST

The site must be excellent at:

375px
390px
430px
768px
1024px
1440px+

Check:

no horizontal overflow

menu works

images crop intentionally

forms are easy

tap targets are large enough

typography does not overflow

buttons fit correctly

galleries remain elegant

admin dashboard remains usable

42. ACCESSIBILITY

Implement:

keyboard accessible navigation

visible focus states

form labels

semantic controls

sufficient contrast

meaningful alt text support

accessible accordions

accessible mobile menu

Do not sacrifice the visual design.

43. DATABASE CONTENT MODEL

Keep database architecture simple.

Suggested entities:

profiles/admin_users

site_settings

page_content

portfolio_items

weddings

wedding_images

venues

testimonials

faqs

inquiries

Do not create unnecessary tables.

Use timestamps.

Use secure access policies.

Public website:

READ access only to published public content.

Admin:

authenticated authorized users may create/update/delete content.

Inquiries:

public users may INSERT an inquiry.

Public users must NOT be able to READ inquiries.

Only administrator may read/update/delete inquiries.

Apply proper authorization/security policies.

44. INITIAL PLACEHOLDERS

We do not yet have final photography assets.

Use tasteful wedding photography placeholders where needed.

IMPORTANT:

Build the layouts so replacing every placeholder from the admin dashboard is easy.

Do not make the layout dependent on a specific placeholder photograph.

Clearly identify placeholder content in admin.

45. EMPTY STATES

Admin pages must have polished empty states.

For example:

"No hay testimonios todavía."

Button:

"Agregar testimonio"

Do not populate the database with dozens of useless fake records.

A few visible placeholders are enough to demonstrate the layout.

46. ERROR STATES

Forms and dashboard must gracefully handle:

loading

success

failure

empty content

missing image

unauthorized admin access

Do not expose stack traces or technical errors to public users.

47. CONTENT EDITING PHILOSOPHY

The owner should be able to maintain 95% of the public site without touching code.

They must be able to update:

text

photos

portfolio

featured weddings

venues

testimonials

FAQ

contact information

WhatsApp

SEO metadata

social links

section visibility

This does NOT mean building a visual page builder.

Forms are preferred because they are more reliable and easier to maintain.

48. COMPONENT ARCHITECTURE

Create reusable components such as:

Header

MobileMenu

Hero

SectionHeading

EditorialGallery

WeddingCard

VenueCard

Testimonials

FAQ

InquiryForm

FinalCTA

Footer

SEOHead

AdminLayout

ImageUploader

ContentEditor

Do not duplicate equivalent components between languages.

Use data/content to change language.

49. FUTURE EXTENSIBILITY

Prepare architecture for future routes but do NOT build all of them now.

Future Spanish routes may include:

/fotografos-bodas-san-miguel-de-allende

/bodas-reales/[slug]

/lugares-para-bodas/[slug]

/sesiones-compromiso-san-miguel-de-allende

/pedidas-matrimonio-san-miguel-de-allende

/elopements-san-miguel-de-allende

Future English equivalents:

/en/san-miguel-de-allende-wedding-photographer

/en/real-weddings/[slug]

/en/wedding-venues/[slug]

/en/engagement-photographer-san-miguel-de-allende

/en/proposal-photographer-san-miguel-de-allende

/en/elopement-photographer-san-miguel-de-allende

DO NOT generate these pages yet unless technically necessary.

The goal is only to avoid future architecture problems.

50. VERY IMPORTANT — DO NOT WASTE BUILD TIME

Do not spend implementation effort on speculative functionality.

Prioritize in this exact order:

Excellent public homepage

Mobile responsiveness

Working admin authentication

Editable homepage content

Image management

Working inquiry form

Lead management

SEO foundation

English version

Performance and final polish

If any optional feature threatens stability, simplify the optional feature rather than making the core product unstable.

51. VISUAL QUALITY CHECK

Before considering the implementation finished, review the public homepage specifically for:

generic AI-generated SaaS appearance

excessive cards

excessive border radius

excessive gradients

poor image crops

repetitive section layouts

inconsistent spacing

mobile overflow

bad typography wrapping

weak hero composition

intrusive WhatsApp button

Fix these issues during the same implementation if found.

The final website must look like a real premium wedding photography studio, not an AI-generated template.

52. FUNCTIONAL QUALITY CHECK

Verify:

navigation links work

mobile menu works

language selector works

forms validate

inquiry submission works

admin requires authentication

dashboard content persists

uploaded images persist

content editing persists

WhatsApp link works

external links are correct

logout works

no admin data is publicly exposed

404 works

no console-breaking errors exist

53. FINAL GOAL

The final result should be a polished MVP that can realistically be published at:

https://fotografosbodas.com.mx

It must accomplish three things exceptionally well:

Make couples immediately perceive a premium wedding photography brand.

Convert visitors into wedding photography inquiries.

Provide a technically strong SEO foundation for dominating wedding-photography searches in San Miguel de Allende over time.

Do not add features beyond this specification.

Do not replace this scope with a generic template.

Build a coherent production-ready implementation with simple architecture and a very easy-to-use admin dashboard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/58aea3e3-a86c-4c5c-9b3d-1477f8a6e929).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
