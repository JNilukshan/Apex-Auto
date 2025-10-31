import CarModel from "../models/CarModel.js";

// Get all car models
export const getCarModels = async (req, res) => {
  try {
    const carModels = await CarModel.find({ isActive: true }).sort({ displayName: 1 });
    res.json(carModels);
  } catch (err) {
    console.error("❌ Get Car Models Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add new car model (admin only)
export const addCarModel = async (req, res) => {
  try {
    const { brand, model, year, displayName, category } = req.body;
    
    const newCarModel = new CarModel({
      brand,
      model, 
      year,
      displayName,
      category
    });
    
    await newCarModel.save();
    res.status(201).json(newCarModel);
  } catch (err) {
    console.error("❌ Add Car Model Error:", err);
    res.status(500).json({ error: err.message });
  }
};