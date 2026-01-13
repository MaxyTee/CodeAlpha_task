import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, Credential: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 4500;

const startSever = async () => {
  console.log("Connecting to db");
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Sever is running on ${PORT}`);
    });
  } catch (error) {
    console.log("Error", error.message);
  }
};

startSever();
