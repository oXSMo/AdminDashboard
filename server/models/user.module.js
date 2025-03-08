import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    password: { type: String, minlength: 6, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, minlength: 3 },
    phoneNumber: { type: String },
    googleProvider: { type: Boolean, default: false },
    googleSub: { type: String },
    OTP: {
      type: String,
      default: String(Math.floor(100000 + Math.random() * 900000)),
    },
    firstName: { type: String },
    lastName: { type: String },
    streetAddress1: { type: String },
    streetAddress2: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    role: { type: String, default: "normal" },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
