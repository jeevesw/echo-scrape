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
  variant?: "default" | "light";
}

export function BreadcrumbNav({ items, baseUrl = "https://trapezemedia.co.uk", variant = "default" }: BreadcrumbNavProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${baseUrl}${item.href}`,
  }));

  const isLight = variant === "light";
  const textColor = isLight ? "text-primary-foreground/70" : "text-muted-foreground";
  const activeColor = isLight ? "text-primary-foreground" : "text-foreground";
  const hoverColor = isLight ? "hover:text-primary-foreground" : "hover:text-primary";

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className={`flex items-center gap-2 text-sm ${textColor}`}>
          <li>
            <Link to="/" className={`${hoverColor} transition-colors flex items-center gap-1`}>
              <Home className="h-3 w-3" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3" />
              {index === items.length - 1 ? (
                <span className={`${activeColor} font-medium`}>{item.label}</span>
              ) : (
                <Link to={item.href} className={`${hoverColor} transition-colors`}>
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
