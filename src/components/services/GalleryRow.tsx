interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryRowProps {
  images: GalleryImage[];
  caption?: string;
}

export function GalleryRow({ images, caption }: GalleryRowProps) {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
        {images.map((img, i) => (
          <div key={i} className="flex-shrink-0 h-[280px] w-[380px] rounded-xl overflow-hidden bg-muted">
            {img.src ? (
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground text-center p-4">[{img.alt}]</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
    </div>
  );
}
