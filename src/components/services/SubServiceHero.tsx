interface SubServiceHeroProps {
  heading: string;
  body: string;
  backgroundImage?: string;
  variant: "dark-overlay" | "brand-pink";
}

export function SubServiceHero({ heading, body, backgroundImage, variant }: SubServiceHeroProps) {
  if (variant === "brand-pink") {
    return (
      <section className="bg-primary py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="heading-display text-3xl md:text-4xl text-primary-foreground mb-4">{heading}</h2>
          <p className="text-lg text-primary-foreground/80">{body}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {backgroundImage ? (
        <>
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[hsl(60,1%,12%)]" />
      )}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
        <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">{heading}</h2>
        <p className="text-lg text-white/70">{body}</p>
      </div>
    </section>
  );
}
