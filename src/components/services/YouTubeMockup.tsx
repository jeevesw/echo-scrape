import { useEffect, useRef, useState } from "react";

interface YouTubeMockupProps {
  src: string;
  maxWidth?: number;
  className?: string;
}

const PLAY_PATH = "M8 5v14l11-7z";
const PAUSE_PATH = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

export const YouTubeMockup = ({ src, maxWidth = 780, className = "" }: YouTubeMockupProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().then(() => setIsPaused(false)).catch(() => setIsPaused(true));
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <div className={`mockup-wrapper ${className}`} style={{ width: "100%", maxWidth: `${maxWidth}px` }}>
      <style>{`
        .yt-mockup-container { position: relative; width: 100%; padding-top: 69.59%; }
        .yt-mockup-video { position: absolute; left: 5.22%; top: 13.90%; width: 89.56%; height: 72.20%; object-fit: cover; background: #000; display: block; }
        .yt-mockup-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; display: block; }
        .yt-play-zone { position: absolute; left: 5.22%; top: 13.90%; width: 89.56%; height: 72.20%; cursor: pointer; z-index: 10; }
        .yt-play-indicator { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.25s; }
        .yt-play-indicator svg { width: 56px; height: 56px; background: rgba(0,0,0,0.55); border-radius: 50%; padding: 14px; backdrop-filter: blur(4px); }
        .yt-play-zone:hover .yt-play-indicator, .yt-play-zone.is-paused .yt-play-indicator { opacity: 1; }
        .yt-controls { position: absolute; top: 15.5%; right: 6.8%; z-index: 20; display: flex; gap: 6px; }
        .yt-ctrl-btn { width: 32px; height: 32px; border: none; border-radius: 50%; background: rgba(0,0,0,0.60); backdrop-filter: blur(4px); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s, transform 0.1s; padding: 0; }
        .yt-ctrl-btn:hover { background: rgba(0,0,0,0.85); transform: scale(1.1); }
        .yt-ctrl-btn:active { transform: scale(0.95); }
        .yt-ctrl-btn svg { width: 15px; height: 15px; }
      `}</style>
      <div className="yt-mockup-container">
        <video ref={videoRef} className="yt-mockup-video" loop playsInline muted autoPlay>
          <source src={src} type="video/mp4" />
        </video>

        <svg className="yt-mockup-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 391.37 272.37" aria-hidden="true">
          <defs>
            <style>{`.c1{fill:#8a8d8e}.c2{fill:#d30c03}.c3{fill:#e7e7e7}.c4{fill:#fff}.c5{fill:#ccc;opacity:.2}.c6{fill:red}.c7{fill:#f2f2f2}.c8{fill:#0a0a0a}.c9{fill:#ff0010}.c10{fill:#353535}.c11{fill:#222}`}</style>
          </defs>
          <path className="c11" d="M0,11v15.43h391.37v-15.43c0-6.08-4.92-11-11-11H11C4.92,0,0,4.92,0,11Z"/>
          <path className="c8" d="M0,26.43v234.93C0,267.44,4.92,272.37,11,272.37h369.37c6.08,0,11-4.92,11-11V26.43H0ZM370.93,234.52H20.43V37.85h350.5v196.66Z"/>
          <polygon className="c4" points="34.4 221.85 34.4 225.81 34.4 229.78 42.33 225.81 34.4 221.85"/>
          <polygon className="c4" points="54.15 222.46 54.15 225.81 54.15 229.16 58.21 225.81 54.15 222.46"/>
          <rect className="c4" x="59.17" y="222.46" width="1.03" height="6.7"/>
          <polygon className="c4" points="71.27 224.43 69.58 224.43 69.58 227.16 71.27 227.16 73.93 229.78 73.93 221.85 71.27 224.43"/>
          <path className="c4" d="M75.05,223.78v4.05c1.12,0,2.03-.91,2.03-2.03s-.91-2.03-2.03-2.03Z"/>
          <path className="c4" d="M273.61,222.24v7.21h9.12v-7.21h-9.12ZM274.81,225.37h1.45v.97h-1.45v-.97ZM279.08,228.24h-4.27v-.97h4.27v.97ZM281.52,228.24h-1.45v-.97h1.45v.97ZM281.52,226.34h-4.27v-.97h4.27v.97Z"/>
          <path className="c4" d="M342.74,230.07h-10.82v-8.45h10.82v8.45ZM333.15,228.83h8.34v-5.97h-8.34v5.97Z"/>
          <path className="c4" d="M322.49,230.07h-10.82v-8.45h10.82v8.45ZM312.9,228.83h8.34v-5.97h-8.34v5.97Z"/>
          <path className="c4" d="M316.61,225.26v2.52h3.84v-2.52h-3.84Z"/>
          <path className="c4" d="M297.67,229.32l1.25-1.25-1.06-1.06c.14-.32.23-.67.23-1.05s-.09-.75-.25-1.08l1.05-1.05-1.25-1.25-1.06,1.06c-.06-.03-.12-.05-.18-.07v-1.49h-1.77v1.5c-.06.02-.12.05-.18.08l-1.05-1.05-1.25,1.25,1.06,1.06c-.15.32-.23.68-.23,1.05s.09.75.25,1.08l-1.05,1.05,1.25,1.25,1.06-1.06c.06.03.12.05.18.07v1.49h1.77v-1.5c.06-.02.12-.05.18-.08l1.05,1.05ZM295.54,224.64c.73,0,1.31.59,1.31,1.32s-.59,1.31-1.31,1.31-1.32-.59-1.32-1.31.59-1.32,1.32-1.32Z"/>
          <rect className="c6" x="295.38" y="221.4" width="6.85" height="5.12"/>
          <path className="c3" d="M296.45,225.39v-2.55h.52v1h1.01v-1h.52v2.55h-.52v-1.12h-1.01v1.12h-.52Z"/>
          <path className="c3" d="M299.03,222.84h.94c.21,0,.37.02.48.05.15.04.28.12.38.24.11.11.19.25.25.41.05.16.08.37.08.6,0,.21-.03.39-.08.54-.07.19-.16.34-.27.45-.09.09-.21.15-.36.2-.11.04-.27.05-.46.05h-.97v-2.55ZM299.54,223.27v1.69h.38c.14,0,.25,0,.31-.02.09-.02.15-.06.21-.11.06-.05.1-.13.14-.25.03-.11.05-.27.05-.47s-.02-.35-.05-.46c-.03-.11-.08-.19-.15-.25-.06-.06-.14-.1-.24-.12-.07-.02-.21-.02-.42-.02h-.23Z"/>
          <polygon className="c4" points="357.42 222.65 359.45 222.65 359.45 224.71 360.69 224.71 360.69 221.41 357.42 221.41 357.42 222.65"/>
          <polygon className="c4" points="353.54 224.71 353.54 222.65 355.56 222.65 355.56 221.41 352.3 221.41 352.3 224.71 353.54 224.71"/>
          <polygon className="c4" points="359.45 226.57 359.45 228.63 357.42 228.63 357.42 229.87 360.69 229.87 360.69 226.57 359.45 226.57"/>
          <polygon className="c4" points="355.56 228.63 353.54 228.63 353.54 226.57 352.3 226.57 352.3 229.87 355.56 229.87 355.56 228.63"/>
          <path className="c5" d="M364.72,216.17c0,.57-.46,1.03-1.03,1.03H28.02c-.57,0-1.03-.46-1.03-1.03s.46-1.03,1.03-1.03h335.66c.57,0,1.03.46,1.03,1.03Z"/>
          <path className="c7" d="M215.39,216.17c0-.57-.46-1.03-1.03-1.03H28.02c-.57,0-1.03.46-1.03,1.03s.46,1.03,1.03,1.03h186.34c.57,0,1.03-.46,1.03-1.03Z"/>
          <path className="c6" d="M102.02,216.17c0-.57-.46-1.03-1.03-1.03H28.02c-.57,0-1.03.46-1.03,1.03s.46,1.03,1.03,1.03h72.96c.57,0,1.03-.46,1.03-1.03Z"/>
          <rect className="c4" x="14.24" y="10.88" width="8.84" height="1.17"/>
          <rect className="c4" x="14.24" y="13.22" width="8.84" height="1.16"/>
          <rect className="c4" x="14.24" y="15.56" width="8.84" height="1.16"/>
          <path className="c9" d="M36.94,9.48h10.54c.68,0,1.24.56,1.24,1.24v6.15c0,.68-.56,1.24-1.24,1.24h-10.54c-.68,0-1.24-.56-1.24-1.24v-6.16c0-.68.56-1.24,1.24-1.24Z"/>
          <polygon className="c4" points="40.5 11.41 40.5 13.8 40.5 16.19 45.29 13.8 40.5 11.41"/>
          <rect className="c8" x="53.71" y="6.28" width="200.16" height="15.19"/>
          <rect className="c10" x="253.87" y="6.28" width="32.21" height="15.19"/>
          <path className="c1" d="M272.77,16.4l-1.94-2.16c.44-.51.71-1.17.71-1.9,0-1.61-1.31-2.92-2.92-2.92s-2.93,1.31-2.93,2.92,1.31,2.92,2.93,2.92c.62,0,1.19-.19,1.66-.52l1.93,2.15c.08.08.18.12.28.12.09,0,.18-.03.25-.1.16-.14.17-.37.03-.53ZM266.44,12.34c0-1.2.97-2.18,2.18-2.18s2.18.98,2.18,2.18-.98,2.18-2.18,2.18-2.18-.98-2.18-2.18Z"/>
          <path className="c4" d="M302.44,12.8v-1.74h-6.77v5.78h6.77v-1.81l1.87,1.74v-5.71s-1.87,1.74-1.87,1.74ZM300.99,14.4h-1.4v1.4h-.99v-1.4h-1.4v-.99h1.4v-1.4h.99v1.4h1.4v.99Z"/>
          <rect className="c4" x="319.27" y="10.12" width="1.94" height="1.94"/>
          <rect className="c4" x="319.27" y="12.99" width="1.94" height="1.94"/>
          <rect className="c4" x="319.27" y="15.85" width="1.94" height="1.94"/>
          <rect className="c4" x="322.19" y="10.12" width="1.94" height="1.94"/>
          <rect className="c4" x="322.19" y="12.99" width="1.94" height="1.94"/>
          <rect className="c4" x="322.19" y="15.85" width="1.94" height="1.94"/>
          <rect className="c4" x="325.12" y="10.12" width="1.94" height="1.94"/>
          <rect className="c4" x="325.12" y="12.99" width="1.94" height="1.94"/>
          <rect className="c4" x="325.12" y="15.85" width="1.94" height="1.94"/>
          <path className="c4" d="M372.54,15.97v-2.59c0-1.45-1.01-2.65-2.37-2.96.04-.1.07-.2.07-.31,0-.41-.33-.74-.74-.74s-.75.33-.75.74c0,.11.03.21.07.31-1.36.3-2.38,1.52-2.38,2.97v2.62l-1.09,1.38h8.29l-1.11-1.41Z"/>
          <path className="c4" d="M369.5,18.88c.64,0,1.16-.52,1.16-1.15h-2.31c0,.64.52,1.15,1.15,1.15Z"/>
          <path className="c2" d="M378.99,10.45c0,2.47-2,4.48-4.48,4.48s-4.48-2-4.48-4.48,2-4.48,4.48-4.48,4.48,2.01,4.48,4.48Z"/>
        </svg>

        <div className={`yt-play-zone ${isPaused ? "is-paused" : ""}`} onClick={togglePlay}>
          <div className="yt-play-indicator">
            <svg viewBox="0 0 24 24" fill="white">
              <path d={isPaused ? PLAY_PATH : PAUSE_PATH} />
            </svg>
          </div>
        </div>

        <div className="yt-controls">
          <button className="yt-ctrl-btn" onClick={toggleMute} title="Toggle mute" aria-label="Toggle mute">
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};