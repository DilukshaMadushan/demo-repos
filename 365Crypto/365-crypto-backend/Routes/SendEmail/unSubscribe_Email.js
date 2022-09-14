const express = require("express");
const {
  unSubscribeEmail,
} = require("../../Controllers/SendEmail/unSubscribeEmail");
// const { protect, authorize } = require("../../Middleware/auth");

const router = express.Router();

router.route("/").post(unSubscribeEmail);

module.exports = router;
