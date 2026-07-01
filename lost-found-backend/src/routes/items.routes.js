import express from "express";
import { getItems , deleteItem , updateItem} from "../controllers/items.controller.js";

const router = express.Router();

router.get("/items", getItems);
router.delete("/items/:id",deleteItem);
router.put("/items/:id",updateItem);
export default router;