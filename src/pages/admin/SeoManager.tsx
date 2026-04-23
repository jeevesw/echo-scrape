import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Save, Search, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/ImageUploader";

type RouteEntry = {
  route: string;
  group: "Static" | "Service" | "Case study" | "Blog post" | "Utility";
  label: string;
  suggestedImage?: string | null;
};

const STATIC_ROUTES: RouteEntry[] = [
  { route: "/", group: "Static", label: "Home" },
  { route: "/services", group: "Static", label: "Services index" },
  { route: "/case-studies", group: "Static", label: "Case studies index" },
  { route: "/blog", group: "Static", label: "Blog index" },
  { route: "/contact", group: "Static", label: "Contact" },
  { route: "/services/paid-advertising", group: "Service", label: "Paid Advertising" },
  { route: "/services/paid-search", group: "Service", label: "Paid Search" },
  { route: "/services/video-production", group: "Service", label: "Video Production" },
  { route: "/services/social-media-management", group: "Service", label: "Social Media Management" },
  { route: "/services/creative-services", group: "Service", label: "Creative Services" },
  { route: "/services/website-design", group: "Service", label: "Website Design" },
  { route: "/paid-ads-quiz", group: "Utility", label: "Paid Ads Quiz" },
  { route: "/hfss-assessment", group: "Utility", label: "HFSS Assessment" },
];

interface OverrideRow {
  id?: string;
  route: string;
  title: string;
  description: string;
  og_image: string;
}

export default function SeoManager() {
  const [routes, setRoutes] = useState<RouteEntry[]>(STATIC_ROUTES);
  const [values, setValues] = useState<Record<string, OverrideRow>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Load route list (static + dynamic) and existing overrides
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [overridesRes, postsRes, csRes] = await Promise.all([
        supabase.from("seo_overrides").select("id, route, title, description, og_image"),
        supabase.from("blog_posts").select("slug, title, featured_image").eq("is_published", true).order("published_at", { ascending: false }),
        supabase.from("case_studies").select("page_route, client_name, hero_image_url, card_image_url").eq("is_published", true).order("sort_order"),
      ]);

      const dynamic: RouteEntry[] = [];
      (csRes.data ?? []).forEach((cs: any) => {
        if (cs.page_route) dynamic.push({
          route: cs.page_route,
          group: "Case study",
          label: cs.client_name || cs.page_route,
          suggestedImage: cs.hero_image_url || cs.card_image_url || null,
        });
      });
      (postsRes.data ?? []).forEach((p: any) => {
        dynamic.push({
          route: `/blog/${p.slug}`,
          group: "Blog post",
          label: p.title || p.slug,
          suggestedImage: p.featured_image || null,
        });
      });

      const allRoutes = [...STATIC_ROUTES, ...dynamic];
      setRoutes(allRoutes);

      const map: Record<string, OverrideRow> = {};
      allRoutes.forEach((r) => {
        map[r.route] = { route: r.route, title: "", description: "", og_image: "" };
      });
      (overridesRes.data ?? []).forEach((o: any) => {
        map[o.route] = { id: o.id, route: o.route, title: o.title ?? "", description: o.description ?? "", og_image: o.og_image ?? "" };
      });
      setValues(map);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return routes;
    return routes.filter((r) => r.route.toLowerCase().includes(q) || r.label.toLowerCase().includes(q));
  }, [routes, filter]);

  const updateField = (route: string, field: "title" | "description" | "og_image", val: string) => {
    setValues((prev) => ({ ...prev, [route]: { ...prev[route], [field]: val } }));
    setDirty((prev) => ({ ...prev, [route]: true }));
  };

  const save = async (route: string) => {
    setSaving((p) => ({ ...p, [route]: true }));
    const row = values[route];
    const payload = {
      route,
      title: row.title || null,
      description: row.description || null,
      og_image: row.og_image || null,
    };
    const { error } = await supabase
      .from("seo_overrides")
      .upsert(payload, { onConflict: "route" });
    setSaving((p) => ({ ...p, [route]: false }));
    if (error) {
      toast.error(`Failed to save: ${error.message}`);
      return;
    }
    setDirty((p) => ({ ...p, [route]: false }));
    toast.success(`Saved SEO for ${route}`);
  };

  const exportCsv = () => {
    const escape = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
    const header = ["Route", "Group", "Label", "Title", "Description", "OG Image"].join(",");
    const rows = routes.map((r) => {
      const v = values[r.route];
      return [r.route, r.group, r.label, v?.title ?? "", v?.description ?? "", v?.og_image ?? ""].map(escape).join(",");
    });
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trapeze-seo-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const grouped = useMemo(() => {
    const order: RouteEntry["group"][] = ["Static", "Service", "Utility", "Case study", "Blog post"];
    const map = new Map<string, RouteEntry[]>();
    filtered.forEach((r) => {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group)!.push(r);
    });
    return order.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g)! }));
  }, [filtered]);

  return (
    <AdminLayout>
      <Helmet>
        <title>SEO Manager — Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Manager</h1>
            <p className="text-muted-foreground mt-1">
              Override the meta title and description for each page. Empty fields fall back to the page's built-in defaults.
            </p>
          </div>
          <Button onClick={exportCsv} variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by route or label…"
            className="pl-9"
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading routes…</p>
        ) : (
          grouped.map(({ group, items }) => (
            <section key={group} className="space-y-3">
              <h2 className="text-xl font-semibold">{group} <span className="text-muted-foreground text-sm font-normal">({items.length})</span></h2>
              <div className="space-y-3">
                {items.map((r) => {
                  const v = values[r.route] ?? { route: r.route, title: "", description: "" };
                  const isDirty = dirty[r.route];
                  return (
                    <Card key={r.route} className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{r.label}</div>
                          <code className="text-xs text-muted-foreground break-all">{r.route}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          {isDirty && <Badge variant="secondary">Unsaved</Badge>}
                          <Button size="sm" onClick={() => save(r.route)} disabled={!isDirty || saving[r.route]}>
                            <Save className="h-4 w-4 mr-1.5" />
                            {saving[r.route] ? "Saving…" : "Save"}
                          </Button>
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground">Meta title <span className="text-muted-foreground/70">({v.title.length})</span></label>
                          <Input
                            value={v.title}
                            onChange={(e) => updateField(r.route, "title", e.target.value)}
                            placeholder="Leave blank to use page default"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground">Meta description <span className="text-muted-foreground/70">({v.description.length})</span></label>
                          <Textarea
                            value={v.description}
                            onChange={(e) => updateField(r.route, "description", e.target.value)}
                            placeholder="Leave blank to use page default"
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
