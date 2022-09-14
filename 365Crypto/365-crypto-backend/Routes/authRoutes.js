const express = require("express");
const {
  register,
  login,
  logout,
  verifyEmail,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  resendVerification,
} = require("../Controllers/auth");

const router = express.Router();

const { protect } = require("../Middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.put("/verify/:id", verifyEmail);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/update-details", protect, updateDetails);
router.put("/update-password", protect, updatePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resettoken", resetPassword);
router.put("/resend-verification", resendVerification);

module.exports = router;
