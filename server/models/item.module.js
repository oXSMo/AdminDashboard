import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    available: { type: Boolean, default: true },
    quantity: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
