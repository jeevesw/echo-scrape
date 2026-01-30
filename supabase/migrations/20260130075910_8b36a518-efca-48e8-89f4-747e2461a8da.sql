-- Create blog_categories table
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create join table for many-to-many relationship
CREATE TABLE public.blog_post_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.blog_categories(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (post_id, category_id)
);

-- Create indexes for performance
CREATE INDEX idx_blog_post_categories_post_id ON public.blog_post_categories(post_id);
CREATE INDEX idx_blog_post_categories_category_id ON public.blog_post_categories(category_id);
CREATE INDEX idx_blog_categories_sort_order ON public.blog_categories(sort_order);

-- Enable RLS on both tables
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_categories
CREATE POLICY "Anyone can view categories"
ON public.blog_categories FOR SELECT
USING (true);

CREATE POLICY "Admins can insert categories"
ON public.blog_categories FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
ON public.blog_categories FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
ON public.blog_categories FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for blog_post_categories
CREATE POLICY "Anyone can view post categories for published posts"
ON public.blog_post_categories FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.blog_posts bp 
    WHERE bp.id = post_id AND bp.is_published = true
  )
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can insert post categories"
ON public.blog_post_categories FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update post categories"
ON public.blog_post_categories FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete post categories"
ON public.blog_post_categories FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Insert the categories with proper sort order
INSERT INTO public.blog_categories (slug, name, sort_order) VALUES
('tiktok', 'TikTok', 1),
('seo-ai-search', 'SEO & AI Search', 2),
('paid-media', 'Paid Media', 3),
('social-media', 'Social Media', 4),
('lhf-ad-policy', 'LHF / Ad Policy', 5),
('hospitality-marketing', 'Hospitality Marketing', 6),
('guides', 'Guides', 7),
('trends-predictions', 'Trends & Predictions', 8),
('emerging-tech', 'Emerging Tech', 9),
('needs-review', 'Needs review', 999);