import express from "express";
import { getCarModels, addCarModel } from "../controllers/carModelController.js";

const router = express.Router();

router.get("/", getCarModels);
router.post("/", addCarModel); // optional admin feature

export default router;