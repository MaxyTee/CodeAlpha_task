import express from "express";
import { Like } from "../models/likes.model.js";

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  const existingLike = await Like.findOne({ userId, postId });

  if (existingLike) {
    return res.status(400).json({ success: false, message: "Already liked" });
  }

  const like = await Like.create({ userId, postId });

  const populatedLike = await Like.findById(like._id).populate(
    "userId",
    "name image"
  );

  res.json({
    success: true,
    message: "Liked Successfully",
    like: populatedLike,
  });
};

export const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  await Like.findOneAndDelete({ userId, postId });

  res.json({ success: true, message: "Unliked" });
};
