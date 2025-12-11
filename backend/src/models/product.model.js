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
      enum: ["men", "women", "kids"],
      default: "men",
    },

    subCategory: {
      type: String,
      enum: ["topwear", "bottomwear", "winterwear"],
      default: "topwear",
    },

    sizes: {
      type: [String],
      enum: ["S", "M", "L"],
      default: ["S"],
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

export const Product = mongoose.model("Product", productSchema);
