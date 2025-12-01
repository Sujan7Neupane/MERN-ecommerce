import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      default: "Men",
    },

    subCategory: {
      type: String,
      enum: ["Topwear", "Bottomwear", "Winterwear"],
      default: "Topwear",
    },

    sizes: {
      type: String,
      enum: ["S", "M", "L"],
      default: "S",
    },

    date: {
      type: Number,
      default: Date.now,
    },

    bestseller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
