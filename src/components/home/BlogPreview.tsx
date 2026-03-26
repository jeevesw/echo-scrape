import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface BlogCategory {
  id: string;
  slug: string;
  name: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published_at: string;
  categories: BlogCategory[];
}

const stripHtmlAndMarkdown = (text: string): string => {
  if (!text) return '';
  const doc = new DOMParser().parseFromString(text, 'text/html');
  const decoded = doc.documentElement.textContent || text;
  return decoded
    .replace(/<[^>]*>/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`[^`]+`/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const getExcerpt = (post: BlogPost): string => {
  if (post.excerpt && post.excerpt.trim()) {
    return stripHtmlAndMarkdown(post.excerpt);
  }
  const stripped = stripHtmlAndMarkdown(post.content);
  const truncated = stripped.substring(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 160 ? truncated.substring(0, lastSpace) : truncated) + '…';
};

const getReadTime = (content: string): string => {
  const wordCount = stripHtmlAndMarkdown(content).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
};

export function BlogPreview() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts-preview'],
    queryFn: async () => {
      const { data: postsData, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, content, featured_image, author, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const postIds = postsData.map(p => p.id);

      // Fetch post-category mappings
      const { data: postCats, error: catError } = await supabase
        .from('blog_post_categories')
        .select('post_id, category_id')
        .in('post_id', postIds);

      if (catError) throw catError;

      // Fetch all categories
      const categoryIds = [...new Set(postCats?.map(pc => pc.category_id) || [])];
      let categoriesMap: Record<string, BlogCategory> = {};

      if (categoryIds.length > 0) {
        const { data: cats } = await supabase
          .from('blog_categories')
          .select('id, slug, name')
          .in('id', categoryIds)
          .neq('slug', 'needs-review');

        if (cats) {
          categoriesMap = Object.fromEntries(cats.map(c => [c.id, c]));
        }
      }

      return postsData.map(post => ({
        ...post,
        categories: (postCats || [])
          .filter(pc => pc.post_id === post.id)
          .map(pc => categoriesMap[pc.category_id])
          .filter(Boolean),
      })) as BlogPost[];
    },
  });

  return (
    <section className="py-20 bg-muted">
      <div className="container-content mx-auto px-4">
        <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-3">
          New on the Trapeze Media Blog
        </h2>
        <p className="text-center text-muted-foreground text-base max-w-md mx-auto mb-12">
          Practical marketing insights, SEO, and paid media — without the fluff.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="border border-border/50 bg-background rounded-2xl overflow-hidden">
                <Skeleton className="w-full aspect-[3/2]" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            posts?.map((post) => (
              <Card
                key={post.id}
                className="group border border-border/50 bg-background rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                {/* Thumbnail */}
                {post.featured_image ? (
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                ) : (
                  <div className="w-full aspect-[3/2] bg-muted/50 flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground/30">📝</span>
                  </div>
                )}

                <CardContent className="p-6 flex flex-col flex-1">
                  {/* Category pills */}
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.categories.slice(0, 2).map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/blog?category=${cat.slug}`}
                          className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2.5 py-0.5 hover:bg-primary/20 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span>·</span>
                    <span>{getReadTime(post.content)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {getExcerpt(post)}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline underline-offset-4 mt-auto"
                  >
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero-outline" asChild>
            <Link to="/blog">
              See All Blog Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
