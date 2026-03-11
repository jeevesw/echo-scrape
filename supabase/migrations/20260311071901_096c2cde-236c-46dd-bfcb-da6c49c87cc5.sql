-- Create authors table
CREATE TABLE public.authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  role text,
  bio text,
  avatar_url text,
  linkedin_url text,
  twitter_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Anyone can read authors
CREATE POLICY "Anyone can view authors"
  ON public.authors FOR SELECT
  TO public
  USING (true);

-- Admins can manage authors
CREATE POLICY "Admins can insert authors"
  ON public.authors FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update authors"
  ON public.authors FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete authors"
  ON public.authors FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Add author_id FK to blog_posts
ALTER TABLE public.blog_posts
  ADD COLUMN author_id uuid REFERENCES public.authors(id);

-- Seed authors
INSERT INTO public.authors (name, slug, role, bio) VALUES
(
  'Kitty Newman',
  'kitty-newman',
  'Founder & Director',
  'Kitty is the founder and director of Trapeze Media. An award-winning digital and social media expert, she''s worked with some of the UK''s largest hospitality and hotel brands, assembling strong teams and leading successful campaigns at a local, national, and international scale. Kitty regularly delivers energetic talks on the digital marketing industry, as well as the people behind it, always championing a healthier, happier approach to agency management. The ''Trapeze'' in ''Trapeze Media'' stems from Kitty''s love for circus performance. If you want to increase your ROI and/or learn how to do a handstand, you''ve come to the right place.'
),
(
  'Jeeves Williams',
  'jeeves-williams',
  'Writer, Designer & Content Strategist',
  'Jeeves is a writer, designer, and social media manager who works with Trapeze Media remotely from México. He works on all things artsy — copywriting, visual branding, web design, and creative direction — as well as SEO and content strategy. Jeeves has a particular interest in how digital media influences live events, entertainment, cities, and information, and he''s our resident ''Twitter Guy'' (he''s never calling it ''X''). When he''s offline (rarely), Jeeves is into cinema, books, typography, internet culture, and cycling around the steel-foundry-turned-park in the Mexican metropolis he''s settled into.'
),
(
  'Lily Knott',
  'lily-knott',
  'Social Media Manager & Content Creator',
  'Lily is a social media manager and content creator who, having gone viral on TikTok for her own work as a singer-songwriter, understands the platform''s aesthetics, trends, and algorithms. At Trapeze Media, Lily works with clients on channelling their brand identity into social-ready videos. She plans shoots, edits footage, stays in the know about memes and trending sounds, and keeps audiences engaged.'
);