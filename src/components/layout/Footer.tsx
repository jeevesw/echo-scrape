import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import logoWhite from "@/assets/logo-white.svg";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-content mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img 
              src={logoWhite} 
              alt="Trapeze Media" 
              className="h-8 w-auto"
            />
            <p className="mt-4 text-primary-foreground/80">
              Hyperlocal marketing: Local campaigns for global brands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="heading-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/case-studies" className="text-primary-foreground/80 hover:text-primary-foreground">Case Studies</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground">Blog</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-display text-lg mb-4">Email Us</h4>
            <a 
              href="mailto:info@trapezemedia.co.uk" 
              className="text-primary-foreground/80 hover:text-primary-foreground underline"
            >
              info@trapezemedia.co.uk
            </a>
            <h4 className="heading-display text-lg mt-6 mb-4">Call Us</h4>
            <a 
              href="tel:07989478792" 
              className="text-primary-foreground/80 hover:text-primary-foreground underline"
            >
              07989 478 792
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="heading-display text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/trapezemedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/trapeze-media" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Trapeze Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
