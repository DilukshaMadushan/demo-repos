const express = require("express");
const {
 sendEmail
} = require("../../Controllers/SendEmail/sendEmail");

// const { protect, authorize } = require("../../Middleware/auth");
const router = express.Router();

router
  .route("/")
  .post(sendEmail);

module.exports = router;