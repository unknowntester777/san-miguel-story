
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE TABLE public.site_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  brand_name text NOT NULL DEFAULT 'FOTÓGRAFOS BODAS',
  logo_url text,
  email text NOT NULL DEFAULT 'hola@fotografosbodas.com.mx',
  phone text NOT NULL DEFAULT '+52 415 000 0000',
  whatsapp_number text NOT NULL DEFAULT '524150000000',
  whatsapp_message_es text NOT NULL DEFAULT 'Hola, encontré su página de fotografía de bodas y quisiera consultar disponibilidad para nuestra boda.',
  whatsapp_message_en text NOT NULL DEFAULT 'Hello, I found your wedding photography website and would like to check your availability for our wedding.',
  instagram_url text DEFAULT 'https://instagram.com/',
  facebook_url text,
  business_location text NOT NULL DEFAULT 'San Miguel de Allende, Guanajuato, México',
  cta_text_es text NOT NULL DEFAULT 'Consultar disponibilidad',
  cta_text_en text NOT NULL DEFAULT 'Check availability',
  footer_text_es text NOT NULL DEFAULT 'Disponibles para bodas destino en todo México.',
  footer_text_en text NOT NULL DEFAULT 'Available for destination weddings throughout Mexico.',
  ga_id text,
  gsc_verification text,
  seo_title_es text NOT NULL DEFAULT 'Fotógrafos de Bodas en San Miguel de Allende | Fotógrafos Bodas',
  seo_description_es text NOT NULL DEFAULT 'Fotografía de bodas editorial y documental en San Miguel de Allende. Capturamos bodas destino, elopements y celebraciones extraordinarias en México.',
  seo_title_en text NOT NULL DEFAULT 'San Miguel de Allende Wedding Photographer | Fotógrafos Bodas',
  seo_description_en text NOT NULL DEFAULT 'Editorial and documentary wedding photography in San Miguel de Allende, Mexico. Destination weddings, elopements and celebrations throughout Mexico.',
  canonical_url text DEFAULT '/',
  og_title text,
  og_description text,
  og_image_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_site_settings_upd BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.site_settings (id) VALUES (true);

CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  eyebrow_es text, eyebrow_en text,
  heading_es text, heading_en text,
  body_es text, body_en text,
  button_label_es text, button_label_en text, button_url text,
  image_url text, image_alt_es text, image_alt_en text,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "content public read" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "content admin write" ON public.page_content FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_page_content_upd BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text, location text, venue text, category text,
  alt_es text, alt_en text,
  sort_order integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT true,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "portfolio public read" ON public.portfolio_items FOR SELECT USING (active);
CREATE POLICY "portfolio admin write" ON public.portfolio_items FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_portfolio_upd BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.weddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_names text NOT NULL,
  slug text NOT NULL UNIQUE,
  wedding_date date,
  venue text, location text, category text,
  cover_image_url text,
  excerpt_es text, excerpt_en text,
  story_es text, story_en text,
  seo_title_es text, seo_title_en text,
  meta_description_es text, meta_description_en text,
  featured boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.weddings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weddings TO authenticated;
GRANT ALL ON public.weddings TO service_role;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "weddings public read" ON public.weddings FOR SELECT USING (published);
CREATE POLICY "weddings admin write" ON public.weddings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_weddings_upd BEFORE UPDATE ON public.weddings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.wedding_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_es text, alt_en text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.wedding_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.wedding_images TO authenticated;
GRANT ALL ON public.wedding_images TO service_role;
ALTER TABLE public.wedding_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wedding images public read" ON public.wedding_images FOR SELECT USING (EXISTS (SELECT 1 FROM public.weddings w WHERE w.id = wedding_id AND w.published));
CREATE POLICY "wedding images admin write" ON public.wedding_images FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE public.venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  location text,
  cover_image_url text,
  description_es text, description_en text,
  seo_title_es text, seo_title_en text,
  meta_description_es text, meta_description_en text,
  featured boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.venues TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.venues TO authenticated;
GRANT ALL ON public.venues TO service_role;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "venues public read" ON public.venues FOR SELECT USING (published);
CREATE POLICY "venues admin write" ON public.venues FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_venues_upd BEFORE UPDATE ON public.venues FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_name text NOT NULL,
  quote_es text, quote_en text,
  venue text, year text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials public read" ON public.testimonials FOR SELECT USING (visible);
CREATE POLICY "testimonials admin write" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_testimonials_upd BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_es text, answer_es text,
  question_en text, answer_en text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faqs public read" ON public.faqs FOR SELECT USING (visible);
CREATE POLICY "faqs admin write" ON public.faqs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER t_faqs_upd BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text NOT NULL,
  wedding_date date,
  venue text,
  city text,
  guests text,
  event_type text,
  source text,
  message text,
  locale text NOT NULL DEFAULT 'es',
  status text NOT NULL DEFAULT 'nuevo',
  notes text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admin update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER t_inquiries_upd BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "media read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media admin insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());

