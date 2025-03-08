import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures that category names are unique
    },
    image: { type: String },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
