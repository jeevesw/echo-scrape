UPDATE public.blog_posts
SET featured_image = 'https://rsidutxwzfnisriafnqf.supabase.co/storage/v1/object/public/images/blog/5-ai-search-essentials-v2.webp',
    blocks = REPLACE(blocks::text, '1781588576487-rdzqy84avvc.webp', '5-ai-search-essentials-v2.webp')::jsonb
WHERE id = '73775b52-7dda-4d16-aab8-0a442a9ee505';