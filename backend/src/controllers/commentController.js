const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ videoId, parentId: null })
      .sort({ createdAt: -1 });

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentId: comment._id })
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo comentarios" });
  }
};

const createComment = async (req, res) => {
  try {
    const { videoId, text, parentId } = req.body;
    const comment = new Comment({ videoId, text, parentId: parentId || null });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error creando comentario" });
  }
};

module.exports = { getComments, createComment };