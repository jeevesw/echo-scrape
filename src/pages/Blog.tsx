import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Calendar, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published_at: string;
}

const BlogList = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, author, published_at, featured_image')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-0 bg-muted">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Unable to load blog posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger-children">
      {posts?.map((post) => (
        <Card key={post.id} className="border-0 bg-muted hover:shadow-lg transition-shadow h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(post.published_at), 'MMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-muted-foreground text-sm mb-4 flex-1">
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
      ))}
    </div>
  );
};

const BlogPost = ({ slug }: { slug: string }) => {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h1 className="heading-display text-4xl text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2 mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
      
      <header className="mb-8">
        <h1 className="heading-display text-4xl md:text-5xl text-primary mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(post.published_at), 'MMMM d, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none
          prose-headings:heading-display prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-ul:text-foreground prose-ol:text-foreground
          prose-li:marker:text-primary
          prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

const Blog = () => {
  const { slug } = useParams();

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {slug ? (
            <BlogPost slug={slug} />
          ) : (
            <>
              <h1 className="heading-display text-5xl md:text-6xl text-center text-primary mb-16">
                Blog
              </h1>
              <BlogList />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;