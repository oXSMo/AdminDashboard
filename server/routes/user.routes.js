import express from "express";
import {
  checkOTP,
  createUser,
  deleteAccount,
  deleteProfile,
  getAllAccounts,
  googleSign,
  login,
  logout,
  resetPassword,
  sendOTP,
  Signup,
  updateAccount,
  updateProfile,
  userProfile,
} from "../controllers/user.js";
import { adminAuth, userAuth } from "../utils/userAuth.js";

const router = express.Router();

router
  .post("/signup", Signup)
  .post("/", login)
  .post("/googleSign", googleSign)
  .post("/resetPassword", resetPassword);

router
  .get("/profile", userAuth, userProfile)
  .put("/profile", userAuth, updateProfile)
  .get("/logout", userAuth, logout)
  .delete("/", userAuth, deleteProfile)
  .get("/sendOTP", userAuth, sendOTP)
  .post("/checkOTP", userAuth, checkOTP);

router
  .delete("/delete/:_id", userAuth, adminAuth, deleteAccount)
  .put("/update/:_id", userAuth, adminAuth, updateAccount)
  .get("/getone/:_id", userAuth, adminAuth, updateAccount)
  .get("/all", userAuth, adminAuth, getAllAccounts)
  .post("/createUser", userAuth, adminAuth, createUser);

export default router;
