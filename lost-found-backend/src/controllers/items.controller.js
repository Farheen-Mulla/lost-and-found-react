import Item from "../models/Item.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { cosineSimilarity } from "../utils/embedding.js";

export const getItems = async (req, res) => {
  try{
    const items =await
    Item.find().sort({createdAt:-1});
    res.json(items);
  }catch(error){
    res.status(500).json({message:"Failed to fetch items"})
  }
};

export const deleteItem = async (req,res) => {
  try{
    const deletedItem = await
    Item.findByIdAndDelete(req.params.id);

    if(!deletedItem){
      return res.status(404).json({
        message: "Item not found"
      });
    }

    res.json({
      message: "Item deleted successfully"
    });
  } catch(error){
    res.status(500).json({
      message: "Failed to delete item"
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      desc: req.body.desc,
      contact: req.body.contact,
      status: req.body.status,
    };

    // Only update image if a new one was uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(updatedItem);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update item",
    });
  }
};

// finds the most similar items with the opposite status
// (e.g. for a "lost" item, finds the closest-matching "found" items)
export const getMatches = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (!item.embedding || item.embedding.length === 0) {
      return res.json([]); 
    }

    const oppositeStatus = item.status === "lost" ? "found" : "lost";

    // Only compare against items that actually have an embedding
    const candidates = await Item.find({
      status: oppositeStatus,
      embedding: { $exists: true, $ne: [] },
    });

    const scored = candidates.map((candidate) => ({
      item: candidate,
      score: cosineSimilarity(item.embedding, candidate.embedding),
    }));

    // Highest similarity first, top 5 only
    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 5).map((entry) => ({
      ...entry.item.toObject(),
      matchScore: entry.score,
    }));

    res.json(topMatches);
  } catch (error) {
    console.error("Match error:", error);
    res.status(500).json({ message: "Failed to find matches" });
  }
};