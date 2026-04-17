import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SeoOverrideMount } from "@/components/seo/SeoOverrideMount";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Rendered last so DB-driven SEO overrides take precedence over any page-level <Helmet> title/description */}
      <SeoOverrideMount />
    </div>
  );
}
