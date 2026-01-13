import express from "express";
import {
  checkAuth,
  forgetPassword,
  getAllUser,
  login,
  logout,
  resetPassword,
  signup,
  updateUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/handleVerifyToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkAuth", verifyToken, checkAuth);
router.get("/getAllUser", verifyToken, getAllUser);
// router.post("/follow/User", followUser);

router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/updateUser", verifyToken, upload.single("image"), updateUser);

export default router;
