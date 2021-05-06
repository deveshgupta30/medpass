import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(requireAuth, (req, res) => {
  console.log({ user: req.user });
  res.send("It's profile");
});
// router.route("/profile").post();

export { router };
