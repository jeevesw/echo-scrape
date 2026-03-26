import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import myceliaImage from "@/assets/case-studies/mycelia-board-game.webp";

const stats = [
  { value: "10,492", label: "Backers" },
  { value: "50 mins", label: "Funded In" },
  { value: "£545,804", label: "Raised" },
];

const MyceliaCallout = () => (
  <section className="relative overflow-hidden min-h-[420px]">
    {/* Parallax background image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${myceliaImage})` }}
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

    {/* Content */}
    <div className="relative z-10 flex flex-col justify-end px-8 md:px-16 pb-12 pt-32 max-w-5xl mx-auto">
      <p className="text-white text-xs tracking-widest font-semibold uppercase mb-3">
        Meta Lead Generation · Case Study
      </p>

      <h2 className="heading-display text-3xl lg:text-5xl text-white leading-tight mb-6">
        Half a Million Raised: Lead Generation for 'Mycelia' Board Game Kickstarter
      </h2>

      <div className="flex gap-4 flex-wrap">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-center min-w-[140px]"
          >
            <span className="heading-display text-4xl text-primary">{s.value}</span>
            <span className="text-xs text-white/70 uppercase tracking-wide mt-1 block">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-foreground"
          asChild
        >
          <Link to="/case-studies/mycelia">
            Read the Full Case Study →
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default MyceliaCallout;
