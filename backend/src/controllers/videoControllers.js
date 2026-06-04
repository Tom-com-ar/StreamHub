const Video = require("../models/Video");

// GET videos
const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

// POST video
const createVideo = async (req, res) => {
  const newVideo = new Video(req.body);
  await newVideo.save();
  res.json(newVideo);
};

module.exports = { getVideos, createVideo };