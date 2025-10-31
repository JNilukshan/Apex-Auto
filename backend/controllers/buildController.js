import Build from "../models/Build.js";

// Save a new build
export const saveBuild = async (req, res) => {
  try {
    const { carModel, color, selectedParts } = req.body;
    const newBuild = new Build({
      userId: req.user.id,
      carModel,
      color,
      selectedParts,
    });
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get builds for a specific user
export const getUserBuilds = async (req, res) => {
  try {
    const builds = await Build.find({ userId: req.params.userId });
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a specific build
export const deleteBuild = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    if (!build) {
      return res.status(404).json({ message: "Build not found" });
    }

    if (build.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this build" });
    }

    await build.deleteOne();
    res.json({ message: "Build deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
