import express from "express";
import {
  createPost,
  deleteUserPost,
  getAllPost,
  getUserPost,
  updateUserPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/handleVerifyToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/createPost", verifyToken, upload.single("image"), createPost);
router.get("/getUserPost", verifyToken, getUserPost);
router.get("/get-allPost", verifyToken, getAllPost);
router.patch("/updatePost/:postId", verifyToken, updateUserPost);
router.delete("/deletePost/:postId", verifyToken, deleteUserPost);

export default router;
