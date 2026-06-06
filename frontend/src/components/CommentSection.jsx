import { useEffect, useState } from "react";

function Comment({ comment, videoId, onReply }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    if (!replyText.trim()) return;
    await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, text: replyText, parentId: comment._id }),
    });
    setReplyText("");
    setShowReply(false);
    onReply();
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "12px",
      }}>
        <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
          guest · {new Date(comment.createdAt).toLocaleDateString()}
        </p>
        <p style={{ color: "#fff", margin: "0 0 8px" }}>{comment.text}</p>
        <button
          onClick={() => setShowReply(!showReply)}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: "12px",
            cursor: "pointer",
            padding: "0",
          }}
        >
          💬 Responder
        </button>
      </div>

      {showReply && (
        <div style={{ marginLeft: "24px", marginTop: "8px", display: "flex", gap: "8px" }}>
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escribí tu respuesta..."
            style={{
              flex: 1,
              padding: "8px 12px",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleReply}
            style={{
              background: "#e50914",
              border: "none",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginLeft: "24px", marginTop: "8px" }}>
          {comment.replies.map((reply) => (
            <div key={reply._id} style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "8px",
              padding: "10px 12px",
              marginBottom: "6px",
            }}>
              <p style={{ color: "#888", fontSize: "12px", margin: "0 0 4px" }}>
                guest · {new Date(reply.createdAt).toLocaleDateString()}
              </p>
              <p style={{ color: "#ccc", margin: "0" }}>{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = () => {
    fetch(`http://localhost:5000/comments/${videoId}`)
      .then((res) => res.json())
      .then(setComments)
      .catch(console.error);
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, text }),
    });
    setText("");
    fetchComments();
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <h3 style={{ color: "#fff", marginBottom: "16px" }}>
        💬 Comentarios ({comments.length})
      </h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí un comentario..."
          style={{
            flex: 1,
            padding: "10px 14px",
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: "#e50914",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Comentar
        </button>
      </div>

      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          videoId={videoId}
          onReply={fetchComments}
        />
      ))}
    </div>
  );
}

export default CommentSection;