import express from "express";

import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

export const createOrder = async (req, res) => {
  const { user, items, totalAmount, paymentMethod, shippingDetails } = req.body;
  console.log(req.body);
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product",
      });
    }

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res //6945d2d96039726be6a00a20
          .status(404)
          .json({ success: false, message: `Product not found: ${item.name}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for: ${product.name}`,
        });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = await Order.create({
      user,
      items,
      shippingDetails,
      totalAmount,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const getOrder = async (req, res) => {
  const { order } = req.params;

  try {
    const newOrder = await Order.findById(order)
      .populate("user", "name email")
      .populate("items.product", "name price image");

    if (!newOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Order get successfully", newOrder });
  } catch (error) {
    console.log("Error getting order: ", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const getUserOrders = async (req, res) => {
  const { user } = req.params;
  try {
    const orders = await Order.find({ user: user }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ success: true, message: "Orders get successfully", orders });
  } catch (error) {
    console.log("Error getting user's order:", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;
  try {
    const allowedStatus = ["processing", "shipped", "delivered", "cancelled"];

    if (!allowedStatus.includes(orderStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};
