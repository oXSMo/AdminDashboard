import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import itemRoutes from "./routes/item.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

const __dirname = path.resolve();

dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors()); // Enable preflight for all routes
app.use(express.json());
app.use(cookieParser());
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongDB Connected");
  } catch (error) {
    console.log({ error });
  }
})();

app.use("/api/auth", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(1337, console.log("http://localhost:1337"));
