import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches and applies the SEO override (title + description) for the
 * current route from the seo_overrides table. Renders nothing if no
 * override exists, so each page's built-in <Helmet> defaults remain.
 *
 * Mounted from Layout AFTER children, so its Helmet wins over the page's
 * own Helmet (react-helmet-async resolves last-mounted wins).
 */
export function SeoOverrideMount() {
  const { pathname } = useLocation();
  const [override, setOverride] = useState<{ title: string | null; description: string | null } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setOverride(null);
    (async () => {
      const { data } = await supabase
        .from("seo_overrides")
        .select("title, description")
        .eq("route", pathname)
        .maybeSingle();
      if (!cancelled) setOverride(data ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!override) return null;
  const title = override.title?.trim();
  const description = override.description?.trim();
  if (!title && !description) return null;

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  );
}
