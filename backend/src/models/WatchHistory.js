const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema(
  {
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    userId: { type: String, default: "guest" },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WatchHistory", watchHistorySchema);