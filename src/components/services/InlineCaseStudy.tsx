import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface InlineCaseStudyProps {
  label?: string;
  clientName: string;
  headline: string;
  body: string | ReactNode;
  stats: Stat[];
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "light" | "dark";
  visualSlot?: ReactNode;
  bgColor?: string;
  compact?: boolean;
  visualPosition?: "left" | "right";
}

export function InlineCaseStudy({
  label,
  clientName,
  headline,
  body,
  stats,
  ctaLabel,
  ctaHref,
  variant = "light",
  visualSlot,
  bgColor,
  compact,
  visualPosition = "right",
}: InlineCaseStudyProps) {
  const isDark = variant === "dark";
  const paddingClass = compact ? "py-8 lg:py-12" : "py-16 lg:py-24";

  return (
    <section
      className={`${paddingClass} ${!bgColor ? (isDark ? "bg-[hsl(60,1%,8%)]" : "bg-muted") : ""}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-6xl mx-auto ${visualSlot ? "grid md:grid-cols-2 gap-12 items-center" : ""}`}>
          <div className={visualSlot && visualPosition === "left" ? "md:order-2" : ""}>
            {label && (
              <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-3 block">
                {label}
              </span>
            )}
            <p className={`text-sm mb-1 ${isDark ? "text-white/50" : "text-muted-foreground"}`}>{clientName}</p>
            <h2 className={`heading-display text-3xl lg:text-4xl mb-6 ${isDark ? "text-white" : "text-foreground"}`}>
              {headline}
            </h2>
            <div className={`text-base leading-relaxed mb-8 ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
              {body}
            </div>

            <div className="flex gap-4 flex-wrap mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl px-6 py-4 text-center min-w-[140px] ${
                    isDark
                      ? "border border-white/20 bg-white/5"
                      : "border border-border bg-background"
                  }`}
                >
                  <span className="heading-display text-3xl text-primary block">{s.value}</span>
                  <span className={`text-xs uppercase tracking-wide mt-1 block ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {ctaLabel && ctaHref && (
              <Button
                variant="outline"
                className={isDark ? "border-white text-white hover:bg-white hover:text-foreground" : ""}
                asChild
              >
                <Link to={ctaHref}>
                  {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          {visualSlot && <div className={visualPosition === "left" ? "md:order-1" : ""}>{visualSlot}</div>}
        </div>
      </div>
    </section>
  );
}
