import express from "express";
import {
  adminLogin,
  forgetPassword,
  logout,
  resetPassword,
  signup,
  userAddresses,
  userLogin,
  verifyToken,
} from "../controllers/auth.controller.js";
import { body, param } from "express-validator";
import { handleInputValidation } from "../middleware/handleInputValidation.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    [
      body("email")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Password is required"),
    ],
  ],
  handleInputValidation,
  signup
);
router.post(
  "/verify-token",
  [body("code").trim().notEmpty().withMessage("OTP code is required")],
  handleInputValidation,
  verifyToken
);

router.post(
  "/user/login",
  [
    body("password").trim().notEmpty().withMessage("Password is required"),
    [
      body("email")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Password is required"),
    ],
  ],
  handleInputValidation,
  userLogin
);

router.patch("/user/addresses", userAddresses);

router.post(
  "/admin/login",
  [
    body("password").trim().notEmpty().withMessage("Password is required"),
    [
      body("email")
        .trim()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Password is required"),
    ],
  ],
  handleInputValidation,
  adminLogin
);

router.post("/logout", logout);

router.post(
  "/forget-password",
  [
    body("email")
      .trim()
      .notEmpty()
      .normalizeEmail()
      .withMessage("Password is required"),
  ],

  handleInputValidation,
  forgetPassword
);

router.post(
  "/reset-password/:token",
  [
    param("token").trim().notEmpty().withMessage("token is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],

  handleInputValidation,
  resetPassword
);
export default router;
