import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Plus, Pencil, Trash2, GripVertical, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client_name: string;
  client_logo_url: string | null;
  hero_image_url: string | null;
  card_image_url: string | null;
  testimonial_quote: string | null;
  testimonial_credit: string | null;
  seo_title: string | null;
  seo_description: string | null;
  page_route: string;
  is_published: boolean;
  sort_order: number;
}

const emptyCaseStudy: Omit<CaseStudy, "id"> = {
  slug: "",
  title: "",
  description: "",
  category: "",
  client_name: "",
  client_logo_url: "",
  hero_image_url: "",
  card_image_url: "",
  testimonial_quote: "",
  testimonial_credit: "",
  seo_title: "",
  seo_description: "",
  page_route: "",
  is_published: true,
  sort_order: 0,
};

export default function CaseStudiesAdmin() {
  const queryClient = useQueryClient();
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [newStudy, setNewStudy] = useState<Omit<CaseStudy, "id">>(emptyCaseStudy);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as CaseStudy[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (study: Omit<CaseStudy, "id"> & { id?: string }) => {
      const payload = {
        slug: study.slug,
        title: study.title,
        description: study.description,
        category: study.category,
        client_name: study.client_name,
        client_logo_url: study.client_logo_url || null,
        hero_image_url: study.hero_image_url || null,
        card_image_url: study.card_image_url || null,
        testimonial_quote: study.testimonial_quote || null,
        testimonial_credit: study.testimonial_credit || null,
        seo_title: study.seo_title || null,
        seo_description: study.seo_description || null,
        page_route: study.page_route,
        is_published: study.is_published,
        sort_order: study.sort_order,
      };

      if (study.id) {
        const { error } = await supabase
          .from("case_studies")
          .update(payload)
          .eq("id", study.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("case_studies")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast.success("Case study saved");
      setDialogOpen(false);
      setEditingStudy(null);
      setNewStudy(emptyCaseStudy);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast.success("Case study deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const formData = editingStudy || newStudy;
  const setFormData = (updates: Partial<typeof formData>) => {
    if (editingStudy) {
      setEditingStudy({ ...editingStudy, ...updates });
    } else {
      setNewStudy({ ...newStudy, ...updates });
    }
  };

  const handleSave = () => {
    if (!formData.slug || !formData.title || !formData.page_route) {
      toast.error("Slug, title, and page route are required");
      return;
    }
    saveMutation.mutate(formData as any);
  };

  const openEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingStudy(null);
    setNewStudy(emptyCaseStudy);
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Case Studies</h1>
            <p className="text-muted-foreground mt-1">Manage case study metadata, logos, and testimonials</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}>
                <Plus className="h-4 w-4 mr-2" /> Add Case Study
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingStudy ? "Edit Case Study" : "New Case Study"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Client Name *</Label>
                    <Input value={formData.client_name} onChange={(e) => setFormData({ client_name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Slug *</Label>
                    <Input value={formData.slug} onChange={(e) => setFormData({ slug: e.target.value })} placeholder="yo-sushi" />
                  </div>
                </div>
                <div>
                  <Label>Title *</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ title: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={formData.category} onChange={(e) => setFormData({ category: e.target.value })} placeholder="e.g. Search & Social Campaign" />
                </div>
                <div>
                  <Label>Description (card text)</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ description: e.target.value })} rows={3} />
                </div>
                <div>
                  <Label>Page Route *</Label>
                  <Input value={formData.page_route} onChange={(e) => setFormData({ page_route: e.target.value })} placeholder="/case-studies/yo-sushi" />
                </div>

                <div className="border-t pt-4 mt-2">
                  <h3 className="font-semibold mb-3">Images</h3>
                  <div className="grid gap-4">
                    <ImageUploader
                      label="Client Logo"
                      value={formData.client_logo_url || null}
                      onChange={(url) => setFormData({ client_logo_url: url })}
                      folder="case-studies/logos"
                      accept="image/svg+xml,image/png,image/jpeg,image/webp"
                    />
                    <ImageUploader
                      label="Card Image"
                      value={formData.card_image_url || null}
                      onChange={(url) => setFormData({ card_image_url: url })}
                      folder="case-studies/cards"
                    />
                    <ImageUploader
                      label="Hero Image"
                      value={formData.hero_image_url || null}
                      onChange={(url) => setFormData({ hero_image_url: url })}
                      folder="case-studies/heroes"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <h3 className="font-semibold mb-3">Testimonial</h3>
                  <div className="grid gap-3">
                    <div>
                      <Label>Quote</Label>
                      <Textarea value={formData.testimonial_quote || ""} onChange={(e) => setFormData({ testimonial_quote: e.target.value })} rows={2} />
                    </div>
                    <div>
                      <Label>Credit</Label>
                      <Input value={formData.testimonial_credit || ""} onChange={(e) => setFormData({ testimonial_credit: e.target.value })} placeholder="— Senior Marketing Manager at YO!" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <h3 className="font-semibold mb-3">SEO</h3>
                  <div className="grid gap-3">
                    <div>
                      <Label>SEO Title</Label>
                      <Input value={formData.seo_title || ""} onChange={(e) => setFormData({ seo_title: e.target.value })} />
                    </div>
                    <div>
                      <Label>SEO Description</Label>
                      <Textarea value={formData.seo_description || ""} onChange={(e) => setFormData({ seo_description: e.target.value })} rows={2} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Label>Published</Label>
                    <Switch checked={formData.is_published} onCheckedChange={(v) => setFormData({ is_published: v })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Sort Order</Label>
                    <Input type="number" className="w-20" value={formData.sort_order} onChange={(e) => setFormData({ sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>

                <Button onClick={handleSave} disabled={saveMutation.isPending} className="mt-4">
                  {saveMutation.isPending ? "Saving..." : "Save Case Study"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-3">
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  {study.client_logo_url && (
                    <img src={study.client_logo_url} alt={study.client_name} className="h-8 w-auto object-contain flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{study.client_name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{study.category}</span>
                      {!study.is_published && (
                        <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{study.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={study.page_route} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(study)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm("Delete this case study?")) {
                          deleteMutation.mutate(study.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
