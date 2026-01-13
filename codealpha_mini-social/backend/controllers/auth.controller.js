import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import cloudinary from "../cloudinary/cloudinary.config.js";

// "email": "targetedUserId@example.com",
//   "password": "password123",

// 6955542753440fcd971af8ca

// "email": "mariam@example.com",
//   "password": "password123"

// 6955540478266b9d993e9cbe
export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const userAlreadyExists = await User.findOne({ email })
      .populate("following", "name image _id")
      .populate("followers", "name image _id");
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User exists" });
    }

    console.log("Hello");

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    console.log(payload);

    await generateTokenAndSetCookie(res, payload);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, messaag: "Sever error" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .populate("following", "name image _id")
      .populate("followers", "name image _id");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, messaag: "Invalid credentials" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    await generateTokenAndSetCookie(res, payload);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, messaag: "Sever error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
  try {
    u;
    const user = await User.findById(req.user._id)
      .populate("following", "name image _id")
      .populate("followers", "name image _id");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, messaag: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever error" });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();

    await sendPasswordResetEmail(user.email, user.name, resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      user,
    });
  } catch (error) {
    console.log("Forget password error:", error.message);
    res.status(400).json({
      success: false,
      message: "Error processing forgot password request",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      messaag: "Password Reset successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("error", error.message);
    res
      .status(400)
      .json({ success: false, message: "Password reset not successfully" });
  }
};

export const getAllUser = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);

  try {
    const users = await User.find()
      .populate("following", "name email image _id")
      .populate("followers", "name email image _id");
    const allUser = users.filter(
      (user) => user._id.toString() !== userId.toString()
    );

    console.log(allUser);

    return res
      .status(200)
      .json({ success: true, message: "All users get successfully", allUser });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal sever error" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { bio, email, name } = req.body;
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageUrl = result.secure_url;
    }

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { bio, email, name, image: imageUrl } },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, messaag: "Updated successfully", user });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever error" });
  }
};
