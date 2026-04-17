CREATE TABLE public.seo_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view seo overrides"
ON public.seo_overrides FOR SELECT
USING (true);

CREATE POLICY "Admins can insert seo overrides"
ON public.seo_overrides FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update seo overrides"
ON public.seo_overrides FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete seo overrides"
ON public.seo_overrides FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_seo_overrides_updated_at
BEFORE UPDATE ON public.seo_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_seo_overrides_route ON public.seo_overrides(route);