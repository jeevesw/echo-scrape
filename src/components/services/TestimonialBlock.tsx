import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TestimonialBlockProps {
  quote: string;
  attribution: string;
  role: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function TestimonialBlock({ quote, attribution, role, ctaLabel, ctaHref }: TestimonialBlockProps) {
  return (
    <section className="bg-primary py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center text-primary-foreground">
        <span className="text-[120px] leading-none text-primary-foreground/20 block mb-0 select-none" aria-hidden="true">
          "
        </span>
        <blockquote className="text-2xl font-light italic leading-relaxed mb-10 -mt-8">
          {quote}
        </blockquote>
        <div className="border-t border-primary-foreground/20 pt-6 inline-flex flex-col items-center gap-2">
          <cite className="not-italic text-base opacity-80">
            — {attribution}, {role}
          </cite>
          {ctaLabel && ctaHref && (
            <Button
              variant="hero-outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary mt-4"
              asChild
            >
              {ctaHref.startsWith("http") ? (
                <a href={ctaHref} target="_blank" rel="noopener noreferrer">{ctaLabel}</a>
              ) : (
                <Link to={ctaHref}>{ctaLabel}</Link>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
