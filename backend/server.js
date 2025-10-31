import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import buildRoutes from "./routes/buildRoutes.js";
import carModelRoutes from "./routes/carModels.js";
import colorRoutes from "./routes/colors.js";

dotenv.config();

const app = express();

app.use(cors()); // Allow frontend requests (React)
app.use(express.json()); // Parse incoming JSON data


app.use("/api/auth", authRoutes);       // Authentication routes
app.use("/api/services", serviceRoutes); // Car services routes
app.use("/api/builds", buildRoutes);     // Car build customization routes
app.use("/api/car-models", carModelRoutes); // Car models routes
app.use("/api/colors", colorRoutes);     // Colors routes

app.get("/", (req, res) => {
  res.send("🚗 Apex Auto Mods Garage API is running...");
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });


app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
