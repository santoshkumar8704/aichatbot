import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";


dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = process.env.PORT || 9090;
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174","https://accenchat.vercel.app","https://accenchat.onrender.com/"],
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());


let conversationalHistory = [
  { role: "system", content: "you are a helpful assistant" },
];
app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;
  conversationalHistory.push({ role: "user", content: userMessage });
  try {
    const completion = await openai.chat.completions.create({
      messages: conversationalHistory,
      model: "gpt-3.5-turbo",
    });
    const botResponse = completion.choices[0].message.content;
    res.json({ message: botResponse });
  } catch (error) {
    res.status(500).send("error generating response from openai");
  }
});
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.images.generate({
      prompt: prompt,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024", // Replace with your specific DALL-E model ID
    });

    const generatedImage = completion.data[0].url;
    res.json({ url: generatedImage });
  } catch (error) {
    console.error("Error generating image from OpenAI:", error);
    res.status(500).send("Error generating image from OpenAI");
  }
});
app.listen(PORT, console.log("server is running code it down"));
