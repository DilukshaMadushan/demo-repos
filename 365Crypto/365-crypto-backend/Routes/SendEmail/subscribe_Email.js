const express = require("express");
const {
  subscribeEmail,
} = require("../../Controllers/SendEmail/subscribeEmail");

// const { protect, authorize } = require("../../Middleware/auth");
const router = express.Router();

router.route("/").post(subscribeEmail);

module.exports = router;
