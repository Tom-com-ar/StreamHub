import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error cargando videos:", err));
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
          <p className="empty-state">Cargando videos...</p>
        ) : (
          videos.map((video) => (
            <article key={video._id} className="video-card">
              <div className="video-card-thumb">
                <VideoPlayer src={video.videoUrl} poster={video.thumbnail} />
              </div>
              <div className="video-card-content">
                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-desc">{video.description}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Home;