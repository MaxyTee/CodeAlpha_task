import express from "express";
import { Comment } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const { userId } = req.user;

  console.log(req.body);
  console.log(req.user);
  try {
    if (!content || !postId || !userId) {
      throw new Error("Missing fields are required");
    }
    const comment = new Comment({ content, postId, userId });
    await comment.save();

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.log("Error message:", error.message);
    return res
      .status(400)
      .json({ success: false, message: "Error creating comment" });
  }
};

export const getCommentByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).sort({ updatedAt: -1 });

    return res
      .status(200)
      .json({ success: true, message: "Comments get successfully", comments });
  } catch (error) {
    console.log("error message: ", error.message);
    res.status(400).json({ success: false, message: "Error getting comment" });
  }
};

export const updateCommentByPostId = async (req, res) => {
  const { commentId } = req.params;
  const { content, postId } = req.body;
  try {
    const comment = await Comment.findById(commentId);

    if (comment.postId.toString() !== postId.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    comment.content = content;

    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comments updated successfully",
      comment,
    });
  } catch (error) {
    console.log("error message: ", error.message);
    res.status(400).json({ success: false, message: "Error updating comment" });
  }
};
export const deleteCommentByPostId = async (req, res) => {
  const { commentId } = req.params;
  const { postId } = req.query;

  try {
    const comment = await Comment.findById(commentId);

    if (comment.postId.toString() !== postId.toString()) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    console.log("error message: ", error.message);
    res.status(400).json({ success: false, message: "Error deleting comment" });
  }
};
