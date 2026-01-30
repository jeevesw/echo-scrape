import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Digital Marketing Training", href: "/training" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Less-Healthy Food Ad Ban", href: "/lhf-ad-ban" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
        <Link to="/lhf-ad-ban" className="hover:underline">
          Ready for the 'Less-Healthy Foods' ads ban? Learn more at our events →
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="heading-display text-2xl text-foreground">
              TRAPEZE <span className="border border-foreground px-2">MEDIA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary underline underline-offset-4"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex flex-col gap-6 pt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
