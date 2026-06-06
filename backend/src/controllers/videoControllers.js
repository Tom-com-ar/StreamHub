const Video = require("../models/Video");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

const createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No se recibió archivo" });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "streamhub",
          chunk_size: 6000000, // 6MB por chunk
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    const newVideo = new Video({
      title,
      description,
      videoUrl: result.secure_url,
      thumbnail: result.secure_url
        .replace("/upload/", "/upload/so_5/")
        .replace(".mp4", ".jpg"),
    });

    await newVideo.save();
    res.json(newVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir video" });
  }
};


const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ likes: video.likes });
  } catch (error) {
    res.status(500).json({ error: "Error al dar like" });
  }
};

const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.json({ likes: video.likes });
  } catch (error) {
    res.status(500).json({ error: "Error al quitar like" });
  }
};

const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo videos" });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando video" });
  }
};

const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando video" });
  }
};

module.exports = { getVideos, createVideo, likeVideo, dislikeVideo, getMyVideos, updateVideo, deleteVideo };
