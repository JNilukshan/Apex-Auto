import express from "express";
import { getColors, addColor } from "../controllers/colorController.js";

const router = express.Router();

router.get("/", getColors);
router.post("/", addColor); // optional admin feature

export default router;