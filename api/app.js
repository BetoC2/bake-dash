import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
//import productRoutes from "./routes/product_routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
//app.use("/products", productRoutes);

export default app;
