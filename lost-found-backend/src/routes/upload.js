import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Item from "../models/Item.js";

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });
router.post("/upload", upload.single("image"),
async (req,res) => {
    try{
       const result = await
        cloudinary.uploader.upload(req.file.path);

        const newItem = new Item({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            contact: req.body.contact,
            image: result.secure_url
        });
        
        await newItem.save();

        res.json(newItem);


    }catch(error){
        console.error(error);
        res.status(500).json({message:"Upload failed"});
    }finally{
        if(req.file){
         fs.unlink(req.file.path, (err) => {
          if(err) console.log(err);
         });
        }   
    }
});

export default router;
    
