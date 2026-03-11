import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ArrowLeft, Save, Eye, Loader2, CalendarIcon, Upload, X, Image as ImageIcon, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import BlockEditor from '@/components/blog/editor/BlockEditor';
import type { Block } from '@/components/blog/BlockRenderer';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published_at: string;
  is_published: boolean;
}

interface Category {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isNew = !id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [author, setAuthor] = useState('Trapeze Media');
  const [publishedAt, setPublishedAt] = useState<Date>(new Date());
  const [isPublished, setIsPublished] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [initialCategories, setInitialCategories] = useState<string[]>([]);

  // Fetch all categories
  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data as Category[];
    },
  });

  // Fetch post's current categories
  const { data: postCategories } = useQuery({
    queryKey: ['post-categories', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('blog_post_categories')
        .select('category_id')
        .eq('post_id', id);
      if (error) throw error;
      return data.map(pc => pc.category_id);
    },
    enabled: !!id,
  });

  // Fetch existing post if editing
  const { data: post, isLoading } = useQuery({
    queryKey: ['admin-blog-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!id,
  });

  // Populate form when post loads
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setFeaturedImage(post.featured_image);
      setAuthor(post.author);
      setPublishedAt(new Date(post.published_at));
      setIsPublished(post.is_published);
    }
  }, [post]);

  // Populate categories when loaded
  useEffect(() => {
    if (postCategories) {
      setSelectedCategories(postCategories);
      setInitialCategories(postCategories);
    }
  }, [postCategories]);

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (isNew && title) {
      setSlug(generateSlug(title));
      setHasChanges(true);
    }
  }, [title, isNew]);

  // Track changes
  useEffect(() => {
    if (post) {
      const categoriesChanged = JSON.stringify([...selectedCategories].sort()) !== JSON.stringify([...initialCategories].sort());
      const changed = 
        title !== post.title ||
        slug !== post.slug ||
        excerpt !== post.excerpt ||
        content !== post.content ||
        featuredImage !== post.featured_image ||
        author !== post.author ||
        isPublished !== post.is_published ||
        categoriesChanged;
      setHasChanges(changed);
    } else if (isNew) {
      setHasChanges(!!title || !!content || selectedCategories.length > 0);
    }
  }, [title, slug, excerpt, content, featuredImage, author, isPublished, post, isNew, selectedCategories, initialCategories]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const postData = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        featured_image: featuredImage,
        author: author.trim() || 'Trapeze Media',
        published_at: publishedAt.toISOString(),
        is_published: isPublished,
      };

      let savedPost;
      if (isNew) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select()
          .single();
        if (error) throw error;
        savedPost = data;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .update({ ...postData, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        savedPost = data;
      }

      // Update categories - delete all then insert selected
      const { error: deleteError } = await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', savedPost.id);
      if (deleteError) throw deleteError;

      if (selectedCategories.length > 0) {
        const categoryInserts = selectedCategories.map(catId => ({
          post_id: savedPost.id,
          category_id: catId,
        }));
        const { error: insertError } = await supabase
          .from('blog_post_categories')
          .insert(categoryInserts);
        if (insertError) throw insertError;
      }

      return savedPost;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['admin-blog-post', data.id] });
      queryClient.invalidateQueries({ queryKey: ['post-categories', data.id] });
      toast.success(isNew ? 'Post created!' : 'Post saved!');
      if (isNew) {
        navigate(`/admin/blog/edit/${data.id}`);
      }
      setInitialCategories(selectedCategories);
      setHasChanges(false);
    },
    onError: (error) => {
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        toast.error('A post with this slug already exists');
      } else {
        toast.error('Failed to save: ' + error.message);
      }
    },
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    try {
      // Generate unique filename
      const ext = file.name.split('.').pop();
      const filename = `blog/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filename, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filename);

      setFeaturedImage(publicUrl);
      setHasChanges(true);
      toast.success('Image uploaded');
    } catch (error: unknown) {
      toast.error('Failed to upload image: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!slug.trim()) {
      toast.error('Slug is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }
    saveMutation.mutate();
  };

  if (!isNew && isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-48 mb-6" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/blog">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              {isNew ? 'New Post' : 'Edit Post'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!isNew && (
              <Button variant="outline" asChild>
                <Link to={`/blog/${slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              disabled={saveMutation.isPending || !hasChanges}
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isNew ? 'Create Post' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="text-lg"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">/blog/</span>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-slug"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary for previews and SEO..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Short description shown in blog listings. If empty, content will be used.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here... HTML is supported."
                rows={20}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Supports HTML for formatting (headings, links, lists, etc.)
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish settings */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-4">Publish Settings</h3>
              
              <div className="space-y-4">
                {/* Published toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>

                {/* Publish date */}
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !publishedAt && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publishedAt ? format(publishedAt, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={publishedAt}
                        onSelect={(date) => date && setPublishedAt(date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Trapeze Media"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categories
              </h3>
              
              <div className="space-y-3">
                {categories?.filter(cat => cat.slug !== 'needs-review').map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label
                      htmlFor={`cat-${category.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Selected:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map(catId => {
                      const cat = categories?.find(c => c.id === catId);
                      return cat ? (
                        <Badge key={catId} variant="secondary" className="text-xs">
                          {cat.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Featured image */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-4">Featured Image</h3>
              
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full rounded-lg object-cover aspect-[4/3]"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setFeaturedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload
                      </p>
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {featuredImage && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Replace Image
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
