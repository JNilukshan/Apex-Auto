import mongoose from "mongoose";

const carModelSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Please provide a brand"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Please provide a model"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Please provide a year"],
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    displayName: {
      type: String,
      required: [true, "Please provide a display name"],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Sports', 'Luxury', 'JDM', 'European', 'American'],
      default: 'Sports'
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for brand, model, year
carModelSchema.index({ brand: 1, model: 1, year: 1 }, { unique: true });

const CarModel = mongoose.model("CarModel", carModelSchema);
export default CarModel;