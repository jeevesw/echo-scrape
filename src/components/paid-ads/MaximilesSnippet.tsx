import { SpotlightCarousel } from "@/components/case-study/SpotlightCarousel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PreciousHomesSnippet from "./PreciousHomesSnippet";

const statPills = [
  { value: "+66%", label: "Double opt-ins" },
  { value: "50%", label: "Cost-per-result reduction" },
];

const galleryPrizes = [
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280061137-PTIC38BRX8KJO228E3JM/Maximiles+%E2%80%94+Focus+on+Prizes+2.jpg", alt: "Maximiles prizes creative 1" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280060820-0XICIJJDDDVMR8EUBYEX/Maximiles+%E2%80%94+Focus+on+Prizes+3.jpg", alt: "Maximiles prizes creative 2" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280081456-EKLAJDKYUUEBI21IGDU7/Maximiles+%E2%80%94+Focus+on+Prizes+1.jpg", alt: "Maximiles prizes creative 3" },
  { src: "https://images.squarespace-cdn.com/content/v1/5edc691de451f275e3b4ae86/1644280062028-UR4J7ATTWDD9MHCBN0EE/Maximiles+%E2%80%94+Focus+on+Prizes+4.png", alt: "Maximiles prizes creative 4" },
];

const MaximilesSnippet = () => (
  <section className="bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <h2 className="heading-display text-4xl text-foreground text-center mb-12">
        More Campaigns That Delivered
      </h2>

      {/* Maximiles */}
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left column — copy */}
          <div>
            <span className="bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1 inline-block mb-4">
              Paid Social · Market Research
            </span>

            <h3 className="heading-display text-3xl text-foreground mb-4">Maximiles</h3>

            <div className="flex gap-3 flex-wrap mb-6">
              {statPills.map((s) => (
                <div key={s.label} className="bg-muted rounded-full px-4 py-2">
                  <span className="heading-display text-2xl text-primary">{s.value}</span>
                  <span className="text-xs text-muted-foreground block">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-base mb-6">
              Our Meta and TikTok ads drove a 66% increase in double opt-ins and cut cost-per-results by half in just 12 months — by building and retargeting a robust, value-aligned audience.
            </p>

            <div className="border-l-4 border-primary pl-4 mb-6">
              <p className="text-sm text-muted-foreground italic">
                "Great to work with, super responsive, knowledgeable, and creative."
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                — Head of Marketing & Media Sales, Maximiles
              </p>
            </div>

            <Button variant="hero-outline" size="sm" asChild>
              <Link to="/case-studies/maximiles">
                Read the Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right column — carousel */}
          <div>
            <SpotlightCarousel images={galleryPrizes} interval={3000} />
          </div>
        </div>
      </div>

      {/* Precious Homes */}
      <PreciousHomesSnippet />
    </div>
  </section>
);

export default MaximilesSnippet;
