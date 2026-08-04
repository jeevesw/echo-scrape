import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** e.g. "16/9", "4/5", "1/1" */
  aspectRatio: string;
  label: string;
  note?: string;
  className?: string;
  rounded?: string;
}

/**
 * Obvious, non-decorative placeholder marking imagery that still needs sourcing.
 */
export function ImagePlaceholder({
  aspectRatio,
  label,
  note,
  className,
  rounded = "rounded-xl",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full bg-muted border-2 border-dashed border-primary/15 flex items-center justify-center overflow-hidden",
        rounded,
        className
      )}
      style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <span className="absolute top-2 right-3 text-[10px] font-mono text-primary/50 tracking-widest">
        {aspectRatio}
      </span>
      <div className="px-6 py-4 text-center max-w-[90%]">
        <span className="block heading-display text-xs md:text-sm uppercase tracking-[0.18em] text-primary font-bold">
          {label}
        </span>
        {note && (
          <span className="block text-xs text-muted-foreground mt-2 leading-relaxed">{note}</span>
        )}
      </div>
    </div>
  );
}
