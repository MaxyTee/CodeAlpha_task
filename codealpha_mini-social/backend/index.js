import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import followRoutes from "./routes/followUser.routes.js";
import likeRoutes from "./routes/like.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", followRoutes);
app.use("/api/like", likeRoutes);

app.get("/", (req, res) => {
  res.send("Backend");
});

const PORT = process.env.PORT || 4000;
const startServer = async () => {
  console.log("Connecting to db");
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Sever running on port: ${PORT}`);
    });
  } catch (error) {}
};

startServer();
