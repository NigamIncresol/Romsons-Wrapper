const express = require("express");
const axios = require("axios");
const https = require("https");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", async (req, res) => {
 console.log("🟢 Login request received", "/api/auth/login");
  await authController.loginUser(req, res);
});

router.put("/logout", async(req, res) => {
  console.log("🟢 Logout request received", "/api/auth/logout");
  await authController.logoutUser(req, res);
});

router.post("/change-password", async(req, res) => {
  console.log("🟢 Change Password request received", "/api/auth/change-password");
  await authController.changePassword(req, res);
});

router.post("/forgot-password-send-OTP", async(req, res) => {
  console.log("🟢 Forgot Password Send OTP request received", "/api/auth/forgot-password-send-OTP");
  await authController.forgotPasswordOTP(req, res);
});

router.put("/forgot-password-submit-OTP", async(req, res) => {
  console.log("🟢 Forgot Password Submit OTP request received", "/api/auth/forgot-password-submit-OTP");
  await authController.resetPasswordWithOTP(req, res);
});

module.exports = router;
