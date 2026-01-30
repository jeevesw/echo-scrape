import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Calendar, User, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState, useMemo, useEffect } from "react";

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
  published_at: string;
}

interface BlogPostWithCategories extends BlogPostBase {
  category_ids: string[];
}

const POSTS_PER_PAGE = 9;

// Strip HTML tags and markdown syntax from content
const stripHtmlAndMarkdown = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/_([^_]+)_/g, '$1') // Remove underline
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`[^`]+`/g, '') // Remove code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
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
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1);
    
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

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: 'newest' | 'oldest') => {
    setSortOrder(value);
    setCurrentPage(1);
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
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('all')}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      )}

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
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
        <Select value={sortOrder} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-40 h-11 bg-card border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
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
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No posts found matching your filters.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => (
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
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.published_at), 'MMM d, yyyy')}
                  </span>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-9"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
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
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data as BlogPostBase;
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
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="heading-display text-5xl md:text-6xl text-primary mb-4">
                  Blog
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Practical marketing insights, SEO, and paid media—without the fluff.
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