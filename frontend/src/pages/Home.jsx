import { useEffect, useState } from "react";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 StreamHub</h1>

      {videos.length === 0 ? (
        <p>No hay videos todavía</p>
      ) : (
        videos.map(video => (
          <div key={video._id} style={{ marginBottom: "20px" }}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>

            <video width="400" controls src={video.videoUrl} />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;