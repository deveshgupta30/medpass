import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  createUserProfile,
} from "../controller/userController.js";

const router = Router();

router.route("/").get(requireAuth, (req, res) => {
  console.log({ user: req.user });
  res.send("It's profile");
});
router.route("/add").post(createUserProfile);

export { router };
