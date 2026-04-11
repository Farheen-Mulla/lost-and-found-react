import express from "express";
import { getItems } from "../controllers/items.controller.js";

const router = express.Router();

router.get("/items", getItems);

export default router;