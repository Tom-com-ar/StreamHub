import { useState } from "react";

export default function Load() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        videoUrl,
        thumbnail
      })
    });

    if (res.ok) {
      alert("🎬 Video subido con éxito");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnail("");
    } else {
      alert("❌ Error al subir video");
    }
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
          placeholder="URL del video (mp4, webm, etc)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="load-input"
          required
        />

        <input
          placeholder="URL de la foto/thumbnail (jpg, png)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="load-input"
          required
        />

        <button className="load-button" type="submit">
          Subir video
        </button>
      </form>
    </div>
  );
}