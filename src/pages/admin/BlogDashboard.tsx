import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Pencil, Trash2, Eye, ArrowUpDown, Download } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Category {
  id: string;
  slug: string;
  name: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  published_at: string;
  is_published: boolean;
  created_at: string;
  categories: Category[];
}

type SortField = 'title' | 'published_at' | 'author';
type SortOrder = 'asc' | 'desc';

export default function BlogDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('published_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Fetch posts, categories, and assignments in parallel
      const [postsRes, catsRes, assignRes] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_categories').select('id, name, slug').order('sort_order'),
        supabase.from('blog_post_categories').select('post_id, category_id'),
      ]);
      if (postsRes.error) throw postsRes.error;
      if (catsRes.error) throw catsRes.error;
      if (assignRes.error) throw assignRes.error;

      // Build category lookup
      const catMap = new Map(catsRes.data.map(c => [c.id, { name: c.name, slug: c.slug }]));
      const postCats = new Map<string, { name: string; slug: string }[]>();
      for (const a of assignRes.data) {
        const cat = catMap.get(a.category_id);
        if (!cat) continue;
        if (!postCats.has(a.post_id)) postCats.set(a.post_id, []);
        postCats.get(a.post_id)!.push(cat);
      }

      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      postsRes.data.forEach((post) => {
        const enriched = { ...post, categories: postCats.get(post.id) || [] };
        zip.file(`${post.slug}.json`, JSON.stringify(enriched, null, 2));
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blog-export-${format(new Date(), 'yyyy-MM-dd')}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${postsRes.data.length} posts`);
    } catch (err: any) {
      toast.error('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

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

  // Fetch posts with their categories
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data: postsData, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, author, published_at, is_published, created_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Fetch categories for all posts
      const postIds = postsData.map(p => p.id);
      const { data: postCats, error: catError } = await supabase
        .from('blog_post_categories')
        .select('post_id, category_id, blog_categories(id, slug, name)')
        .in('post_id', postIds);
      
      if (catError) throw catError;

      // Map categories to posts
      const postsWithCats = postsData.map(post => ({
        ...post,
        categories: postCats
          ?.filter(pc => pc.post_id === post.id)
          .map(pc => pc.blog_categories as unknown as Category)
          .filter(Boolean) || [],
      }));

      return postsWithCats as BlogPost[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Post deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete post: ' + error.message);
    },
  });

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    
    let result = [...posts];
    
    // Filter by category
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(post =>
        post.categories.some(cat => cat.id === categoryFilter)
      );
    }
    
    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }
    
    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'author') {
        comparison = a.author.localeCompare(b.author);
      } else {
        comparison = new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [posts, search, sortField, sortOrder, categoryFilter]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground mt-1">
              Manage and publish your blog content
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting…' : 'Export'}
            </Button>
            <Button asChild>
              <Link to="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories?.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={`${sortField}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split('-') as [SortField, SortOrder];
              setSortField(field);
              setSortOrder(order);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published_at-desc">Newest first</SelectItem>
              <SelectItem value="published_at-asc">Oldest first</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40%]">
                  <button
                    onClick={() => toggleSort('title')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Title
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort('author')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Author
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort('published_at')}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredAndSortedPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    {search || categoryFilter !== 'all' ? 'No posts match your filters' : 'No posts yet. Create your first post!'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedPosts.map((post) => (
                  <TableRow key={post.id} className="group">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                        <p className="text-sm text-muted-foreground">/blog/{post.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{post.author}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(post.published_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {post.categories.length > 0 ? (
                          post.categories.map(cat => (
                            <Badge key={cat.id} variant="outline" className="text-xs">
                              {cat.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={post.is_published ? 'default' : 'secondary'}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/blog/${post.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/blog/edit/${post.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{post.title}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(post.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Count */}
        {posts && (
          <p className="text-sm text-muted-foreground mt-4">
            {filteredAndSortedPosts.length} of {posts.length} posts
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
