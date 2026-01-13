import express from "express";
import {
  createComment,
  deleteCommentByPostId,
  getCommentByPostId,
  updateCommentByPostId,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/handleVerifyToken.js";

const router = express.Router();

router.post("/create-comment", verifyToken, createComment);
router.get("/get-comment/:postId", getCommentByPostId);
router.patch("/update-comment/:commentId", updateCommentByPostId);
router.delete("/delete-comment/:commentId", deleteCommentByPostId); //?

export default router;
