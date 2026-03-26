
UPDATE blog_posts
SET blocks = blocks || jsonb_build_array(
  jsonb_build_object(
    'id', gen_random_uuid()::text,
    'type', 'newsletter',
    'heading', '',
    'subheading', ''
  )
)
WHERE blocks IS NOT NULL
  AND jsonb_typeof(blocks) = 'array'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(blocks) elem
    WHERE elem->>'type' = 'newsletter'
  );
