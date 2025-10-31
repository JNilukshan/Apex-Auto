import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a color name"],
      trim: true,
    },
    hexValue: {
      type: String,
      required: [true, "Please provide a hex value"],
      match: [/^#([0-9A-F]{3}){1,2}$/i, "Please provide a valid hex color"],
    },
    category: {
      type: String,
      enum: ['Standard', 'Metallic', 'Matte', 'Pearlescent', 'Chrome'],
      default: 'Standard'
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

// Create index for name and hexValue
colorSchema.index({ name: 1 }, { unique: true });
colorSchema.index({ hexValue: 1 });

const Color = mongoose.model("Color", colorSchema);
export default Color;