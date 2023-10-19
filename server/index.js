import cors from "cors";
import OpenAI from "openai";
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import { createMP3 } from "./create-mp3.js";
import { downloader } from "./download-video.js";

config();
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

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

app.post("/gen-summary", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.completions.create({
      model: "text-davinci-003",
      // prompt: `Escreva um resumo sobre o conteúdo do texto a seguir: ${prompt}`,
      prompt: `Como vai voce?`,

      max_tokens: 10,
      temperature: 0,
    });

    console.log(completion.choices[0].text);
    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

app.listen(3333, () => console.log("Server up 🔥"));
