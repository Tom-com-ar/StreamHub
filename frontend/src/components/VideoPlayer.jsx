import { useEffect, useRef } from "react";
import Hls from "hls.js";

function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!src || !video) return;

    if (!src.includes(".m3u8")) {
      video.src = src;
      return;
    }

    // Si soporta HLS.js
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        console.log(`Calidad: ${hls.levels[data.level].height}p`);
      });

      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      style={{ width: "100%", borderRadius: "8px", background: "#000" }}
    />
  );
}

export default VideoPlayer;