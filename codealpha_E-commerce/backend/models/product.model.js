import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    image: [String],
    price: { type: Number, required: true },
    category: { type: String, required: true },

    oldPrice: { type: Number },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },

    slug: { type: String, required: true, unique: true },
    sizes: [String],
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
