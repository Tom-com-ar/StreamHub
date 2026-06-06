import { useEffect, useRef } from "react";
import Hls from "hls.js";

function VideoPlayer({ src, poster, videoId, startFrom = 0 }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!src || !video) return;

        if (!src.includes(".m3u8")) {
            video.src = src;
            if (startFrom > 0) video.currentTime = startFrom;
            return;
        }

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (startFrom > 0) video.currentTime = startFrom;
            });

            return () => hls.destroy();
        }

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = src;
            if (startFrom > 0) video.currentTime = startFrom;
        }
    }, [src, startFrom]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoId) return;

        const interval = setInterval(() => {
            if (!video.paused && video.currentTime > 0) {
                fetch("http://localhost:5000/history/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        videoId,
                        progress: Math.floor(video.currentTime),
                    }),
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [videoId]);

    return (
        <video
            id={`player-${videoId}`}
            ref={videoRef}
            controls
            poster={poster}
            style={{ width: "100%", borderRadius: "8px", background: "#000" }}
        />
    );
}

export default VideoPlayer;