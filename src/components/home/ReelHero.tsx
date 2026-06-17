import reelAsset from "@/assets/we-are-trapeze-media.mp4.asset.json";

export function ReelHero() {
  return (
    <section className="relative w-full aspect-video overflow-hidden bg-black">
      <video
        src={reelAsset.url}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
      />
    </section>
  );
}