import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: { type: String, required: true, ref: "Post" },
    userId: { type: String, required: true, ref: "User" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
