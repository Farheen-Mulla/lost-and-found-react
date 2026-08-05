import express from "express";
import { getItems , deleteItem , updateItem, getMatches, searchItems, getVerificationQuestion } from "../controllers/items.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,cb) => {
        cb(null, Date.now() +"-"+file.originalname);
    },
});

const upload = multer({storage});

const router = express.Router();

router.get("/items", getItems);
router.get("/items/search", searchItems);
router.get("/items/:id/matches", getMatches);
router.get("/items/:id/verification-question", protect, getVerificationQuestion);
router.delete("/items/:id", protect, deleteItem);
router.put("/items/:id", protect,upload.single("image"), updateItem);
export default router;