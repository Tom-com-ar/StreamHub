const Video = require("../models/Video");
const WatchHistory = require("../models/WatchHistory");

const getRecommendations = async (req, res) => {
  try {
    const { videoId } = req.params;

    const currentVideo = await Video.findById(videoId);
    if (!currentVideo) return res.json([]);

    const generos = currentVideo.generos || [];

    if (generos.length === 0) {
      const videos = await Video.find({ _id: { $ne: videoId } }).limit(6);
      return res.json(videos);
    }

    const recomendaciones = await Video.find({
      _id: { $ne: videoId },
      generos: { $in: generos },
    }).limit(6);

    res.json(recomendaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo recomendaciones" });
  }
};

module.exports = { getRecommendations };