import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

function VideoCard({ video }) {
  const [likes, setLikes] = useState(video.likes);
  const [liked, setLiked] = useState(
    localStorage.getItem(`liked_${video._id}`) === "true"
  );

  const handleLike = async () => {
    if (liked) {
      // Sacar like
      const res = await fetch(`http://localhost:5000/videos/${video._id}/dislike`, {
        method: "PATCH",
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(false);
      localStorage.removeItem(`liked_${video._id}`);
    } else {
      // Dar like
      const res = await fetch(`http://localhost:5000/videos/${video._id}/like`, {
        method: "PATCH",
      });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
      localStorage.setItem(`liked_${video._id}`, "true");
    }
  };

  return (
    <article className="video-card">
      <div className="video-card-thumb">
        <VideoPlayer src={video.videoUrl} poster={video.thumbnail} />
      </div>
      <div className="video-card-content">
        <h3 className="video-card-title">{video.title}</h3>
        <p className="video-card-desc">{video.description}</p>
        <button
          onClick={handleLike}
          style={{
            marginTop: "12px",
            background: liked ? "#e50914" : "none",
            border: "1px solid #e50914",
            color: liked ? "#fff" : "#e50914",
            padding: "6px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
        >
          ❤️ {likes} {liked ? "Quitar like" : "Me gusta"}
        </button>
      </div>
    </article>
  );
}

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
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </section>
    </main>
  );
}

export default Home;