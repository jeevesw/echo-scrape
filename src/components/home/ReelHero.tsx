import reelAsset from "@/assets/we-are-trapeze-media.mp4.asset.json";

export function ReelHero() {
  return (
    <section className="relative w-full aspect-video bg-black">
      <video
        src={reelAsset.url}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full aspect-video object-cover -z-10"
      />
    </section>
  );
}