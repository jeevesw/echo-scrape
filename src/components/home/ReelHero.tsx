import reelAsset from "@/assets/we-are-trapeze-media.mp4.asset.json";

export function ReelHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        src={reelAsset.url}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-screen h-screen object-contain"
      />
      <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14 px-4">
        <div className="container-content mx-auto max-w-5xl">
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            HYPERLOCAL MARKETING: LOCAL CAMPAIGNS FOR GLOBAL BRANDS.
          </h1>
        </div>
      </div>
    </section>
  );
}