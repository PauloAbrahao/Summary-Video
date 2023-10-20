import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { createMP3 } from "./create-mp3.js";
import { downloader } from "./download-video.js";
import { transcribeAudio } from "./transcribe-azure.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/audio", async (req, res) => {
  const videoId = req.query.v;

  try {
    // download video
    await downloader(videoId);
    // create mp3
    await createMP3();

    return res.send("ok");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

app.listen(3333, () => console.log("Server up 🔥"));
