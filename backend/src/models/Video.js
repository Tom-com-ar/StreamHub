const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    videoUrl: String,
    thumbnail: String,
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);