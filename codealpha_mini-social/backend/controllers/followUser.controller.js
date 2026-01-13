import { User } from "../models/user.model.js";

export const followUser = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  const targetedUserId = req.params.id;

  try {
    if (userId === targetedUserId) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself" });
    }

    const user = await User.findById(userId);
    const targetedUser = await User.findById(targetedUserId);

    if (!targetedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Target user not found" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isFollowing = user?.following?.some(
      (id) => id._id.toString() === targetedUserId.toString()
    );

    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
        user,
      });
    }

    user.following.push(targetedUserId);
    targetedUser.followers.push(userId);

    await user.save();
    await targetedUser.save();

    const updatedUser = await User.findById(userId)
      .populate("following", "name email image")
      .populate("followers", "name email image");

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Sever error" });
  }
};

export const unfollowerUser = async (req, res) => {
  const userId = req.user.userId;
  const targetedUserId = req.params.id;
  try {
    const user = await User.findById(userId);
    const targetedUser = await User.findById(targetedUserId);

    if (!targetedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.following = user.following.filter(
      (id) => id._id.toString() !== targetedUserId
    );

    targetedUser.followers = targetedUser.followers.filter(
      (id) => id._id.toString() !== userId
    );

    await user.save();
    await targetedUser.save();

    const updatedUser = await User.findById(userId)
      .populate("following", "name email image")
      .populate("followers", "name email image");

    res
      .status(200)
      .json({ success: true, message: "User unfollowed", user: updatedUser });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};