INSERT INTO public.page_content (section_key, label, eyebrow_es, eyebrow_en, heading_es, heading_en, body_es, body_en, button_label_es, button_label_en, button_url, sort_order) VALUES
('hero','Hero','WEDDING PHOTOGRAPHY · SAN MIGUEL DE ALLENDE','WEDDING PHOTOGRAPHY · SAN MIGUEL DE ALLENDE','Fotógrafos de bodas en San Miguel de Allende','San Miguel de Allende wedding photographer','Fotografía editorial y documental para bodas extraordinarias en San Miguel de Allende y destinos en México.','Editorial and documentary photography for extraordinary weddings in San Miguel de Allende and destinations across Mexico.','Consultar disponibilidad','Check availability','#contacto',10),
('intro','Introducción','OUR APPROACH','OUR APPROACH','Imágenes que se sienten tan extraordinarias como el día que vivieron.','Images that feel as extraordinary as the day you lived.','Fotografiamos bodas con un equilibrio entre autenticidad documental y dirección editorial, enfocándonos en la emoción genuina, la arquitectura, la atmósfera y los detalles que hacen única cada celebración.','We photograph weddings with a balance of documentary authenticity and editorial direction, focusing on genuine emotion, architecture, atmosphere and the details that make each celebration unique.',NULL,NULL,NULL,20),
('portfolio','Portafolio','PORTFOLIO','PORTFOLIO','Historias de boda','Wedding stories','Una selección de momentos de bodas en San Miguel de Allende y otros destinos de México.','A selection of moments from weddings in San Miguel de Allende and other destinations in Mexico.','Explorar portafolio','Explore portfolio','#portafolio',30),
('sanmiguel','San Miguel SEO','SAN MIGUEL DE ALLENDE','SAN MIGUEL DE ALLENDE','Fotografía de bodas en San Miguel de Allende','Wedding Photography in San Miguel de Allende','Pocas ciudades ofrecen tanto a una boda destino: calles empedradas, fachadas coloniales, iglesias históricas, azoteas con vista a la Parroquia y una luz cálida al atardecer que transforma cualquier retrato. Fotografiamos ceremonias en templos centenarios, recepciones en haciendas de los alrededores y callejoneadas que recorren el centro histórico. Conocemos los tiempos, los horarios de luz y los rincones que hacen que cada serie de imágenes se sienta profundamente ligada a este lugar.','Few cities offer a destination wedding so much: cobblestone streets, colonial facades, historic churches, rooftops overlooking the Parroquia and a warm evening light that transforms any portrait. We photograph ceremonies in centuries-old churches, receptions at haciendas nearby and callejoneadas winding through the historic center. We know the timing, the light and the corners that make each set of images feel deeply tied to this place.',NULL,NULL,NULL,40),
('experience','Experiencia','THE EXPERIENCE','THE EXPERIENCE','Más que fotografías. Una experiencia tranquila de principio a fin.','More than photographs. A calm experience from beginning to end.',NULL,NULL,NULL,NULL,NULL,50),
('weddings','Bodas reales','REAL WEDDINGS','REAL WEDDINGS','Bodas reales','Real weddings','Historias completas, fotografiadas de principio a fin.','Full stories, photographed from beginning to end.',NULL,NULL,NULL,60),
('venues','Venues','VENUES','VENUES','Fotografiando los lugares más extraordinarios de San Miguel','Photographing the most extraordinary places in San Miguel','Haciendas, jardines, azoteas y espacios históricos donde hemos fotografiado celebraciones.','Haciendas, gardens, rooftops and historic spaces where we have photographed celebrations.',NULL,NULL,NULL,70),
('testimonials','Testimonios','TESTIMONIALS','TESTIMONIALS','Lo que dicen nuestras parejas','What our couples say',NULL,NULL,NULL,NULL,NULL,80),
('about','Sobre nosotros','ABOUT','ABOUT','Detrás de la cámara','Behind the camera','Somos un pequeño estudio de fotografía con base en San Miguel de Allende. Trabajamos con luz natural, atención a la arquitectura y una manera discreta de acompañar el día. Nos formamos entre las calles de esta ciudad y viajamos a donde comience su historia.','We are a small photography studio based in San Miguel de Allende. We work with natural light, attention to architecture and a discreet way of accompanying the day. We grew up among the streets of this city and travel wherever your story begins.','Conoce nuestra historia','Read our story','#contacto',90),
('faq','Preguntas','FAQ','FAQ','Preguntas frecuentes','Frequently asked questions',NULL,NULL,NULL,NULL,NULL,100),
('finalcta','CTA final',NULL,NULL,'Cuéntennos dónde comienza su historia.','Tell us where your story begins.','Si están planeando su boda en San Miguel de Allende o cualquier otro destino en México, nos encantará conocer sus planes.','If you are planning your wedding in San Miguel de Allende or any other destination in Mexico, we would love to hear your plans.','Consultar nuestra disponibilidad','Check our availability','#contacto',110),
('contact','Contacto','CONTACT','CONTACT','Consultar disponibilidad','Check availability','Cuéntennos sobre su boda y les responderemos en menos de 48 horas.','Tell us about your wedding and we will reply within 48 hours.',NULL,NULL,NULL,120);

