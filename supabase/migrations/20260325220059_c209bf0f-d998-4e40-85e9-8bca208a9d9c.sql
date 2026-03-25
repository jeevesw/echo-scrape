
CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  client_name text NOT NULL DEFAULT '',
  client_logo_url text,
  hero_image_url text,
  card_image_url text,
  testimonial_quote text,
  testimonial_credit text,
  seo_title text,
  seo_description text,
  page_route text NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published case studies"
  ON public.case_studies FOR SELECT TO public
  USING (is_published = true);

CREATE POLICY "Admins can insert case studies"
  ON public.case_studies FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update case studies"
  ON public.case_studies FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete case studies"
  ON public.case_studies FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all case studies"
  ON public.case_studies FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
