import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/accenchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Authentication routes
app.post("/api/users/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ email, username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Chat and image generation routes
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
      size: "1024x1024",
    });

    const generatedImage = completion.data[0].url;
    res.json({ url: generatedImage });
  } catch (error) {
    console.error("Error generating image from OpenAI:", error);
    res.status(500).send("Error generating image from OpenAI");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
