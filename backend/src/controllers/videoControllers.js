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

module.exports = { getVideos, createVideo };