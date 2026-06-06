import { useState } from "react";

export default function Load() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const toggleGenero = (g) => {
    setGeneros((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Seleccioná un archivo MP4");

    if (file.size > 100 * 1024 * 1024) {
      alert("❌ El video es demasiado pesado. El máximo es 100MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);
    formData.append("generos", JSON.stringify(generos));

    setUploading(true);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/videos");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert("🎬 Video subido con éxito");
        setTitle("");
        setDescription("");
        setFile(null);
        setGeneros([]);
        setProgress(0);
      } else {
        alert("❌ Error al subir video");
      }
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="load-page">
      <h1 className="load-title">📤 Subir video</h1>

      <form onSubmit={handleSubmit} className="load-form">
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="load-input"
          required
        />

        <input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="load-input"
          required
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files[0])}
          className="load-input"
          required
        />
        <p style={{ color: "#888", fontSize: "13px", marginTop: "-8px" }}>
          Solo MP4 · Máximo 100MB
        </p>

        <div>
          <p style={{ color: "#fff", fontSize: "14px", marginBottom: "10px" }}>
            Géneros
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Acción", "Comedia", "Drama", "Terror", "Documental", "Música", "Deporte"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => toggleGenero(g)}
                style={{
                  background: generos.includes(g) ? "#e50914" : "none",
                  border: "1px solid #e50914",
                  color: generos.includes(g) ? "#fff" : "#e50914",
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
          <p style={{ color: "#888", fontSize: "13px", marginTop: "8px" }}>
            Seleccioná uno o más géneros
          </p>
        </div>

        {progress > 0 && (
          <div style={{ width: "100%", background: "#333", borderRadius: "8px", overflow: "hidden" }}>
            <div style={{
              width: `${progress}%`,
              background: "#e50914",
              height: "8px",
              transition: "width 0.3s ease"
            }} />
            <p style={{ color: "#fff", textAlign: "center", margin: "4px 0", fontSize: "14px" }}>
              {progress}%
            </p>
          </div>
        )}

        <button className="load-button" type="submit" disabled={uploading}>
          {uploading ? `Subiendo... ${progress}%` : "Subir video"}
        </button>
      </form>
    </div>
  );
}