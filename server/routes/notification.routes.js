import express from "express";
import { adminAuth, userAuth } from "../utils/userAuth.js";

const router = express.Router();

router.post("/", userAuth, adminAuth);

export default router;
