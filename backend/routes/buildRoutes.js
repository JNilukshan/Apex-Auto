import express from "express";
import {
  saveBuild,
  getUserBuilds,
  deleteBuild,
} from "../controllers/buildController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, saveBuild);
router.get("/:userId", verifyToken, getUserBuilds);
router.delete("/:id", verifyToken, deleteBuild);

export default router;
