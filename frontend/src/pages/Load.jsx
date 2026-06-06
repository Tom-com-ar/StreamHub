import { useState } from "react";

export default function Load() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

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
        alert("Video subido con éxito");
        setTitle("");
        setDescription("");
        setFile(null);
        setProgress(0);
      } else {
        alert("Error al subir video");
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