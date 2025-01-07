import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controller/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/verify-email").post(verifyEmail);

export default router;
