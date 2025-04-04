import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    read: { type: Boolean, default: false },
    archive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
