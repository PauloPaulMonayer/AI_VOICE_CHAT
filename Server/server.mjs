import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: text }],
    });
    const aiResponse = completion.choices[0].message.content;
    console.log("AI Response:", aiResponse);

    const ttsResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy", // you can choose any available voice
      input: aiResponse,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await ttsResponse.arrayBuffer());

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: "Failed to generate audio." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
