import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Item from "../models/Item.js";
import { protect } from "../middleware/auth.middleware.js";
import { generateEmbedding } from "../utils/embedding.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });
router.post("/upload", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    let embedding = [];
    try {
      embedding = await generateEmbedding(`${req.body.name}. ${req.body.desc}`);
    } catch (embedError) {
      console.error("Embedding generation failed:", embedError);
    }

    const newItem = new Item({
      name: req.body.name,
      desc: req.body.desc,
      status: req.body.status,
      contact: req.body.contact,
      image: result.secure_url,
      user: req.user.userId,
      embedding,
    });

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("File delete error:", err);
      });
    }
  }
});

export default router;