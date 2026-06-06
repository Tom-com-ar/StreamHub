const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    userId: { type: String, default: "guest" },
    text: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);