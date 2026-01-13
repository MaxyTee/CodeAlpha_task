import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
};
