import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SeoOverrideMount } from "@/components/seo/SeoOverrideMount";
import { FloatingCallCta } from "./FloatingCallCta";

interface LayoutProps {
  children: ReactNode;
  floatingHeader?: boolean;
}

export function Layout({ children, floatingHeader = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header floating={floatingHeader} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCallCta />
      {/* Rendered last so DB-driven SEO overrides take precedence over any page-level <Helmet> title/description */}
      <SeoOverrideMount />
    </div>
  );
}
