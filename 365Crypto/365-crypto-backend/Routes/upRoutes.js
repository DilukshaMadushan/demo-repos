const express = require("express");
const { up } = require("../Controllers/up");

const router = express.Router();

router.get("/", up);

module.exports = router;
