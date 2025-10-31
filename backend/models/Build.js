import mongoose from "mongoose";

const buildSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  carModel: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true }
  },
  color: {
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    accent: { type: String, required: true }
  },
  selectedParts: [{
    serviceId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Build", buildSchema);
