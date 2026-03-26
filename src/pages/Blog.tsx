import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, User, Search, Linkedin, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import { BlockRenderer, type Block } from "@/components/blog/BlockRenderer";

interface Author {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
}

interface Category {
  id: string;
  slug: string;
  name: string;
}

interface BlogPostBase {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  author_id: string | null;
  published_at: string;
  blocks: unknown;
  authors: Author | null;
}

interface BlogPostWithCategories extends BlogPostBase {
  category_ids: string[];
}

const INITIAL_POSTS = 9;
const LOAD_MORE_COUNT = 6;

// Strip HTML tags, decode entities, and remove markdown syntax from content
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

// Get excerpt with fallback to stripped content
const getExcerpt = (post: BlogPostBase): string => {
  if (post.excerpt && post.excerpt.trim()) {
    return stripHtmlAndMarkdown(post.excerpt);
  }
  
  const strippedContent = stripHtmlAndMarkdown(post.content);
  if (strippedContent.length <= 200) {
    return strippedContent;
  }
  
  // Find a good break point around 180-200 chars
  const truncated = strippedContent.substring(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 160 ? truncated.substring(0, lastSpace) : truncated) + '…';
};

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [visibleCount, setVisibleCount] = useState(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sync category from URL on mount
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  // Fetch categories (exclude "Needs review")
  const { data: categories } = useQuery({
    queryKey: ['public-blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .neq('slug', 'needs-review')
        .order('sort_order');
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts-with-categories'],
    queryFn: async () => {
      // Fetch posts
      const { data: postsData, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, content, author, published_at, featured_image')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;

      // Fetch post categories
      const postIds = postsData.map(p => p.id);
      const { data: postCats, error: catError } = await supabase
        .from('blog_post_categories')
        .select('post_id, category_id')
        .in('post_id', postIds);
      
      if (catError) throw catError;

      // Map categories to posts
      return postsData.map(post => ({
        ...post,
        category_ids: postCats?.filter(pc => pc.post_id === post.id).map(pc => pc.category_id) || [],
      })) as BlogPostWithCategories[];
    },
  });

  // Handle category change and update URL
  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setVisibleCount(INITIAL_POSTS);
    
    if (categorySlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categorySlug);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    let result = [...posts];
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all' && categories) {
      const selectedCat = categories.find(c => c.slug === selectedCategory);
      if (selectedCat) {
        result = result.filter(post =>
          post.category_ids.includes(selectedCat.id)
        );
      }
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        stripHtmlAndMarkdown(post.excerpt || '').toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.published_at).getTime();
      const dateB = new Date(b.published_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [posts, searchQuery, sortOrder, selectedCategory, categories]);

  // Visible posts (load more)
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Reset visible count when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(INITIAL_POSTS);
  };

  const handleSortChange = (value: 'newest' | 'oldest') => {
    setSortOrder(value);
    setVisibleCount(INITIAL_POSTS);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-40" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border border-border/50 bg-card overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </>
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
    <>
      {/* Category Filter Buttons */}
      {categories && categories.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Search and Sort */}
      <div className="flex gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search posts…"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11 bg-card border-border/50"
          />
        </div>
      </div>

      {/* Results count */}
      {(searchQuery || selectedCategory !== 'all') && (
        <p className="text-sm text-muted-foreground mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
          {selectedCategory !== 'all' && categories && (
            <span> in {categories.find(c => c.slug === selectedCategory)?.name}</span>
          )}
        </p>
      )}

      {/* Posts grid */}
      {visiblePosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No posts found matching your filters.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <Card 
              key={post.id} 
              className="group border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
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
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                {/* Excerpt - clamped to 3 lines */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {getExcerpt(post)}
                </p>
                
                {/* CTA */}
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline underline-offset-4 mt-auto"
                >
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            onClick={() => setVisibleCount(prev => prev + LOAD_MORE_COUNT)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

const BlogPost = ({ slug }: { slug: string }) => {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, authors(*)')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as unknown as BlogPostBase;
    },
  });

  const authorData = post?.authors ?? null;

  // Inject author JSON-LD
  useEffect(() => {
    if (!authorData) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'author-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "author": {
        "@type": "Person",
        "name": authorData.name,
        "jobTitle": authorData.role,
        "url": `https://trapezemedia.co.uk/blog?author=${authorData.slug}`
      }
    });
    document.head.appendChild(script);
    return () => { document.getElementById('author-schema')?.remove(); };
  }, [authorData]);

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
            <User className="h-4 w-4" />
            {authorData?.name || post.author}
          </span>
        </div>
      </header>

      <BlockRenderer
        blocks={post.blocks as Block[] | null}
        fallbackHtml={post.content}
      />

      {/* Author credit */}
      {authorData && (
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex gap-6 items-start">
            {authorData.avatar_url ? (
              <img
                src={authorData.avatar_url}
                alt={authorData.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/10 flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center heading-display text-2xl text-primary flex-shrink-0">
                {authorData.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Written by</p>
              <Link
                to={`/blog?author=${authorData.slug}`}
                className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              >
                {authorData.name}
              </Link>
              {authorData.role && (
                <p className="text-sm text-primary font-medium mb-3">{authorData.role}</p>
              )}
              {authorData.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">{authorData.bio}</p>
              )}
              {(authorData.linkedin_url || authorData.twitter_url) && (
                <div className="flex gap-3 mt-3">
                  {authorData.linkedin_url && (
                    <a href={authorData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {authorData.twitter_url && (
                    <a href={authorData.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="heading-display text-5xl md:text-6xl text-primary mb-4">
                  Blog
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Insights on paid social, TikTok, SEO, and digital marketing for hospitality and beyond.
                </p>
              </div>
              
              <BlogList />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;