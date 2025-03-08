import mongoose from "mongoose";
import { generateRandomString } from "../utils/functions.js";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    image: { type: String },
    serialNumber: { type: String },
    manufacture: { type: String },
    model: { type: String },
    password: { type: String },
    totalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Option" }],
    node: { type: String },
    coupon: { type: String },
    TRK: { type: String, default: () => generateRandomString(9), unique: true },
    Tracking: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
