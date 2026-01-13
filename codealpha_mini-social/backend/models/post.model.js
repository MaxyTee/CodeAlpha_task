import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
