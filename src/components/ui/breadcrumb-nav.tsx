import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function BreadcrumbNav({ items, baseUrl = "https://trapezemedia.com" }: BreadcrumbNavProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${baseUrl}${item.href}`,
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3" />
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
