import express from "express";
import { getItems , deleteItem , updateItem} from "../controllers/items.controller.js";
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
router.delete("/items/:id", protect, deleteItem);
router.put("/items/:id", protect,upload.single("image"), updateItem);
export default router;