import express from "express";
import { likePost, unlikePost } from "../controllers/like.controller.js";
import { verifyToken } from "../middleware/handleVerifyToken.js";

const router = express.Router();

router.post("/likePost/:targetedUserId/:postId", verifyToken, likePost);
router.post("/unlikePost/:targetedUserId/:postId", verifyToken, unlikePost);

export default router;
