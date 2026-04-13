import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";

interface CTA {
  label: string;
  href: string;
  external?: boolean;
}

interface ServiceHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  variant: "brand-pink" | "dark" | "split";
  visualSlot?: ReactNode;
  backgroundImage?: string;
  breadcrumbItems?: { label: string; href: string }[];
}

export function ServiceHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant,
  visualSlot,
  backgroundImage,
  breadcrumbItems,
}: ServiceHeroProps) {
  const CtaButton = ({ cta, isPrimary }: { cta: CTA; isPrimary: boolean }) => {
    const btnVariant = isPrimary
      ? variant === "brand-pink"
        ? "hero"
        : "hero"
      : variant === "brand-pink"
      ? "hero-outline"
      : "hero-outline";

    const className =
      variant === "brand-pink"
        ? isPrimary
          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          : "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
        : variant === "dark"
        ? isPrimary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-white text-white hover:bg-white hover:text-foreground"
        : "";

    if (cta.external) {
      return (
        <Button variant={btnVariant} className={className} asChild>
          <a href={cta.href} target="_blank" rel="noopener noreferrer">
            {cta.label} {isPrimary && <ArrowRight className="ml-2 h-4 w-4" />}
          </a>
        </Button>
      );
    }
    return (
      <Button variant={btnVariant} className={className} asChild>
        <Link to={cta.href}>
          {cta.label} {isPrimary && <ArrowRight className="ml-2 h-4 w-4" />}
        </Link>
      </Button>
    );
  };

  if (variant === "split") {
    return (
      <section className="bg-background pt-6 pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          {breadcrumbItems && (
            <div className="mb-8">
              <BreadcrumbNav items={breadcrumbItems} />
            </div>
          )}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              {eyebrow && (
                <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
                  {eyebrow}
                </span>
              )}
              <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
                {headline}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">{subheadline}</p>
              <div className="flex flex-wrap gap-4">
                <CtaButton cta={primaryCta} isPrimary />
                {secondaryCta && <CtaButton cta={secondaryCta} isPrimary={false} />}
              </div>
            </div>
            {visualSlot && <div>{visualSlot}</div>}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "dark") {
    return (
      <section className="relative bg-[hsl(60,1%,8%)] pt-6 pb-20 lg:pb-32 overflow-hidden">
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        {breadcrumbItems && (
          <div className="relative z-10 container mx-auto px-4 mb-12 lg:mb-16">
            <BreadcrumbNav variant="light" items={breadcrumbItems} />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          {eyebrow && (
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
              {eyebrow}
            </span>
          )}
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {headline}
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">{subheadline}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CtaButton cta={primaryCta} isPrimary />
            {secondaryCta && <CtaButton cta={secondaryCta} isPrimary={false} />}
          </div>
        </div>
      </section>
    );
  }

  // brand-pink
  return (
    <section className="relative bg-primary pt-6 pb-20 lg:pb-32 overflow-hidden">
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </>
      )}
      {breadcrumbItems && (
        <div className="relative z-10 container mx-auto px-4 mb-12 lg:mb-16">
          <BreadcrumbNav variant="light" items={breadcrumbItems} />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {eyebrow && (
          <span className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-widest mb-4 block">
            {eyebrow}
          </span>
        )}
        <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
          {headline}
        </h1>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{subheadline}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <CtaButton cta={primaryCta} isPrimary />
          {secondaryCta && <CtaButton cta={secondaryCta} isPrimary={false} />}
        </div>
      </div>
    </section>
  );
}
