const statPills = [
  { value: "+66%", label: "Double opt-ins" },
  { value: "50%", label: "Cost-per-result reduction" },
];

const MaximilesSnippet = () => (
  <section className="bg-muted py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <h2 className="heading-display text-4xl text-foreground text-center mb-12">
        More Campaigns That Delivered
      </h2>

      <div className="bg-background rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10">
          {/* Left column */}
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

            <div className="border-l-4 border-primary pl-4">
              <p className="text-sm text-muted-foreground italic">
                "Great to work with, super responsive, knowledgeable, and creative."
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                — Head of Marketing & Media Sales, Maximiles
              </p>
            </div>
          </div>

          {/* Right column — image placeholders */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl bg-zinc-200 aspect-square flex items-center justify-center"
                >
                  <span className="text-xs text-zinc-400 text-center p-2">Ad creative example</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-zinc-200 aspect-video w-full mt-3 flex items-center justify-center">
              <span className="text-xs text-zinc-400 text-center p-2">
                Campaign result visual or additional creative
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MaximilesSnippet;
