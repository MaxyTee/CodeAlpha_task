import express from "express";
import cloudinary from "../cloudinary/cloudinary.config.js";

import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Like } from "../models/likes.model.js";
import { Comment } from "../models/comment.model.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { userId } = req.user;

  try {
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    const post = await Post.create({
      userId,
      content,
      image: imageUrl,
      likes: [],
    });

    await post.save();

    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const getAllPost = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name image");

    const likes = await Like.find({
      postId: { $in: posts.map((p) => p._id) },
    }).populate("userId", "name image");

    const comments = await Comment.find({
      postId: { $in: posts.map((p) => p._id) },
    }).populate("userId", "name image");

    const followingIds = user.following.map((id) => id._id.toString());

    const formattedPosts = posts.map((post) => {
      const postLikes = likes.filter(
        (l) => l.postId.toString() === post._id.toString()
      );

      const postComments = comments.filter(
        (c) => c.postId.toString() === post._id.toString()
      );

      return {
        ...post.toObject(),
        likes: postLikes.map((l) => l.userId),
        comments: postComments,
        isLiked: postLikes.some((l) => l.userId._id.toString() === userId),
      };
    });

    const followingPosts = formattedPosts.filter((post) =>
      followingIds.includes(post.userId._id.toString())
    );

    return res.status(200).json({
      success: true,
      message: "Post get successfully",
      folowingPosts: followingPosts,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserPost = async (req, res) => {
  const { userId } = req.user;

  try {
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name image");

    const likes = await Like.find({
      postId: { $in: posts.map((p) => p._id) },
    }).populate("userId", "name image");

    const comments = await Comment.find({
      postId: { $in: posts.map((p) => p._id) },
    });

    const formattedPosts = posts.map((post) => {
      const postLikes = likes.filter(
        (l) => l.postId.toString() === post._id.toString()
      );

      const postComments = comments.filter(
        (c) => c.postId.toString() === post._id.toString()
      );

      return {
        ...post.toObject(),
        likes: postLikes.map((l) => l.userId),
        comments: postComments,
        isLiked: postLikes.some((l) => l.userId._id.toString() === userId),
      };
    });

    return res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      userPost: formattedPosts,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUserPost = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId, userId },
      { content },
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever error" });
  }
};

export const deleteUserPost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;
  try {
    const post = await Post.findOneAndDelete({ _id: postId, userId });
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully", post });
  } catch (error) {}
};
// deletePost;
