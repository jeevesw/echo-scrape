const steps = [
  {
    title: "Data-Driven Targeting & Retargeting",
    description:
      "We use thousands of data points — and our cross-industry expertise — to find and convert customers. Everything from demographics and behaviours to postcode-level geography.",
    imageLabel:
      "Audience targeting visual — e.g. a Meta Ads radius map or demographic breakdown.",
  },
  {
    title: "Future-Proofed Tracking",
    description:
      "By combining first-party tools (Meta Pixel, TikTok Pixel, Google Tags) with bespoke solutions, we analyse customer behaviour in meaningful, adaptable ways — ready for a cookieless future.",
    imageLabel:
      "Tracking/attribution visual — e.g. a clean dashboard or pixel setup screenshot.",
  },
  {
    title: "High-Converting Creative",
    description:
      "Our in-house creative team ensures your branding shines in every ad. We produce platform-native content: static, carousel, video, Stories, and UGC-style formats.",
    imageLabel:
      "Ad creative examples — static, carousel, and video formats.",
  },
  {
    title: "Scaling Ads for Maximum ROI",
    description:
      "We refine low-performers and back high-performers — continuously monitoring, optimising, and reporting on every pound of your ad spend.",
    imageLabel:
      "Campaign performance chart — upward trend, budget scaling.",
  },
  {
    title: "Strategic Placements & Integrations",
    description:
      "Every ad is tailor-made for its platform and designed to work within a broader sales funnel — forming an efficient, holistic paid advertising strategy.",
    imageLabel:
      "Multi-platform funnel diagram — awareness to conversion.",
  },
];

const HyperlocalMethodology = () => (
  <section className="bg-muted py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <h2 className="heading-display text-4xl text-foreground text-center mb-4">
        How We Do It
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
        Our hyperlocal methodology means every campaign is built around geography, behaviour, and intent — not just demographics. Here's what that looks like in practice.
      </p>

      <div className="max-w-5xl mx-auto space-y-12">
        {steps.map((step, index) => {
          const imageLeft = index % 2 === 0;

          return (
            <div
              key={step.title}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 min-h-[220px] ${
                !imageLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image placeholder */}
              <div className="rounded-2xl bg-zinc-200 shrink-0 w-full md:w-[320px] min-h-[200px] flex items-center justify-center">
                <p className="text-xs text-zinc-400 text-center p-4">
                  {step.imageLabel}
                </p>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="heading-display text-2xl text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-base">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HyperlocalMethodology;
