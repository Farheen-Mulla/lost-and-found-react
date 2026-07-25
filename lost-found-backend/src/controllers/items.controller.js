import Item from "../models/Item.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

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