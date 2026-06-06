import { useEffect, useState } from "react";

function Studio() {
  const [videos, setVideos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editGeneros, setEditGeneros] = useState([]);

  const generosOptions = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Documental",
    "Música",
    "Deporte",
  ];

  const fetchVideos = () => {
    fetch("http://localhost:5000/videos/my-videos")
      .then((res) => res.json())
      .then(setVideos)
      .catch(console.error);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleEdit = (video) => {
    setEditing(video._id);
    setEditTitle(video.title);
    setEditDesc(video.description);
    setEditGeneros(video.generos || []);
  };

  const toggleEditGenero = (genero) => {
    setEditGeneros((prev) =>
      prev.includes(genero)
        ? prev.filter((g) => g !== genero)
        : [...prev, genero]
    );
  };

  const handleSave = async (id) => {
    const parsedGeneros = Array.from(
      new Set(editGeneros.map((g) => g.trim()).filter(Boolean))
    );

    await fetch(`http://localhost:5000/videos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        description: editDesc,
        generos: parsedGeneros,
      }),
    });
    setEditing(null);
    fetchVideos();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este video?")) return;
    await fetch(`http://localhost:5000/videos/${id}`, { method: "DELETE" });
    fetchVideos();
  };

  return (
    <div style={{ padding: "32px 40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ color: "#fff", marginBottom: "8px" }}>🎬 Mi estudio</h1>
      <p style={{ color: "#888", marginBottom: "32px" }}>
        {videos.length} video{videos.length !== 1 ? "s" : ""} subidos
      </p>

      {videos.length === 0 ? (
        <p style={{ color: "#888" }}>No subiste ningún video todavía.</p>
      ) : (
        videos.map((video) => (
          <div
            key={video._id}
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <img
              src={video.thumbnail || "https://placehold.co/120x70/111/888?text=Video"}
              alt={video.title}
              style={{ width: "120px", height: "70px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }}
            />

            <div style={{ flex: 1 }}>
              {editing === video._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "#111",
                      border: "1px solid #444",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  />
                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "#111",
                      border: "1px solid #444",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  />
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ color: "#fff", margin: "0 0 8px", fontSize: "13px" }}>
                      Géneros
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {generosOptions.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleEditGenero(g)}
                          style={{
                            background: editGeneros.includes(g) ? "#e50914" : "none",
                            border: "1px solid #e50914",
                            color: editGeneros.includes(g) ? "#fff" : "#e50914",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontSize: "13px",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleSave(video._id)}
                      style={{
                        background: "#e50914",
                        border: "none",
                        color: "#fff",
                        padding: "6px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      style={{
                        background: "none",
                        border: "1px solid #555",
                        color: "#888",
                        padding: "6px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ color: "#fff", margin: "0 0 4px", fontSize: "16px" }}>{video.title}</h3>
                  <p style={{ color: "#888", margin: "0 0 8px", fontSize: "14px" }}>{video.description}</p>
                  <p style={{ color: "#555", margin: "0 0 8px", fontSize: "12px" }}>
                    ❤️ {video.likes} likes · {new Date(video.createdAt).toLocaleDateString()}
                  </p>

                  {video.generos && video.generos.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                      {video.generos.map((g) => (
                        <span
                          key={g}
                          style={{
                            background: "rgba(229, 9, 20, 0.15)",
                            border: "1px solid rgba(229, 9, 20, 0.4)",
                            color: "#e50914",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            fontSize: "11px",
                          }}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEdit(video)}
                      style={{
                        background: "none",
                        border: "1px solid #e50914",
                        color: "#e50914",
                        padding: "6px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      style={{
                        background: "none",
                        border: "1px solid #555",
                        color: "#888",
                        padding: "6px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Studio;