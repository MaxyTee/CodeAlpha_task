import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    items: [
      {
        product: { type: String, ref: "Product" },
        quantity: { type: Number },
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
