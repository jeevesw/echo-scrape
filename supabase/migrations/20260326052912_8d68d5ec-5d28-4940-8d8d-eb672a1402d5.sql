
-- Clear existing assignments and categories
DELETE FROM blog_post_categories;
DELETE FROM blog_categories;

-- Insert 7 new categories
INSERT INTO blog_categories (slug, name, sort_order) VALUES
  ('less-healthy-food-ad-ban', 'Less Healthy Food Ad Ban', 1),
  ('tiktok', 'TikTok', 2),
  ('paid-social-and-search', 'Paid Social & Search', 3),
  ('seo-ai-and-search', 'SEO, AI & Search', 4),
  ('social-media-and-content', 'Social Media & Content', 5),
  ('hospitality-marketing', 'Hospitality Marketing', 6),
  ('agency-and-industry', 'Agency & Industry', 7);

-- Assign posts to categories using slug matching
INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'less-healthy-food-ad-ban' AND bp.slug IN (
  'lhf-ad-ban-explained','lhf-hfss-ad-ban-update','lhf-brand-ads-update','what-counts-as-less-healthy-food',
  'less-healthy-food-advertising-rules-2026','alcohol-may-be-included-in-less-healthy-food-ad-restrictions',
  'less-healthy-food-laws-influencer-marketing','where-you-can-and-cant-advertise'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'tiktok' AND bp.slug IN (
  '15-reasons-your-brand-should-be-on-tiktok','tiktok-for-business','how-to-plan-a-tiktok-shoot',
  'anatomy-of-successful-online-video-content','creating-tiktok-ads-a-guide','tiktok-ads-size-guide',
  'setting-up-tiktok-ads-manager','going-viral-on-tiktok-pros-and-cons','tiktok-trends-a-cross-platform-guide',
  'the-future-of-tiktok','google-vs-tiktok-the-changing-face-of-seo'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'paid-social-and-search' AND bp.slug IN (
  'google-ads-for-hospitality','2025-google-ads-updates','your-paid-search-questions-answered',
  'benefits-of-lead-gen-on-meta-ads','meta-facebook-ad-rejection-fixes','meta-simplified-ad-manager-objectives',
  'facebook-ad-targeting','ios-14-apple-vs-facebook-ad-trackers','high-flying-sales-funnel','what-is-demand-gen-by-google'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'seo-ai-and-search' AND bp.slug IN (
  'seo-aio-aeo-geo-local-businesses','google-vs-tiktok-the-changing-face-of-seo','20-seo-questions-for-developers',
  'google-consent-mode-questions-answered','google-consent-mode-v2','google-third-party-cookies-continuing',
  'google-analytics-in-the-eu','apple-email-privacy-udpates'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'social-media-and-content' AND bp.slug IN (
  'content-atomization-for-social-media','why-content-marketing-often-fails','dealing-with-trolls',
  'canva-for-restaurants','6-ways-to-grow-on-instagram-in-2024','increasing-instagram-engagement-2021',
  'instagram-chronological-feed','instagram-stories-local-audiences','bluesky-what-marketers-should-know',
  'twitter-x-2023-what-marketers-need-to-know','social-media-predictions-2022','2024-predictions',
  '2025-predictions','best-marketing-campaigns-july-2025'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'hospitality-marketing' AND bp.slug IN (
  'restaurant-checklist','google-ads-for-hospitality','hospitality-social-media-reignited',
  'how-to-run-a-successful-competition-online','how-to-make-more-sales-during-your-slow-periods',
  'deliveries-home-kits-restaurants-reopening','doing-your-own-deliveries','decentralising-food-delivery-monopolies',
  'food-delivery-nobodys-winning','eat-out-to-help-out-brighton-hove'
);

INSERT INTO blog_post_categories (post_id, category_id)
SELECT bp.id, bc.id FROM blog_posts bp, blog_categories bc
WHERE bc.slug = 'agency-and-industry' AND bp.slug IN (
  'six-years-of-gambles-trapeze-media','trapeze-media-is-six','better-hospitality-conference-2024',
  'kitty-newman-lead-generation-world-florida','gen-z-perspective-on-marketing',
  'billie-eilish-twenty-one-pilots-marketing-lessons','marketing-matters-artificial-intelligence',
  'digital-marketing-agency-vs-in-house-employee','navigating-challenging-conversations'
);
