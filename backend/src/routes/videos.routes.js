const express = require("express");
const router = express.Router();

const { getVideos, createVideo } = require("../controllers/videoControllers");

router.get("/", getVideos);
router.post("/", createVideo);

module.exports = router;