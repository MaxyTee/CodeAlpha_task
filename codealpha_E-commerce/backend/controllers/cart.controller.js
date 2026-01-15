import express from "express";
import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { user, product, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = await Cart.create({
        user,
        items: [{ product, quantity, size }],
      });
    } else {
      let item = cart.items.find(
        (item) => item.product._id.toString() === product
      );
      if (item) {
        return res
          .status(200)
          .json({ success: false, message: "Item added to cart already" });
      }
      cart.items.push({ product, quantity, size });

      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });

    console.log(cart);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const increaseProductQuantity = async (req, res) => {
  const { user, product, newQuantity } = req.body;
  console.log(user, product, newQuantity);
  try {
    const cart = await Cart.findOne({ user });
    console.log(cart.items);
    let item = cart.items.find((item) => item.product.toString() === product);
    console.log(item);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    if (item) {
      item.quantity = newQuantity;
    }
    await cart.save();

    console.log(cart);

    return res
      .status(200)
      .json({ success: true, message: "Quantity increase successfully", cart });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ success: false, message: "Sver error" });
  }
};
// item.quantity += 1;

export const getCart = async (req, res) => {
  const { user } = req.params;
  try {
    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ success: false, messag: "Cart not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Cart get successfully", cart });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { user, product } = req.params;
  console.log(user, product);

  try {
    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== product
    );
    console.log(cart.items);
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  const { user } = req.params;

  try {
    await Cart.findOneAndDelete({ user });

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
