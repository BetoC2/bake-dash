import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);

export default app;
