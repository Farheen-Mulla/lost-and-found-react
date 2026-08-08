import express from "express";
import multer from "multer";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/ai/describe", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = fs.readFileSync(req.file.path).toString("base64");

    const prompt = `You are helping fill out a lost-and-found item report.
Look at this image and respond with ONLY valid JSON in this exact format, nothing else:
{"name": "short item name (2-5 words)", "desc": "one sentence description mentioning color, brand, and any distinguishing features you can see"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const text = response.text;

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.json({
      name: parsed.name,
      desc: parsed.desc,
    });
  } catch (error) {
    console.error("AI describe error:", error);
    res.status(500).json({ message: "Failed to generate description" });
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("File delete error:", err);
      });
    }
  }
});

export default router;