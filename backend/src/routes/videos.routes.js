const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { getVideos, createVideo, likeVideo, dislikeVideo, getMyVideos, updateVideo, deleteVideo } = require("../controllers/videoControllers");

router.get("/", getVideos);
router.post("/", upload.single("video"), createVideo);
router.patch("/:id/like", likeVideo);
router.get("/my-videos", getMyVideos);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);
router.patch("/:id/dislike", dislikeVideo);

module.exports = router;


