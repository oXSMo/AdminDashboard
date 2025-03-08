import express from "express";
import { adminAuth, userAuth } from "../utils/userAuth.js";
import {
  adminDashboard,
  countOrders,
  countUsers,
  itemsTable,
  TotalEachDay,
  usersDetails,
} from "../controllers/dashboard.js";

const router = express.Router();

router
  .get("/", userAuth, adminAuth, adminDashboard)
  .get("/total", userAuth, adminAuth, TotalEachDay)
  .get("/items", userAuth, adminAuth, itemsTable)
  .get("/users", userAuth, adminAuth, countUsers)
  .get("/orders", userAuth, adminAuth, countOrders)
  .get("/userDetails", userAuth, adminAuth, usersDetails)

export default router;
