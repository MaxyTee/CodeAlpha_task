import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  increaseProductQuantity,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.post("/inc-product-quantity", increaseProductQuantity);
router.get("/get-cart/:user", getCart);
router.get("/remove-from-cart/:user/:product", removeFromCart);
router.delete("/clear-cart/:user", clearCart);

export default router;
