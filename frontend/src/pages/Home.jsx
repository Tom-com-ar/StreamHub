import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

function VideoCard({ video, continueFrom, onClick }) {
  return (
    <article
      className="video-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="video-card-thumb">
        <img
          src={video.thumbnail || "https://placehold.co/400x220/1a1a1a/888?text=Sin+thumbnail"}
          alt={video.title}
          style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
        />
        {continueFrom > 0 && (
          <div style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            background: "rgba(0,0,0,0.8)",
            color: "#e50914",
            fontSize: "12px",
            padding: "3px 8px",
            borderRadius: "4px",
          }}>
            ▶ {Math.floor(continueFrom / 60)}:{String(continueFrom % 60).padStart(2, "0")}
          </div>
        )}
      </div>
      <div className="video-card-content">
        <h3 className="video-card-title">{video.title}</h3>
        <p className="video-card-desc">{video.description}</p>
      </div>
    </article>
  );
}

function Home({ onWatch }) {
  const [videos, setVideos] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error cargando videos:", err));

    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((entry) => {
          if (entry.videoId) map[entry.videoId._id] = entry.progress;
        });
        setHistory(map);
      })
      .catch((err) => console.error("Error cargando historial:", err));
  }, []);

  return (
    <main className="home-page">
      <header className="home-header">
        <h1 className="home-title">🎬 StreamHub</h1>
        <p className="home-subtitle">
          Explora tu colección de videos con calidad adaptativa.
        </p>
      </header>

      <section className="video-grid">
        {videos.length === 0 ? (
          <p className="empty-state">No hay videos aún</p>
        ) : (
          videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              continueFrom={history[video._id] || 0}
              onClick={() => onWatch(video, history[video._id] || 0)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Home;