// name: { type: String, require: true },
// description: { type: String, require: true },
// image: [String],
// price: { type: Number, required: true },
// category: { type: String, required: true },
// sizes: [String],
// stock: { type: Number, default: 0 },
// isFeatured: { type: Boolean, default: false },

import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { handleInputValidation } from "../middleware/handleInputValidation.js";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/create-product",
  [body("name").trim().notEmpty().withMessage("Name is required")],
  [
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
  ],
  [body("image").trim().notEmpty().withMessage("Image is required")],
  [body("price").trim().notEmpty().withMessage("Price is required")],
  [body("category").trim().notEmpty().withMessage("Category is required")],
  [body("sizes").trim().notEmpty().withMessage("Sizes is required")],
  [body("stock").trim().notEmpty().withMessage("stock is required")],
  [body("isFeatured").trim().notEmpty().withMessage("isFeatured is required")],
  handleInputValidation,
  createProduct
);

router.get("/all-products", getAllProduct);

router.get(
  "/single-products/:slug",
  [param("slug").trim().notEmpty().withMessage("Slug is required")],
  handleInputValidation,
  getSingleProduct
);

router.patch(
  "/update-product/:productId",
  [body("update").isObject().withMessage("Update is required")],
  [param("productId").trim().notEmpty().withMessage("Product Id is required")],
  handleInputValidation,
  updateProduct
);

router.delete(
  "/delete-product/:productId",
  [param("productId").trim().notEmpty().withMessage("Product Id is required")],
  handleInputValidation,
  deleteProduct
);

export default router;