INSERT INTO public.testimonials (couple_name, quote_es, quote_en, venue, year, sort_order) VALUES
('Megan & Alexander','Las fotografías capturan exactamente cómo se sintió el día: la luz, la ciudad, nuestra gente. No podríamos estar más felices.','The photographs capture exactly how the day felt: the light, the city, our people. We could not be happier.','San Miguel de Allende','2025',10),
('Sofía & Daniel','Trabajar con ellos fue tranquilo de principio a fin. Nunca sentimos una cámara encima y aun así tenemos todo.','Working with them was calm from start to finish. We never felt a camera on us and yet we have everything.','Hacienda, Guanajuato','2025',20),
('Emily & James','They understood San Miguel better than anyone. Every frame feels like a memory, not a pose.','They understood San Miguel better than anyone. Every frame feels like a memory, not a pose.','Destination wedding, México','2024',30);

INSERT INTO public.faqs (question_es, answer_es, question_en, answer_en, sort_order) VALUES
('¿Con cuánto tiempo debemos reservar?','La mayoría de nuestras parejas reservan entre 8 y 14 meses antes. En temporada alta (octubre a diciembre) recomendamos hacerlo lo antes posible.','How far in advance should we book?','Most of our couples book 8 to 14 months ahead. During high season (October to December) we recommend booking as early as possible.',10),
('¿Viajan para bodas fuera de San Miguel de Allende?','Sí. Fotografiamos bodas destino en todo México y podemos cotizar viajes internacionales.','Do you travel for weddings outside San Miguel de Allende?','Yes. We photograph destination weddings throughout Mexico and can quote international travel.',20),
('¿Cuántas horas de cobertura ofrecen?','Ofrecemos coberturas desde 8 horas hasta fines de semana completos con eventos previos y posteriores.','How many hours of coverage do you offer?','We offer coverage from 8 hours up to full weekends including pre- and post-wedding events.',30),
('¿Entregan todas las fotografías editadas?','Entregamos una selección editada completa del día, con corrección de color consistente en cada imagen.','Do you deliver every photograph edited?','We deliver a complete edited selection of the day, with consistent color grading on every image.',40),
('¿Ofrecen segundo fotógrafo?','Sí, se puede añadir un segundo fotógrafo y lo recomendamos para bodas de más de 100 invitados.','Do you offer a second photographer?','Yes, a second photographer can be added and we recommend it for weddings over 100 guests.',50),
('¿Hacen sesiones de compromiso o Save the Date?','Sí, realizamos sesiones de compromiso en San Miguel de Allende y otros destinos.','Do you photograph engagement or Save the Date sessions?','Yes, we photograph engagement sessions in San Miguel de Allende and other destinations.',60),
('¿Cuándo recibiremos nuestras fotografías?','Una vista previa en 7 días y la galería completa entre 6 y 8 semanas después de la boda.','When will we receive our photographs?','A preview within 7 days and the full gallery 6 to 8 weeks after the wedding.',70),
('¿Trabajan con parejas internacionales?','Sí. Trabajamos en español e inglés y acompañamos a parejas de todo el mundo que celebran en México.','Do you work with international couples?','Yes. We work in Spanish and English and accompany couples from all over the world celebrating in Mexico.',80);

INSERT INTO public.venues (name, slug, location, description_es, description_en, sort_order) VALUES
('Rosewood San Miguel de Allende','rosewood-san-miguel-de-allende','San Miguel de Allende','Terrazas con vista a la Parroquia y jardines para recepciones al atardecer.','Terraces overlooking the Parroquia and gardens for sunset receptions.',10),
('Instituto Allende','instituto-allende','San Miguel de Allende','Patios coloniales, cantera y arcadas con una luz excepcional.','Colonial courtyards, quarry stone and arcades with exceptional light.',20),
('Rancho Las Sabinas','rancho-las-sabinas','San Miguel de Allende','Campo abierto, sabinos centenarios y atardeceres amplios.','Open countryside, centuries-old trees and wide sunsets.',30),
('Casa Adela','casa-adela','San Miguel de Allende','Una casa histórica para celebraciones íntimas en el centro.','A historic house for intimate celebrations in the center.',40),
('Haciendas de Guanajuato','haciendas-de-guanajuato','Guanajuato','Muros de piedra, capillas y patios para bodas de fin de semana.','Stone walls, chapels and courtyards for weekend weddings.',50);
