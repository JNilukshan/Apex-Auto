import Color from "../models/Color.js";

// Get all colors
export const getColors = async (req, res) => {
  try {
    const colors = await Color.find({ isActive: true }).sort({ name: 1 });
    res.json(colors);
  } catch (err) {
    console.error("❌ Get Colors Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add new color (admin only)
export const addColor = async (req, res) => {
  try {
    const { name, hexValue, category } = req.body;
    
    const newColor = new Color({
      name,
      hexValue,
      category
    });
    
    await newColor.save();
    res.status(201).json(newColor);
  } catch (err) {
    console.error("❌ Add Color Error:", err);
    res.status(500).json({ error: err.message });
  }
};