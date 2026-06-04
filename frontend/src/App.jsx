import Home from "./pages/Home";
import Load from "./pages/Load";
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-container">
      <nav className="netflix-navbar">
        <div className="navbar-brand">🎬 StreamHub</div>
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
        </div>
      </nav>

      <main className="app-content">
        {page === "home" && <Home />}
        {page === "load" && <Load />}
      </main>
    </div>
  );
}

export default App;