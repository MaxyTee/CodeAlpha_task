import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: { type: String, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
        size: String,
      },
    ],

    totalAmount: Number,

    shippingDetails: {
      address: String,
      addressType: String,
      city: String,
      default: Boolean,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "flutterwave", "paystack", "cashOnDelivery"],
      default: "cashOnDelivery",
    },

    trackingId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
