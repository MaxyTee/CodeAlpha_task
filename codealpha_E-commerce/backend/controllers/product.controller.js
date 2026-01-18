import express from "express";
import slugify from "slugify";
import { Product } from "../models/product.model.js";
import cloudinary from "../cloudinary/cloudinary.config.js";
import { Cart } from "../models/cart.model.js";

export const createProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    price,
    sizes,
    stock,
    oldPrice,
    rating,
    reviewsCount,
    isFeatured,
  } = req.body;

  console.log("Files received:", req.files); // DEBUG

  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      );
      imageUrls.push(result.secure_url);
    }

    const slug = slugify(name, { lower: true });

    const product = await Product.create({
      name,
      description,
      image: imageUrls,
      price,
      category,
      sizes,
      stock,
      isFeatured,
      oldPrice,
      rating,
      reviewsCount,
      slug,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProduct = async (req, res) => {
  console.log("Hello");
  try {
    const allProducts = await Product.find();
    return res.status(200).json({
      success: true,
      message: "All product get successfully",
      allProducts,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const getSingleProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product get successfully", product });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const updateProduct = async (req, res) => {
  const { update } = req.body;

  const { productId } = req.params;

  try {
    // if (update.name) {
    //   update.slug = slugify(update.name, { lower: true });
    // }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: update },
      {
        new: true,
      },
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product Updated", product });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await Cart.updateMany(
      { "items.product": productId },
      { $pull: { items: { product: productId } } },
    );

    return res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error", error.message);
  }
};
