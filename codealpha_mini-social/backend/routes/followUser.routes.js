import express from "express";
import { verifyToken } from "../middleware/handleVerifyToken.js";
import {
  followUser,
  unfollowerUser,
} from "../controllers/followUser.controller.js";

const router = express.Router();

router.post("/follow/:id", verifyToken, followUser);
router.post("/unfollow/:id", verifyToken, unfollowerUser);

export default router;
