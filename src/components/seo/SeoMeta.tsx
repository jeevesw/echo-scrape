import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SeoMetaProps {
  /** Default page title (used if no override exists) */
  defaultTitle: string;
  /** Default meta description (used if no override exists) */
  defaultDescription: string;
  /** If true, renders noindex,nofollow regardless of overrides (admin/auth pages) */
  noIndex?: boolean;
}

/**
 * Renders <title> + <meta name="description"> for the current route,
 * preferring overrides stored in the seo_overrides table when available.
 */
export function SeoMeta({ defaultTitle, defaultDescription, noIndex = false }: SeoMetaProps) {
  const { pathname } = useLocation();
  const [override, setOverride] = useState<{ title: string | null; description: string | null } | null>(null);

  useEffect(() => {
    let cancelled = false;
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

  const title = override?.title?.trim() || defaultTitle;
  const description = override?.description?.trim() || defaultDescription;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
