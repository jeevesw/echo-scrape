import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

const stripHtmlAndMarkdown = (text: string): string => {
  if (!text) return '';
  
  const decodeEntities = (str: string): string => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || str;
  };
  
  return decodeEntities(text)
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
  
  const strippedContent = stripHtmlAndMarkdown(post.content);
  if (strippedContent.length <= 200) {
    return strippedContent;
  }
  
  const truncated = strippedContent.substring(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 160 ? truncated.substring(0, lastSpace) : truncated) + '…';
};

export function BlogPreview() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, content')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  return (
    <section className="py-20 bg-muted">
      <div className="container-content mx-auto px-4">
        <h2 className="heading-display text-4xl md:text-5xl text-center text-foreground mb-12">
          New on the Trapeze Media Blog
        </h2>

        <div className="grid gap-8 md:grid-cols-3 stagger-children">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 bg-background">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            posts?.map((post) => (
              <Card key={post.id} className="border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Read More <ArrowRight className="h-3 w-3" />
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
