import {
  Crosshair,
  ScanSearch,
  Sparkles,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Crosshair,
    title: "Data-Driven Targeting and Retargeting",
    description:
      "We use thousands of datapoints (and our cross-industry expertise) to find and convert customers. Everything from demographics to geography.",
  },
  {
    icon: ScanSearch,
    title: "Future-Proofed Tracking",
    description:
      "By combining first-party tools (Meta/TikTok Pixels, LinkedIn Insight Tags) with our own bespoke solutions, we analyse customer behaviour in meaningful, adaptable ways.",
  },
  {
    icon: Sparkles,
    title: "High-Converting Creative",
    description:
      "Our in-house agency team of designers and copywriters ensure your branding and story shines (and sells) in every ad we run.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Ads for Maximum ROI",
    description:
      "We refine low-performers and boost high-performers, continuously monitoring (and reporting on) paid campaign performance.",
  },
  {
    icon: Layers,
    title: "Strategic Placements and Integrations",
    description:
      "Every ad we create is tailor-made for the platform it runs on, and designed to work within broader sales funnels, forming an efficient, holistic paid social strategy.",
  },
];

const HyperlocalMethodology = () => (
  <section className="bg-muted pt-6 pb-16 lg:pb-24">
    <div className="container mx-auto px-4">
      <h2 className="heading-display text-3xl md:text-4xl text-foreground text-center mb-12">
        Our Paid Social Management Services
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.slice(0, 3).map((item) => (
          <Card
            key={item.title}
            className="border-0 shadow-none bg-background"
          >
            <CardContent className="p-6 md:p-8">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="heading-display text-lg text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Bottom row — centered */}
      <div className="flex justify-center gap-6 mt-6 max-w-5xl mx-auto">
        {services.slice(3).map((item) => (
          <Card
            key={item.title}
            className="border-0 shadow-none bg-background w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <CardContent className="p-6 md:p-8">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="heading-display text-lg text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default HyperlocalMethodology;
