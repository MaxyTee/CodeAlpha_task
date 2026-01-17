import express, { response } from "express";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res //69466f1b556a057a2258ac03
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 + 1000,
    });

    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const verifyToken = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ success: false, message: "Sever error" });
  }
};

export const userLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials  ---" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastlogin = new Date();

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", user });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json("Sever error");
  }
};

export const userAddresses = async (req, res) => {
  const {
    email,
    address,
    type: addressType,
    country,
    default: isDefault,
  } = req.body;

  console.log(email);

  try {
    const newAddress = {
      address,
      addressType,
      country,
      default: isDefault,
    };

    user.addresses.push(newAddress);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "New address added successfully",
      user,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, admin._id);

    admin.lastlogin = new Date();

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "admin logged in successfully",
      admin: { ...admin._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json("Sever error");
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
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
