const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/mongodb");

const app = express();

const videoRoutes = require("./src/routes/videos.routes");

app.use("/videos", videoRoutes);

app.use(cors());
app.use(express.json());

// conectar DB
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando" });
});

app.listen(5000, () => {
  console.log("Servidor en puerto 5000");
});