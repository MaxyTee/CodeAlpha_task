import { transporter } from "./mail.config.js";
import {
  ForgotPasswordEmailTemplate,
  OTPEmailTemplate,
  WelcomeEmailTemplate,
} from "./emailTemplate.js";
import { response } from "express";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Verify your email",
      html: OTPEmailTemplate.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error Sending verification email: ${error.message}`);
    throw new Error(`Error Sending verification email: ${error.message}`);
  }
};

//
export const sendWelcomeEmail = async (email, name) => {
  const recipient = email;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Welcome Message",
      html: WelcomeEmailTemplate.replace("{userName}", name).replace(),
      category: "Welcome Email Verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.log(`welcome Error Sending verification email: ${error.message}`);
    throw new Error(
      `Welcome Error Sending verification email: ${error.message}`
    );
  }
};

export const sendPasswordResetEmail = async (email, name, resetToken) => {
  const recipient = email;
  try {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Reset your password ",
      html: ForgotPasswordEmailTemplate.replace("{userName}", name).replace(
        "{resetLink}",
        resetURL
      ),
      category: "Welcome Email Verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    console.log("Email Reset Link sent successfully", response);
  } catch (error) {
    console.log(` Error Sending email reset: ${error.message}`);
    throw new Error(`Error Sending email reset: ${error.message}`);
  }
};
