import { useEffect, useState } from "react";

function RecommendedRow({ videoId, onWatch }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!videoId) return;
    fetch(`http://localhost:5000/recommendations/${videoId}`)
      .then((res) => res.json())
      .then(setRecommendations)
      .catch(console.error);
  }, [videoId]);

  if (recommendations.length === 0) return null;

  return (
    <div style={{ marginTop: "32px", marginBottom: "32px" }}>
      <h3 style={{ color: "#fff", marginBottom: "16px" }}>🎯 Recomendados para vos</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "12px",
      }}>
        {recommendations.map((video) => (
          <div
            key={video._id}
            onClick={() => onWatch(video, 0)}
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#e50914"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#333"}
          >
            <img
              src={video.thumbnail || "https://placehold.co/180x100/111/888?text=Video"}
              alt={video.title}
              style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "10px" }}>
              <p style={{ color: "#fff", fontSize: "13px", margin: "0 0 4px", fontWeight: "600" }}>
                {video.title}
              </p>
              {video.generos && video.generos.length > 0 && (
                <p style={{ color: "#e50914", fontSize: "11px", margin: "0" }}>
                  {video.generos.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedRow;