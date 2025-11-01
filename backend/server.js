import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import buildRoutes from "./routes/buildRoutes.js";
import carModelRoutes from "./routes/carModels.js";
import colorRoutes from "./routes/colors.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/builds", buildRoutes);
app.use("/api/car-models", carModelRoutes);
app.use("/api/colors", colorRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("🚗 Apex Auto Mods Garage API is running...");
});

// Environment setup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// Check if env vars loaded correctly
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
