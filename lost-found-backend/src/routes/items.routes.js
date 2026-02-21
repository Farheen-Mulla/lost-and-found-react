import express from "express";
import { getItems, addItem } from "../controllers/items.controller.js";

const router = express.Router();

router.get("/api/items", getItems);
router.post("/api/items", addItem);

export default router;