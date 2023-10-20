import { pipeline } from "@xenova/transformers";

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: "portuguese",
    task: "transcribe",
    return_timestamps: false,
  };

  try {
    console.time();
    console.log("[START_TRANSCRIBE]");

    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    );

    const data = await transcriber("../../../audio.mp3", options);

    console.timeEnd();
    console.log("[STOP_TRANSCRIBE]");

    return data; // Retorne o texto transcrito
  } catch (error) {
    console.log("ERROR_TRANSCRIBE", error);
    throw new Error(error);
  }
}
