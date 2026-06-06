import { useState } from "react";
import Home from "./pages/Home";
import Load from "./pages/Load";
import Watch from "./pages/Watch";
import Studio from "./pages/Studio";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [continueFrom, setContinueFrom] = useState(0);

  const handleWatch = (video, progress) => {
    setCurrentVideo(video);
    setContinueFrom(progress);
    setPage("watch");
  };

  return (
    <div className="app-container">
      <nav className="netflix-navbar">
        <div className="navbar-brand" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          🎬 StreamHub
        </div>
        <div className="navbar-menu">
          <button
            className={`nav-btn ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className={`nav-btn ${page === "load" ? "active" : ""}`}
            onClick={() => setPage("load")}
          >
            Subir video
          </button>
          <button
            className={`nav-btn ${page === "studio" ? "active" : ""}`}
            onClick={() => setPage("studio")}
          >
            Mi estudio
          </button>
        </div>
      </nav>

      <main className="app-content">
        {page === "home" && <Home onWatch={handleWatch} />}
        {page === "load" && <Load />}
        {page === "studio" && <Studio />}
        {page === "watch" && currentVideo && (
          <Watch
            video={currentVideo}
            continueFrom={continueFrom}
            onBack={() => setPage("home")}
            onWatch={handleWatch}
          />
        )}
      </main>
    </div>
  );
}

export default App;