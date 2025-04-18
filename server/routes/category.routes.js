import express from "express";
import { adminAuth, userAuth } from "../utils/userAuth.js";
import {
  categoryInfo,
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesDash,
  getCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router
  .get("/dashboard", userAuth, adminAuth, getCategoriesDash)
  .post("/", userAuth, adminAuth, createCategory)
  .get("/", getCategories)
  .get("/info/:_id", categoryInfo)
  .put("/:_id", userAuth, adminAuth, updateCategory)
  .delete("/:_id", deleteCategory, adminAuth, updateCategory)
  .get("/:_id", getCategory);

export default router;
