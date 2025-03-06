import express from "express";
import {
  login,
  logout,
  signup,
  currentUser,
} from "@/controllers/authController";
import { protect } from "@/middleware/authMiddleware";

const router: express.Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, currentUser);

export default router;
