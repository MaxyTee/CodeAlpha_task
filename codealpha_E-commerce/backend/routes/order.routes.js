import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { handleInputValidation } from "../middleware/handleInputValidation.js";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/create-order",

  createOrder
);

// [
//   body("user").trim().notEmpty().withMessage("User is required"),
//   body("items").trim().notEmpty().withMessage("Items is required"),
//   body("totalAmount").trim().notEmpty().withMessage("TotalAmount is required"),
//   body("shippingDetails")
//     .trim()
//     .notEmpty()
//     .withMessage("ShippingDetails is required"),
//   body("paymentMethod")
//     .trim()
//     .notEmpty()
//     .withMessage("PaymentMethod is required"),
// ],
//   handleInputValidation,
router.get(
  "/get-order/:order",
  [param("order").trim().notEmpty().withMessage("Order is required")],
  handleInputValidation,
  getOrder
);

router.get(
  "/get-user-order/:user",
  [param("user").trim().notEmpty().withMessage("User is required")],
  handleInputValidation,
  getUserOrders
);
router.get("/get-all-order", getAllOrders);
router.get("/update-order-status", updateOrderStatus);

export default router;
