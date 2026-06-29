import express from "express";
import { getItems , deleteItem} from "../controllers/items.controller.js";

const router = express.Router();

router.get("/items", getItems);
router.delete("/items/:id",deleteItem);
export default router;