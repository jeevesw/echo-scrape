interface Logo {
  name: string;
  imageSrc?: string;
}

interface ClientLogoStripProps {
  heading?: string;
  logos: Logo[];
  variant?: "light" | "dark";
}

export function ClientLogoStrip({ heading, logos, variant = "light" }: ClientLogoStripProps) {
  const isDark = variant === "dark";

  return (
    <div>
      {heading && (
        <p className={`text-xs tracking-widest uppercase mb-4 text-center ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
          {heading}
        </p>
      )}
      <div className="flex flex-wrap gap-6 items-center justify-center overflow-x-auto">
        {logos.map((logo) =>
          logo.imageSrc ? (
            <img
              key={logo.name}
              src={logo.imageSrc}
              alt={logo.name}
              className={`h-8 w-auto object-contain transition-all duration-300 ${
                isDark
                  ? "brightness-0 invert opacity-50 hover:opacity-100"
                  : "grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              }`}
            />
          ) : (
            <span
              key={logo.name}
              className={`text-sm font-semibold ${isDark ? "text-white/50" : "text-muted-foreground"}`}
            >
              {logo.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
