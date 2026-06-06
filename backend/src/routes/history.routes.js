const express = require("express");
const router = express.Router();
const { saveProgress, getHistory } = require("../controllers/watchController");

router.post("/progress", saveProgress);
router.get("/", getHistory);

module.exports = router;