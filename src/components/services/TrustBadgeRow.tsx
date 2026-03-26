interface Badge {
  label: string;
  sublabel?: string;
}

interface TrustBadgeRowProps {
  badges: Badge[];
  variant?: "brand-pink" | "dark";
}

export function TrustBadgeRow({ badges, variant = "brand-pink" }: TrustBadgeRowProps) {
  const isBrandPink = variant === "brand-pink";

  return (
    <section className={isBrandPink ? "bg-primary py-12 lg:py-16" : "bg-[hsl(60,1%,8%)] py-12 lg:py-16"}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className={`rounded-full px-8 py-3 border-2 text-center ${
                isBrandPink
                  ? "border-primary-foreground/30 text-primary-foreground"
                  : "border-white/30 text-white"
              }`}
            >
              <span className="font-semibold text-base">{badge.label}</span>
              {badge.sublabel && (
                <span className={`block text-xs mt-0.5 ${isBrandPink ? "text-primary-foreground/60" : "text-white/60"}`}>
                  {badge.sublabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
