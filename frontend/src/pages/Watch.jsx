import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import CommentSection from "../components/CommentSection";
import RecommendedRow from "../components/RecommendedRow";

function Watch({ video, continueFrom, onBack, onWatch }) {
  const [likes, setLikes] = useState(video.likes);
  const [liked, setLiked] = useState(
    localStorage.getItem(`liked_${video._id}`) === "true"
  );
  const [inList, setInList] = useState(
    localStorage.getItem(`list_${video._id}`) === "true"
  );

  const handleLike = async () => {
    if (liked) {
      const res = await fetch(`http://localhost:5000/videos/${video._id}/dislike`, { method: "PATCH" });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(false);
      localStorage.removeItem(`liked_${video._id}`);
    } else {
      const res = await fetch(`http://localhost:5000/videos/${video._id}/like`, { method: "PATCH" });
      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
      localStorage.setItem(`liked_${video._id}`, "true");
    }
  };

  const handleList = async () => {
    if (inList) {
      await fetch(`http://localhost:5000/mylist/${video._id}`, { method: "DELETE" });
      setInList(false);
      localStorage.removeItem(`list_${video._id}`);
    } else {
      await fetch("http://localhost:5000/mylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video._id }),
      });
      setInList(true);
      localStorage.setItem(`list_${video._id}`, "true");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 20px" }}>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#888",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "16px",
          padding: "0",
        }}
      >
        ← Volver
      </button>

      <VideoPlayer
        src={video.videoUrl}
        poster={video.thumbnail}
        videoId={video._id}
        startFrom={continueFrom}
      />

      <div style={{ marginTop: "16px" }}>
        <h2 style={{ color: "#fff", margin: "0 0 8px" }}>{video.title}</h2>
        <p style={{ color: "#888", margin: "0 0 16px" }}>{video.description}</p>

        {video.generos && video.generos.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {video.generos.map((g) => (
              <span
                key={g}
                style={{
                  background: "rgba(229, 9, 20, 0.15)",
                  border: "1px solid rgba(229, 9, 20, 0.4)",
                  color: "#e50914",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
              >
                {g}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button
            onClick={handleLike}
            style={{
              background: liked ? "#e50914" : "none",
              border: "1px solid #e50914",
              color: liked ? "#fff" : "#e50914",
              padding: "8px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          >
            ❤️ {likes} {liked ? "Quitar like" : "Me gusta"}
          </button>

          <button
            onClick={handleList}
            style={{
              background: inList ? "#fff" : "none",
              border: "1px solid #fff",
              color: inList ? "#000" : "#fff",
              padding: "8px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
          >
            {inList ? "✓ En mi lista" : "+ Mi lista"}
          </button>
        </div>

        <RecommendedRow videoId={video._id} onWatch={onWatch} />

        <CommentSection videoId={video._id} />
      </div>
    </div>
  );
}

export default Watch;