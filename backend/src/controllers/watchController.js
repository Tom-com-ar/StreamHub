const WatchHistory = require("../models/WatchHistory");

const saveProgress = async (req, res) => {
  try {
    const { videoId, progress } = req.body;

    const entry = await WatchHistory.findOneAndUpdate(
      { videoId, userId: "guest" },
      { progress },
      { upsert: true, new: true }
    );

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Error guardando progreso" });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ userId: "guest" })
      .populate("videoId")
      .sort({ updatedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo historial" });
  }
};

module.exports = { saveProgress, getHistory };