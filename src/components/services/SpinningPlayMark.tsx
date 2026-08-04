import { useId } from "react";

/**
 * SpinningPlayMark
 * A CSS-only 3D extruded play button that spins, sitting on a liquid-glass background.
 * No WebGL, no libraries. The "3D" is faked by stacking N flat layers along Z.
 *
 * Drop into a section as a background:
 *   <SpinningPlayMark className="absolute inset-0 -z-10" />
 */

const DEPTH = 26;        // number of stacked layers = perceived thickness
const LAYER_STEP = 1.4;  // px between layers

interface SpinningPlayMarkProps {
  className?: string;
  /** Tailwind/CSS colour for the mark face. Defaults to brand pink. */
  color?: string;
  /** Seconds per full rotation. */
  speed?: number;
  /** Show the frosted glass panel over the blobs. */
  glass?: boolean;
}

export function SpinningPlayMark({
  className = "",
  color = "rgb(199, 43, 118)",
  speed = 14,
  glass = true,
}: SpinningPlayMarkProps) {
  const id = useId().replace(/:/g, "");
  const gooId = `goo-${id}`;

  return (
    <div className={`spm-root ${className}`} aria-hidden="true">
      {/* ---- SVG goo filter: makes the blobs merge like liquid ---- */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={gooId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* ---- Liquid blobs ---- */}
      <div className="spm-blobs" style={{ filter: `url(#${gooId})` }}>
        <span className="spm-blob spm-blob-1" />
        <span className="spm-blob spm-blob-2" />
        <span className="spm-blob spm-blob-3" />
      </div>

      {/* ---- Frosted glass panel ---- */}
      {glass && <div className="spm-glass" />}

      {/* ---- The 3D mark ---- */}
      <div className="spm-scene">
        <div className="spm-spinner" style={{ animationDuration: `${speed}s` }}>
          {Array.from({ length: DEPTH }).map((_, i) => {
            const z = (i - (DEPTH - 1) / 2) * LAYER_STEP;
            // Darken the middle layers so the "edge" of the slab reads as shaded.
            const edge = 1 - Math.abs(i - (DEPTH - 1) / 2) / (DEPTH / 2);
            const brightness = 0.55 + edge * 0.1;
            const isFace = i === 0 || i === DEPTH - 1;
            return (
              <div
                key={i}
                className="spm-layer"
                style={{
                  transform: `translateZ(${z}px)`,
                  background: color,
                  filter: isFace ? "none" : `brightness(${brightness})`,
                }}
              >
                {isFace && <span className="spm-tri" />}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .spm-root {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        /* ---------- blobs ---------- */
        .spm-blobs {
          position: absolute;
          inset: -10%;
          z-index: 0;
        }
        .spm-blob {
          position: absolute;
          display: block;
          border-radius: 50%;
          opacity: 0.55;
          will-change: transform;
        }
        .spm-blob-1 {
          width: 34vw; height: 34vw;
          left: 8%; top: 12%;
          background: rgb(199, 43, 118);
          animation: spm-drift-1 18s ease-in-out infinite;
        }
        .spm-blob-2 {
          width: 28vw; height: 28vw;
          right: 10%; top: 30%;
          background: rgb(120, 30, 140);
          animation: spm-drift-2 22s ease-in-out infinite;
        }
        .spm-blob-3 {
          width: 24vw; height: 24vw;
          left: 42%; bottom: 4%;
          background: rgb(240, 90, 150);
          animation: spm-drift-3 26s ease-in-out infinite;
        }
        @keyframes spm-drift-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(14%, 10%) scale(1.18); }
        }
        @keyframes spm-drift-2 {
          0%,100% { transform: translate(0,0) scale(1.1); }
          50%     { transform: translate(-16%, -12%) scale(0.92); }
        }
        @keyframes spm-drift-3 {
          0%,100% { transform: translate(0,0) scale(0.95); }
          50%     { transform: translate(-10%, -16%) scale(1.22); }
        }

        /* ---------- liquid glass ---------- */
        .spm-glass {
          position: absolute;
          inset: 0;
          z-index: 1;
          backdrop-filter: blur(60px) saturate(180%);
          -webkit-backdrop-filter: blur(60px) saturate(180%);
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.14) 0%,
            rgba(255,255,255,0.04) 45%,
            rgba(255,255,255,0.10) 100%
          );
          box-shadow:
            inset 1px 1px 0 rgba(255,255,255,0.30),
            inset -1px -1px 0 rgba(255,255,255,0.10);
        }

        /* ---------- 3D scene ---------- */
        .spm-scene {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          place-items: center;
          perspective: 1400px;
        }
        .spm-spinner {
          position: relative;
          width: 260px;
          height: 184px;
          transform-style: preserve-3d;
          animation-name: spm-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes spm-spin {
          from { transform: rotateX(-14deg) rotateY(0deg); }
          to   { transform: rotateX(-14deg) rotateY(360deg); }
        }
        .spm-layer {
          position: absolute;
          inset: 0;
          border-radius: 44px;
          backface-visibility: hidden;
          display: grid;
          place-items: center;
        }
        /* the triangle, sitting on the front and back faces only */
        .spm-tri {
          display: block;
          width: 0; height: 0;
          border-style: solid;
          border-width: 34px 0 34px 56px;
          border-color: transparent transparent transparent #fff;
          margin-left: 14px;
          transform: translateZ(1px);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .spm-spinner { width: 170px; height: 120px; }
          .spm-layer { border-radius: 30px; }
          .spm-tri {
            border-width: 22px 0 22px 36px;
            margin-left: 9px;
          }
          .spm-glass {
            backdrop-filter: blur(36px) saturate(160%);
            -webkit-backdrop-filter: blur(36px) saturate(160%);
          }
        }

        /* ---------- accessibility ---------- */
        @media (prefers-reduced-motion: reduce) {
          .spm-spinner {
            animation: none;
            transform: rotateX(-14deg) rotateY(-24deg);
          }
          .spm-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default SpinningPlayMark;
