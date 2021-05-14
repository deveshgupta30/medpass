import { Router } from "express";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  getAllProfile,
} from "../controller/userController.js";

const router = Router();

router.route("/").get(requireAuth, getUserProfile);
router
  .route("/add")
  .post(requireAuth, createUserProfile)
  .put(requireAuth, updateUserProfile);
router.route("/all").get(requireAuth, isAdmin, getAllProfile);
export { router };
