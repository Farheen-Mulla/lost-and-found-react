import express from "express";
import { getItems , deleteItem , updateItem} from "../controllers/items.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/items", getItems);
router.delete("/items/:id", protect, deleteItem);
router.put("/items/:id", protect, updateItem);
export default router;