const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { getVideos, createVideo } = require("../controllers/videoControllers");

router.get("/", getVideos);
router.post("/", upload.single("video"), createVideo);

module.exports = router;