import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controller/userController.js";

const router = Router();

router.route("/").get(requireAuth, getUserProfile);
router.route("/add").post(requireAuth, createUserProfile);

export { router };
