import mongoose from "mongoose";

const optionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Option", optionSchema);
