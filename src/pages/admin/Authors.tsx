import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Save, Loader2, Upload, X, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface Author {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  created_at: string;
}

const generateSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function AuthorInitials({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center heading-display text-xl text-primary flex-shrink-0">
      {initials}
    </div>
  );
}

function AuthorForm({
  author,
  onSave,
  onCancel,
  saving,
}: {
  author: Partial<Author>;
  onSave: (data: Partial<Author>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    name: author.name || '',
    slug: author.slug || '',
    role: author.role || '',
    bio: author.bio || '',
    avatar_url: author.avatar_url || '',
    linkedin_url: author.linkedin_url || '',
    twitter_url: author.twitter_url || '',
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleNameChange = (name: string) => {
    setForm(f => ({
      ...f,
      name,
      slug: author.id ? f.slug : generateSlug(name),
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5MB'); return; }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filename = `authors/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const { error } = await supabase.storage.from('images').upload(filename, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filename);
      setForm(f => ({ ...f, avatar_url: publicUrl }));
      toast.success('Avatar uploaded');
    } catch (err: any) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Full name" />
        </div>
        <div className="space-y-1">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="author-slug" />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Role</Label>
        <Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Founder & Director" />
      </div>
      <div className="space-y-1">
        <Label>Bio</Label>
        <Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={5} placeholder="Author bio…" />
      </div>
      <div className="space-y-1">
        <Label>Avatar</Label>
        <div className="flex items-center gap-3">
          <Input value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} placeholder="https://… or upload" className="flex-1" />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
        {form.avatar_url && (
          <div className="relative w-16 h-16 mt-2">
            <img src={form.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover" />
            <button onClick={() => setForm(f => ({ ...f, avatar_url: '' }))} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>LinkedIn URL</Label>
          <Input value={form.linkedin_url} onChange={e => setForm(f => ({ ...f, linkedin_url: e.target.value }))} placeholder="https://linkedin.com/in/…" />
        </div>
        <div className="space-y-1">
          <Label>Twitter/X URL</Label>
          <Input value={form.twitter_url} onChange={e => setForm(f => ({ ...f, twitter_url: e.target.value }))} placeholder="https://x.com/…" />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={() => onSave(form)} disabled={saving || !form.name.trim()}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default function Authors() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await supabase.from('authors').select('*').order('name');
      if (error) throw error;
      return data as Author[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Author> }) => {
      const { error } = await supabase.from('authors').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      setEditingId(null);
      toast.success('Author updated');
    },
    onError: (e) => toast.error('Error: ' + e.message),
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Author>) => {
      const { error } = await supabase.from('authors').insert(data as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      setShowNew(false);
      toast.success('Author created');
    },
    onError: (e) => toast.error('Error: ' + e.message),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-display text-3xl text-foreground">Authors</h1>
          <Button onClick={() => setShowNew(true)} disabled={showNew}>
            <Plus className="h-4 w-4 mr-2" /> Add Author
          </Button>
        </div>

        {showNew && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground">New Author</h3>
              <AuthorForm
                author={{}}
                onSave={(data) => createMutation.mutate(data)}
                onCancel={() => setShowNew(false)}
                saving={createMutation.isPending}
              />
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authors?.map((author) => (
              <Card key={author.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {author.avatar_url ? (
                      <img src={author.avatar_url} alt={author.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
                    ) : (
                      <AuthorInitials name={author.name} />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{author.name}</p>
                      {author.role && <p className="text-sm text-muted-foreground">{author.role}</p>}
                    </div>
                  </div>
                  {author.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{author.bio}</p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => setEditingId(editingId === author.id ? null : author.id)}
                  >
                    {editingId === author.id ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                    {editingId === author.id ? 'Close' : 'Edit'}
                  </Button>
                  {editingId === author.id && (
                    <AuthorForm
                      author={author}
                      onSave={(data) => updateMutation.mutate({ id: author.id, data })}
                      onCancel={() => setEditingId(null)}
                      saving={updateMutation.isPending}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
