const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

// AUTH LOGIN >>>
router.post("/login", authController.authLogin);

// AUTH LOGOUT >>>
router.post("/logout", authController.authLogout);

module.exports = router;
